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
    }

    addTodosHandle(e){
        if(e.keyCode === 13 ){
            const inpObj = e.currentTarget;
            const value = inpObj.value;
            if(value == "") return;
            this.props.addTodos(value);
            this.props.saveTodos(value);
            inpObj.value = '';
        }
    }

    setFinishHandle(e){
        const itemObj = e.currentTarget;
        this.props.setTodosFinish(itemObj.id);
    }

    deleteHandle(e){
        e.stopPropagation();
        const itemObj = e.currentTarget;
        this.props.deleteTodos(itemObj.id);
    }

    filterTodosHandle(e){
        const value = e.target.value;
        this.props.filterTodos(value);
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
                            <Input size="large" placeholder="please input..." onKeyUp={this.addTodosHandle}></Input>
                            <List bordered dataSource={todos} renderItem={(item) => (
                                <List.Item id={item.get('id')}
                                style={item.get('isFinish')?{textDecoration:'line-through'}:{textDecoration:'none'}}
                                onClick={this.setFinishHandle}
                                actions={[<a>edit</a>, <a onClick={this.deleteHandle} id={item.get('id')}>delete</a>]}
                                >{item.get('text')}</List.Item>
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