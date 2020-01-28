import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from '../src/App';

const app = express();
const PORT = 8092;

const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';
const BUILD_DIR = './build';

if (IS_DEVELOPMENT_MODE) {
    // Serve static files in development mde
    app.use(express.static(BUILD_DIR, { index: false }));
    app.use('/public', express.static(BUILD_DIR, { index: false }));
}


app.get('/*', (req, res) => {
    const css = new Set();
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));

    const app = ReactDOMServer.renderToString(
        <StyleContext.Provider value={{ insertCss }}>
            <App />
        </StyleContext.Provider>
    );

    const indexFile = path.resolve(`${BUILD_DIR}/index.html`);

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        data = data.replace('<div id="root"></div>', `<div data-ssr="true" id="root">${app}</div>`);
        data = data.replace('<link id="inline-styles"/>', `<style>${[...css].join('')}</style>`);
        return res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});