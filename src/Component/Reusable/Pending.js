import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Pending = () => (
  <Fragment>
    <img
      src={spinner}
      alt='loading...'
      style={{ width: '50px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);

export default Pending;
