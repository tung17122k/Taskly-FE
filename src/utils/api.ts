
import axios from "./axios.customize"



const createUserApi = ({ username, email, password }: IUserData) => {
    const URL_API = "/v1/api/register";
    const data: IUserData = {
        username,
        email,
        password,
    }
    return axios.post(URL_API, data);
}

const loginApi = async ({ email, password }: IUserData) => {
    const URL_API = "/v1/api/login";
    const data: IUserData = {
        email,
        password,
    }

    try {
        const response = await axios.post(URL_API, data);
        return response.data;
    } catch (error: any) {
        console.log('error:', error.response.data);
        return error.response.data;
    }
}

const getCategoryApi = async () => {
    const URL_API = "/v1/api/category";
    try {
        const response = await axios.get(URL_API);
        return response;
    } catch (error: any) {
        console.log('error:', error.response.data);
        return error;
    }
}

const postCategoryApi = async (data: any) => {
    const URL_API = "/v1/api/category";
    try {
        const response = await axios.post(URL_API, data);
        return response;
    } catch (error: any) {
        console.log('error:', error.response.data);
        return error;
    }
}

const deleteCategoryApi = async (id: string) => {
    const URL_API = `/v1/api/category?id=${id}`;
    try {
        const response = await axios.delete(URL_API);
        return response;
    } catch (error: any) {
        console.log('error:', error.response.data);
        return error;
    }
}


export {
    createUserApi, loginApi, getCategoryApi, postCategoryApi, deleteCategoryApi
}