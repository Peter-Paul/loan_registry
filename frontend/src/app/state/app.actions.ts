import * as types from "./types"

export const getUser=()=>{
    return {
        type:types.GET_USER,
    }
}

export const getUsers=()=>{
    return {
        type:types.GET_USERS,
    }
}

export const addProducts=(data:any)=>{
    return {
        type:types.ADD_USERS_PRODUCTS,
        uid:data.uid,
        payload:data.payload
    }
}


export const updateProducts=(data:any)=>{
    return {
        type:types.UPDATE_USERS_PRODUCTS,
        uid:data.uid,
        payload:data.payload
    }
}

export const deleteProducts=(data:any)=>{
    return {
        type:types.DELETE_USERS_PRODUCTS,
        uid:data.uid,
        payload:data.payload
    }
}

export const setUserDetails =(payload:any)=>{
    return {
        type:types.SET_USER_DETAILS,
        payload
    }
}

export const setUsers =(payload:any)=>{
    return {
        type:types.SET_USERS,
        payload
    }
}

export const setUser =(payload:any)=>{
    return {
        type:types.SET_USER,
        payload
    }
}

export const updatedUsers=(payload:any)=>{
    return {
        type:types.UPDATE_USERS,
        payload
    }
}

export const setProducts =(payload:any)=>{
    return {
        type:types.SET_PRODUCTS,
        payload
    }
}

export const addProduct =(payload:any)=>{
    return {
        type:types.SET_PRODUCTS,
        payload
    }
}

export const deleteProduct =(id:any)=>{
    return {
        type:types.DELETE_PRODUCTS,
        id
    }
}