
import startup from '../modal/startup.js'


export const dashboardDetail=async(req,res)=>
{
    const queryResult=await startup.find();
    console.log("welcome to load data");
    res.send(queryResult);
}
