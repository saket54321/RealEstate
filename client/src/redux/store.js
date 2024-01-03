// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import UserSlice from './user/UserSlice';

//      const store = configureStore({
//         reducer:{
//            user:UserSlice
//         },
//     })
    
//     export default store;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserSlice from './user/UserSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: UserSlice });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
