
const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema(
    {
        userName:{type:String,required:true},
        contactList:[String]
    }
);

const Contact=mongoose.model('Contact',contactSchema,'Contact');
module.exports=Contact;

