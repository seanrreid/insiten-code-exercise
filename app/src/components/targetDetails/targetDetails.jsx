import React, { Component } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import './targetDetails.css'

const ContactBlock = (data) => {
    return(
        <li className="contact">
            <a href={'mailto:'+ data.contact.email}>{data.contact.name}</a>
        </li>
    )
};

const CustomTooltip  = () => ({
    render() {
        const { active } = this.props;
        if (active) {
            const { payload, label } = this.props;
            return (
                <div className="custom-tooltip">
                    <span className="label">{`${label} : $${payload[0].value} Million`}</span>
                </div>
            );
        }
        return null;
    }
});

export default class Details extends Component {
    render() {
        const { target, showInfo } = this.props;
        return (
            <div className="target-details">
                <div className="target__header">
                    <h2 className="target__name">{target.name}</h2>
                </div>

                {showInfo === false &&
                    <div className="target__body">
                        {target.contacts.length >= 1 &&
                        <ul className="contacts">
                            <li className="contact"><strong>Primary Contact</strong></li>
                            {target.contacts.map((contact, index) =>
                                <ContactBlock contact={contact} key={index}/>
                            )}
                        </ul>
                        }
                        <h3>Recent Performance</h3>
                        <div className="revenue-graph">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={target.performance}>
                                    <Line type="monotone" dataKey="revenue" stroke="#A60014" />
                                    <XAxis dataKey="month" />
                                    <YAxis dataKey="revenue" label={{ value: 'revenue (in millions)', angle: -90, position: 'insideBottomLeft' }}/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip content={<CustomTooltip/>}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                }
                {showInfo === true &&
                    <div className="target__body">
                        <p>{target.info}</p>
                    </div>
                }
            </div>
        );
    }
}

