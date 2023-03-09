import { fetcher, baseUrl } from "@/service/http";
import http from "../utils/http";
import { tokenAlive, jwtDecrypt } from "@/service/jwtHelper";
import { defineStore } from "pinia";
import { router } from "../router";
import { useUsersStore } from "./";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authData: { tokenExp: null, userId: null, roleId: null },
  }),
  getters: {
    isTokenActive(state) {
      if (!state.authData.tokenExp) {
        return false;
      }
      return tokenAlive(state.authData.tokenExp);
    },
    getRole(state) {
      return state.authData.roleId;
    },
  },
  actions: {
    getToken() {
      return localStorage.getItem("token");
    },
    setToken(token) {
      localStorage.setItem("token", token);
    },
    logout() {
      localStorage.removeItem("token");
      router.push("/login");
    },
    async login(payload: object) {
      const response = await http.post(`${baseUrl}/auth/login`, payload);
      if (response) {
        this.setToken(response.data);
        this.initDataFromLocalStorage();
        router.push("/dashboard");
      }
    },

    initDataFromLocalStorage() {
      if (this.getToken()) {
        const jwtDecodedValue = jwtDecrypt(this.getToken());
        const newTokenData = {
          tokenExp: jwtDecodedValue.exp,
          userId: jwtDecodedValue.sub,
          roleId: jwtDecodedValue.roleId,
        };
        this.authData = newTokenData;

        const usersStore = useUsersStore();
        if (!usersStore.selectedUserId) usersStore.selectedUserId = jwtDecodedValue.sub;
      }
    },
  },
});
