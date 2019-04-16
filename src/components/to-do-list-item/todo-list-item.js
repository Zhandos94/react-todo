import React, {Component} from "react";
import './todo-list-item.css'

export default class ToDoListItem extends Component {

    constructor() {
        super();

        this.state = {done: false}
    }

    onLabelClick = () => {
        this.setState((state) => {
                return {
                    done: !state.done
                }
            }
        );
    };

    render() {
        const {label, important = false} = this.props;
        const {done} = this.state;

        let classNames = 'todo-list-item';
        if (done) classNames += ' done';

        const style = {
            color: important ? 'steelblue' : 'black',
            fontWeight: important ? 'bold' : 'normal'
        };

        return (
            <div className={classNames}>
                <span className="todo-list-name"
                      style={style}
                      onClick={this.onLabelClick}>
                    {label}
                </span>

                <button type="button"
                        className="btn btn-outline-success btn-sm float-right">
                    <i className="fa fa-exclamation"/>
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right">
                    <i className="fa fa-trash-o"/>
                </button>
            </div>
        );
    }
}