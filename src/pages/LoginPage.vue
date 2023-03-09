<script setup lang="ts">
  import { ref } from "vue";
  import * as yup from "yup";

  import { useAuthStore } from "../stores/auth.store";
  const errors = ref({});
  const username = ref("");
  const password = ref("");
  const userForm = ref({});

  const authStore = useAuthStore();

  const isLoginValid = ref(true);

  const onSubmit = async () => {
    isLoginValid.value = true;
    const payload = {
      username: username.value,
      password: password.value,
    };
    const response: any = await authStore.login(payload);
    if (!response) isLoginValid.value = false;
  };

  const schema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),
  });

  const login = () => {
    schema
      .validate(userForm.value, { strict: true, abortEarly: false })
      .then(async () => {
        errors.value = {};
        const response: any = await authStore.login(userForm.value);
        if (!response) isLoginValid.value = false;
      })
      .catch((err) => {
        console.log("err", err);
        err.inner.forEach((error) => {
          errors.value[error.path] = error.message;
        });
      });
  };
</script>

<template>
  <section class="d-flex justify-content-center pt-5 mt-5">
    <div>
      <h1 class="text-center pb-3">Welcome to App</h1>
      <div class="card">
        <div class="card-body">
          <div class="text-center">
            <img
              src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
              class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
              width="200px"
              alt="profile" />
          </div>
          <div class="alert alert-danger" role="alert" v-if="!isLoginValid">Username or password is not recognize</div>
          <form @submit.prevent="login" style="width: 22rem">
            <div class="form-floating mb-2">
              <input
                name="username"
                type="text"
                v-model="userForm.username"
                class="form-control"
                data-cy="username-field"
                data-testid="username-field"
                placeholder="First name"
                :class="{ 'is-invalid': errors.username }" />
              <label for="username">Username</label>
              <div class="invalid-feedback">{{ errors.username }}</div>
            </div>

            <div class="form-floating mb-2">
              <input
                name="password"
                type="text"
                v-model="userForm.password"
                class="form-control"
                placeholder="Password"
                data-cy="password-field"
                data-testid="password-field"
                :class="{ 'is-invalid': errors.password }" />
              <label for="password">Password</label>
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>

            <button type="submit" role="submit" class="btn btn-primary w-100" data-cy="submit" data-testid="submit">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .profile-image-pic {
    height: 200px;
    width: 200px;
    object-fit: cover;
  }
</style>
