const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title : {
        type : String ,
        required: true ,  
        trim : true , 
        maxLength : 20 , 
    } , 
    desc : {
        type : String , 
        trim : true , 
        maxLength : 400 , 
    } , 
    completed : {
        type : Boolean , 
        default : false , 
    }
})

module.exports = mongoose.model("Tasks" , TaskSchema); 