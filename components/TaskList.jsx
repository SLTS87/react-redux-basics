import React from 'react';
import styled from 'styled-components';
import Task from './Task.jsx';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

const InputWrap = styled.div`
    margin:0.5rem auto;
    align-items:center;
    text-align:center;
    width:15rem;
    display:flex;
    justify-content:space-around;
`;
const DIV = styled.div`
  overflow-y: scroll;
  width: 55%;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 30px 10px;
`;
const UL = styled.ul`
    list-style-type: none;
`;
const Button = styled.input`
    width: 6rem;
    height:2rem;
    background:#745151;
    border-radius:5px;
    color:#f1e8ca;
    border:0;
    font-size:1rem;
`;
const Input = styled.input`
    width: 8rem;
    height:1.5rem;
    border-radius:5px;
    color: grey;
`;


export class TaskList extends React.Component {
    constructor(props){
        super(props);

        this.state = {value: 'Enter task title', id: 0 }
        this.changeTaskName = this.changeTaskName.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.submit = this.submit.bind(this);
    }

    render() {
        const {categories} = this.props;
        const {catId} = this.props;
        const {searchedTasks} = this.props;

        if(searchedTasks[0] == undefined){
            return(
                <DIV>
                    <InputWrap>
                        <Input type='text' value={this.state.value} onChange={this.changeTaskName} onFocus={this.focus} onBlur={this.blur}/><br />
                        <Button type='button' value='Add' onClick={this.submit}/>
                    </InputWrap>
                    <UL>
                    {
                        categories.map((category) => { if(category.id == catId)
                                                            return category.tasks.map((task) => { 
                                                                return ( <li key={task.id}>
                                                                            <Task catId={catId} task={task}/>
                                                                        </li> )})
                        })
                    }          
                    </UL>
                </DIV>
            )}
            else{
                return(
                    <DIV>
                        <UL>
                        {
                            searchedTasks.map((task) => {
                                return (<li key={task.id}>
                                            <Task task={task}/>
                                        </li>)
                            })
                            
                        }          
                        </UL>
                    </DIV>
                )}
    }
    changeTaskName(e){
        this.setState({value: e.target.value});
    }
    focus(e){
        e.target.value = '';
    }
    blur(e){
        e.target.value = 'Enter task title';
    }
    submit(){
        if(this.state.value == 'Enter task title')
            return;

        this.props.addTask(this.state.value, this.props.catId);
    }
}
const mapStateToProps = (state) => { return { categories: state.categories, state: state, searchedTasks: state.searchedTasks }}

const mapDispatchToProps= (dispatch) => {
    return { addTask: (name, catId) => { dispatch({ type: 'ADD_TASK', payload: { catId: catId, name: name }})}}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);