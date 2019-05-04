import React, {Component} from "react";
import './intem-status-filter.css';

export default class ItemStatusFilter extends Component {

    buttonsList = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];

    render() {
        const buttons = this.buttonsList.map(({name, label}) => {
            const {filter, onFilterChange} = this.props;
            const isActive = filter === name;
            const _class = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button type="button"
                        className={`btn ${_class}`}
                        key={name}
                        onClick={() => {
                            onFilterChange(name)
                        }}>
                    {label}
                </button>
            );
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>);
    }
}

