import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../../config.json";
import httpService from "./http.service";

const httpAdmin = axios.create({
    baseURL: config.apiEndpoint + "admin/"
});

const adminEndpoint = "admin/"

const adminService = {
    register: async (payload) => {
        const { data } = await httpAdmin.post(`signUp`, payload);
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAdmin.post(`signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAdmin.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    },
    getCurrentAdmin: async () => {
        const { data } = await httpService.get(
            adminEndpoint + localStorageService.getAdmin()
        );
        return data;
    },
    // get: async () => {
    //     const { data } = await httpAdmin.get();
    //     return data;
    // },
    // updateAdmin: async (payload) => {
    //     const { data } = await httpService.put(
    //         adminEndpoint + payload._id,
    //         payload
    //     );
    //     return data;
    // }
};
export default adminService;
