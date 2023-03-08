<script setup>
import { getRandomPainters, getRandomPainting } from "@/services/painters";
</script>

<template>
	<h1>Quizz ({{ count }}/10)</h1>

	<h2>Qui a peint cete œuvre ?</h2>

	<img :src="painting.image" alt="" />

	<div class="row">
		<div class="col-6" v-for="(painter, idx) in painters" :key="idx">
			<button :value="painter.id" @click="checkAnswer">
				{{ painter.name }}
			</button>
		</div>
	</div>

	<RouterLink to="/game">
		<button @click="nextRound">Next</button>
	</RouterLink>
</template>

<script>
export default {
	name: "Quizz",
	data() {
		return {
			painters: null,
			painting: {},
			randomPainter: null,
			count: 1,
			score: 0,
		};
	},
	created() {
		this.test();
	},

	methods: {
		async test() {
			this.painters = await getRandomPainters();

			this.randomPainter =
				this.painters[
					Math.floor(Math.random() * this.painters.length)
				].id;

			console.log(this.randomPainter);

			this.painting = await getRandomPainting(this.randomPainter);

			console.log(this.painting);
		},
		checkAnswer(e) {
			console.log(e.target.value);
			if (e.target.value == this.painting.painterId) {
				console.log("Bonne réponse");
				e.target.classList.add("goodAnswer");
				this.score++;
			} else {
				console.log("Mauvaise réponse");
				e.target.classList.add("badAnswer");
			}
		},
		nextRound() {
			// increment count and get new painting
			if (this.count > 10) {
				this.$router.push("/score");
			} else {
				this.count++;
				this.test();
			}
		},
	},
};
</script>

<style scoped lang="scss">
$goodAnswer: #0aa607;
$badAnswer: #a52853;

.goodAnswer {
	background-color: $goodAnswer;
}

.badAnswer {
	background-color: $badAnswer;
}
</style>
