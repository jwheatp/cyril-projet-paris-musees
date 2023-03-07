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

export default router;
