<script setup lang="ts">
import PlayStage from '@/components/PlayStage.vue'
import KeyBinding from './components/KeyBinding.vue';
</script>

<template>
  <PlayStage />
  <KeyBinding v-once />
</template>
