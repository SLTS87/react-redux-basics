import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 1px solid black;
    padding: 3px;
    background: ${props => props.select ? 'grey' : 'white'};
`;
const Div2 = styled.div`

`;
const Img = styled.img`
    border: 1px solid grey;
    border-radius: 10px;
    margin: 0 5px;
`;

export default class CategoryEdit extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const { category } = this.props;
        return (
            <Div>
                <Div2>
                  <Link to={`/categories/${category.id}`}>
                    {category.name}
                  </Link>
                </Div2>
                <Div2>
                  <Img src="../../img/choose.png" />
                </Div2>
            </Div>
        );
    }
}