import axios from 'axios';
import {fromJS} from 'immutable';
import * as constants from 'constants/index';

//action
const addTodos = (id,text) => ({
    type:constants.ADD_TODOS,
    item:fromJS(generateTodo(id,text))
})

const updateTodos = (id,text) => ({
    type:constants.UPDATE_TODOS,
    id,
    text
})

const setTodosFinish = id =>({
    type:constants.SET_TODOS_FINISH,
    id
})

const deleteTodos = id =>({
    type:constants.DELETE_TODOS,
    id
})

const filterTodos = filter =>({
    type:constants.FILTER_TODOS,
    filter
})


const renderTodos = todos =>({
    type:constants.RENDER_TODOS,
    todos
})


//生成一条数据
const generateTodo = (id,text) =>(
    {
        id,
        text,
        isFinish:false,
        isDelete:false
    }
)

//初始化获取数据
const getTodos = () => dispatch => {
    axios.get('/api').then((res)=>{
        const data = res.data;
        if(data.length > 0){
            dispatch(renderTodos(fromJS(data)));
        }
    })
}

//新增一条保存数据
const addTodosSync = (id,text) => dispatch => {
    const todo = generateTodo(id,text);
    axios.post('/api',{
        todo
    }).then((res)=>{
        if(res.data.success == 'success'){
            console.log('提交成功')
        }else{
            console.log(res);
        }
    })
}

//删除一条数据
const deleteTodosSync = id => dispatch => {
    axios.delete('/api/'+parseInt(id)+'/').then((res)=>{
        if(res.data.success == 'success'){
            console.log('删除成功')
        }else{
            console.log(res);
        }
    })
}

//设置完成状态
const setTodosFinishSync = (id,isFinish) => dispatch => {
    axios.put('/api/'+parseInt(id)+'/',{
        isFinish:!isFinish
    }).then((res)=>{
        if(res.data.success == 'success'){
            console.log('设置完成状态成功')
        }else{
            console.log(res);
        }
    })
}

//修改文本
const updateTodosSync = (id,text) => dispatch => {
    axios.put('/api/'+parseInt(id)+'/',{
        text
    }).then((res)=>{
        if(res.data.success == 'success'){
            console.log('修改文本成功')
        }else{
            console.log(res);
        }
    })
}

export {
    addTodos,
    updateTodos,
    setTodosFinish,
    deleteTodos,
    filterTodos,
    getTodos,
    addTodosSync,
    deleteTodosSync,
    setTodosFinishSync,
    updateTodosSync
}