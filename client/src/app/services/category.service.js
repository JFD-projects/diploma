import httpService from "./http.service";
const categoryEndpoint = "category/";

const categoryService = {
    fetchAll: async () => {
        const { data } = await httpService.get(categoryEndpoint);
        return data;
    },
    post: async (payload) => {
        const {data} = await httpService.post(categoryEndpoint, payload);
		return data
    }
};
export default categoryService;
