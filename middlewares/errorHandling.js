// middleware/error.js
module.exports = (err, req, res, next) => {
    // Set sensible error message and status code
    res.locals.message = err.message || 'Internal Server Error';
    res.status(err.status || 500);
  
    // Render appropriate error page based on status code
    if (res.statusCode === 404) {
      res.render('404'); // Assuming your error page is named '404.ejs'
    } else if (res.statusCode === 500) {
      // Handle 500 errors (optional: log the error)
      console.error(err.stack); // Log the error details for debugging (optional)
      res.render('500'); // Assuming your error page is named '500.ejs'
    } else {
      // Render a generic error page for other errors
      res.render('error'); // Assuming your error page is named 'error.ejs'
    }
  };
  