import {Users,Product} from 'src/app/modals/users'
import * as types from "./types"


export const initialState = {
    isauthenticated:false,
    credentials:undefined,
    token:"",
    httpOptions:undefined,
    user:undefined,
    users:[], // default is an empty array
    products:[] 
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
        case types.SET_PRODUCTS: return {...state,products:action.payload}
        case types.SET_USER: return {...state,user:action.payload}
        case types.GET_USERS: return state.users
        case types.GET_USER: return state.user
        case types.UPDATE_USERS:
            return {
                ...state,
                users:state.users.map((user:Users)=>{return user.id===action.payload.id?{...action.payload}:user})
            }
        case types.ADD_PRODUCTS:
            return {
                ...state,
                products:[...state.products,action.payload]
            }
        case types.UPDATE_PRODUCTS:
            return {
                ...state,
                products:state.products.map((product:Product)=>{return product.id===action.payload.id?{...action.payload}:product})
            }
        case types.DELETE_PRODUCTS:
            return {
                ...state,
                products:state.products.filter((product:Product)=>product.id!==action.id)
            }
        case types.UPDATE_USER:
            return {
                ...state,
                users:action.payload
            }
        case types.DELETE_USERS:
            return {
                ...state,
                users:state.users.filter((user:Users)=>user.id===action.payload.id)
            }
        case types.ADD_USERS_PRODUCTS: 
            return {
                ...state,
                users:state.users.map((user:Users)=>{
                    return user.id===action.uid?
                    {...user,product:[...user.products,action.payload]}:
                    user})
            }
      
        case types.UPDATE_USERS_PRODUCTS:
            return {
                ...state,
                users:state.users.map((user:Users)=>{
                    return user.id===action.uid?
                    {...user,product:user.products.map((product:Product)=>{
                        product.id===action.payload.id?
                        {...action.payload}:
                        product
                    })}:
                    user})
            }
        
        case types.DELETE_USERS_PRODUCTS:
            return {
                ...state,
                users:state.users.map((user:Users)=>{
                    return user.id===action.uid?
                    {...user,product:user.products.filter((product:Product)=>product.id!==action.payload.id)}:user})
            }
        default: return state
    }
}
