import React, { Component } from "react";

export const stores = {
  Store_Name: {},
};

const snapLocatorContext = React.createContext({
  store_Name: [],
  snapLocations: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setStore: () => {},
  clearStore: () => {},
  setsnapLocations: () => {},
  addsnapLocations: () => {},
});

export default snapLocatorContext;

export class snapLocatorProvider extends Component {
  state = {
    Store_Name: stores,
    error: null,
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setStore = (store) => {
    this.setState({ store });
  };

  setsnapLocations = (snapLocations) => {
    this.setState({ snapLocations });
  };

  clearStores = () => {
    this.setStores(stores);
    this.setStores([]);
  };

  addsnapLocations = (snapLocations) => {
    this.setsnapLocations([...this.state.snapLocations, snapLocations]);
  };

  render() {
    const value = {
      store: this.state.store,
      snapLocations: this.state.snapLocations,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setStore: this.setStore,
      setsnapLocations: this.setsnapLocations,
      clearsnapLocations: this.clearsnapLocations,
      addsnapLocations: this.addsnapLocations,
    };
    return (
      <snapLocatorContext.Provider value={value}>
        {this.props.children}
      </snapLocatorContext.Provider>
    );
  }
}
