import React, { useState } from "react";
import { Card, Row, Button, Form, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { makeApiCall } from '../actions';
import Moment from 'moment';


class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      sorting: false
    };
    this.handleSorting = this.handleSorting.bind(this);
  }

  componentDidMount() {
    const { dispatch, destination } = this.props;
    dispatch(makeApiCall('reviews', destination.name));
  }

  handleSorting(event) {
    event.preventDefault();
    const { value } = event.target;
    let tempReviews = this.props.reviews;
    if (value === "oldest") {
      tempReviews.sort((a, b) => new Date(a.reviewDate) - new Date(b.reviewDate));
    } else if (value === "newest") {
      tempReviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
    } else if (value === "highest") {
      tempReviews.sort((a, b) => b.rating - a.rating);
    } else if (value === "lowest") {
      tempReviews.sort((a, b) => a.rating - b.rating);
    }
    this.setState({ reviewList: tempReviews, sorting: true });
  }

  render() {
    let reviews = [];
    if (!this.state.sorting) {
      reviews = this.props.reviews;
    } else {
      reviews = this.state.reviewList;
    }
    Moment.locale('en');
    const { error, isLoading, destination } = this.props;
    console.log("Line 38 - Reviews: ", reviews);
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (isLoading) {
      return <React.Fragment>Loading...</React.Fragment>
    } else {
      return (
        <React.Fragment>
          <a className="btn btn-primary mt-3" href="/">Back</a>
          <h1>{destination.city}, {destination.country}</h1>
          <hr />
          <div className="card shadow-sm mb-4">
            <img className="card-img-top rounded" style={{ filter: "brightness(60%)", objectFit: "cover" }} src={destination.imgLink} alt="picture of place" />
            <div className="card-img-overlay mt-5 p-5 text-white">
              <h1 className="fw-normal text-center mt-5 mb-0 fs-1">{destination.name}</h1>

            </div>
          </div>
          <h2>Reviews</h2>
          <hr />
          <Form>
            <Form.Group as={Row}>
              <Form.Label column md={2} lg={1}>Sort By</Form.Label>
              <Form.Select sm={4} className="w-25" onChange={this.handleSorting} >
                <option>None</option>
                <option value="newest">Date ↓</option>
                <option value="oldest">Date ↑</option>
                <option value="highest">Rating ↓</option>
                <option value="lowest">Rating ↑</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <hr />
          <Row className="justify-content-center">
            {reviews.map((review, index) =>
              <Card style={{ width: '18rem' }} className="m-3 shadow-sm p-0" key={index}>
                <Card.Body>
                  <Card.Title>{review.reviewTitle}</Card.Title>
                  <Card.Text>{review.rating} / 10 <br />{review.userName} <br /> {Moment(review.reviewDate).format('MMMM d, YYYY')} <br />{review.reviewText} </Card.Text>
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
    reviews: state.reviews,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps)(Reviews);
