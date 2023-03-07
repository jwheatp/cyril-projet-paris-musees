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

export default router;
