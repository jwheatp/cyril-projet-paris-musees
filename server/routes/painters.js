import express from "express";
import { PrismaClient } from "@prisma/client";

import { fetchAPI } from "../services/fetchAPI.js";
import { getPainting } from "../services/querie.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
	let paintings;
	try {
		paintings = await prisma.painters.findMany();
	} catch (err) {
		return next(err);
	}
	res.json(paintings);
});

router.get("/:id", async (req, res, next) => {
	const painterID = parseInt(req.params.id);
	let painter;
	try {
		painter = await prisma.painters.findUnique({
			where: {
				id: painterID,
			},
		});
	} catch (err) {
		return next(err);
	}
	res.json(painter);
});

router.get("/:id/paintings", async (req, res, next) => {
	const painterID = parseInt(req.params.id);
	let paintings;
	try {
		paintings = await prisma.paintings.findMany({
			where: {
				painterId: painterID,
			},
		});
	} catch (err) {
		return next(err);
	}
	res.json(paintings);
});

// create route for choose 4 random painters

router.get("/random", async (req, res, next) => {
	let paintings;
	try {
		paintings = await prisma.painters.findMany();
	} catch (err) {
		return next(err);
	}
	const randomPainters = [];
	for (let i = 0; i < 4; i++) {
		const randomPainter =
			painters[Math.floor(Math.random() * painters.length)];
		randomPainters.push(randomPainter);
	}
	res.json(randomPainters);
});

// get 1 random painting from a painter

router.get("/:id/painting/random", async (req, res, next) => {
	const painterID = parseInt(req.params.id);
	let paintings;
	try {
		paintings = await prisma.paintings.findMany({
			where: {
				painterId: painterID,
			},
		});
	} catch (err) {
		return next(err);
	}
	const randomPainting =
		paintings[Math.floor(Math.random() * paintings.length)];
	res.json(randomPainting);
});

export default router;
