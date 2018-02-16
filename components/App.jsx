import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import TaskList from './TaskList.jsx';
import CategoryList from './CategoryList.jsx';
import CategoryEditList from './CategoryEditList.jsx';
import EditTask from './EditTask.jsx';
import Filter from './Filter.jsx';
import ProgressBar from './ProgressBar.jsx';
import { List } from './CategoryList.jsx';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

let body = document.querySelector("body");
body.style.background = "#dd855c";
body.style.margin = 0;

const DIV = styled.div`

`;
const DIV2 = styled.div`
display: flex;
margin: 0 auto;
justify-content: space-between;
width:60rem;
background:		#9ebd9e;
height:430px;
`;
const Header = styled.header`
  display:flex;
  flex-direction:column;
  height:200px;
  background:	#745151;
  margin:auto;
  width:60rem;

`;
const Logo = styled.div`
  font-size:4rem;
  color: #f1e8ca;
  margin-top:1rem;
  margin-bottom:1rem;
  text-align:center;
  font-family:Helvetica,arial,sans-serif;
`;

class App extends React.Component {
        constructor(props){
          super(props);
      
        }
        render() {
          return (
              <Switch>
                <Route path="/" exact render={(props) => {
                    return(
                      <DIV>
                        <Header>
                          <Logo>To-Do List</Logo>
                          <Filter />
                          <ProgressBar />
                        </Header>
                        <DIV2>
                          <CategoryList />
                          <TaskList />
                        </DIV2>
                      </DIV>
                    )
                }}/>

                <Route path="/categories/:id" render={(props) => {
                  const catId = props.match.params.id;
                  this.catId = catId;
                    return(
                      <DIV>
                        <Header>
                          <Logo>To-Do List</Logo>
                          <Filter />
                          <ProgressBar />
                        </Header>
                        <DIV2>
                          <CategoryList id={catId} /> 
                          <TaskList catId={catId} />
                        </DIV2>
                      </DIV>
                    )
                }}/>

                <Route path="/edit/cat:catId/task:taskId" render={(props) => {
                  const catId = props.match.params.catId;
                  const taskId = props.match.params.taskId;
                  return(
                    <DIV>
                      <DIV2>
                        <CategoryEditList />
                        <EditTask catId={this.catId} taskId={taskId}/>
                      </DIV2>
                    </DIV>
                  )
                }}/>
              </Switch>
          )
        }
}
function mapStateToProps (state) { return { searchedTasks: state.searchedTasks }}

export default connect(mapStateToProps)(App);
