const logger = function(req, res, next) {
    const now = new Date();
    console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
}


const sayHi = function () {
    console.log("hello");
}



module.exports = {
    logger,
    sayHi
}