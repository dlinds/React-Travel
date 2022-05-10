import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './Header';
import Destinations from './Destinations';
import Reviews from './Reviews';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Destinations />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
