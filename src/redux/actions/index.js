import axios from 'axios';
import {fromJS} from 'immutable';
import * as constants from 'constants/index';

let nextId = 0;

//action
const addTodos = (value) => ({
    type:constants.ADD_TODOS,
    item:fromJS(
        {
            id:nextId++,
            value,
            isFinish:false,
            isDelete:false
        }
    )
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

export {
    addTodos,
    setTodosFinish,
    deleteTodos,
    filterTodos
}