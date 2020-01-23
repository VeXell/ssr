import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

const app = express();
const PORT = 8092;

const BUILD_DIR = './build';

// Serve static files
app.use(express.static(BUILD_DIR, { index: false }));
app.use('/public', express.static(BUILD_DIR, { index: false }));

app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(<App />);

    const indexFile = path.resolve(`${BUILD_DIR}/index.html`);

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div data-ssr="true" id="root">${app}</div>`)
        );
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});