import React from 'react';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Form = styled.form`
  width: 60%;
  list-style-type: none;
  padding: 0;
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
`;
const Item = styled.input`
    background: ${props => props.select ? 'grey' : 'white'};
`;


class EditTask extends React.Component {
    constructor(props){
        super(props);
        this.currentTask = this.props.categories.find((category) => { return category.id == this.props.catId }).tasks.find((task) => { return task.id == this.props.taskId }),
        
        this.state = {
            name: this.currentTask.name,
            description: this.currentTask.description,
            done: this.currentTask.done
        }

        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.submit = this.submit.bind(this);
    }

    render() {
        const { catId } = this.props;

        return(
                <Form>
                    <Link to={`/categories/${catId}`}><input type='button' value='Save changes' onClick={this.submit}/></Link>
                    <Link to={`/categories/${catId}`}><input type='button' value='Cancel'/></Link>
                    <input type='checkbox' checked={this.state.done} onChange={this.changeCheckbox}/> Done
                    <input type='text' name='name' onChange={this.changeName} value={this.state.name}/>
                    <textarea rows='10' columns='100' type='button' name='description' onChange={this.changeDescription} value={this.state.description}/>
                </Form>
        )
    }
    changeName(e){
        this.setState({name: e.target.value});
    }
    changeDescription(e){
        this.setState({description: e.target.value});
    }
    changeCheckbox(e){
        if(this.state.done)
            this.setState({done: false});
        else
            this.setState({done: true});
    }
    submit(e){
        this.props.changeTask(this.state, this.props.catId, this.props.taskId);
    }
}

function mapStateToProps(state){
    return { categories: state.categories }
}

function mapDispatchToProps(dispatch){
    return { changeTask: (state, catId, taskId) => { dispatch({ type: 'CHANGE_TASK', payload: { catId: catId, task: {name: state.name, description: state.description, done: state.done, id: taskId }}})}}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);