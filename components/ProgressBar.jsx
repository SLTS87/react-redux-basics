import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { v4 } from 'uuid';


const DIV = styled.div`

`;
const Progress = styled.progress`
    width: 80%;
    height:8px;
    align-self:center;
    margin:0 auto;
    display:block;
    margin-top:2rem;
`;

class ProgressBar extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <DIV>
                <Progress max={this.props.state.totalTasks} value={this.props.state.executedTasks}></Progress>
            </DIV>)
    }
}

function mapStateToProps (state) { return { state: state /*totalTasks: state.totalTasks, executedTasks: state.executedTasks */}}

export default connect(mapStateToProps)(ProgressBar);
