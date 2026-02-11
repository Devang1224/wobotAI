import { BASE_URL } from "../../env";

export const fetchCameraData = async(
    url,
    options
)=>{
    try{
        const response = await fetch(`${BASE_URL}${url}`,{
            method:"GET",
            headers:{
                'Content-Type':"application/json",
                'Authorization':'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy',
                ...options?.headers
            },
            ...options
        });
        const data  = await response.json();
        return data;
        
    }catch(err){
        throw new Error("Failed to fetch table data",{cause:err});
    }
}