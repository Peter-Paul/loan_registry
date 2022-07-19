import {User} from 'src/app/modals/users'
import * as types from "./types"


export const initialState = {
    isauthenticated:false,
    credentials:undefined,
    token:"",
    httpOptions:undefined,
    user:undefined,
    users:[], // default is an empty array
    clients:[],
    userLoaded:false,
    usersLoaded:false,
    clientsLoaded:false,
    workerErrorMessage:"",
    clientErrorMessage:"",
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
        case types.SET_USER: return {...state,user:action.payload,userLoaded:true}

        case types.SET_USERS: return {...state,users:action.payload,usersLoaded:true}
        
        case types.ADD_USERS: 
        return  {
            ...state,
            users:[...state.users,action.payload],
            user:{...state.user,workers: [...state.user.workers,action.payload] },
        }
        case types.ADD_USERS_ERROR: return {...state, workerErrorMessage:action.payload}
        case types.USERS_ERROR_RESET: return {...state, workerErrorMessage:""}
        case types.UPDATE_USERS:
            return {
                ...state,
                users:state.users.map(user=>{return user.id===action.payload.id?{...action.payload}:user}),
                user:{...state.user,workers:state.user.workers.map(worker=>{return worker.id===action.payload.id?{...action.payload}:worker})}
            }  
        case types.DELETE_USERS:
            return {
                ...state,
                users:state.users.filter(user=>user.id!==action.id),
                user:{...state.user,workers:state.user.workers.filter(worker=>worker.id!==action.id)}
            }

        case types.SET_CLIENTS: return {...state,clients:action.payload,clientsLoaded:true}
        case types.ADD_CLIENTS:
            return {
                ...state,
                user:{...state.user,clients: [...state.user.clients,action.payload] },

            }
        case types.ADD_CLIENTS_ERROR: return {...state, clientErrorMessage:action.payload}
        case types.CLIENTS_ERROR_RESET: return {...state, clientErrorMessage:""}
        case types.UPDATE_CLIENTS:
            return {
                ...state,
                user:{...state.user,clients:state.user.clients.map((client)=>{return client.id===action.payload.id?{...action.payload}:client})}
            }
        case types.DELETE_CLIENTS:
            return {
                ...state,
                user:{...state.user,clients:state.user.clients.filter((client)=>client.id!==action.id)}
            }
        default: return state
    }
}
