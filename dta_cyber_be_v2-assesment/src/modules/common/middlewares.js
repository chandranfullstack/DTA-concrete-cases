// handles 500 error on the server level
const serverErrorMiddleware = (err, req, res, next) => {
    console.log(err)
    res.status(500);
    res.setHeader("Content-Type", "text/html")
    res.send(`
        <h3>Server Error</h3>
        <p>${err.stack.replaceAll('\n', '<br/>')}</p>
    `)
}


module.exports = {
    serverErrorMiddleware
}
