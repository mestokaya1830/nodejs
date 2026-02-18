import express from 'express';

const app = express();

// Static webserver without any additional routes or middleware, just serving files from the 'static' directory. 
// This is useful for hosting a frontend application or serving assets like images, CSS, and JavaScript files.

// Static folder
app.use(express.static('static'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Static server is running on port ${PORT}`);
});
