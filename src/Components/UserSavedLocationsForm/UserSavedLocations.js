import React, { Component } from 'react'
import snapLocatorContext from '../../Contexts/snapLocatorContext'
import AuthApiService from '../Services/auth-api-service'
import { Button, Textarea } from '../Utils/Utils'
// import './UserSavedLocations.css'

export default class UserSavedLocationsForm extends Component {
  static contextType = snapLocatorContext

  handleSubmit = ev => {
    ev.preventDefault()
    const { stores } = this.context
    const { text } = ev.target
    AuthApiService.postStores(objectid, text.value)
      .then(this.context.addStores)
      .then(() => {
        text.value = ''
      })
      .catch(this.context.setError)
  }

  render() {
    return (
      <form
        className='UserSaveLocationsForm'
        onSubmit={this.handleSubmit}
      >
        <div className='text'>
          <Textarea
            required
            aria-label='Save store location...'
            name='text'
            id='text'
            cols='30'
            rows='3'
            placeholder='Save store location..'>
          </Textarea>
        </div>
        <Button type='submit'>
          Save Location
        </Button>
      </form>
    )
  }
}