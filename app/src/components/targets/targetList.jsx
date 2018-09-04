import React, { Component } from 'react'
import Details from "../targetDetails";

import './targetList.css'

export default class TargetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targets: [],
            editStatus: false,
            status: null,
            index: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            targets: nextProps.targets,
            editStatus: nextProps.targets.map((element) => false)
        });
    }

    showInfo = (index) => {
        this.props.toggleInfoCallback(index);
    };

    toggleEdit = (index) => {
        const editState = [...this.state.editStatus];
        editState[index] = !this.state.editStatus[index];

        this.setState({
            editStatus: editState,
            index: index
        });
    };

    updateStatus = (e) => {
        let updatedTargets = [...this.props.targets];
        updatedTargets[this.state.index].status = e.target.value;

        this.setState({
            targets: updatedTargets,
            editStatus: false,
            status: null,
            index: ''
        });
    };

    removeTarget = (index) => {
        this.props.removeTargetCallback(index)
    };


    render() {
        const { showInfo } = this.props;
        const { editStatus, targets } = this.state;

        return (
                <ul className="targets">
                    {targets.length >= 1 && targets.map((target, index) =>
                        <li className={"target " + target.status} key={index}>
                            <ul className="target__actions">
                                <li className="target-action__trigger">
                                    <button onClick={() => this.showInfo(index)}>
                                        <svg width="20" height="20" viewBox="0 0 20 20"><title>Target Info</title><path d="M9 15h2V9H9v6zm1-15C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM9 7h2V5H9v2z"/></svg>
                                    </button>
                                </li>
                                <li className="target-action__trigger">
                                    <button onClick={() => this.toggleEdit(index)}>
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2.453 9.297C1.754 9.996 1 13.703 1 14c0 .521.406 1 1 1 .297 0 4.004-.754 4.703-1.453l5.722-5.722-4.25-4.25-5.722 5.722zM12 1c-.602 0-1.449.199-2.141.891l-.284.284 4.25 4.25.284-.284A3.04 3.04 0 0 0 15 4a3 3 0 0 0-3-3z"/></svg>
                                    </button>
                                </li>
                                <li className="target-action__trigger">
                                    <button className="target-delete__trigger" onClick={() => this.removeTarget(index)}>
                                        <svg viewBox="0 0 40 40"><title>Delete Target</title><path d="M28 40H11.8c-3.3 0-5.9-2.7-5.9-5.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 2.2 1.8 3.9 3.9 3.9H28c2.2 0 3.9-1.8 3.9-3.9V16c0-.6.4-1 1-1s1 .4 1 1v18.1c0 3.2-2.7 5.9-5.9 5.9z"/><path d="M33.3 4.9h-7.6C25.2 2.1 22.8 0 19.9 0s-5.3 2.1-5.8 4.9H6.5C4.2 4.9 2.4 6.7 2.4 9s1.8 4 4.1 4h26.9c2.3 0 4.1-1.8 4.1-4.1s-1.9-4-4.2-4zM19.9 2c1.8 0 3.3 1.2 3.7 2.9h-7.5c.5-1.7 2-2.9 3.8-2.9zm13.4 9H6.5c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1h26.9c1.1 0 2.1.9 2.1 2.1-.1 1.2-1 2.1-2.2 2.1z"/><path d="M12.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z"/><path d="M26.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z"/><path d="M19.9 35.1c-.6 0-1-.4-1-1V17.4c0-.6.4-1 1-1s1 .4 1 1v16.7c0 .5-.5 1-1 1z"/></svg>
                                    </button>
                                </li>
                            </ul>
                            {editStatus[index] === true &&
                                <ul className="edit-status">
                                    <li>
                                        <label className="radio-inline">
                                            <input type="radio" name="status" value="researching" checked={target.status === 'researching'} onChange={this.updateStatus} />
                                            Researching
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radio-inline">
                                            <input type="radio" name="status" value="pending" checked={target.status === 'pending'} onChange={this.updateStatus} />
                                            Pending
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radio-inline">
                                            <input type="radio" name="status" value="approved" checked={target.status === 'approved'} onChange={this.updateStatus} />
                                            Approved
                                        </label>
                                    </li>
                                    <li>
                                        <label className="radio-inline">
                                            <input type="radio" name="status" value="declined" checked={target.status === 'declined'} onChange={this.updateStatus} />
                                            Declined
                                        </label>
                                    </li>
                                </ul>
                            }
                            <Details
                                target={target}
                                showInfo={showInfo[index]}
                            />
                        </li>
                    )}
                </ul>
        )
    }
}


