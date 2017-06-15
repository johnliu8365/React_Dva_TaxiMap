import React from 'react';
import { connect } from 'dva';

function SearchBar({ dispatch, destination }) {
  function onSelectChange(event) {
    const selectdestination = event.target.value;
    console.warn(selectdestination);
    dispatch({
      type: 'destination/select',
      payload: selectdestination,
    });
  }

  function GetOption() {
    return destination.map((data) => {
      return (
        <option
          key={data.title}
          value={data.title}
        >
          {data.title}
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
