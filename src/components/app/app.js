import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ToDoList from '../to-do-list';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            {id: 1, label: 'Drink coffe', important: false},
            {id: 2, label: 'Make Awesome App', important: true,},
            {id: 3, label: 'Have a lunch', important: true,}
        ]
    };

    deletedItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            return {
                todoData: [...before, ...after]
            }
        });
    };


    addItem = (text) => {
       const newItem = {
           label: text,
           important: false,
           id: this.maxId++
       };
       this.setState( ({todoData}) => {
           const newArray = [
               ...todoData,
               newItem
           ];

           return {
               todoData: newArray
           }
       });
    };

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <ToDoList todos={this.state.todoData} onDeleted={this.deletedItem}/>
                <ItemAddForm onItemAdded={this.addItem}/>

            </div>
        );
    }
};