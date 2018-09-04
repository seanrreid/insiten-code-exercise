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
            <div className="dashboard">
                <header className="header--dashboard">
                    <div className="wrapper">
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
                                <button onClick={this.doClearSort} className="button--clear-filters">Clear Filters</button>
                            </li>
                        </ul>
                        <button className="cta--primary" onClick={this.toggleForm}>
                            New Entry
                            <span className="icon">
                                <svg width="48" height="48" viewBox="0 0 48 48"><path  d="M24 0C10.745 0 0 10.746 0 24c0 13.255 10.745 24 24 24s24-10.744 24-24C48 10.746 37.255 0 24 0zm.029 43.844c-11.023 0-19.959-8.936-19.959-19.958s8.936-19.96 19.959-19.96c11.022 0 19.959 8.936 19.959 19.959s-8.936 19.959-19.959 19.959z"/><path d="M32.56 21.902h-6.458l.008-6.576c-.026-.454-.221-1.354-1.331-1.356l-1.579-.002c-1.181-.001-1.282 1.165-1.288 1.47l-.008 6.463h-6.607c-1.22 0-1.323.941-1.328 1.21v1.809c.006.247.107 1.178 1.328 1.178h6.602l-.008 6.602c-.002 1.219.939 1.324 1.209 1.33l1.809.002c.247-.006 1.178-.107 1.18-1.326l.008-6.607h6.581c.454-.027 1.354-.223 1.354-1.333v-1.578c-.001-1.181-1.167-1.28-1.472-1.286z"/></svg>
                            </span>
                        </button>
                    </div>
                </header>
                <main className="wrapper wrapper--flex">
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
                </main>
            </div>
        );
    }
}

