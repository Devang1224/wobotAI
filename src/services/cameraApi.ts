import { BASE_URL } from "../../env";

export const cameraApi = async(
    url,
    options,
)=>{
    try{
        const response = await fetch(`${BASE_URL}${url}`,{
            method:options?.method || "GET",
            headers:{
                'Content-Type':"application/json",
                'Authorization':'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy',
                ...options?.headers
            },
            body:options?.body ? JSON.stringify(options?.body) : undefined,
            ...options
        });
        const data  = await response.json();
        return data;
        
    }catch(err){
        throw new Error("Failed to do the operation on table data",{cause:err});
    }
}


