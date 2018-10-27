import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import moment from 'moment';

class TemperaturesTable extends Component {
    constructor(props) {
        super(props);

        this.formatWhen = this.formatWhen.bind(this);
    }

    formatWhen(when) {
        let momentWhen = moment(when);
        return momentWhen.format("D MMM YYYY h:mm:A") + ", " + momentWhen.fromNow();
    }

    render() {
        return this.props.temperatures.length > 0
            ?
            <Table striped hover size="sm" className="temperatures-table">
                <thead>
                    <tr>
                        <th>Date &amp; Time</th>
                        <th>Value (°C)</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.temperatures.map(t => <tr key={t.id}>
                        <td>{this.formatWhen(t.when)}</td>
                        <td>{t.valueInCelsius}</td>
                        <td>{t.notes}</td>
                    </tr>)}
                </tbody>
            </Table>
            : <p>No temperatures found for this date range.</p>;
    }

}

TemperaturesTable.propTypes = {
    temperatures: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        when: PropTypes.string.isRequired,
        valueInCelsius: PropTypes.number.isRequired,
        notes: PropTypes.string
    }))
};

export default TemperaturesTable;