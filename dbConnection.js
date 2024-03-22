const mongoose = require("mongoose");

const connection = async () => {
	try {
		await mongoose.connect(process.env.CONNECTION_STRING);
		console.log("MongoDb Connected");
	} catch (error) {
		console.log(error);
	}
};

module.exports = connection;
