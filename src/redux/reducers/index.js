import {combineReducers} from 'redux-immutable';
import {fromJS} from 'immutable';
import * as constants from 'constants/index';

//reducer
const todos = (state = fromJS([]), action) => {
    switch(action.type){
        case constants.ADD_TODOS:
            return state.push(action.item);
        case constants.SET_TODOS_FINISH:
            return state.map(todo => todo.get('id')==action.id?todo.set('isFinish',!todo.get('isFinish')):todo);
        case constants.DELETE_TODOS:
            return state.filter(todo => !(action.id == todo.get('id')));  
        default:
            return state;
    }
}

const filter = (state = "all" , action) => {
    switch(action.type){
        case constants.FILTER_TODOS:
            return action.filter;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    todos,
    filter
})

export default rootReducer;