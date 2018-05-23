const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {userModel} = require('./db');


app.get('/api',(req,res) => {
    userModel.findOne({},(err,doc) => {
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
    const num = body.num;
    userModel.update({id:'1'},{'$set':{num:num}},(err,doc) => {
        if(err){
            console.log('更新数据失败');
            throw err;
        }
        console.log('更新数据成功',doc)
        res.json({'success':'success'});
    })
})

const server = app.listen(3000,()=>{
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})