<template>
	<div class="relative w-full" :id="id" data-carousel="slide">
		<!-- Carousel wrapper -->
		<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
			<!-- Carousel items -->
			<div
				v-for="(slide, index) in slides"
				:key="index"
				class="duration-700 ease-in-out"
				:class="{
					block: currentSlide === index,
					hidden: currentSlide !== index,
				}"
				data-carousel-item
			>
				<img
					:src="slide.image"
					class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
					:alt="slide.alt || ''"
				/>
			</div>
		</div>

		<!-- Slider indicators -->
		<div
			class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
		>
			<button
				v-for="(_, index) in slides"
				:key="`indicator-${index}`"
				type="button"
				class="w-3 h-3 rounded-full"
				:class="{
					'bg-white': currentSlide === index,
					'bg-white/50': currentSlide !== index,
				}"
				:aria-current="currentSlide === index"
				:aria-label="`Slide ${index + 1}`"
				@click="goToSlide(index)"
			></button>
		</div>

		<!-- Slider controls -->
		<button
			type="button"
			class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
			@click="prevSlide"
		>
			<span
				class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
			>
				<svg
					class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 6 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 1 1 5l4 4"
					/>
				</svg>
				<span class="sr-only">Previous</span>
			</span>
		</button>
		<button
			type="button"
			class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
			@click="nextSlide"
		>
			<span
				class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
			>
				<svg
					class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 6 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 9 4-4-4-4"
					/>
				</svg>
				<span class="sr-only">Next</span>
			</span>
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue"

interface Slide {
	image: string
	alt?: string
}

export default defineComponent({
	name: "Carousel",
	props: {
		slides: {
			type: Array as () => Slide[],
			required: true,
		},
		autoplay: {
			type: Boolean,
			default: true,
		},
		interval: {
			type: Number,
			default: 3000,
		},
		id: {
			type: String,
			default: "carousel",
		},
	},
	setup(props) {
		const currentSlide = ref(0)
		let autoplayInterval: number | null = null

		const nextSlide = () => {
			currentSlide.value = (currentSlide.value + 1) % props.slides.length
		}

		const prevSlide = () => {
			currentSlide.value =
				(currentSlide.value - 1 + props.slides.length) %
				props.slides.length
		}

		const goToSlide = (index: number) => {
			currentSlide.value = index
			resetAutoplay()
		}

		const startAutoplay = () => {
			if (props.autoplay && props.slides.length > 1) {
				autoplayInterval = window.setInterval(() => {
					nextSlide()
				}, props.interval)
			}
		}

		const stopAutoplay = () => {
			if (autoplayInterval) {
				clearInterval(autoplayInterval)
				autoplayInterval = null
			}
		}

		const resetAutoplay = () => {
			stopAutoplay()
			startAutoplay()
		}

		onMounted(() => {
			startAutoplay()
		})

		onBeforeUnmount(() => {
			stopAutoplay()
		})

		return {
			currentSlide,
			nextSlide,
			prevSlide,
			goToSlide,
		}
	},
})
</script>
