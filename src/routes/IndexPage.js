import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import SearchBar from '../components/search_bar';
import DriversMap from '../components/drivers_map';
import Bar from '../components/bar';


function IndexPage() {
  return (
    <div className={styles.normal}>
      <SearchBar />
      <DriversMap />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
