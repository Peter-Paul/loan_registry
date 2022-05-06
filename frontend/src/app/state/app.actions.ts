import * as types from "./types"


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


export const addUsers =(payload:any)=>{
    return {
        type:types.ADD_USERS,
        payload
    }
}

export const addUsersError = (payload:string) => {
    return {
        type:types.ADD_USERS_ERROR,
        payload
    }
}

export const usersErrorReset = ()=>{
    return {
        type:types.USERS_ERROR_RESET
    }
}

export const updatedUsers=(payload:any)=>{
    return {
        type:types.UPDATE_USERS,
        payload
    }
}

export const deleteUsers=(id:string)=>{
    return {
        type:types.DELETE_USERS,
        id
    }
}

export const setClients =(payload:any)=>{
    return {
        type:types.SET_CLIENTS,
        payload
    }
}

export const addClient =(payload:any)=>{
    return {
        type:types.ADD_CLIENTS,
        payload
    }
}

export const addClientsError = (payload:string) => {
    return {
        type:types.ADD_CLIENTS_ERROR,
        payload
    }
}

export const clientsErrorReset = ()=>{
    return {
        type:types.CLIENTS_ERROR_RESET
    }
}

export const updateClients=(payload:any)=>{
    return {
        type:types.UPDATE_CLIENTS,
        payload
    }
}

export const deleteClient =(id:any)=>{
    return {
        type:types.DELETE_CLIENTS,
        id
    }
}