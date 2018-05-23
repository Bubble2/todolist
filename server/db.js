const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoList');

mongoose.connection.on('connected',()=>{
    console.log('mongo connect success');
})

let schema = new mongoose.Schema({
    id:Number,
    text:String,
    isFinish:Boolean,
    isDelete:Boolean
},{
    versionKey:false
});

const todoModel = mongoose.model('todos',schema);

const todos = [
    {id:0,text:"吃饭",isFinish:false,isDelete:false},
    {id:1,text:"睡觉",isFinish:false,isDelete:false},
    {id:2,text:"敲代码",isFinish:false,isDelete:false}
]

// userModel.create({id:1,num:2},(err,doc) => {
//     if(err){
//         console.log('新增数据失败');
//         throw err;
//     }
//     console.log('新增数据成功',doc);
// })

// todoModel.create({ id: 1, text: '111', isFinish: false, isDelete: false },(err,doc) => {
//     if(err){
//         console.log('新增数据失败');
//         throw err;
//     }
//     console.log('新增数据成功');
// })

// todoModel.insertMany(todos,(err,result)=>{
//     if(err){
//         console.log('添加数据失败');
//         throw err;
//     }
//     console.log("数据添加成功",result);
// });

// todoModel.remove({},(err,doc)=>{
//     if(err){
//         console.log('删除数据失败');
//         throw err;
//     }
//     console.log('数据删除成功',doc)
// })

// userModel.update({id:'1'},{'$set':{num:'101'}},(err,doc) => {
//     if(err){
//         console.log('更新数据失败');
//         throw err;
//     }
//     console.log('更新数据成功',doc)
// })

module.exports = {
    todoModel: todoModel
}

