<template>
  <div class="option-container lead">{{ option }}</div>
</template>

<script setup lang="ts">
/*-----Third Party Import-----*/
import { defineProps } from "vue";
/*-----Third Party Import-----*/
/*-----Props declaration-----*/
const props = defineProps({
  option: { type: String, required: true },
});
/*-----Props declaration-----*/
</script>

<style scoped>
.option-container {
  width: 100%;
  padding: 0.75rem 0;
  box-shadow: 0 0px 15px 10px #00000012, 0 4px 6px -2px #0000000d;
  cursor: pointer;
}

.option-container:hover {
  background-color: #1266f1;
  color: #fbfbfb;
  font-weight: 600;
}
</style>
