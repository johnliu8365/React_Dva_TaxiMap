import React, { Component } from 'react';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';

function onSelectChange(dispatch, event) {
  const selectdestination = event.target.value;
  console.warn(selectdestination);
  dispatch({
    type: 'destination/select',
    payload: selectdestination,
  });
}

class SearchBar extends Component {

  // onSelectChange(event) {
  //   const destination = event.target.value;
  //   this.props.selectDestination(destination);
  // }

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
            <select  className="form-control">
              {this.renderList()}
            </select>
          </div>

        </div>
    );
  }
}

function mapStateToProps(state) {
  const { destination } = state.destination;
  return {
    destination: state.destination,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ selectDestination }, dispatch);
// }

export default connect(mapStateToProps, )(SearchBar);
