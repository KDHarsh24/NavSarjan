import Notification from '../modals/notificationModal.js';
import { query } from 'express';

export const getNotifications=async(req,res)=>
{
    const user=req.query.user;
    console.log("user: "+user);

    const queryResult=await Notification.find({Destination:user}).sort({Priority:-1});
    console.log("queryResult.data: "+queryResult);
    res.send(queryResult);
}



export const removeNotification=async(req,res)=>
{
    let source=req.query.source;
    let priority=req.query.priority;
    let destination=req.query.user;
    console.log(source+" "+priority+" "+destination);
    let queryResult=await Notification.deleteOne({Source:source,Priority:priority,Destination:destination});
    res.send(queryResult);
}
