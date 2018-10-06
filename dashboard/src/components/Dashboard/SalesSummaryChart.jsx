import React, {Component} from 'react';
import ChartCard from "./ChartCard";
import {Chart, Geom, Tooltip} from "bizcharts";


const data = [
    {date: '05-09-2018', sales: 120},
    {date: '06-09-2018', sales: 110},
    {date: '07-09-2018', sales: 120},
    {date: '08-09-2018', sales: 130},
    {date: '09-09-2018', sales: 140},
    {date: '10-09-2018', sales: 150}
];

const padding = [10, 5, 5, 5];

class SalesSummaryChart extends Component {
    state = {
        loading : true
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loading : false
            } )
        } , 1000)
    }

    render() {
        return (
            <ChartCard
                loading={this.state.loading}
                title={'Sales Summary'}
                tooltip={'Sales Summary For Products'}
                stat={'$12,600'}
                footer={'Day Sales : ￥12,423'}

            >
                <Chart
                    height={100}
                    forceFit={true}
                    data={data}
                    padding={padding}
                >
                    <Tooltip/>
                    <Geom type="interval" position="date*sales"/>
                </Chart>
            </ChartCard>
        );
    }
}

SalesSummaryChart.propTypes = {};

export default SalesSummaryChart;
