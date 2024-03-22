const mongoose = require("mongoose");

const ordersModel = mongoose.Schema({
	senderName: { type: String, required: true },
	number: { type: Number, required: true },
	address: { type: String, required: true },
	receiverName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: Number, required: true },
	location: { type: String, required: true },
	parcelName: { type: String, required: true },
	parcelType: { type: String, required: true },
	parcelWeight: { type: Number, required: true },
	parcelHeight: { type: Number, required: true },
	parcelWidth: { type: Number, required: true },
});

module.exports = mongoose.model("order", ordersModel);
