import React from 'react';
import {Icon, Row, Col, Card} from 'antd';
import {Query} from 'react-apollo';
import {GET_ALL_SELLERS} from './../query';

class FollowSellers extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			selected: []
		}
		this.handleSellerClick = this.handleSellerClick.bind(this);
		this.setSelectedSellerBorder = this.setSelectedSellerBorder.bind(this);
	}

	handleSellerClick(sellerID) {
        let selected = this.state.selected;

        if (!selected.includes(sellerID)) {
            selected.push(sellerID);
        } else {
            const index = selected.indexOf(sellerID);
            selected.splice(index, 1);
        }
        this.setState({selected: selected});
	}

	setSelectedSellerBorder(sellerID) {
        let selected = this.state.selected;
		if (selected.includes(sellerID)) {
			return "solid 1px black";
		} else {
			return "solid 1px #faeeeb"
        }
    }
    
    render() {
		return (
			<Query query={GET_ALL_SELLERS}>
			{
				({loading, data}) => {
					if (loading) {
						return <p>Loading...</p>
					}

					data = data.allSellers;
					console.log(data);
					
					return (
						<div className="form_content" style={{position:'relative'}}>
							<div className="container_80">
								<Icon type="right" theme="outlined" style={{left:'90%',position :'absolute',top:'45%',fontSize:'35px',fontWeight:'25px'}} />
								<h4>You have to follow atleast 3 sellers to proceed <span style={{fontSize:'14px', color:'rgb(150,150,150)'}}>({this.state.selected.length} selected)</span></h4>
								<Row>
								{
									data.map(
										(seller, index) => {
											return (
												<Col xl={8} xm={12} xs={24} key={index}>
													<div 
														style={{margin: '5px',backgroundColor: 'white', border: this.setSelectedSellerBorder(seller.id)}}
														onClick={e => this.handleSellerClick(seller.id)}
													>
														<div 
															style={{ 
																background: `url(${seller.image})`, 
                                                                height: '220px',
                                                                backgroundRepeat: 'no-repeat',
																backgroundSize: 'contain',
                                                                backgroundPosition: 'center',
                                                                margin: '10px'
															}}
														></div>
														<div style={{padding: '10px', borderTop: 'solid 1px #faeeeb'}}>
															<h5 style={{fontWeight: 'bold'}}>{seller.name}</h5>
															<span>{seller.intro}</span>
														</div>
													</div>    
                                                </Col>
											)
										}
									)
								}
								</Row>								
								<Icon type="left" theme="outlined" style={{right:'90%',position :'absolute',top:'45%',fontSize:'35px',fontWeight:'25px'}} />
							</div>
						</div>		 
					);
				}
			}
			</Query>
		);
    }
}

export default FollowSellers;