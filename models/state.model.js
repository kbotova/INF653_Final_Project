const mongoose = require('mongoose');
const { Schema } = mongoose;

const stateSchema = new Schema({
	stateCode: { type: String, required: true, unique: true },
	funfacts: [String],
});

const State = mongoose.model('State', stateSchema);

module.exports = State;
