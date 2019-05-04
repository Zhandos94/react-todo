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
            this.createItem('Drink coffee'),
            this.createItem('Make Awesome App'),
            this.createItem('Have a lunch'),
        ],
        term: '',
        filter: 'all'
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    filter = (items, filter) => {
        switch (filter) {
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    onFilterChange = (filter) => {
        console.log(filter);
        this.setState({
            filter
        });
    };

    onSearchChange = (term) => {
        this.setState({
            term
        });
    };

    createItem(label) {
        return {
            id: this.maxId++,
            label: label,
            important: false,
        }
    }

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
        const newItem = this.createItem(text);

        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        });
    };

    toggleProperty(array, id, propName) {
        const idx = array.findIndex((el) => el.id === id);
        const oldItem = array[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...array.slice(0, idx),
            newItem,
            ...array.slice(idx + 1),
        ];
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        });
    };

    render() {
        const {todoData, term, filter} = this.state;
        const visibleItem = this.filter(this.search(todoData, term), filter);
        const doneCount = this.state.todoData.filter((el => el.done === true)).length;
        const todo = this.state.todoData.length - doneCount;

        return (
            <div className="todo-app">

                <AppHeader toDo={todo} done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>

                <ToDoList todos={visibleItem} onDeleted={this.deletedItem} onToggleDone={this.onToggleDone}
                          onToggleImportant={this.onToggleImportant}/>
                <ItemAddForm onItemAdded={this.addItem}/>

            </div>
        );
    }
}
;