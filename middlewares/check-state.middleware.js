const states = require('../data/states.json');
const send404 = require('../utils/send404');

const checkStateMiddleware = (req, res, next) => {
	const { state } = req.params;
	const foundState = states.find(s => s.code === state.toUpperCase());

	if (!foundState) return res.status(404).json('Invalid state abbreviation parameter');

	res.locals.state = foundState;

	next();
};

module.exports = checkStateMiddleware;
