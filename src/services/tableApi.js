import axios from "axios";

const AUTH_TOKEN = "4ApVMIn5sTxeW7GQ5VWeWiy";

const apiClient = axios.create({
    baseURL: "https://api-app-staging.wobot.ai/app/v1",
    headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
    },
});

const getCameraList = async () => {
    try{
        const response = await apiClient.get("/fetch/cameras")
        return response.data.data;
    } catch(err) {
        console.log(err);
    }
}

const updateStatus = async (payload) => {
    try {
        const response = await apiClient.put("/update/camera/status", payload);
        return response;
    } catch(err) {
        console.log(err);
    }
}

export {
    getCameraList,
    updateStatus
}
