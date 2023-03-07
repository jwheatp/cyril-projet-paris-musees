import express from "express";
import { PrismaClient } from "@prisma/client";

import { fetchAPI } from "../services/fetchAPI.js";
import { getPainting } from "../services/querie.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res, next) => {
	let paintings;
	try {
		paintings = await fetchAPI(
			getPainting(req.params.id),
			process.env.API_AUTH_TOKEN
		);

		const PainterName =
			paintings[0].fieldOeuvreAuteurs[0].entity.fieldAuteurAuteur.entity
				.name;
		const PainterBirthDate =
			paintings[0].fieldOeuvreAuteurs[0].entity.fieldAuteurAuteur.entity
				.fieldPipDateNaissance.sort;
		const PainterDeathDate =
			paintings[0].fieldOeuvreAuteurs[0].entity.fieldAuteurAuteur.entity
				.fieldPipDateDeces.sort;

		const PaintingID = paintings[0].entityUuid;
		const PaintingImage = paintings[0].fieldVisuels[0].entity.vignette;

		const PainterObject = {
			name: PainterName,
			birthDate: new Date(PainterBirthDate),
			deathDate: new Date(PainterDeathDate),
		};

		const PaintingObject = {
			paintingId: PaintingID,
			image: PaintingImage,
		};

		const painter = await prisma.painters.update({
			where: {
				name: PainterName,
			},
			data: {
				birthDate: new Date(PainterBirthDate),
				deathDate: new Date(PainterDeathDate),
			},
		});

		const painting = await prisma.painting.update({
			where: {
				paintingId: PaintingObject.paintingId,
			},
			data: {
				image: PaintingObject.image,
			},
		});

		const ResultObject = {
			...PainterObject,
			...PaintingObject,
		};

		res.json(ResultObject);
	} catch (err) {
		return next(err);
	}
});

// router.get("/artist/:id", async (req, res, next) => {
// 	let paintings;
// 	try {
// 		paintings = await fetchAPI(
// 			getPaintings(req.params.id),
// 			process.env.API_AUTH_TOKEN
// 		);

// 		res.json(paintings);
// 	} catch (err) {
// 		return next(err);
// 	}
// });

export default router;
