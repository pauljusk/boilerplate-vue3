import { fetcher, baseUrl } from "@/service/http";
import { defineStore } from "pinia";
import { useTodoStore, useAuthStore } from "./";

const defaultUser = {
  username: null,
  password: null,
  firstname: null,
  lastname: null,
  fk_roleId: 1,
};

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [],
    roles: [],
    selectedUser: defaultUser,
    selectedUserId: null,
  }),
  getters: {
    getUserById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id);
    },
    getUserIndexInArrayById: (state) => (id: number) => {
      return state.users.findIndex((user) => user.id === id);
    },
    getRolesObj: (state) => {
      return state.roles.reduce((obj, e) => ({ ...obj, [e.id]: e.name }), {});
    },
    getIsEditMode: (state) => {
      return state.selectedUserId != null;
    },
  },
  actions: {
    selectUser(id: number | null) {
      console.log("id", id);
      if (!id) this.selectedUser = { ...defaultUser };
      else this.selectedUser = { ...this.getUserById(id) };
      this.selectedUserId = id;

      const authStore = useAuthStore();
      if (authStore.getRole !== 1) {
        const todoStore = useTodoStore();
        todoStore.getTodos();
      }
    },
    async getUser(id: number) {
      const results = await fetcher("GET", `${baseUrl}/user/${id}`);
      return results;
    },
    async getUsers() {
      const results = await fetcher("GET", `${baseUrl}/user/`);
      this.users = results;
    },

    async getUserRoles() {
      const results = await fetcher("GET", `${baseUrl}/user/roles`);
      this.roles = results;
    },

    async createUser(payload: object) {
      const results = await fetcher("POST", `${baseUrl}/user/`, payload);
      if (results) {
        this.users.push(results);
        this.selectUser(results.id);
      }
    },
    async updateUser(payload: object) {
      const { id, ...form } = payload;
      await fetcher("PATCH", `${baseUrl}/user/${id}`, form);
      this.users[this.getUserIndexInArrayById(payload.id)] = { ...payload };
    },

    async deleteUser(id) {
      await fetcher("DELETE", `${baseUrl}/user/${id}`);
      this.users.splice(this.getUserIndexInArrayById(id), 1);
    },
  },
});
