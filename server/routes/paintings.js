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

		let PainterName =
			paintings[0].fieldOeuvreAuteurs[0].entity.fieldAuteurAuteur.entity
				.name;
		const strPainterName = PainterName.split(", ");
		PainterName = `${strPainterName[1]} ${strPainterName[0]}`;

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
			birthDate: PainterBirthDate,
			deathDate: PainterDeathDate,
		};

		const PaintingObject = {
			paintingId: PaintingID,
			image: PaintingImage,
		};

		const painter = await prisma.painters.update({
			where: {
				name: "Gustave Courbet",
			},
			data: {
				birthDate: PainterObject.birthDate,
				deathDate: PainterObject.deathDate,
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

		const ResultObject = Object.assign(PaintingObject, PainterObject);

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
