<template>
	<section class="d-flex flex-column justify-content-between">
		<div class="mt-5">
			<h1 class="text-center">Score : {{ score }}</h1>
			<h2 class="infosScore text-center h4">{{ message }}</h2>
		</div>
		<router-link to="/game" class="mb-5">
			<button class="scoreBtn">Rejouer</button>
		</router-link>
	</section>
</template>

<script>
export default {
	data() {
		return {
			score: undefined,
			message: null,
		};
	},
	created() {
		this.score = this.$route.params.score;
	},
	mounted() {
		this.scoreMessage();
	},
	methods: {
		scoreMessage() {
			const infosScore = document.querySelector(".infosScore");
			if (0 < this.score && this.score < 5) {
				this.message = "Pas mal !";
				infosScore.classList.add("infosScore-bad");
			} else if (5 <= this.score && this.score < 10) {
				this.message = "Bravo !";
				infosScore.classList.add("infosScore-medium");
			} else if (this.score == 10) {
				this.message = "Excellent !";
				infosScore.classList.add("infosScore-good");
			}
		},
	},
};
</script>

<style scoped lang="scss">
$goodScore: #0aa607;
$mediumScore: orange;
$badScore: #a52853;

section {
	height: 100vh;

	.infosScore-bad {
		color: $badScore;
	}
	.infosScore-medium {
		color: $mediumScore;
	}
	.infosScore-good {
		color: $goodScore;
	}

	.scoreBtn {
		background-color: #bababa;
		border: none;
		border-radius: 5px;
		margin: 10px 0;
		width: 100%;
		height: 80px;
	}
}
</style>
