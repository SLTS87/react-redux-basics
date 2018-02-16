import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Category from './Category.jsx';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import {TaskList} from './TaskList.jsx';

export const Div = styled.div`
  overflow-y: scroll;
  width: 40%;
  padding-right: 10px;
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
`;
const InputWrap = styled.div`
    margin:0.5rem auto;
    align-items:center;
    text-align:center;
    width:15rem;
    display:flex;
    justify-content:space-around;
`;
const UL = styled.ul`
    padding-left:0.5rem;
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

class CategoryList extends React.Component {
    constructor(props){
        super(props);

        this.state = {value: 'Enter category title'}
        this.changeCatName = this.changeCatName.bind(this);
        this.changeCatNameLive = this.changeCatNameLive.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }

    render() {
        const {categories} = this.props;

        return(
            <Div>
                <InputWrap>
                    <Input type='text' value={this.state.value} onChange={this.changeCatNameLive} onFocus={this.focus} onBlur={this.blur}/><br />
                    <Button type='button' value='Add' onClick={this.submit}/>
                </InputWrap>
                <UL>
                    {categories.map((category) => {
                                if(category.id == this.props.id)
                                    return (<li key={category.id}>
                                            <Category selected changeCatName={this.changeCatName} delete={this.delete} category={category}/>
                                            </li>)
                            
                                else
                                    return (<li key={category.id}>
                                            <Category changeCatName={this.changeCatName} delete={this.delete} category={category}/>
                                            </li>)
                            })}
                </UL>
            </Div>
        )
    }
    changeCatName(catId, name){
        this.props.changeName(catId, name);
    }
    focus(e){
        e.target.value = '';
    }
    blur(e){
        e.target.value = 'Enter category title';
    }
    changeCatNameLive(e){
        this.setState({value: e.target.value});
    }
    submit(){
        if(this.state.value == 'Enter category title')
            return;
        this.props.addCat(this.state.value);
    }
    delete(catId){
        this.props.delCat(catId);
    }
}
const mapStateToProps = (state) => { return { categories: state.categories, name: [...state.categories] }}

const mapDispatchToProps= (dispatch) => {
    return { 
        addCat: (name) => { dispatch({ type: 'ADD_CAT', payload: { name: name }})},
        delCat: (catId) => { dispatch({ type: 'DEL_CAT', payload: { catId: catId }})},
        changeName: (catId, name) => { dispatch({ type: 'CHANGE_CAT_NAME', payload: { catId: catId, name: name}})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
