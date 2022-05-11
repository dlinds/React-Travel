import React from "react";
import { Card, Row, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { makeApiCall } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Parser from 'html-react-parser';

class Destinations extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeApiCall('destinations'));
  }

  getStarString(rating) {
    let output = '';
    for (let i = 1; i <= 10; i += 2) {
      if (rating > 0) {
        if (rating > 0 && rating <= 1) {
          output += '<i className="fa fa-star-half-o"></i>';
        } else {
          output += '<i className="fa fa-star"></i>';
        }
        console.log(output);
      } else {
        output += '<i className = "fa fa-star-o"></i>';
      }
      rating -= 2;
    }
    return output;
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
                  <Card.Text>{destination.city}, {destination.country}<br /><span id="rating">{Parser(this.getStarString(destination.averageRating))}</span><br />based on {destination.numOfReviews} reviews</Card.Text>

                  <Button variant="primary" onClick={() => this.props.handleClickingDetails(destination)}>Details</Button>
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
