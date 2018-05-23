import axios from 'axios';
import {fromJS} from 'immutable';
import * as constants from 'constants/index';

//action
const addTodos = (text) => ({
    type:constants.ADD_TODOS,
    item:fromJS(generateTodo(text))
})

const setTodosFinish = (id) =>({
    type:constants.SET_TODOS_FINISH,
    id
})

const deleteTodos = (id) =>({
    type:constants.DELETE_TODOS,
    id
})

const filterTodos = (filter) =>({
    type:constants.FILTER_TODOS,
    filter
})


const renderTodos = (todos) =>({
    type:constants.RENDER_TODOS,
    todos
})


//生成一条数据
const generateTodo = (text) =>(
    {
        id:(new Date()).getTime(),
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
const addTodosSync = (text) => dispatch => {
    const todo = generateTodo(text);
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
const deleteTodosSync = (id) => dispatch => {
    axios.delete('/api/'+id+'/').then((res)=>{
        if(res.data.success == 'success'){
            console.log('删除成功')
        }else{
            console.log(res);
        }
    })
}

export {
    addTodos,
    setTodosFinish,
    deleteTodos,
    filterTodos,
    getTodos,
    addTodosSync,
    deleteTodosSync
}