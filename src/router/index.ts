import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes: [
    { path: "/login", name: "login", component: () => import("../pages/LoginPage.vue") },
    { path: "/dashboard", name: "dashboard", component: () => import("../pages/DashboardPage.vue") },
    { path: "/:catchAll(.*)", redirect: "/login" },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    const auth = useAuthStore();
    if (!auth.isTokenActive) auth.initDataFromLocalStorage();
    if (!auth.isTokenActive) return "/login";
  }
});
