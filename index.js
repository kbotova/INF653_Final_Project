require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const statesRouter = require('./routes/states.routes');
const notFoundMiddleware = require('./middlewares/not-found.middleware');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'views', 'root.html')));
app.use('/states', statesRouter);
app.use(notFoundMiddleware);

const bootstrap = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);

		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

bootstrap();
