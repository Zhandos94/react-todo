import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ToDoList from '../to-do-list';
import './app.css';

const App = () => {
    const todoData = [
        {id: 1, label: 'Drink coffe', important: false},
        {id: 2, label: 'Make Awesome App', important: true,},
        {id: 3, label: 'Have a lunch', important: true,}
    ];

    return (
        <div className="todo-app">
            <AppHeader toDo={1} done={3}/>
            <div className="top-panel d-flex">
                <SearchPanel/>
                <ItemStatusFilter/>
            </div>

            <ToDoList todos={todoData}/>

        </div>
    );
};

export default App;