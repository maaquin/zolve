import { useState } from "react";
import { newStore as newStoreRequest } from '../../../services'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useNewStore = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

<<<<<<< HEAD
    const newStore = async (name, email, direction, imgUrl, coordenadas) => {
=======
    const newStore = async (name, email, direction, avatarUrl, imgUrl, coordenadas) => {
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
        const response = await newStoreRequest({
            name,
            email,
            direction,
<<<<<<< HEAD
=======
            avatarUrl,
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
            imgUrl,
            coordenadas
        })

        toast.success('New store sucess');

        setIsLoading(false)

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo')
        }

        navigate('/')
    }
    return {
        newStore,
        isLoading
    }
}