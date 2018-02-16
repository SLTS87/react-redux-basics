import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    padding: 20px;
    box-sizing: border-box;
`;
const Div2 = styled.div`
    
`;
const Img = styled.img`
    border: 1px solid grey;
    border-radius: 10px;
`;
const Input = styled.input`
    margin-right: 30px;
`;

class Task extends React.Component {
    constructor(props){
        super(props);
        this.state = { done: this.props.task.done}
        this.changeCheckbox = this.changeCheckbox.bind(this);
    }

    render() {

        const {task} = this.props;
        const {catId} = this.props;

        
        if(catId)
            return (
                <Div>
                    <Div2>
                        <Input type='checkbox' checked={this.state.done} onChange={this.changeCheckbox}/>
                        {task.name}
                    </Div2>
                    <Link to={`/edit/cat${catId}/task${task.id}`}>
                        <Img src='../img/edit.png'/>
                    </Link>
                </Div>
            )
        else
            return (
                <Div>
                    <Div2>
                        <Input type='checkbox' checked={this.state.done} onChange={this.changeCheckbox}/>
                        {task.name}
                    </Div2>
                </Div>
            )
    }
    changeCheckbox(){
        this.props.doneTask(!this.state.done, this.props.catId, this.props.task.id);
        
        this.setState({done: !this.state.done});
    }
}
function mapStateToProps(state){
    return { categories: state.categories }
}
function mapDispatchToProps(dispatch){
    return { doneTask: (done, catId, taskId) => { dispatch({ type: 'DONE_TASK', payload: { done: done, catId: catId, taskId: taskId }})}}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Task);