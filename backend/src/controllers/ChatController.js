import { getParam } from "../utils/request.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export class ChatController {
    constructor({ chatService }) {
        this.chatService = chatService;
    }

    getContacts = asyncHandler(async (req, res) => {
        const user = getParam(req, "user");
        const result = await this.chatService.getContacts(user);
        return res.status(HTTP_STATUS.OK).json(result);
    });

    addContact = asyncHandler(async (req, res) => {
        const user = getParam(req, "user");
        const contact = getParam(req, "contact");
        const result = await this.chatService.addContact({ user, contact });
        return res.status(HTTP_STATUS.OK).json(result);
    });

    getMessages = asyncHandler(async (req, res) => {
        const from = getParam(req, "from");
        const to = getParam(req, "to");
        const result = await this.chatService.getMessages(from, to);
        return res.status(HTTP_STATUS.OK).json(result);
    });

    markReadStatus = asyncHandler(async (req, res) => {
        const contact = getParam(req, "contact");
        const result = await this.chatService.markReadStatus(contact);
        return res.status(HTTP_STATUS.OK).json(result);
    });

    getNotifications = asyncHandler(async (req, res) => {
        const user = getParam(req, "user");
        const result = await this.chatService.getNotifications(user);
        return res.status(HTTP_STATUS.OK).json(result);
    });

    removeNotification = asyncHandler(async (req, res) => {
        const source = getParam(req, "source");
        const priority = getParam(req, "priority");
        const destination = getParam(req, "user");

        const result = await this.chatService.removeNotification({
            source,
            priority,
            destination,
        });

        return res.status(HTTP_STATUS.OK).json(result);
    });
}
