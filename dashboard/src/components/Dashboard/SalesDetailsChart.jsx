import React, {Component} from 'react';
import {Card, Col, List, Row, Tabs , Avatar} from 'antd';
import {Axis, Chart, Geom, Legend, Tooltip} from 'bizcharts';

const TabPane = Tabs.TabPane;

const listData = [
    {
        title: 'Order #1',
    }, {
        title: 'Order #2',
    }, {
        title: 'Order #3',
    }, {
        title: 'Order #4',
    },
];

// 数据源
const data = [
    {genre: 'Sports', sold: 275, income: 2300},
    {genre: 'Strategy', sold: 115, income: 667},
    {genre: 'Action', sold: 120, income: 982},
    {genre: 'Shooter', sold: 350, income: 5271},
    {genre: 'Other', sold: 150, income: 3710},
    {genre: 'Other1', sold: 520, income: 3710},
    {genre: 'Other2', sold: 120, income: 3710},
    {genre: 'Other33', sold: 350, income: 3710},
    {genre: 'Ot3her3', sold: 350, income: 3710},
    {genre: 'Oth3er3', sold: 350, income: 3710},
    {genre: 'Othe3r5', sold: 150, income: 3710},
    {genre: 'Other5', sold: 150, income: 3710},
    {genre: 'Other4', sold: 180, income: 3710}
];

// 定义度量
const cols = {
    sold: {alias: '销售量'},
    genre: {alias: '游戏种类'}
};

const chartRowResponsive = {
    xs: 24,
    sm: 24,
    md: 24,
    style: {marginBottom: 24},
};


const padding = [40, 30, 30, 30];


class SalesDetailsChart extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                loading : false
            } )
        } , 1000)
    }

    render() {
        return (
            <Card loading={this.state.loading}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Sales" key="1">

                        <Row gutter={24}>

                            <Col {...chartRowResponsive} xl={18} lg={16}>
                                <p>
                                    <strong>Store Sales Trend</strong>
                                </p>
                                <Chart
                                    forceFit={true}
                                    data={data}
                                    scale={cols}
                                    padding={padding}

                                >
                                    <Axis name="genre"/>
                                    <Axis name="sold"/>
                                    <Legend position="top" dy={-20}/>
                                    <Tooltip/>
                                    <Geom type="interval" position="genre*sold"/>
                                </Chart>
                            </Col>
                            <Col {...chartRowResponsive} xl={6} lg={8}>
                                <p>
                                    <strong>Recent Orders</strong>
                                    <div>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={listData}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={item.title}
                                                        description={
                                                            <Row gutter={16}>
                                                                <Col span={6}>
                                                                    <img
                                                                        className='img-fluid img-thumbnail'
                                                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                                                </Col>
                                                                <Col span={18}>
                                                                    <strong>Product 1</strong>
                                                                    <div>Quantity : S</div>
                                                                    <div>Size     : 12</div>
                                                                </Col>
                                                            </Row>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>

                                </p>
                            </Col>
                        </Row>

                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

SalesDetailsChart.propTypes = {};

export default SalesDetailsChart;
