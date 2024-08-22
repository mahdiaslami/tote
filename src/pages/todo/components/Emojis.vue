<script setup lang="ts">
import emojis from '@/assets/emojis/emoji_15_0_ordering.json'
import { onMounted, reactive, ref } from 'vue';

const container = ref<HTMLDivElement | null>(null)
const hoverDiv = ref<HTMLDivElement | null>(null)

const data = reactive({
  width: 0,
  unit: 1,
})

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
    hoverDiv.value.style.display = 'block'
    setTimeout(
      () => { if (hoverDiv.value) hoverDiv.value.style.display = 'none' },
      50
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
      class="absolute bg-secondary rounded-xl -z-10"
      :style="{ display: 'none', top: 0, left: 0, height: `${data.unit}px`, width: `${data.unit}px` }"></div>

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">لبخندها و احساسات</h3>
    <img src="@/assets/emojis/smileys-and-emotions.png"
      v-tap="(ev) => fireTap(0, ev)" />

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">مردم</h3>
    <img src="@/assets/emojis/people.png"
      v-tap="(ev) => fireTap(1, ev)" />

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">حیوانات و طبیعت</h3>
    <img src="@/assets/emojis/animals-and-nature.png"
      v-tap="(ev) => fireTap(2, ev)" />

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">غذا و نوشیدنی</h3>
    <img src="@/assets/emojis/food-and-drink.png"
      v-tap="(ev) => fireTap(3, ev)" />

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">سفر و مکان ها</h3>
    <img src="@/assets/emojis/travel-and-places.png"
      v-tap="(ev) => fireTap(4, ev)" />

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">فعالیت ها و رویدادها</h3>
    <img src="@/assets/emojis/activities-and-events.png"
      v-tap="(ev) => fireTap(5, ev)" />

    <h3 class="text-sm font-semibold py-2 px-3 text-pen/30">اشیاء</h3>
    <img src="@/assets/emojis/objects.png"
      v-tap="(ev) => fireTap(6, ev)" />
  </div>
</template>









