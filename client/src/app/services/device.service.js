import httpService from "./http.service";

const deviceEndpoint = "device/";

const deviceService = {
	fetchAll: async (orderBy, equalTo) => {
		const {data} = await httpService.get(deviceEndpoint, {
			params: {
                orderBy,
                equalTo
            }
		});
		return data;
	},
	post: async payload => {
		const {data} = await httpService.post(deviceEndpoint, payload);
		return data
	},
	removeDevice: async (deviceId) => {
        const { data } = await httpService.delete(deviceEndpoint + deviceId);
        return data;
    },
	update: async (payload) => {
        const { data } = await httpService.patch(
            deviceEndpoint + payload._id,
            payload
        );
        return data;
    }
}

export default deviceService;