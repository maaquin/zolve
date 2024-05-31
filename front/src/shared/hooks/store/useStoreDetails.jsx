import { useState } from "react";
import toast from "react-hot-toast";
import {getStoresDetails as getStoresDetailsRequest} from "../../../services";

export const useStoreDetails = () => {
    const [storeDetails, setStoreDetails] = useState();

    const getStoresDetails = async (id) => {
        const responseData = await getStoresDetailsRequest(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del store'
            )
        }
        console.log("Store Details Response:", responseData);
        setStoreDetails(responseData)
    } 

    return{
        storeDetails,
        isFetching: !storeDetails,
        getStoresDetails
    }
}