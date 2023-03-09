<script setup lang="ts">
  import { onBeforeMount } from "vue";
  import TodoList from "../components/TodoList.vue";
  import TodoForm from "../components/TodoForm.vue";
  import UserForm from "../components/UserForm.vue";
  import UserList from "../components/UserList.vue";
  import { useTodoStore, useUsersStore, useAuthStore } from "../stores";
  const todoStore = useTodoStore();
  const authStore = useAuthStore();
  const usersStore = useUsersStore();

  onBeforeMount(async () => {
    // Adming or manager
    if ([2, 3].includes(authStore.authData.roleId)) {
      await usersStore.getUserRoles();
      await usersStore.getUsers();
    } else {
      usersStore.selectedUserId = authStore.authData.userId;
      await todoStore.getTodos();
    }
  });

  const templatePerRole = {
    "1": [
      {
        class: "col-md-12",
        components: [TodoForm, TodoList],
      },
    ],
    "2": [
      {
        class: "col-md-5",
        components: [TodoForm, TodoList],
      },
      {
        class: "col-md-7",
        components: [UserList],
      },
    ],
    "3": [
      {
        class: "col-md-5",
        components: [TodoForm, TodoList],
      },
      {
        class: "col-md-7",
        components: [UserForm, UserList],
      },
    ],
  };
</script>

<template>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <template v-for="item in templatePerRole[authStore.authData.userId]">
      <div :class="item.class">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <template v-for="component in item.components">
                <component :is="component"></component>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
