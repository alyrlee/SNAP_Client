import React, { Component } from "react";

class SnapLocationsList extends Component {
  static defaultProps = {
    snapLocationsList: [],
  };

  render() {
    const { snapLocationsList } = this.props;
    return (
      <React.Fragment>
        <div className="snap_locations_list">
          {" "}
          {this.props.snapLocationsList.map((SLL) => {
            return <div key={SLL.Store_Name} className="placename"></div>;
          })}
        </div>
        <div>
          <div className="snapLocationsList">{snapLocationsList}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default SnapLocationsList;
