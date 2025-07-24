import apiClient from "./request";

const getReq = async (path)=>{
    try {
        const response = await apiClient.get(path)
        return response;
    } catch (error) {
        return error;
    }
}

const postReq = async (path, data)=>{
    try {
        const response = await apiClient.post(path, data)
        return response;
    } catch (error) {
        return error;
    }
}

const deleteReq = async (path)=>{
    try {
        const response = await apiClient.delete(path)
        return response;
    } catch (error) {
        return error;
    }
}

const putReq = async (path, data)=>{
    try {
        const response = await apiClient.put(path, data)
        return response;
    } catch (error) {
        return error;
    }
}

export {getReq, postReq, deleteReq, putReq};