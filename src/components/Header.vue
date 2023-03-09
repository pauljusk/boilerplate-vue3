<script setup lang="ts">
  import { useAuthStore } from "../stores/auth.store";
  const authStore = useAuthStore();
  const showUsersLink = {
    "1": false,
    "2": true,
    "3": true,
  };
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3" aria-label="Main navigation">
      <div class="container">
        <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
          <router-link to="/dashboard" class="navbar-brand">Dashboard</router-link>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <ul class="navbar-nav ms-md-auto d-flex">
            <li class="nav-item">
              <a href="#" class="nav-link" @click="authStore.logout()" data-testid="button-logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-power"
                  viewBox="0 0 16 16">
                  <path d="M7.5 1v7h1V1h-1z" />
                  <path
                    d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg>
                Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
