<script setup lang="ts">
  import { ref, reactive, computed } from "vue";
  import { useUsersStore, useAuthStore } from "../stores";
  const authStore = useAuthStore();
  const usersStore = useUsersStore();
  const users = computed(() => usersStore.users);
  const roles = computed(() => usersStore.getRolesObj);
  const badgeClassObj = {
    3: "success",
    2: "info",
    1: "warning",
  };
</script>

<template>
  <div>
    <table class="table" data-testid="table-user-list">
      <thead class="bg-light">
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th style="width: 115px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="`row-${i}`">
          <td>
            <p class="fw-bold mb-1">{{ user.firstname }} {{ user.lastname }}</p>
          </td>
          <td>
            <span class="badge rounded-pill text-bg-primary" :class="`text-bg-${badgeClassObj[user.fk_roleId]}`">{{
              roles[user.fk_roleId]
            }}</span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-primary rounded-circle ml-1 mr-2"
              floating
              data-testid="button-select-user"
              @click="usersStore.selectUser(user.id)">
              <i class="icon-item fas fa-edit" role="button"></i>
            </button>
            <button
              v-if="authStore.getRole === 3"
              class="btn btn-sm btn-danger1 btn-outline-danger rounded-circle ms-2"
              floating
              data-testid="button-remove-user"
              @click="usersStore.deleteUser(user.id)">
              <i class="fa fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
