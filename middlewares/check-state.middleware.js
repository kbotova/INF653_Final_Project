const states = require('../data/states.json');

const checkStateMiddleware = (req, res, next) => {
	const { state } = req.params;
	const foundState = states.find(s => s.code === state.toUpperCase());

	if (!foundState) return res.status(404).json({message: 'Invalid state abbreviation parameter'});

	res.locals.state = foundState;

	next();
};

module.exports = checkStateMiddleware;
