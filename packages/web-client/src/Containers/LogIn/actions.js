import * as types from './Constants'
import axios from './../../Configs/Axios'

//xu lý login
export const onGetUser=(user)=>{
    return {
        type:types.GET_USER,
        user:user
    }
}

//xu lý logout
export const onLogOut=(user)=>{
    return {
        type:types.LOG_OUT,
    }
}


export const onGetUserRequest=(user)=>{
    return async (dispatch)=>{
        return new Promise( async(resolve, reject) => {
            try{
                const data= await axios.post("http://localhost:5000/api/taikhoans/login",user);
                resolve(data);
                dispatch(onGetUser(data.object));
            }catch(e){
                reject(e.response.data)
            }
        })
        
        

    }
}

export const onRegisterRequest=async (user)=>{
    console.log(user);
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.post("http://localhost:5000/api/taikhoans/register",user);
            resolve(data)
        }catch(e){
            reject(e.response.data);
        }
    })
    
}

export const onValidateAccountRequest=async (userName)=>{
    console.log(userName);
    return new Promise( async(resolve, reject) => {
        try{
            const data= await axios.post("http://localhost:5000/api/taikhoans/validate-user",{userName:userName});
            resolve(data)
        }catch(e){
            reject(e.response.data);
        }
    })
    
}

export const onForgotPasswordRequest=async (data)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const res= await axios.post("http://localhost:5000/api/taikhoans/forgot-password",data);
            resolve(res)
        }catch(e){
            reject(e.response.data);
        }
    })
    
}

export const onChangePasswordRequest=async (data)=>{
    return new Promise( async(resolve, reject) => {
        try{
            const res= await axios.post("http://localhost:5000/api/taikhoans/change-password",data);
            resolve(res)
        }catch(e){
            reject(e.response.data);
        }
    })
    
}

export const onCheckTokenRequest=async ()=>{
    return new Promise( async(resolve, reject) => {
        try{
            const res= await axios.post("http://localhost:5000/api/taikhoans/check-token");
            resolve(res)
        }catch(e){
            reject(e.response.data);
        }
    })
    
}
