import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';
import CategoryEdit from './CategoryEdit.jsx';
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
const UL = styled.ul`
    list-style-type: none;
`;
const Button = styled.input`
    width: 40%;
    margin: 0 auto;
`;
const Input = styled.input`
    width: 40%;
    color: grey;
    margin: 0 auto;
`;

class CategoryEditList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const {categories} = this.props;

        return(
            <Div>
                <UL>
                    {categories.map((category) => {
                                    return (<li key={category.id}>
                                                <CategoryEdit category={category}/>
                                            </li>)
                    })}
                </UL>
            </Div>
        )
    }
}
const mapStateToProps = (state) => { return { categories: state.categories }}

export default connect(mapStateToProps)(CategoryEditList);