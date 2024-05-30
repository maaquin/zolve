import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/zolve/v1',
    timeout: 1000
})

//User
export const login = async (data) => {
    try{
        return await apiClient.post('/auth/login', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const register = async (data) => {
    try{
        return await apiClient.post('/auth/register', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const updateUser = async (data, token) => {
    try{
        const response = await apiClient.put('/settings/update', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const putUserSettings = async (data) => {
    try{
        return await apiClient.put('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async (data) => {
    try{
        return await apiClient.post('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async (data) => {
    try{
        return await apiClient.patch('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const confirmToken = async (token) => {
    try{
        return await apiClient.patch(`/confirm/${token}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

//Store
export const newStore = async (data) => {
    try{
        return await apiClient.post('/store', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

// Agrega esto en tu archivo de servicios
export const getStores = async () => {
    try {
        return await apiClient.get('/store'); // Ajusta la URL según tu API
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
}


export const getStoresDetails = async (storeId) => {
    try{
        return await apiClient.get(`/store/${storeId}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}