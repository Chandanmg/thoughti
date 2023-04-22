var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");


var app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS, SPLICE"
    );
    next();
})

app.use(bodyParser.json());


mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/Thoughti", { useNewUrlParser: true });


const data = {
    "Users": [
        "User-1",
        "User-2",
        "User-3"
    ],
    "Tasks": [
        {
            "Task": "Sample task -1",
            "Expiry_date": "10/21/2022",
            "User": "User-1",
            "Important": true,
            "Created_on": "01/10/2022"
        },
        {
            "Task": "Sample task -2",
            "Expiry_date": "03/03/2022",
            "User": "User-2",
            "Important": false,
            "Created_on": "01/10/2022"
        },
        {
            "Task": "Sample task -3",
            "Expiry_date": "05/30/2022",
            "User": "User-2",
            "Important": true,
            "Created_on": "01/10/2022"
        }
    ]
}


app.get('/thoughti/api/users', (req,res) => {
    const users = data.Users;
    res.json(users);
})

app.get('/thoughti/api/tasks', (req,res) => {
    const tasks = data.Tasks;
    res.json(tasks);
})


app.delete('/thoughti/api/delete/:id', (req, res) => {
    const taskId = req.params.id;
    data.Tasks = data.Tasks.filter(task => task.Task !== taskId);
    res.status(200).json({
      message: `Task '${taskId}' successfully deleted.`,
      data: data.Tasks
    });
});


app.post('/thoughti/api/tasks', (req, res) => {
    const newTask = req.body;
    data.Tasks.push(newTask);
    res.status(200).json(data);
});


app.listen(3000, ()=>{
    console.log("server running at : 3000")
});