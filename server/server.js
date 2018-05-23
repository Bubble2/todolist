const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {todoModel} = require('./db');


app.get('/api',(req,res) => {
    todoModel.find({},(err,doc) => {
        if(err){
            console.log('查找数据失败');
            throw err;
        }
        res.json(doc) 
    })
});

// app.get('/data',(req,res) => {
//     userModel.find({},(err,doc)=>{
//         res.json(doc);
//     })
// })

app.post('/api',bodyParser.json(), (req,res)=>{
    const body = req.body;
    const todo = body.todo;
    console.log(todo)
    todoModel.create(todo,(err,result)=>{
        if(err){
            console.log('添加数据失败');
            throw err;
        }
        console.log("数据添加成功",result);
    });
})

const server = app.listen(3000,()=>{
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})