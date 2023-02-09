const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const { response, request } = require("express");
const { json } = require("body-parser");


const app = express()
app.use(express.json())
app.use(cors())
const Schema= mongoose.Schema


const tasksShema= new Schema({
    text:String,
    isCheck:Boolean 
})


const url = "mongodb+srv://qwerty:qwerty1234@cluster0.glzvxo1.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
const Task = mongoose.model("Todos", tasksShema)



// app.get("/", (request, response) => {
//     const task=new Task({
//         text:"first task" ,
//         isCheck: false  
//     })
//     task.save().then((result)=>{
//         response.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })


app.get("/allTasks", (request, response) => {  
    Task.find().then((result)=>{
        response.send({data:result})
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/createTask", (request, response) => {
    console.log(request.body)  
    const task = new Task(request.body)
    console.log(task)
    task.save().then((result)=>{
        
        response.send("Task success")
    }).catch((err)=>{
        console.log(err)
    })
})

app.delete("/deleteFail", (request, response) =>{
    const taskId = request.body.taskId
    Task.deleteOne({_id:taskId}).then((result)=>{
        response.send("Task success")
    }).catch((err)=>{
        console.log(err)
    }) 
})


app.patch("/changFail",(request, response)=>{
    const item = request.body
    Task.updateOne({_id:item._id}, item).then((result1)=>{
        Task.find().then((result)=>{
            // console.log(result)
            response.send(result)})
    }).catch((err)=>{
        console.log(err)
    })
    
})


// app.patch("/changItem",(request, response)=>{
//     const changItem=request.body.changItem 
//     Task.updateOne({_id:changItem}, {text, item }).then((result)=>{
//         response.send("Task success")
//     }).catch((err)=>{
//         console.log(err)
//     })




// save - метод тех данных которые мы хотим сохранить
// find- получить все данные из базы данных (без агрументов)
// create - создать что-то новое в базе данных
// insertMany- создать сразу несколько записей передается массив данных 
// deleteOne- удалить одну запись 
// deleteMany-удалить несколько записей ( массив )
// updateOne- обновить 1 запись



app.listen(8000,()=>{
    console.log("example app listen on port 8000")
})