<template>
  <MDBCard class="intro-card">
    <MDBCardBody>
      <MDBCardTitle>Let's test your knowledge!</MDBCardTitle>
      <MDBDropdown btnGroup v-model="isDropdownVisible">
        <MDBBtn color="primary" :loading="loading">{{
          difficulty.length ? difficulty.toUpperCase() : "Select a difficulty"
        }}</MDBBtn>
        <MDBDropdownToggle
          split
          size="lg"
          @click="toggleDropdownVisibility"
          :disabled="loading"
        />
        <MDBDropdownMenu>
          <MDBDropdownItem
            href="#"
            :id="DIFFICULTY.LEVEL.EASY"
            @click="onClickDropdownItem"
            >{{ DIFFICULTY.TEXT.EASY }}</MDBDropdownItem
          >
          <MDBDropdownItem
            href="#"
            :id="DIFFICULTY.LEVEL.MEDIUM"
            @click="onClickDropdownItem"
            >{{ DIFFICULTY.TEXT.MEDIUM }}</MDBDropdownItem
          >
          <MDBDropdownItem
            href="#"
            :id="DIFFICULTY.LEVEL.HARD"
            @click="onClickDropdownItem"
            >{{ DIFFICULTY.TEXT.HARD }}</MDBDropdownItem
          >
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBCardBody>
    <!-- <MDBCardFooter> -->
    <MDBBtn
      color="success"
      size="lg"
      @click="onSubmit"
      :disabled="isSubmitButtonDisabled || loading"
    >
      {{ loading ? "Loading" : "Start Quiz" }}
    </MDBBtn>
  </MDBCard>
</template>

<script setup lang="ts">
/*-------Third Party Import---------*/
import { ref, onMounted, onUnmounted } from "vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
} from "mdb-vue-ui-kit";
/*-------Third Party Import---------*/
/*-------Local Import---------*/
import router from "@/router";
/*-------Local Import---------*/
/*-------Constants Import---------*/
import DIFFICULTY from "@/constants/Difficulty";
/*-------Constants Import---------*/
/*-------Ref Declarations---------*/
const loading = ref<boolean>(true);
const difficulty = ref<string>("");
const isDropdownVisible = ref<boolean>(false);
const isSubmitButtonDisabled = ref<boolean>(true);
/*-------Ref Declarations---------*/
/*-------Method Declarations---------*/
/**
 * @description Function to toggle the visibility state of the dropdown
 */
const toggleDropdownVisibility = (): void => {
  isDropdownVisible.value = !isDropdownVisible.value;
};
/**
 * @description Function to handle the click on the dropdown item
 * @param {MouseEvent} event
 */
const onClickDropdownItem = (event: MouseEvent): void => {
  event.stopImmediatePropagation();
  if (event.target) {
    difficulty.value = (event.target as HTMLElement).id;
    isSubmitButtonDisabled.value = false;
  }
  toggleDropdownVisibility();
};
const onSubmit = (): void => {
  localStorage.setItem("DIFFICULTY", difficulty.value);
  router.push("/quiz");
};
/*-------Method Declarations---------*/
/*-------Lifecycle---------*/
onMounted(() => {
  localStorage.removeItem("DIFFICULTY");
  loading.value = false;
});
onUnmounted(() => {
  loading.value = true;
});
/*-------Lifecycle---------*/
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.card {
  width: 50%;
  box-shadow: 0 0px 15px -3px #00000012, 0 4px 6px -2px #0000000d;
}

.card-title {
  font-size: 2rem;
  font-family: "Poppins", sans-serif;
}
</style>
