const path = require('path');

const notFoundMiddleware = (req, res) => {
	res.status(404).sendFile(path.resolve(__dirname, '..', 'views', '404.html'));
};

module.exports = notFoundMiddleware;
