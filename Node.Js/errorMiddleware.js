//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->

exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
