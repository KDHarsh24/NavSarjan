
const mongoose=require('mongoose');
const notificationSchema=new mongoose.Schema(
    {
        Source:{type:String,required:true},
        Destination:{type:String,required:true},
        Message:{type:String},
        Priority:{type:Number,required:true}
    }
);

const Notification=mongoose.model('Notification',notificationSchema,'Notification');
module.exports=Notification;

