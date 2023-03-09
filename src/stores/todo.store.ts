import { fetcher, baseUrl } from "@/service/http";
import { defineStore } from "pinia";
import { useUsersStore, useAuthStore } from "./";

export type Nullable<T> = T | null;

export interface Todo {
  id: Nullable<number>;
  fk_userId?: Nullable<number>;
  isDone?: Nullable<number>;
  value: Nullable<string>;
}

export interface TodoState {
  items: Array<Todo>;
  editingItems: number[];
  newTodoValue: { [key: number]: string };
  selectedTodo: Todo;
  selectedTodoId: Nullable<number>;
}

const defaultItem: Todo = {
  value: null,
  isDone: 0,
  id: null,
};

export const useTodoStore = defineStore({
  id: "todo",
  state: (): TodoState => ({
    items: [],
    editingItems: [],
    newTodoValue: {},
    selectedTodo: { ...defaultItem },
    selectedTodoId: null,
  }),
  getters: {
    getTodoById: (state) => (id: Number) => {
      return state.items.find((item: Todo) => item.id === id);
    },
    getTodoIndexInArrayById: (state) => (id: Number) => {
      return state.items.findIndex((item: Todo) => item.id === id);
    },
    getEditingTodoIndexInArrayById: (state) => (id: Number) => {
      return state.editingItems.findIndex((editingId) => editingId === id);
    },
  },
  actions: {
    selectTodo(id: Nullable<number>) {
      if (!id) this.selectedTodo = { ...defaultItem };
      else this.selectedTodo = { ...this.getTodoById(id) };
      this.selectedTodoId = id;
    },

    selectTodoIdForEditing(id: number, value: string) {
      this.editingItems.push(id);
      this.newTodoValue[id] = value;
    },
    userId() {
      const usersStore = useUsersStore();
      return usersStore.selectedUserId;
    },
    async addTodo() {
      const fk_userId = this.userId();

      const newItem = { ...this.selectedTodo, fk_userId };
      const results: Todo = await fetcher("POST", `${baseUrl}/todo/`, newItem);
      if (results) {
        this.items.push(results);
        this.selectedTodo = { ...defaultItem };
      }
    },

    async getTodos() {
      const usersStore = useUsersStore();
      const fk_userId = usersStore.selectedUserId;
      if (!fk_userId) this.items = [];
      else this.items = await fetcher("GET", `${baseUrl}/todo/${fk_userId}`);
    },
    async removeTodo(id: number) {
      const usersStore = useUsersStore();
      const payload = {
        id,
        fk_userId: usersStore.selectedUserId,
      };
      const results = await fetcher("DELETE", `${baseUrl}/todo/`, payload);
      this.items.splice(this.getTodoIndexInArrayById(id), 1);
    },
    async updateTodo(id: number) {
      const usersStore = useUsersStore();
      const payload: Todo = {
        id,
        value: this.newTodoValue[id],
        fk_userId: usersStore.selectedUserId,
      };
      const results = await fetcher("PUT", `${baseUrl}/todo/`, payload);
      this.editingItems.splice(this.getEditingTodoIndexInArrayById(id), 1);
      this.items[this.getTodoIndexInArrayById(id)].value = this.newTodoValue[id];
    },
  },
});
