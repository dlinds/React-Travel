import React from "react";
import { Card, Row, Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { makeApiCall } from '../actions'

class Destinations extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeApiCall('destinations'));
  }

  render() {
    const { error, isLoading, destinations } = this.props;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (isLoading) {
      return <React.Fragment>Loading...</React.Fragment>
    } else {
      return (
        <React.Fragment>
          <h1>Destinations</h1>
          <hr />
          <Row className="justify-content-center">
            {destinations.map((destination, index) =>
              <Card style={{ width: '18rem' }} className="m-3 shadow-sm p-0" key={index}>
                <Card.Img variant="top" src={destination.imgLink} style={{ height: '300px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{destination.name}</Card.Title>
                  <Card.Text>{destination.city}, {destination.country}<br />{destination.averageRating} / 10<br />based on {destination.numOfReviews} reviews</Card.Text>

                  <Button variant="primary">Details</Button>
                </Card.Body>
              </Card>
            )}
          </Row>


        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    destinations: state.destinations,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps)(Destinations);