import React, { Component } from 'react'

export const nullStore = {
  author: {},
  tags: [],
}

const snapLocatorContext = React.createContext({
  store: nullStore,
  snapLocations: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setStore: () => {},
  clearStore: () => {},
  setsnapLocations: () => {},
  addsnapLocations: () => {},
})

export default snapLocatorContext

export class snapLocatorProvider extends Component {
  state = {
    store: nullStore,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setStore = store => {
    this.setState({ store })
  }

  setsnapLocations = snapLocations => {
    this.setState({ snapLocations })
  }

  clearStores = () => {
    this.setStores(nullStore)
    this.setStores([])
  }

  addsnapLocations = snapLocations => {
    this.setsnapLocations([
      ...this.state.snapLocations,
      snapLocations
    ])
  }

  render() {
    const value = {
      store: this.state.store,
      snapLocations: this.state.snapLocations,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setStore: this.setThing,
      setsnapLocations: this.setsnapLocations,
      clearsnapLocations: this.clearsnapLocations,
      addsnapLocations: this.addsnapLocations,
    }
    return (
      <snapLocatorContext.Provider value={value}>
        {this.props.children}
      </snapLocatorContext.Provider>
    )
  }
}