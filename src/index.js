import React from 'react';
import ReactDOM from 'react-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext'
import App from './App';
import * as serviceWorker from './serviceWorker';

const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
};

const content = (
    <StyleContext.Provider value={{ insertCss }}>
        <App />
    </StyleContext.Provider>
);

const rootElement = document.getElementById('root');
if (rootElement.getAttribute('data-ssr')) {
    ReactDOM.hydrate(content, rootElement);
} else {
    ReactDOM.render(content, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
