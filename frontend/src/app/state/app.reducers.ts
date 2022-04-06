import {User} from 'src/app/modals/users'
import * as types from "./types"


export const initialState = {
    isauthenticated:false,
    credentials:undefined,
    token:"",
    httpOptions:undefined,
    user:undefined,
    users:[], // default is an empty array
    clients:[] 
}

export default (state:any = initialState, action:any) => {
    switch(action.type){
        case types.SET_USER_DETAILS:
            return {
                ...state,
                isauthenticated:action.payload.isauthenticated,
                token:action.payload.token,
                credentials:action.payload.credentials,
                httpOptions:action.payload.httpOptions,
            }
        case types.SET_USERS: return {...state,users:action.payload}
        case types.SET_CLIENTS: return {...state,clients:action.payload}
        case types.SET_USER: return {...state,user:action.payload}
        case types.GET_USERS: return state.users
        case types.GET_USER: return state.user
        case types.UPDATE_USERS:
            return {
                ...state,
                users:state.users.map((user:User)=>{return user.id===action.payload.id?{...action.payload}:user})
            }
        case types.ADD_CLIENTS:
            return {
                ...state,
                clients:[...state.clients,action.payload]
            }
        case types.UPDATE_CLIENTS:
            return {
                ...state,
                clients:state.clients.map((client)=>{return client.id===action.payload.id?{...action.payload}:client})
            }
        case types.DELETE_CLIENTS:
            return {
                ...state,
                clients:state.clients.filter((client)=>client.id!==action.id)
            }
        case types.UPDATE_USER:
            return {
                ...state,
                users:action.payload
            }
        case types.DELETE_USERS:
            return {
                ...state,
                users:state.users.filter((user:User)=>user.id===action.payload.id)
            }
        // case types.ADD_USERS_PRODUCTS: 
        //     return {
        //         ...state,
        //         users:state.users.map((user:User)=>{
        //             return user.id===action.uid?
        //             {...user,product:[...user.products,action.payload]}:
        //             user})
        //     }
      
        // case types.UPDATE_USERS_PRODUCTS:
        //     return {
        //         ...state,
        //         users:state.users.map((user:User)=>{
        //             return user.id===action.uid?
        //             {...user,product:user.products.map((product:Product)=>{
        //                 product.id===action.payload.id?
        //                 {...action.payload}:
        //                 product
        //             })}:
        //             user})
        //     }
        
        // case types.DELETE_USERS_PRODUCTS:
        //     return {
        //         ...state,
        //         users:state.users.map((user:User)=>{
        //             return user.id===action.uid?
        //             {...user,product:user.products.filter((product:Product)=>product.id!==action.payload.id)}:user})
        //     }
        default: return state
    }
}
