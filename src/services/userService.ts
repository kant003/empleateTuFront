import { fetchAPI } from "../utils/FetchAPI";

//const URL_BASE = 'http://localhost:3000/api/'
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export class UserService {
  static async getAll() {
    return await fetchAPI(API_URL_BASE + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
  static async getProfile() {
    return await fetchAPI(API_URL_BASE + "/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

  }
}

