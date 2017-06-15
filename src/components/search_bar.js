import React, { Component } from 'react';
import { connect } from 'dva';

function SearchBar({ dispatch, destination }) {

  console.log(destination);

  function onSelectChange(event) {
    const selectdestination = event.target.value;
    console.warn(selectdestination);
    dispatch({
      type: 'destination/select',
      payload: selectdestination,
    });
  }

  function GetOption() {
    return destination.map((des) =>{
      return (
        <option
          key={des.title}
          value={des.title}
        >
          {des.title}
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
  const { destination } = state.destination;
  return {
    destination,
  };
}

export default connect(mapStateToProps)(SearchBar);
