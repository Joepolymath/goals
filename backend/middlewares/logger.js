const saySomething = (req, res, next) => {
       console.log("New request made");
       next()
}

module.exports = saySomething;