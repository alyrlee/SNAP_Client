import React, { Component } from 'react'

const snapLocationsListContext = React.createContext({
  snapLocationsList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setThingList: () => {},
})
export default snapLocationsListContext

export class snapLocationsListProvider extends Component {
  state = {
    snapLocationsList: [],
    error: null,
  };

  setsnapLocationsList = snapLocationsList => {
    this.setState({ snapLocationsList })
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  render() {
    const value = {
      snapLocationsList: this.state.snapLocationsList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setsnapLocationsList: this.setsnapLocationsList,
    }
    return (
      <snapLocationsListContext.Provider value={value}>
        {this.props.children}
      </snapLocationsListContext.Provider>
    )
  }
}