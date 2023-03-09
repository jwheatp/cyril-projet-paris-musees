<script setup></script>

<template>
	<section class="d-flex flex-column justify-content-between">
		<div>
			<h1 class="text-center mt-5">Paris Musée</h1>
			<h2 class="text-center h4 mt-5">
				Teste ta culture sur les oeuvres des plus grands peintres !!!
			</h2>
		</div>

		<RouterLink to="/game" class="mb-5">
			<button class="startBtn">Start Game</button>
		</RouterLink>
	</section>
</template>

<style scoped lang="scss">
section {
	width: 100vw;
	height: 100vh;

	.startBtn {
		background-color: #bababa;
		border: none;
		border-radius: 5px;
		margin: 10px 0;
		width: 100%;
		height: 80px;
	}
}
</style>
