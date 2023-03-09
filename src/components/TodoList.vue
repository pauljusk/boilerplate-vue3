<script setup lang="ts">
  import { ref, reactive, computed } from "vue";
  import { useTodoStore } from "../stores";
  const todoStore = useTodoStore();
  const todos = computed(() => todoStore.items);
</script>
<template>
  <div>
    <table class="align-middle mb-0 bg-white table" data-testid="todo-list">
      <thead class="bg-light">
        <tr>
          <th>Todos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, i) in todos" :key="`row-${i}`">
          <td>
            <template v-if="todoStore.editingItems.includes(todo.id)">
              <input
                type="text"
                id="calories"
                v-model="todoStore.newTodoValue[todo.id]"
                class="custom-input w-50"
                data-testid="field-edit-todo" />
              <button
                class="btn btn-sm btn-success ms-3"
                @click="todoStore.updateTodo(todo.id)"
                data-testid="button-update-todo">
                <i class="bi bi-check"></i>
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-sm btn-danger me-3"
                @click="todoStore.removeTodo(todo.id)"
                data-testid="button-delete-todo">
                <i class="bi bi-x-square"></i>
              </button>
              {{ todo.value }}
              <button
                class="btn btn-sm btn-link rounded-circle ms-3"
                @click="todoStore.selectTodoIdForEditing(todo.id, todo.value)"
                data-testid="button-edit-todo">
                <i class="bi bi-pencil"></i>
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
