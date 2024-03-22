const router = require("express").Router();
const Order = require("../models/ordersModel");

router.post("/", async (req, res) => {
	const {
		senderName,
		number,
		address,
		receiverName,
		email,
		phone,
		location,
		parcelName,
		parcelType,
		parcelWeight,
		parcelHeight,
		parcelWidth,
	} = req.body;
	if (
		!senderName &&
		!number &&
		!address &&
		!receiverName &&
		!email &&
		!phone &&
		!location &&
		!parcelName &&
		!parcelType &&
		!parcelWeight &&
		!parcelHeight &&
		!parcelWidth
	) {
		res.status(400).json("Please enter the required fields");
		return;
	}
	try {
		const order = await Order.create({
			senderName,
			number,
			address,
			receiverName,
			email,
			phone,
			location,
			parcelName,
			parcelType,
			parcelWeight,
			parcelHeight,
			parcelWidth,
		});
		if (!order) {
			res.status(400).json({ message: "trouble placing the order" });
			return;
		}
		res.status(201).json({ order, message: "order placed" });
	} catch (error) {
		res.status(500).json({ error, message: "internal server error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const orders = await Order.find({});
		res.json({ orders, message: "successfully all orders retrived" });
	} catch (error) {
		res.status(500).json(error, { message: "internal server error" });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	if (id.length !== 24) {
		res.status(400).json({ message: "trouble finding the order" });
		return;
	}
	try {
		const order = await Order.findById(id);
		if (!order) {
			res.status(400).json({ message: "trouble finding the order" });
			return;
		}
		res.json({ order, message: "successfully order retrived" });
	} catch (error) {
		res.status(500).json(error, { message: "internal server error" });
		return;
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	if (id.length !== 24) {
		res.status(400).json({ message: "trouble finding the order" });
		return;
	}
	const {
		senderName,
		number,
		address,
		receiverName,
		email,
		phone,
		location,
		parcelName,
		parcelType,
		parcelWeight,
		parcelHeight,
		parcelWidth,
	} = req.body;
	try {
		const order = await Order.findByIdAndUpdate(
			id,
			{
				senderName,
				number,
				address,
				receiverName,
				email,
				phone,
				location,
				parcelName,
				parcelType,
				parcelWeight,
				parcelHeight,
				parcelWidth,
			},
			{ new: true }
		);
		if (!order) {
			res.status(400).json({ message: "trouble finding the order" });
			return;
		}
		res.json({ order, message: "successfully order has been updated" });
	} catch (error) {
		res.status(500).json({ error, message: "internal server error" });
		return;
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	if (id.length !== 24) {
		res.status(400).json({ message: "trouble finding the order" });
		return;
	}
	try {
		const order = await Order.findByIdAndDelete(id);
		if (!order) {
			res.status(400).json({ message: "trouble finding the order" });
			return;
		}
		res.json({ order, message: "successfully order deleted" });
	} catch (error) {
		res.status(500).json(error, { message: "internal server error" });
		return;
	}
});

module.exports = router;
