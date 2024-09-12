<script setup lang="ts">
import anime from 'animejs/lib/anime.es'
import { ref, watch } from 'vue'


type Easing = 'linear' |
  'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeOutInQuad' |
  'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeOutInCubic' |
  'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeOutInQuart' |
  'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeOutInQuint' |
  'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeOutInSine' |
  'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeOutInExpo' |
  'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeOutInCirc' |
  'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeOutInBack' |
  'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce' | 'easeOutInBounce'

const transitionEl = ref(null)

const props = defineProps<{
  from: object
  to: object
  duration: number
  easing: Easing
}>()

watch(
  props,
  () => {
    if (transitionEl.value) {
      anime({
        targets: transitionEl.value,
        keyframes: [props.to, props.to],
        duration: props.duration,
        direction: 'normal',
        loop: false,
        autoplay: false,
        easing: props.easing,
      }).play()
    }
  }
)

function handleEnter(el: any, done: any) {
  anime({
    targets: el,
    keyframes: [props.from, props.to],
    duration: props.duration,
    direction: 'normal',
    loop: false,
    autoplay: false,
    easing: props.easing,
    complete: done
  }).play()
}

function handleLeave(el: any, done: any) {
  anime({
    targets: el,
    keyframes: [props.to, props.from],
    duration: props.duration,
    direction: 'normal',
    loop: false,
    autoplay: false,
    easing: props.easing,
    complete: done
  }).play()
}

</script>

<template>
  <Transition ref="transitionEl"
    :css="false"
    @before-enter="(el: any) => anime.set(el, from)"
    @enter="handleEnter"
    @before-leave="(el: any) => anime.set(el, to)"
    @leave="handleLeave">
    <slot />
  </Transition>
</template>