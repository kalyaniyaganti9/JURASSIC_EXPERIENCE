const app = require('./tourServer'); // Import server
const host = '127.73.78.1';
const port = '5260';
app.listen(port, host, function () {
    console.log("Tour JSON session server listening on IPv4: " + host +
        ":" + port);
});