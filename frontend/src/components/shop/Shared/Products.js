import React from "react";
import { Link } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import Details from "../Details";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { GET_AUTH, GET_USER, GET_PRODUCTS_BY_SELLER } from "../../query";

const GET_PRODUCTS = gql`
  {
    allProducts {
      id
      name
      image
    }
  }
`;

class Home extends React.Component {
  componentWillMount() {
    // this.props.getProducts().then(() => {
    //     console.log("fetched products");
    //     console.log("test", this.props.products);
    // });
  }

  render() {
    const { match } = this.props;
    // console.log(ModalRoute);
    return (
      <Query query={GET_AUTH}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <Query
              query={GET_USER}
              variables={{
                username: data.auth.user.username
              }}
            >
              {({ loading, error, data }) => {
                console.log(loading, error, data);
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return (
                  <div>
                    <div className="container_40">
                      {data.User.followingShop.map((shop, index) => (
                        <Query
                          key={index}
                          query={GET_PRODUCTS_BY_SELLER}
                          variables={{
                            sellerID: shop.id
                          }}
                        >
                          {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>error</p>;
                            data = data.getProductBySeller;
                            return (
                              <div className="products">
                                {data.map((product, index) => (
                                  <div key={index} className={"product"}>
                                    <div className="image-container">
                                      <Link to={match.url + "/" + product.id}>
                                        <img
                                          className="img_fluid" // each_product
                                          alt={product.description}
                                          key={index}
                                          src={`product_images/${
                                            product.image
                                          }`}
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                                
                              </div>
                            );
                          }}
                        </Query>
                      ))}
                    </div>
                    {/*<ModalRoute path={`${match.url}/product/:id`} component={Details}/>*/}
                    <ModalRoute
                      path={`${match.url}/:id`}
                      parentPath={match.url}
                      component={Details}
                    />
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

//
// function mapStateToProps(state) {
//     return {
//         products: state.products
//     };
// }
//
// const HomeContainer = connect(mapStateToProps, {
//     getProducts
// })(Home);

export default Home;
