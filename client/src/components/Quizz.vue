<script setup>
import { getRandomPainters, getRandomPainting } from "@/services/painters";
</script>

<template>
	<section
		class="d-flex flex-column align-items-center justify-content-around"
	>
		<div class="d-flex flex-column align-items-center">
			<h1>Quizz ({{ count }}/10)</h1>
			<h2>Qui a peint cette œuvre ?</h2>
		</div>
		<div>
			<img class="img-fluid" :src="painting.image" alt="" />
		</div>

		<div class="row mx-2">
			<div
				class="col-6 my-2"
				v-for="(painter, idx) in painters"
				:key="idx"
			>
				<button
					class="answerBtn"
					:value="painter.id"
					:disabled="answered"
					@click="checkAnswer"
				>
					{{ painter.name }}
				</button>
			</div>
		</div>

		<div class="infos d-flex">
			<p class="infosMessage">{{ message }}</p>
			<button class="infosBtn" @click="nextRound" v-if="answered">
				<img src="@/assets/arrow.svg" alt="" />
			</button>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			painters: null,
			painting: {},
			randomPainter: null,
			count: 1,
			score: 0,
			message: "choisissez une réponse",
			answered: false,
		};
	},
	created() {
		this.getDatas();
	},

	methods: {
		async getDatas() {
			this.painters = await getRandomPainters();

			this.randomPainter =
				this.painters[
					Math.floor(Math.random() * this.painters.length)
				].id;

			console.log(this.randomPainter);

			this.painting = await getRandomPainting(this.randomPainter);

			console.log(this.painting);
		},
		resetAnswerButtons() {
			const buttons = document.querySelectorAll(".answerBtn");
			buttons.forEach((button) => {
				button.classList.remove("goodAnswer");
				button.classList.remove("badAnswer");
				button.classList.remove("systemAnswer");
			});
		},

		resetInfos() {
			this.message = "choisissez une réponse";
			this.answered = false;
			const infosMessage = document.querySelector(".infosMessage");
			infosMessage.classList.remove("infosMessage-goodAnswer");
			infosMessage.classList.remove("infosMessage-badAnswer");
		},
		checkAnswer(e) {
			console.log(e.target.value);
			this.answered = true;
			if (e.target.value == this.painting.painterId) {
				console.log("Bonne réponse");
				e.target.classList.add("goodAnswer");
				this.message = "Bonne réponse";
				const infosMessage = document.querySelector(".infosMessage");
				infosMessage.classList.add("infosMessage-goodAnswer");
				this.score++;
			} else {
				console.log("Mauvaise réponse");
				e.target.classList.add("badAnswer");
				const goodAnswer = document.querySelector(
					`button[value="${this.painting.painterId}"]`
				);
				goodAnswer.classList.add("systemAnswer");
				this.message = "Mauvaise réponse";
				const infosMessage = document.querySelector(".infosMessage");
				infosMessage.classList.add("infosMessage-badAnswer");
			}
		},
		nextRound() {
			this.count++;
			if (this.count > 10) {
				// aller a la page score avec le score en props
				this.$router.push({
					name: "score",
					params: { score: this.score },
				});
			} else {
				this.getDatas();
				this.resetAnswerButtons();
				this.resetInfos();
			}
		},
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/_variables.scss";
@import "node_modules/bootstrap/scss/bootstrap.scss";
$goodAnswer: #0aa607;
$badAnswer: #a52853;

section {
	height: 100vh;

	h2 {
		margin: 0;
	}

	h1 {
		border-bottom: 2px solid $background2;
	}

	.answerBtn {
		background-color: #e6e6e6;
		border: none;
		font-family: "Roboto", sans-serif;
		font-size: 16px;
		font-weight: 700;
		line-height: 19px;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 45px;
	}

	.goodAnswer {
		border: 4px solid $goodAnswer;
	}

	.systemAnswer {
		border: 4px solid $background1;
	}

	.badAnswer {
		background-color: $badAnswer;
		color: #ffffff;
	}

	.infos {
		width: 100%;
		height: 50px;
		@extend .d-flex, .justify-content-around, .align-items-center;
		.infosMessage {
			margin: 0;
			color: #000;
			font-weight: 500;
			font-style: italic;
			&-goodAnswer {
				color: $goodAnswer;
				font-style: normal;
			}

			&-badAnswer {
				color: $badAnswer;
				font-style: normal;
			}
		}
		.infosBtn {
			padding: 0;
			width: 50px;
			height: 50px;
			border: none;
			border-radius: 5px;
			background-color: $background2;
		}
	}
}
</style>
