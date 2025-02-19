<script setup lang="ts">
import emojis from '@/assets/emoji_15_0_ordering.json'
import { ref } from 'vue'

const container = ref<HTMLDivElement | null>(null)
const hoverDiv = ref<HTMLDivElement | null>(null)

const categories = [
  {
    'title': 'لبخندها و احساسات',
    'image': '/images/emojis/smileys-and-emotions.png'
  },
  {
    'title': 'مردم',
    'image': '/images/emojis/people.png'
  },
  {
    'title': 'حیوانات و طبیعت',
    'image': '/images/emojis/animals-and-nature.png'
  },
  {
    'title': 'غذا و نوشیدنی',
    'image': '/images/emojis/food-and-drink.png'
  },
  {
    'title': 'سفر و مکان ها',
    'image': '/images/emojis/travel-and-places.png'
  },
  {
    'title': 'فعالیت ها و رویدادها',
    'image': '/images/emojis/activities-and-events.png'
  },
  {
    'title': 'اشیاء',
    'image': '/images/emojis/objects.png'
  },
]

const emit = defineEmits(['tap'])

function fireTap(groupIndex: number, ev: HammerInput) {
  if (!(ev.srcEvent instanceof MouseEvent)) {
    return
  }

  const unit = getUnit()

  const { yindex, xindex, index } = guessIndexes(
    ev.srcEvent.offsetX,
    ev.srcEvent.offsetY,
    unit
  )

  hover(
    ev.target.offsetTop + yindex * unit,
    ev.target.offsetLeft + xindex * unit,
    unit
  )

  const entry = emojis[groupIndex].emoji[index]
  if (entry) {
    const value = String.fromCodePoint(entry.base[0])
    emit('tap', value)
  }
}

function getUnit() {
  if (container.value) {
    return container.value.clientWidth / 8
  }

  return 1
}

function guessIndexes(x: number, y: number, unit: number) {
  const yindex = Math.floor((y / unit))
  const xindex = Math.floor(x / unit)
  const index = yindex * 8 + xindex

  return { yindex, xindex, index }
}

function hover(top: number, left: number, unit: number) {
  if (hoverDiv.value) {
    hoverDiv.value.style.top = `${top}px`
    hoverDiv.value.style.left = `${left}px`
    hoverDiv.value.style.height = `${unit}px`
    hoverDiv.value.style.width = `${unit}px`

    hoverDiv.value.classList.remove('emoji-hover')
    setTimeout(
      () => hoverDiv.value?.classList.add('emoji-hover'),
      1
    )
  }
}

</script>

<template>
  <div ref="container"
    class="relative select-none">
    <div ref="hoverDiv"
      class="absolute bg-slate-100 rounded-xl opacity-0"
      :style="{
        top: 0,
        left: 0
      }" />

    <template v-for="(category, cindex) in categories"
      :key="cindex">
      <h3 class="text-sm font-semibold py-2 px-3 text-slate-300">
        {{ category.title }}
      </h3>

      <img v-touch:tap="(ev: HammerInput) => fireTap(cindex, ev)"
        class="relative"
        :src="category.image">
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
