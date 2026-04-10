export class ChatService {
    constructor({ chatModel, contactModel, notificationModel }) {
        this.chatModel = chatModel;
        this.contactModel = contactModel;
        this.notificationModel = notificationModel;
        this.onlineUsers = new Map();
    }

    async getContacts(user) {
        const additionalQueryResult = await this.contactModel.findOne({ userName: user });

        const contactMap = new Map();

        if (additionalQueryResult && additionalQueryResult.contactList) {
            for (const contact of additionalQueryResult.contactList) {
                const objectValue = { _id: contact, unreadMessageCount: 0 };
                contactMap.set(objectValue._id, objectValue);
            }
        }

        const queryResult = await this.chatModel.aggregate([
            { $match: { Status: "unread", Destination: user } },
            {
                $group: {
                    _id: "$Source",
                    unreadMessageCount: { $sum: 1 },
                },
            },
            { $sort: { unreadMessageCount: -1 } },
        ]);

        for (const item of queryResult) {
            const objectValue = {
                _id: item._id,
                unreadMessageCount: item.unreadMessageCount,
            };
            contactMap.set(objectValue._id, objectValue);
        }

        return Array.from(contactMap.values());
    }

    async addContact({ user, contact }) {
        const safeUser = String(user || "").trim().toLowerCase();
        const safeContact = String(contact || "").trim().toLowerCase();

        if (!safeUser || !safeContact) {
            return { ok: false, message: "User and contact are required" };
        }

        if (safeUser === safeContact) {
            return { ok: false, message: "You cannot add yourself as contact" };
        }

        await this.contactModel.updateOne(
            { userName: safeUser },
            {
                $setOnInsert: { userName: safeUser },
                $addToSet: { contactList: safeContact },
            },
            { upsert: true }
        );

        return { ok: true, message: "Contact added successfully" };
    }

    async getMessages(from, to) {
        return this.chatModel
            .collection()
            .find({
                $or: [
                    { Source: from, Destination: to },
                    { Source: to, Destination: from },
                ],
            })
            .sort({ createdAt: 1 })
            .toArray();
    }

    async markReadStatus(contact) {
        return this.chatModel.updateMany(
            { Source: contact },
            { $set: { Status: "read" } }
        );
    }

    async getNotifications(user) {
        return this.notificationModel
            .collection()
            .find({ Destination: user })
            .sort({ Priority: -1 })
            .toArray();
    }

    async removeNotification({ source, priority, destination }) {
        return this.notificationModel.deleteOne({
            Source: source,
            Priority: priority,
            Destination: destination,
        });
    }

    bindSocket(io) {
        io.on("connection", (socket) => {
            socket.on("Add", ({ from }) => {
                this.onlineUsers.set(from, socket.id);
            });

            socket.on("joinRoom", ({ from, to }) => {
                const roomId = [from, to].sort().join("_");
                socket.join(roomId);
            });

            socket.on("message", async ({ from, to, message }) => {
                try {
                    let status = "Unread";
                    const roomId = [from, to].sort().join("_");

                    io.to(roomId).emit("newMessage", { from, to, message });

                    if (this.onlineUsers.get(from) && this.onlineUsers.get(to)) {
                        status = "read";
                    } else {
                        const contact = await this.contactModel.findOne({
                            contactList: { $in: [to] },
                        });

                        if (!contact) {
                            await this.contactModel.updateOne(
                                { userName: from },
                                { $push: { contactList: to } }
                            );
                        }

                        const newNotification = {
                            Source: from,
                            Destination: to,
                            Message: message,
                            Priority: 1,
                        };

                        await this.notificationModel.insertOne(newNotification);

                        if (this.onlineUsers.get(to)) {
                            io.to(this.onlineUsers.get(to)).emit("notification", {
                                from,
                                to,
                                message,
                            });
                        }
                    }

                    await this.chatModel.insertOne({
                        message,
                        Source: from,
                        Destination: to,
                        Status: status,
                        createdAt: new Date(),
                    });
                } catch (error) {
                    console.error("Error while processing message:", error);
                }
            });
        });
    }
}
