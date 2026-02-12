import { BASE_URL } from "../../env";

export const cameraApi = async(
    url,
    options,
    method="GET",
    body
)=>{
    try{
        const response = await fetch(`${BASE_URL}${url}`,{
            method:method,
            headers:{
                'Content-Type':"application/json",
                'Authorization':'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy',
                ...options?.headers
            },
            body:body ? JSON.stringify(body) : undefined,
            ...options
        });
        const data  = await response.json();
        return data;
        
    }catch(err){
        throw new Error("Failed to do the operation on table data",{cause:err});
    }
}


