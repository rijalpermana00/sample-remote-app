<template>
	<!-- <div class="container mx-auto p-4"> -->
	<Carousel :slides="carouselSlides" />
	<!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import Carousel from "./components/Carousel.vue"

export default defineComponent({
	name: "CarouselApp",
	components: {
		Carousel,
	},
	setup() {
		const carouselSlides = ref([
			{
				image: "https://fastly.picsum.photos/id/343/800/400.jpg?hmac=rw3qlVNz_9zug1WCYSIT5Noiik4QhGfbkoQ5QIuSAJY",
				alt: "Slide 1",
			},
			{
				image: "https://fastly.picsum.photos/id/874/800/400.jpg?hmac=yXDgXAY1EN8b9fMUJIbmztGYHLy1VdhMM4iRT5CDYj8",
				alt: "Slide 2",
			},
			{
				image: "https://fastly.picsum.photos/id/136/800/400.jpg?hmac=92e0Q-kMPMboq9-oGdzv7_9d8XVWXir_yzeiz_yaFgo",
				alt: "Slide 3",
			},
			{
				image: "https://fastly.picsum.photos/id/353/800/400.jpg?hmac=78LOJqiFyiDTD1Tyg-Ej4unBAQYc5k0sG4B64n9wvUI",
				alt: "Slide 4",
			},
			{
				image: "https://fastly.picsum.photos/id/864/800/400.jpg?hmac=cTnmbdOfnIZyxFzsDYZJIJDjqPX0AUx7A5TfwrChWes",
				alt: "Slide 5",
			},
		])

		return {
			carouselSlides,
		}
	},
})
</script>
