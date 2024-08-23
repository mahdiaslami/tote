<script setup lang="ts">
import emojis from '@/assets/emoji_15_0_ordering.json'
import { onMounted, reactive, ref } from 'vue';

const container = ref<HTMLDivElement | null>(null)
const hoverDiv = ref<HTMLDivElement | null>(null)

const data = reactive({
  width: 0,
  unit: 1,
})

const categories = [
  { "title": "لبخندها و احساسات", "image": "/images/emojis/smileys-and-emotions.png" },
  { "title": "مردم", "image": "/images/emojis/people.png" },
  { "title": "حیوانات و طبیعت", "image": "/images/emojis/animals-and-nature.png" },
  { "title": "غذا و نوشیدنی", "image": "/images/emojis/food-and-drink.png" },
  { "title": "سفر و مکان ها", "image": "/images/emojis/travel-and-places.png" },
  { "title": "فعالیت ها و رویدادها", "image": "/images/emojis/activities-and-events.png" },
  { "title": "اشیاء", "image": "/images/emojis/objects.png" },
]

const emit = defineEmits(['tap'])

onMounted(() => {
  if (container.value) {
    data.width = container.value.clientWidth
    data.unit = data.width / 8
  }
})

function fireTap(groupIndex: number, ev: HammerInput) {
  if (!(ev.srcEvent instanceof MouseEvent)) {
    return
  }

  const { yindex, xindex, index } = guessIndexes(
    ev.srcEvent.offsetX,
    ev.srcEvent.offsetY
  )

  hover(
    ev.target.offsetTop + yindex * data.unit,
    ev.target.offsetLeft + xindex * data.unit
  )

  const entry = emojis[groupIndex].emoji[index]
  if (entry) {
    const value = String.fromCodePoint(entry.base[0])
    emit('tap', value)
  }
}

function guessIndexes(x: number, y: number) {
  const yindex = Math.floor((y / data.unit))
  const xindex = Math.floor(x / data.unit)
  const index = yindex * 8 + xindex

  return { yindex, xindex, index }
}

function hover(top: number, left: number) {
  if (hoverDiv.value) {
    hoverDiv.value.style.top = `${top}px`
    hoverDiv.value.style.left = `${left}px`

    hoverDiv.value.classList.remove('emoji-hover')
    setTimeout(
      () => hoverDiv.value?.classList.add('emoji-hover'),
      1
    )
  }
}

let hammer
const vTap = {
  mounted(el: HTMLElement, { value }: { value: HammerListener }) {
    hammer = new Hammer(el)

    hammer.on('tap', value)
  }
}

</script>

<template>
  <div ref="container"
    class="relative select-none">

    <div ref="hoverDiv"
      class="absolute bg-secondary-2 rounded-xl opacity-0"
      :style="{ top: 0, left: 0, height: `${data.unit}px`, width: `${data.unit}px` }"></div>

    <template v-for="(category, cindex) in categories"
      :key="cindex">
      <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">{{ category.title }}</h3>
      <img class="relative"
        :src="category.image"
        v-tap="(ev) => fireTap(0, ev)" />
    </template>
  </div>
</template>

<style>
@keyframes emojihover {

  0%,
  99% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.emoji-hover {
  animation: emojihover 75ms 1;
}
</style>







