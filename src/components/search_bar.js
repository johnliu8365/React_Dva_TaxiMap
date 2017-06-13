import React, { Component } from 'react';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';
import { routerRedux } from 'dva/router';

class SearchBar extends Component {

  renderList() {
    return Object.keys(this.props.destination).map((key) => {
      const destination = this.props.destination[key];

      return (
        <option
          key={key}
          value={key}
          className="list-group-item"
        >
          {destination.title}
        </option>
      );
    });
  }

  render() {
    return (
      <div>
        <div style={{ width: 600, height: 100 }} >
          <label htmlFor="select" >請選擇到達地點:</label>
          <select className="form-control">
            {this.renderList()}
          </select>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    destination: state.destination.destination,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ selectDestination: selectDestination }, dispatch);
// }

export default connect(mapStateToProps)(SearchBar);
