const State = require('../models/state.model');
const states = require('../data/states.json');

class StatesService {
	async getAll() {
		const statesFromDb = await State.find();

		return states.map(state => {
			const stateFromDb = statesFromDb.find(s => s.stateCode === state.code);
			if (!stateFromDb) return { ...state };

			return { ...state, funfacts: stateFromDb.funfacts };
		});
	}

	async getAllContig() {
		const states = await this.getAll();
		const filter = state => state.code !== 'AK' && state.code !== 'HI';

		return states.filter(filter);
	}

	async getAllNoContig() {
		const states = await this.getAll();
		const filter = state => state.code === 'AK' || state.code === 'HI';

		return states.filter(filter);
	}

	async getById(state) {
		const stateFromDb = await State.findOne({ stateCode: state.code });

		if (!stateFromDb) return { ...state };

		return { ...state, funfacts: stateFromDb.funfacts };
	}

	async getFunfact(state) {
		const stateFromDb = await State.findOne({ stateCode: state.code });
		if (!stateFromDb) return null;

		const randomIndex = Math.floor(Math.random() * stateFromDb.funfacts.length);

		return { funfact: stateFromDb.funfacts[randomIndex] };
	}

	async getCapital(state) {
		return { state: state.state, capital: state.capital_city };
	}

	async getNickname(state) {
		return { state: state.state, nickname: state.nickname };
	}

	async getPopulation(state) {
		return { state: state.state, population: state.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') };
	}

	async getAdmission(state) {
		return { state: state.state, admitted: state.admission_date };
	}

	async createFunfacts(state, funfacts) {
		const stateFromDb = await State.findOne({ stateCode: state.code });

		if (!stateFromDb) {
			const newState = new State({ stateCode: state.code, funfacts });
			return newState.save();
		}

		const funfactsSet = new Set([...stateFromDb.funfacts, ...funfacts]);
		stateFromDb.funfacts = Array.from(funfactsSet);
		return stateFromDb.save();
	}

	async updateFunfact(state, index, newFunfact) {
		const stateFromDb = await State.findOne({ stateCode: state.code });
		if (!stateFromDb) return null;
		if (!stateFromDb.funfacts[index - 1]) return 'noIndex';

		stateFromDb.funfacts.splice(index - 1, 1, newFunfact);
		return stateFromDb.save();
	}

	async deleteFunfact(state, index) {
		const stateFromDb = await State.findOne({ stateCode: state.code });
		if (!stateFromDb) return null;
		if (!stateFromDb.funfacts[index - 1]) return 'noIndex';

		stateFromDb.funfacts.splice(index - 1, 1);
		return stateFromDb.save();
	}
}

const statesService = new StatesService();

module.exports = statesService;
