import React, { Component } from 'react'
import _ from 'lodash';

import './addTarget.css';

export default class AddTarget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            info: '',
            status: '',
            contacts: [],
            performance: []
        }
    }


    componentDidMount() {
        const newID = this.props.targetTotal + 100;

        this.setState({
            id: newID,
            name: '',
            info: '',
            status: 'researching',
            contacts: [],
            performance: []
        });
    }

    componentWillUnmount() {
        this.setState({
            id: '',
            name: '',
            info: '',
            status: '',
            contacts: [],
            performance: []
        });
    }

    updateInputValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    updateTextAreaValue = (e) => {
        e.preventDefault();
        this.setState({ info: e.target.value});
    };

    updateDynamicValue = (id, collectionName, e) => {
        e.persist();
        this.setState((prevState) => ({
            [collectionName]: prevState[collectionName].map(item => {
                let name = e.target.name;
                let value = e.target.value;
                if (e.target.name === "revenue") {
                    value = parseInt(e.target.value, 10);
                }
                return item.id !== id ? item : Object.assign({}, item, {
                    [name]: value
                });
            })
        }));
    };

    addRevenueEntry = (collectionName) => {
        this.setState((prevState) => ({
            [collectionName]: prevState[collectionName].concat([{
                id: _.uniqueId(),
                revenue: null,
                month: ''
            }])
        }));
    };

    addContactEntry = (collectionName) => {
        this.setState((prevState) => ({
            [collectionName]: prevState[collectionName].concat([{
                id: _.uniqueId(),
                name: '',
                email: ''
            }])
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addEntryCallback(this.state);
    };

    render() {
        return (
            <div className="editor">
                <h3>Add a New Target</h3>
                <form className="editor__wrapper">
                    <div className="form-group">
                        <label>
                            Name:
                            <input
                                name="name"
                                type="text"
                                className="editor__name"
                                placeholder="Target Name"
                                onChange={this.updateInputValue} />
                        </label>
                    </div>
                    <div className="form-group">
                        <p>Status:</p>
                        <ul className="add-status">
                            <li>
                                <label className="radio-inline">
                                    <input type="radio" name="status" value="researching" checked={this.state.status === 'researching'} onChange={this.updateInputValue} />
                                    Researching
                                </label>
                            </li>
                            <li>
                                <label className="radio-inline">
                                    <input type="radio" name="status" value="pending" checked={this.state.status === 'pending'} onChange={this.updateInputValue} />
                                    Pending
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <p>Contact Information</p>
                        <ul className="contacts">
                            {
                                this.state.contacts.map((item, i) => (
                                    <li className="input-group" key={item.id}>
                                        <label>
                                            Name:
                                            <input name="name"
                                                   type="text"
                                                   placeholder="Contact Name"
                                                   value={item.value}
                                                   onChange={this.updateDynamicValue.bind(this, item.id, 'contacts')}
                                            />
                                        </label>
                                        <label>
                                            Email:
                                            <input name="email"
                                                   type="text"
                                                   placeholder="name@company.com"
                                                   value={item.value}
                                                   onChange={this.updateDynamicValue.bind(this, item.id, 'contacts')}
                                            />
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                        <button type="button"  onClick={this.addContactEntry.bind(this, 'contacts')}>Add Contact</button>
                    </div>
                    <div className="form-group">
                        <p>Monthly Revenue in millions (limit 6 months)</p>
                        <ul className="revenue form-group">
                            {
                                this.state.performance.map((item, i) => (
                                    <li className="input-group" key={item.id}>
                                        <label>
                                            Month Name
                                            <input className="simple-text"
                                                   type="text"
                                                   name="month"
                                                   value={item.value}
                                                   onChange={this.updateDynamicValue.bind(this, item.id, 'performance')}
                                            />
                                        </label>
                                        <label>
                                            Revenue (in millions)
                                            <span className="revenue-amount">
                                                <input className="simple-text"
                                                       type="number"
                                                       name="revenue"
                                                       value={item.value}
                                                       onChange={this.updateDynamicValue.bind(this, item.id, 'performance')}
                                                />
                                            </span>
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                        {this.state.performance.length < 6 &&
                            <button type="button"  onClick={this.addRevenueEntry.bind(this, 'performance')}>Add Revenue</button>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="targetInfo">Information:</label>
                        <textarea
                            id="targetInfo"
                            className="editor__text"
                            value={this.state.info}
                            onChange={this.updateTextAreaValue} />
                    </div>
                    <button className="editor-button__save" type="submit" onClick={(e) => this.handleSubmit(e)}>Save</button>
                </form>
            </div>
        )
    }
}


