<script setup lang="ts">
  import { useTodoStore } from "../stores";
  const todoStore = useTodoStore();
</script>

<template>
  <form @submit.prevent="todoStore.addTodo" data-testid="form-todo">
    <div class="row g-3 align-items-center">
      <div class="col-auto">
        <label for="inputPassword6" class="col-form-label">To do</label>
      </div>
      <div class="col-auto">
        <input name="todo" data-testid="field-todo" v-model="todoStore.selectedTodo.value" />
      </div>
      <div class="col-auto">
        <button type="submit" role="submit" class="btn btn-primary w-100" data-testid="button-submit">
          <i class="bi bi-plus-circle"></i> add todo
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
