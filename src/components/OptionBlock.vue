<template>
  <div
    class="option-container lead"
    :class="{ 'correct-selection': isSuccess }"
    @click="handleOptionClick"
  >
    {{ decodeHTMLEntities(option.value) }}
  </div>
</template>

<script setup lang="ts">
/*-----Third Party Import-----*/
import { defineProps, defineEmits, ref, watch } from "vue";
/*-----Third Party Import-----*/
/*-----Interface Import-----*/
import { Option } from "@/interfaces/Interface";
/*-----Interface Import-----*/
/*-----Utility Import-----*/
import { decodeHTMLEntities } from "@/utils/helper";
/*-----Utility Import-----*/
/*-----Props declaration-----*/
const props = defineProps({
  option: { type: Object as () => Option, required: true },
});
/*-----Props declaration-----*/
/*-----Emit declaration-----*/
const emit = defineEmits(["correct-selection", "incorrect-selection"]);
/*-----Emit declaration-----*/
/*-----Ref declaration-----*/
const isSuccess = ref<boolean>(false);
/*-----Ref declaration-----*/
/*-----Methods declaration-----*/
/**
 * @description Function to handle the click on the option and event correct-selection/incorrect-selection based on the correctness
 */
const handleOptionClick = (): void => {
  if (props.option.isCorrect) {
    isSuccess.value = true;
    emit("correct-selection");
  } else {
    window.alert("Incorrect!");
    emit("incorrect-selection");
    isSuccess.value = false;
  }
};
/*-----Methods declaration-----*/
/*-----Watcher-----*/
watch(
  () => props.option.value,
  () => {
    isSuccess.value = false;
  }
);
/*-----Watcher-----*/
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

.correct-selection {
  background-color: #00b74a;
  color: #fbfbfb;
}
</style>
