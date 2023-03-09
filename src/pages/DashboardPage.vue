<script setup lang="ts">
  import { onBeforeMount } from "vue";
  import TodoList from "../components/TodoList.vue";
  import TodoForm from "../components/TodoForm.vue";
  import uiLoader from "../components/UILoader.vue";
  import UserForm from "../components/UserForm.vue";
  import UserList from "../components/UserList.vue";
  import { useTodoStore, useUsersStore, useAuthStore } from "../stores";
  const todoStore = useTodoStore();
  const authStore = useAuthStore();
  const usersStore = useUsersStore();

  onBeforeMount(async () => {
    // Dor Admin and manager let's load more date
    if ([2, 3].includes(authStore.authData.roleId)) {
      await usersStore.getUserRoles();
      await usersStore.getUsers();
    }
    usersStore.selectedUserId = authStore.authData.userId;
    await todoStore.getTodos();
  });
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col-md-5">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <!-- <uiLoader></uiLoader> -->
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-7" v-if="authStore.getRole !== 1">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <UserForm v-if="authStore.getRole === 3" />
            <UserList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .temp {
    width: 35rem;
    margin: auto;
  }
</style>
