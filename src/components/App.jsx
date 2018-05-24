import React from 'react';
import {Row,Col,Button,Input,List,Layout,Radio,Spin} from 'antd';
const {Header,Content,Footer} = Layout;

export default class Hello extends React.Component{
    constructor(props){
        super(props);
        this.addTodosHandle = this.addTodosHandle.bind(this);
        this.setFinishHandle = this.setFinishHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.filterTodosHandle = this.filterTodosHandle.bind(this);
        this.editHandle = this.editHandle.bind(this);
        this.editInpHandle = this.editInpHandle.bind(this);
        this.state = {
            editable:{}
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

    editHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        const id = itemObj.getAttribute('data-id');
        this.setState((prevState)=>{
            return {
                editable:Object.assign({},prevState.editable,{
                    [id]:true
                })
            }
        })
    }

    editInpHandle(e){
        e.stopPropagation();
    }

    componentDidMount(){
        this.props.getTodos();
    }

    render(){
        const {todos} = this.props;
        return (
            <Row>
                <Col span={6} offset={9}>
                    
                    <Layout>
                        <Header style={{color:'#fff',textAlign:'center',fontSize:'20px'}}>Todolist</Header>       
                        <Content>
                            <Input size="large" placeholder="please input ..., then press 'enter' key" onKeyUp={this.addTodosHandle}></Input>
                            <List bordered dataSource={todos} renderItem={(item) => (
                                <List.Item 
                                data-id={item.get('id')}
                                data-isfinish={item.get('isFinish')?1:0}
                                style={item.get('isFinish')?{textDecoration:'line-through'}:{textDecoration:'none'}}
                                onClick={this.setFinishHandle}
                                actions={[
                                <a onClick={this.editHandle} data-id={item.get('id')}>edit</a>,
                                 <a onClick={this.deleteHandle} data-id={item.get('id')}>delete</a>]}>
                                {this.state.editable[item.get('id')]?
                                <Input size="small"
                                 onClick={(e)=>{e.stopPropagation()}}
                                 onChange={this.editInpHandle}
                                  value={item.get('text')}></Input>:item.get('text')}
                                </List.Item>
                            )}/>
                        </Content>
                        <Footer style={{padding:0,background:'#fff'}}>
                            <Radio.Group defaultValue="all" onChange={this.filterTodosHandle}>
                                <Radio.Button value="all">Show All</Radio.Button>
                                <Radio.Button value="finished">Show Finished</Radio.Button>
                                <Radio.Button value="unfinished">Show Unfinished</Radio.Button>
                            </Radio.Group>
                        </Footer>
                    </Layout>
                </Col>
            </Row>
        )
    }
}