import axios from 'axios';
import {fromJS} from 'immutable';
import * as constants from 'constants/index';

let nextId = 0;

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

const generateTodo = (text) =>(
    {
        id:nextId++,
        text,
        isFinish:false,
        isDelete:false
    }
)

const getTodos = () => dispatch => {
    axios.get('/api').then((res)=>{
        const data = res.data;
        if(data.length > 0){
            dispatch(renderTodos(fromJS(data)));
        }
    })
}

const saveTodos = (text) => dispatch => {
    const todo = generateTodo(text);
    axios.post('/api',{
        todo
    }).then((res)=>{
        if(res.data.success == 'success'){
            alert('提交成功')
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
    saveTodos
}