import { useAuthStore } from "../stores/auth.store";
export const baseUrl = import.meta.env.VITE_API_URL;

export const fetcher = (method: String, url: RequestInfo | URL, data: any) =>
  fetch(url, getOptions(method, data))
    .then(async (res) => {
      if (res.ok)
        if (res.headers.get("content-type")?.includes("application/json")) return res.json();
        else return res.text();
      else throw new Error(res.status);
    })
    .catch((error) => console.error("Error:", error));

const getOptions = (method: string, data: any) => {
  const authStore = useAuthStore();
  const options = {
    dataType: "json",
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const token = authStore.getToken();

  if (token) {
    options.headers["Authorization"] = `bearer ${token}`;
  }

  return options;
};
