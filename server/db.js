const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/count');

mongoose.connection.on('connected',()=>{
    console.log('mongo connect success');
})

let schema = new mongoose.Schema({
    id:Number,
    num:Number,
},{
    versionKey:false
});

const userModel = mongoose.model('count',schema);

// const userList = [
//     {id:0,nickname:"pwl",mobile:"15556930270",password:"123456"},
//     {id:1,nickname:"ws",mobile:"15556931933",password:"123456"},
//     {id:2,nickname:"yl",mobile:"15556930268",password:"123456"}
// ]

// userModel.create({id:1,num:2},(err,doc) => {
//     if(err){
//         console.log('新增数据失败');
//         throw err;
//     }
//     console.log('新增数据成功',doc);
// })

// userModel.insert({id:4,nickname:"dongdong",mobile:"15556930270",password:"123456"},(err,doc) => {
//     if(err){
//         console.log('新增数据失败');
//         throw err;
//     }
//     console.log('新增数据成功');
// })

// userModel.insertMany(userList,(err,result)=>{
//     if(err){
//         console.log('添加数据失败');
//         throw err;
//     }
//     console.log("数据添加成功",result);
// });

// userModel.remove({},(err,doc)=>{
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
    userModel: userModel
}

