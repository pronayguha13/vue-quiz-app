<template>
  <MDBBtn color="primary" floating>
    {{ questionNumber }}
  </MDBBtn>
</template>

<script setup lang="ts">
/*-------Third Party Import---------*/
import { defineProps } from "vue";
import { MDBBtn } from "mdb-vue-ui-kit";
/*-------Third Party Import---------*/
const props = defineProps({
  questionNumber: Number,
});
</script>

<style lang="scss" scoped></style>
