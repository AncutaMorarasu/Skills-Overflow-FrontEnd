import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function NoPosts(){
    return (
        <Container>
          <Alert className="text-center" variant="warning">
            Shish, I couldn't find anything. Give it 
            <Link to="/dashboard" style={{color: 'black'}}> another try?</Link>
          </Alert>
        </Container>
      );
}

export default NoPosts;