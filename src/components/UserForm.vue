<script setup lang="ts">
  import { ref, reactive, computed } from "vue";
  import { useUsersStore } from "../stores";
  import * as yup from "yup";

  const errors = ref({});

  const usersStore = useUsersStore();
  const userForm = computed(() => usersStore.selectedUser);
  const roles = computed(() => usersStore.roles);
  const submitText = computed(() => (usersStore.getIsEditMode ? "Update" : "Create"));

  const setUser = () => {
    schema
      .validate(userForm.value, { strict: true, abortEarly: false })
      .then(async () => {
        errors.value = {};
        usersStore.getIsEditMode
          ? await usersStore.updateUser({ ...userForm.value })
          : await usersStore.createUser({ ...userForm.value });
      })
      .catch((err) => {
        err.inner.forEach((error) => {
          errors.value[error.path] = error.message;
        });
      });
  };

  const schema = yup.object({
    firstname: yup.string().required("Please enter first name"),
    lastname: yup.string().required("Please enter first name"),
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),
  });
</script>

<template>
  <div>
    <button class="btn btn-info" type="button" @click="usersStore.selectUser()" data-testid="button-new-user">
      New User
    </button>
    <br />
    <br />
    <form @submit.prevent="setUser">
      <div class="row g-2">
        <div class="col">
          <div class="form-floating mb-2">
            <input
              name="firstname"
              type="text"
              v-model="userForm.firstname"
              data-testid="field-firstname"
              class="form-control"
              placeholder="First name"
              :class="{ 'is-invalid': errors.firstname }" />
            <label for="firstname">First name</label>
            <div class="invalid-feedback">{{ errors.firstname }}</div>
          </div>
        </div>
        <div class="col">
          <div class="form-floating mb-2">
            <div class="form-floating mb-2">
              <input
                name="lastname"
                type="text"
                v-model="userForm.lastname"
                data-testid="field-lastname"
                class="form-control"
                placeholder="Last name"
                :class="{ 'is-invalid': errors.lastname }" />
              <label for="lastname">Last name</label>
              <div class="invalid-feedback">{{ errors.lastname }}</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <select
              class="form-select"
              id="roleSelect"
              aria-label="Role"
              v-model="userForm.fk_roleId"
              data-testid="field-role">
              <option v-for="role in roles" :value="role.id" :key="`role-${role.id}`">
                {{ role.name }}
              </option>
            </select>

            <label for="roleSelect">Role</label>
          </div>
        </div>
      </div>

      <div class="row g-2">
        <div class="col-md">
          <div class="form-floating mb-2">
            <input
              name="username"
              type="text"
              v-model="userForm.username"
              data-testid="field-username"
              class="form-control"
              placeholder="Username"
              :class="{ 'is-invalid': errors.username }" />
            <label for="username">Username</label>
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>
        </div>

        <div class="col-md">
          <div class="form-floating mb-2">
            <input
              name="password"
              type="text"
              v-model="userForm.password"
              data-testid="field-password"
              class="form-control"
              placeholder="Password"
              :class="{ 'is-invalid': errors.password }" />
            <label for="password">Password</label>
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <button class="btn btn-success" type="submit" data-testid="button-submit-user-form">{{ submitText }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
