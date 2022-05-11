import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Destinations from './Destinations';
import Reviews from './Reviews';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [routePath, setRoutePath] = useState(
    <Route
      path="/"
      element={
        <Destinations
          handleClickingDetails={handleClickingDetails} />
      }
    />
  )
  function handleClickingDetails(destination) {
    setRoutePath(<Route path="/" element={<Reviews destination={destination} />} />)
  }

  return (
    <Router>
      <Header />
      <Container>
        <Routes>

          {routePath}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
