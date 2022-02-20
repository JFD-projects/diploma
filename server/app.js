const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const cors = require('cors');
const initDatabase = require('./startUp/initDatabase')
const app = express();
const routes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

async function start(){
	try {
		mongoose.connection.once('open', () => {
			initDatabase();
		})
		await mongoose.connect(config.get('mongoUri'))
		console.log(chalk.green('mongodb connected'))
		app.listen(PORT, () => {
			console.log(chalk.green(`server has been started on port ${PORT}`));
		});
	} catch (error) {
		console.log(chalk.red(error.message))
		process.exit(1)
	}
	
}

start();