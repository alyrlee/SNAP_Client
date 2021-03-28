import React, { Component } from "react";
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
        <form>
  <form.Group as={Row} controlId="formHorizontalEmail">
    <form.Label column sm={2}>
    </form.Label>
    <col sm={10}>
      <form.Control type="USLForm" placeholder="Save your SNAP locations by category" />
    </col>
  </form.Group>

  <fieldset>
    <form.Group as={Row}>
      <form.Label as="legend" column sm={2}>
        Location Category
      </form.Label>
      <col sm={10}>
        <form.Check
          type="text"
          label="Favorites"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
    
        <form.Check
          type="radio"
          label="To Visit"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
          </col>
    </form.Group>
  </fieldset>

  <form.Group as={Row} controlId="formHorizontalCheck">
    <col sm={{ span: 10, offset: 2 }}>
      <form.Check label="Remember me" />
    </col>
  </form.Group>

  <form.Group as={Row}>
    <col sm={{ span: 10, offset: 2 }}>
      <button type="submit">Save</button>
    </col>
  </form.Group>
</form>
      </div>
    );
  }
}
