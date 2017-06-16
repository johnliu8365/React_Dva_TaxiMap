import React from 'react';
import { connect } from 'dva';

function SearchBar({ dispatch, destination }) {
  console.log('destination:', destination);
  function onSelectChange(event) {
    const num = event.target.value;
    const selectDestination = destination[num];
    dispatch({
      type: 'destination/select',
      payload: selectDestination,
    });
  }

  function GetOption() {
    return Object.keys(destination).map((data) => {
      const Des = destination[data];
      return (
        <option
          key={data}
          value={data}
        >
          {Des.title}
        </option>
      );
    });
  }

  return (
    <div>
      <div style={{ width: 600, height: 100 }} >
        <label htmlFor="select" >請選擇到達地點:</label>
        <select onChange={onSelectChange.bind(this)} className="form-control">
          {GetOption()}
        </select>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { destination, selectDestination } = state.destination;
  return {
    destination,
    selectDestination,
  };
}

export default connect(mapStateToProps)(SearchBar);
