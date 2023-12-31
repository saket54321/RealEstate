import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserSlice from './user/UserSlice';

     const store = configureStore({
        reducer:{
           user:UserSlice
        },
    })
    
    export default store;
