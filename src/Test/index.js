import React from 'react';
import styles  from './style.module.css';
import withStyles from 'isomorphic-style-loader/withStyles';

function Test() {
    return (
        <div className={styles.TestStyle}>
           Test container
        </div>
    );
}

export default withStyles(styles)(Test);
