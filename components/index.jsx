import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.jsx';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {v4} from 'uuid';

let initState = {
    categories: [
        { name: "housework", id: v4(), tasks: [{name: "to wash the dishes", description: "very clean", done: false, id: v4()}, {name: "walk with dog", description: "about 1 hour", done: false, id: v4()}, {name: "wash the clothes", description: "t-shirts and pants", done: false, id: v4()}]},
        { name: "repeat lessons", id: v4(), tasks: [{name: "core js", description: "es6, arrow-functions, inheritance", done: false, id: v4()}, {name: "react", description: "life cycle hooks, props and state, react router", done: false, id: v4()}, {name: "redux", description: "provider, connect, reducers, actions", done: false, id: v4()}]}
    ], totalTasks: 6, executedTasks: 0, searchedTasks: [] };

const store = createStore(reducer, initState);

function reducer(state, action){
        switch(action.type){
                case 'ADD_TASK': {
                        const newState = Object.assign({}, state);
                        const currentCat = newState.categories.find((category) => { return category.id == action.payload.catId });
                        currentCat.tasks.push({ name: action.payload.name, description: 'This is default description', done: false, id: v4() });
                        newState.totalTasks ++;
                        return newState;
                }       
                case 'CHANGE_TASK': {
                        const newState = Object.assign({}, state);
                        const currentTask = newState.categories.find((category) => { return category.id == action.payload.catId }).tasks.
                                find((task) => { return task.id == action.payload.task.id });
                        currentTask.name = action.payload.task.name;
                        currentTask.description = action.payload.task.description;
                        currentTask.done = action.payload.task.done;
                        if(action.payload.task.done)
                                newState.executedTasks ++;
                        else
                                newState.executedTasks --;
                        return newState;
                }
                case 'DONE_TASK': {
                        const newState = Object.assign({}, state);
                        const currentTask = newState.categories.find((category) => { return category.id == action.payload.catId }).tasks.
                                find((task) => { return task.id == action.payload.taskId });
                        currentTask.done = action.payload.done;
                        if(action.payload.done)
                                newState.executedTasks ++;
                        else
                                newState.executedTasks --;
                        return newState;
                }

                case 'ADD_CAT': {
                        const newState = Object.assign({}, state);
                        newState.categories.push({ name: action.payload.name, id: v4(), tasks: [] });
                        return newState;
                }
                case 'DEL_CAT': {
                        const newState = Object.assign({}, state);
                        const index = newState.categories.findIndex((category) => { return category.id == action.payload.catId });
                        newState.categories.splice(index, 1);
                        return newState;
                }
                case 'CHANGE_CAT_NAME': {
                        const newState = Object.assign({}, state);
                        const currentCat = newState.categories.find((category) => { return category.id == action.payload.catId });
                        currentCat.name = action.payload.name;
                        return newState;
                }
                case 'SEARCH_TASK': {
                        let tasks = [];
                        if(action.payload.name == 'Search' || action.payload.name == ''){
                            return { ...state, searchedTasks: tasks};
                        }
                        if(!action.payload.checked){
                                for(let i = 0; i < state.categories.length; i++){
                                        for(let j = 0; j < state.categories[i].tasks.length; j++)
                                        {
                                                if(state.categories[i].tasks[j].name.indexOf(action.payload.name) != -1){
                                                        tasks.push(state.categories[i].tasks[j]);
                                                }
                                        }
                                }
                        }
                        else{
                                for(let i = 0; i < state.categories.length; i++){
                                        for(let j = 0; j < state.categories[i].tasks.length; j++)
                                        {
                                                if(state.categories[i].tasks[j].name.indexOf(action.payload.name) != -1 && state.categories[i].tasks[j].done == true){
                                                        tasks.push(state.categories[i].tasks[j]);
                                                }
                                        }
                                }
                        }
                        return { ...state, searchedTasks: tasks};       
                }

                default: return state;
        }
}

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
                        <BrowserRouter>
                                <Route component={App} />
                        </BrowserRouter>
                </Provider>,
MOUNT_NODE);








