import React, {Component} from 'react';
import {Col, Row , Card} from 'antd';
import SalesSummaryChart from "./Dashboard/SalesSummaryChart";
import SalesDetailsChart from "./Dashboard/SalesDetailsChart";

const chartRowResponsive = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 6,
    style: {marginBottom: 24},
};


class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row gutter={24}>
                    <Col {...chartRowResponsive}>
                        <SalesSummaryChart/>
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
                <Row gutter={24}>
                    <Col lg={12} md={24} style={{marginBottom: '24px'}}>
                        <Card>
                       Chat component Here
                        </Card>
                    </Col>
                    <Col lg={12} md={24} style={{marginBottom: '24px'}}>
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