import React from 'react';
import {Row,Col,Button,Input,List,Layout,Radio,Spin} from 'antd';
const {Header,Content,Footer} = Layout;

export default class Todolist extends React.Component{
    constructor(props){
        super(props);
        this.addTodosHandle = this.addTodosHandle.bind(this);
        this.setFinishHandle = this.setFinishHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.filterTodosHandle = this.filterTodosHandle.bind(this);
        this.editToggleHandle = this.editToggleHandle.bind(this);
        this.editInpHandle = this.editInpHandle.bind(this);
        this.editSaveHandle = this.editSaveHandle.bind(this);
        this.editCancelHandle = this.editCancelHandle.bind(this);
        this.state = {
            editable:{},
            text:{}
        }
    }

    addTodosHandle(e){
        if(e.keyCode === 13 ){
            const inpObj = e.currentTarget;
            const value = inpObj.value;
            if(value == "") return;
            const id = (new Date()).getTime();
            this.props.addTodos(id,value);
            this.props.addTodosSync(id,value);
            inpObj.value = '';
        }
    }

    setFinishHandle(e){
        const itemObj = e.currentTarget;
        const id = itemObj.getAttribute('data-id');
        const isFinish = itemObj.getAttribute('data-isfinish');
        this.props.setTodosFinish(id);
        this.props.setTodosFinishSync(id,isFinish==="1"?true:false);
    }

    deleteHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        const id = itemObj.getAttribute('data-id');
        this.props.deleteTodos(id);
        this.props.deleteTodosSync(id);
    }

    filterTodosHandle(e){
        const value = e.target.value;
        this.props.filterTodos(value);
    }

    editToggleHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        const id = itemObj.getAttribute('data-id');
        this.setState((prevState)=>{
            return {
                editable:Object.assign({},prevState.editable,{
                    [id]:!prevState.editable[id]
                })
            }
        })
    }

    editCancelHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        const text = itemObj.getAttribute('data-text');
        const id = itemObj.getAttribute('data-id');
        this.setState((prevState)=>{
            return {
                text:Object.assign({},prevState.text,{
                    [`${id}text`]:text
                })
            }
        })
        this.editToggleHandle(e);
    }

    editInpHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        const text = itemObj.value;
        const id = itemObj.getAttribute('data-id');
        this.setState((prevState)=>{
            return {
                text:Object.assign({},prevState.text,{
                    [id+'text']:text
                })
            }
        })
    }

    editSaveHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        const id = itemObj.getAttribute('data-id');
        const text = this.state.text[id+'text'];
        if(text){
            this.props.updateTodos(id,text);
            this.props.updateTodosSync(id,text);
        }
        this.editToggleHandle(e);
    }

    componentDidMount(){
        this.props.getTodos();
    }

    render(){
        const {todos} = this.props;
        return (
            <Row>
                <Col span={6} offset={9}>
                    
                        <Header style={{color:'#fff',textAlign:'center',fontSize:'20px'}}>Todolist</Header>       
                        <Content style={{marginTop:'10px'}}>
                            <Input size="large" placeholder="please input ..., then press 'enter' key" onKeyUp={this.addTodosHandle}></Input>
                            <div style={{marginTop:'10px',background:'#f0f2f5'}}>
                                <List bordered dataSource={todos} renderItem={(item) => (
                                    <List.Item 
                                    actions={
                                    this.state.editable[item.get('id')]?
                                    [<a onClick={this.editSaveHandle} data-id={item.get('id')}>save</a>,
                                    <a onClick={this.editCancelHandle} data-id={item.get('id')} data-text={item.get('text')}>cancel</a>]:
                                    [<a onClick={this.editToggleHandle} data-id={item.get('id')}>edit</a>,
                                    <a onClick={this.deleteHandle} data-id={item.get('id')}>delete</a>]}>
                                    {this.state.editable[item.get('id')]?
                                    <Input
                                    data-id={item.get('id')}
                                    onClick={(e)=>{e.stopPropagation()}}
                                    onChange={this.editInpHandle}
                                    value={this.state.text[`${item.get('id')}text`]?this.state.text[`${item.get('id')}text`]:item.get('text')}></Input>:
                                    <div 
                                    data-id={item.get('id')}
                                    data-isfinish={item.get('isFinish')?1:0}
                                    onClick={this.setFinishHandle}
                                    style={Object.assign({width:'100%'},item.get('isFinish')?{textDecoration:'line-through'}:{textDecoration:'none'})}>{item.get('text')}</div>}
                                    </List.Item>
                                )}/>
                            </div>
                        </Content>
                        <Footer style={{marginTop:'10px',padding:0,background:'#fff'}}>
                            <Radio.Group defaultValue="all" onChange={this.filterTodosHandle}>
                                <Radio.Button value="all">Show All</Radio.Button>
                                <Radio.Button value="finished">Show Finished</Radio.Button>
                                <Radio.Button value="unfinished">Show Unfinished</Radio.Button>
                            </Radio.Group>
                        </Footer>
                    
                </Col>
            </Row>
        )
    }
}