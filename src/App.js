import React, { PureComponent } from 'react';
import styles from './AppStyle.module.css';
import stylesIndex from './styles.css';
import withStyles from 'isomorphic-style-loader/withStyles';
import Test from './Test';

class App extends PureComponent {

    componentDidMount() {
        console.log('TESSTSTSTSTST');
        alert('test');
    }

    render() {
        return (
            <div className={styles.App}>
                <header className={styles.AppHeader}>
                    <img src="assets/logo.svg" className={styles.AppLogo} />
                    <p>
                        My new SSR render <br />
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className={styles.AppLink}
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={event => {
                            event.preventDefault();
                            alert('123');
                        }}
                    >
                        Learn React
                    </a>
                    {!this.props.isTest ? <Test /> : null}
                </header>
            </div>
        );
    }
}

export default withStyles(stylesIndex, styles)(App);
