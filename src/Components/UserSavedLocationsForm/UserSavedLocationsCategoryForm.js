import React, { Component } from "react";
import { Button, Form, Row, Col } from 'react-bootstrap';
import './UserSavedLocations.css';

export default class USLCForm extends Component {
  state = {
    error: null,
    handleSubmit: null,  
  };

  render() {
    const {error, handleSubmit} = this.state;
    return (
      <div>
        <Form>
  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="USLForm" placeholder="Save your SNAP locations by category" />
    </Col>
  </Form.Group>

  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" column sm={2}>
        Location Category
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="text"
          label="Favorites"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
    
        <Form.Check
          type="radio"
          label="To Visit"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
          </Col>
    </Form.Group>
  </fieldset>

  <Form.Group as={Row} controlId="formHorizontalCheck">
    <Col sm={{ span: 10, offset: 2 }}>
      <Form.Check label="Remember me" />
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Save</Button>
    </Col>
  </Form.Group>
</Form>
      </div>
    );
  }
}
