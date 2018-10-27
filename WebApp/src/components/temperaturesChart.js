import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

class TemperaturesChart extends Component {
    constructor(props) {
        super(props);

        this.formatWhen = this.formatWhen.bind(this);
    }

    formatWhen(when) {
        let momentWhen = moment(when);
        return momentWhen.format("D MMM YYYY h:mm:A") + ", " + momentWhen.fromNow();
    }

    render() {
        if (this.props.temperatures.length === 0)
            return <p>No temperatures found for this date range.</p>;

        const data = this.props.temperatures.map(t => ({ x: moment(t.when).toDate(), y: t.valueInCelsius }));
        const maxValue = data.reduce((accumulator, current) => Math.max(accumulator, current.y), 0) + 1;
        return (<XYPlot xType="time" height={500} width={1000} yDomain={[0, maxValue]}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Date &amp; Time" />
            <YAxis title="Temperature (°C)" />
            <LineSeries data={data} />
        </XYPlot>
        );
    }

}

TemperaturesChart.propTypes = {
    temperatures: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        when: PropTypes.string.isRequired,
        valueInCelsius: PropTypes.number.isRequired,
        notes: PropTypes.string
    }))
};

export default TemperaturesChart;