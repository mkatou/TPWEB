const config = require('config');

const { app } = require('./api/app');

const port = config.get('port') || '127.0.0.1';

app.listen(port, () => console.log("listening on port " + port));