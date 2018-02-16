import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const DIV = styled.div`
    display: flex;
    justify-content: flex-end;
    color:#f1e8ca;
    font-family:Helvetica,arial,sans-serif;
`
const CheckGroup = styled.div`
    margin-right:1rem;
`;
const Input = styled.input`
    margin-right:1.5rem;
    border-radius:6px;
    
`

class Filter extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {value: 'Search', checked: false}

        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.changeCheckbox = this.changeCheckbox.bind(this);
    }
    render(){
        let {searchedTasks} = this.props;

        return(
            <DIV>
                <CheckGroup>
                    <input type='checkbox' onChange={this.changeCheckbox} name="done" />
                    <label htmlFor="done">Show done</label>
                </CheckGroup>
                <Input type='text' value={this.state.value} onChange={this.changeSearch} onFocus={this.focus} onBlur={this.blur}/><br />
            </DIV>
        )
    }
    focus(e){
        e.target.value = '';
    }
    blur(e){
        this.setState({value: 'Search'});
        this.props.search(this.state.value, this.state.checked);
    }
    changeSearch(e){
        this.setState({value: e.target.value});
        this.props.search(this.state.value, this.state.checked);
    }
    changeCheckbox(){
        this.setState({checked: !this.state.checked});
        this.props.search(this.state.value, this.state.checked);
    }
}

function mapStateToProps(state){
    return {  }
}

function mapDispatchToProps(dispatch){
    return { search: (name, checked) => { dispatch({ type: 'SEARCH_TASK', payload: { name: name, checked: checked }})}}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Filter);