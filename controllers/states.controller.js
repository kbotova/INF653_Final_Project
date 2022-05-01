const statesService = require('../services/states.service');

class StatesController {
	async getAll(req, res) {
		const { contig } = req.query;

		let data;

		if (contig === 'true') {
			data = await statesService.getAllContig();
		} else if (contig === 'false') {
			data = await statesService.getAllNoContig();
		} else {
			data = await statesService.getAll();
		}

		res.json(data);
	}

	async getById(req, res) {
		const { state } = res.locals;
		const data = await statesService.getById(state);

		res.json(data);
	}

	async getFunfact(req, res) {
		const { state } = res.locals;
		const data = await statesService.getFunfact(state);

		if (!data) return res.status(404).json({ message: `No Fun Facts found for ${state.state}` });

		res.json(data);
	}

	async getCapital(req, res) {
		const { state } = res.locals;
		const data = await statesService.getCapital(state);

		res.json(data);
	}

	async getNickname(req, res) {
		const { state } = res.locals;
		const data = await statesService.getNickname(state);

		res.json(data);
	}

	async getPopulation(req, res) {
		const { state } = res.locals;
		const data = await statesService.getPopulation(state);

		res.json(data);
	}

	async getAdmission(req, res) {
		const { state } = res.locals;
		const data = await statesService.getAdmission(state);

		res.json(data);
	}

	async createFunfacts(req, res) {
		const { state } = res.locals;
		const { funfacts } = req.body;

		if (!funfacts) return res.status(400).json({ message: 'State fun facts value required' });
		if (!Array.isArray(funfacts)) return res.status(400).json({ message: 'State fun facts value must be an array' });

		const data = await statesService.createFunfacts(state, funfacts);

		res.status(201).json(data);
	}

	async updateFunfact(req, res, next) {
		const { state } = res.locals;
		const { index, funfact } = req.body;

		if (!index) return res.status(400).json({ message: 'State fun fact index value required' });
		if (!funfact) return res.status(400).json({ message: 'State fun fact value required' });

		const data = await statesService.updateFunfact(state, index, funfact);

		if (!data) return res.status(400).json({ message: `No Fun Facts found for ${state.state}` });
		if (data === 'noIndex')
			return res.status(400).json({ message: `No Fun Fact found at that index for ${state.state}` });

		res.json(data);
	}

	async deleteFunfact(req, res, next) {
		const { state } = res.locals;
		const { index } = req.body;

		if (!index) return res.status(400).json({ message: 'State fun fact index value required' });

		const data = await statesService.deleteFunfact(state, index);

		if (!data) return res.status(400).json({ message: `No Fun Facts found for ${state.state}` });
		if (data === 'noIndex')
			return res.status(400).json({ message: `No Fun Fact found at that index for ${state.state}` });

		res.json(data);
	}
}

const statesController = new StatesController();

module.exports = statesController;
