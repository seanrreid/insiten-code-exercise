import React, { Component } from 'react'
import TargetList from '../targets'
import AddTarget from '../addTarget'

import { getTarget } from "../../providers";

import './dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTargets: [],
            filteredTargets: [],
            targetTotal: 0,
            addNew: false,
            showInfo: false
        };
    }

    componentDidMount() {
        getTarget().then((response) => {
            this.processResponse(response);
        });
    }

    processResponse = (response) => {
        const companies = response.companies.sort(this.sortByProperty('id'));

        this.setState({
            allTargets: companies,
            filteredTargets: companies,
            targetTotal: companies.length,
            showInfo: companies.map((element) => false)
        });
    };

    sortByProperty = (property) => {
        return function (x, y) {
            return ((parseInt(x[property], 10) === parseInt(y[property], 10)) ? 0 : ((parseInt(x[property], 10) > parseInt(y[property], 10)) ? -1 : 1));
        };
    };

    doSort = (value) => {
        const targetList = this.state.allTargets;
        const filtered = targetList.filter((target) => {
            return target.status.indexOf(value) > -1;
        });

        this.setState({
            filteredTargets: filtered
        });
    };

    doClearSort = () => {
        this.setState({
            filteredTargets: this.state.allTargets
        })
    };

    doRemoveTarget = (index) => {
        const filteredTargets = this.state.filteredTargets.filter((x,i) => {
            return (i !== index);
        });

        this.setState({
            allTargets: filteredTargets,
            filteredTargets: filteredTargets
        });
    };

    toggleInfo = (index) => {
        const expandedState = [...this.state.showInfo];
        expandedState[index] = !this.state.showInfo[index];

        this.setState({
            showInfo: expandedState
        });
    };

    toggleForm = () => {
        this.setState({
            addNew: !this.state.addNew
        });
    };

    addEntryCallback = (entry) => {
        const newTargets = [entry, ...this.state.allTargets];

        this.setState({
            addNew: !this.state.addNew,
            allTargets: newTargets,
            filteredTargets: newTargets
        })
    };

    render() {
        const { filteredTargets, targetTotal, addNew, showInfo } = this.state;
        return (
            <main className="dashboard">
                <header className="header--dashboard wrapper">
                    <h2 className="title--page">Acquisitions Dashboard</h2>
                    <ul className="sort-list">
                        <li className="researching">
                            <span className="status-indicator"></span><button onClick={() => this.doSort('researching')}>researching</button>
                        </li>
                        <li className="pending">
                            <span className="status-indicator"></span><button onClick={() => this.doSort('pending')}>pending</button>
                        </li>
                        <li className="approved">
                            <span className="status-indicator"></span><button onClick={() => this.doSort('approved')}>approved</button>
                        </li>
                        <li className="declined">
                            <span className="status-indicator"></span><button onClick={() => this.doSort('declined')}>declined</button>
                        </li>
                        <li>
                            <button onClick={this.doClearSort}>Clear Filters</button>
                        </li>
                        <li>
                            <button className="cta--primary" onClick={this.toggleForm}>Add New Target</button>
                        </li>
                    </ul>
                </header>
                <div className="wrapper wrapper--flex">
                    {addNew === true &&
                        <AddTarget
                            targetTotal={targetTotal}
                            addEntryCallback={this.addEntryCallback}
                        />
                    }
                    <TargetList
                        targets={filteredTargets}
                        showInfo={showInfo}
                        toggleInfoCallback={this.toggleInfo}
                        removeTargetCallback={this.doRemoveTarget}
                    />
                </div>
            </main>
        );
    }
}

