import React, {Component} from 'react';
import {Col, Row, Card} from 'antd';
import SalesSummaryChart from "./Dashboard/SalesSummaryChart";
import SalesDetailsChart from "./Dashboard/SalesDetailsChart";
import UniqueUsersChart from "./Dashboard/UniqueUsersChart";

const chartRowResponsive = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
    style: {marginBottom: 24},
};

const cardRowResponsive = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    style: {marginBottom: 24},
};


class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row gutter={24}>
                    <Col {...cardRowResponsive}>
                        <Row gutter={24}>
                            <Col {...chartRowResponsive}>
                                <UniqueUsersChart/>
                            </Col>
                            <Col {...chartRowResponsive}>
                                <SalesSummaryChart/>
                            </Col>
                            <Col {...chartRowResponsive}>
                                <SalesSummaryChart/>
                            </Col>
                            <Col {...chartRowResponsive}>
                                <SalesSummaryChart/>
                            </Col>
                        </Row>
                    </Col>
                    <Col {...cardRowResponsive}>
                        <Card>
                            Notifications Should Go Here.
                        </Card>
                    </Col>
                </Row>


                <div>
                    <SalesDetailsChart/>
                </div>
            </div>
        );
    }
}

export default Dashboard;