const sendErrorDev = (err, req, res) => {
    // API ERROR
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        errorName: err.name,
        errorCode: err.code,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, req, res) => {
    // Operational error trusted error send to client,
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    // Programing error unknown error dont't leak to client,
    console.error("Error Ocurred ", err);
    return res.status(500).json({
        status: "error",
        message: "Somethinng went wrong!",
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
        sendErrorProd(err, req, res);
    }
};