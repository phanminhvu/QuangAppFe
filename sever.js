import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve 'index.html' for any request that doesn't match a static file
app.get('*', function (req, res) {
    console.log('alo')
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
const PORT =  8080;
app.listen(PORT, () => {
    console.log(path.join(__dirname, 'dist', 'index.html'));

    console.log(`Server is running on port ${PORT}`);
});
