import httpService from "./http.service";

const searchEndpoint = "device/search/";

const searchService = {
	fetchAll: async (query) => {
		const {data} = await httpService.get(searchEndpoint + query);
		return data;
	},
}

export default searchService;