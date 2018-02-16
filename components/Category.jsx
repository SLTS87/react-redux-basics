import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
font-size:1rem;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 40px;
border-radius:5px;
padding: 3px;
margin-bottom:0.5rem;
background: ${props => props.select ? '#dd855c' : '#f1e8ca'};
`;
const Div2 = styled.div`

`;
const Img = styled.img`
    border: 1px solid grey;
    border-radius: 10px;
    margin: 0 5px;
`;


export default class Category extends React.Component {
    constructor(props){
        super(props);

        this.delete = this.delete.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    render() {
        const {category} = this.props;
        const {categories} = this.props;
        const {selected} = this.props;
        const {changeState} = this.props;

        if(selected)
            return (
                <Div select>
                    <Div2>
                      <Link to={`/categories/${category.id}`}>
                        {category.name}
                      </Link>
                      <Img src="../img/edit.png" onClick={this.changeName}/>
                    </Div2>
                    <Div2>
                        <Img src="../img/basket.png" onClick={this.delete} />
                    </Div2>
                </Div>
            );
        else 
        return (
            <Div>
                <Div2>
                  <Link to={`/categories/${category.id}`}>
                    {category.name}
                  </Link>
                  <Img src="../img/edit.png" onClick={this.changeName}/>
                </Div2>
                <Div2>
                    <Img src="../img/basket.png" onClick={this.delete} />
                </Div2>
            </Div>
        );
    }
    delete(){
        this.props.delete(this.props.category.id);
    }
    changeName(){
        const name = prompt("Enter new category name");
        this.props.changeCatName(this.props.category.id, name);
    }
}






