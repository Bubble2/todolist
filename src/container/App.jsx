import {connect} from 'react-redux';
import App from 'components/App';
import {bindActionCreators} from 'redux';
import {
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
} from 'actions/index';

const getFilterTodos = (todos,filter)=>{
    if(filter == 'finished'){
        return todos.filter(x => x.get('isFinish'));
    }else if(filter == 'unfinished'){
        return todos.filter(x => !x.get('isFinish'));
    }else{
        return todos;
    }
}

const mapStateToProps = state => {
    return {
        todos:getFilterTodos(state.get('todos'),state.get('filter'))
    }
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
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
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

