import axios from "axios";

const baseUrl = "http://localhost:3000/v1/painters/";

export async function getRandomPainters() {
	const response = await axios.get(`${baseUrl}random`);
	return response.data;
}

export async function getRandomPainting(id) {
	const response = await axios.get(`${baseUrl}${id}/painting/random`);
	return response.data;
}
