import Chat from '../model/chat.js';
import  Contact from '../model/contact.js';
import { query } from 'express';




export const getContacts=async(req,res)=>
{
    const user=req.query.user;
    console.log("user: "+user);

    let additionalQueryResult = await Contact.findOne({ userName: user });
   // console.log("result1: "+additionalQueryResult.contactList);

    let ans = new Map();
    if(additionalQueryResult.contactList!=null)
    {
        for(let i=0; i<additionalQueryResult.contactList.length; i++)
        {
            let objectValue={_id:additionalQueryResult.contactList[i],unreadMessageCount:0};
            ans.set(objectValue._id, objectValue); 
        
        }
    }
    //extract contact array
    let queryResult = await Chat.aggregate([
        // Match documents with Status "unread"
        { $match: { Status: "unread" ,Destination: user} },
        
        // Group by Source (or any contact field you wish)
        {
          $group: {
            _id: "$Source", // Group by the Source field
            unreadMessageCount: { $sum: 1 } // Count messages per group
          }
        },
        
        // Optionally sort by count in descending order
        { $sort: { unreadMessageCount: -1 } }
      ]);


    // Add aggregated results to the Set
    for (const item of queryResult) 
    {
        let objectValue={ _id: item._id, unreadMessageCount: item.unreadMessageCount };
        ans.set(objectValue._id, objectValue); 
    }

    

    // Convert Set back to an Array of objects
    const finalAns = Array.from(ans.values());

    //console.log("Final result:", finalAns);
    res.send(finalAns);
}


export const getMessages=async(req,res)=>
{
    const from=req.query.from;
    const to=req.query.to;
    console.log("from: "+from+ "  to: "+to);
    const queryResult = await Chat.find({
        $or: [
            { Source: from, Destination: to },
            { Source: to, Destination: from }
        ]
    }).sort({ createdAt: 1 }); // Sort by createdAt in ascending order

    //console.log("queryResult: "+queryResult);
    res.send(queryResult);
}


export const updateReadStatus=async(req,res)=>
{
    console.log("welcome to readStatus");
    const user=req.query.contact;
    console.log("user: "+user);
    let queryResult=await Chat.updateMany(
        {Source: user }, 
        {Status:"Unread"},
        { $set: { Status: "read" }
    });
    //console.log("queryResult: "+queryResult);
    
} 
