import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'

import storage from 'redux-persist/es/storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { encryptTransform } from "redux-persist-transform-encrypt";


const persistConfig = {
    key: 'todo',
    storage,
    transforms:[
        encryptTransform({
            secretKey: 'xyz123',
            onError: (error)=>{
                console.log(error);
            }
        })
    ]
}

const persistedReducer = persistReducer(persistConfig, todoReducer)


const stateSyncMiddleware = createStateSyncMiddleware({
  blacklist: ['persist/PERSIST'], 
})

export const store = configureStore({
    reducer:{
        todos: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(stateSyncMiddleware);
    }
})

initMessageListener(store)

export const persistor = persistStore(store);

const saveToSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};
store.subscribe(() => saveToSessionStorage(store.getState()));
 
 



