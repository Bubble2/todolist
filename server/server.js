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
        res.json({"success":"success"});
    });
})  

app.delete('/api/:id',(req,res)=>{
    const id = req.params.id;
    todoModel.remove({id:id},(err,result)=>{
        if(err){
            console.log('删除数据失败');
            throw err;
        }
        console.log("数据删除成功",result);
        res.json({"success":"success"});
    });
})

app.put('/api/:id',bodyParser.json(),(req,res)=>{
    const params = req.params;
    const idVal = params.id;

    const body = req.body;
    const isFinishVal = body.isFinish;
    const textVal = body.text;

    let obj = {}
    if(isFinishVal !== undefined){
        Object.assign(obj,{isFinish:isFinishVal})
    } 
    if(textVal !== undefined){
        Object.assign(obj,{text:textVal})
    }

    todoModel.update({id:idVal},{'$set':obj},(err,result)=>{
        if(err){
            console.log('修改数据失败');
            throw err;
        }
        console.log("数据修改成功",result);
        res.json({"success":"success"});
    });
})

const server = app.listen(3000,()=>{
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})