import {connect} from 'react-redux';
import App from 'components/App';
import {bindActionCreators} from 'redux';
import {addTodos,setTodosFinish,deleteTodos,filterTodos} from 'actions/index';

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
        setTodosFinish,
        deleteTodos,
        filterTodos
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

