import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import generalReducer from './generalReducer'

export default configureStore({
    reducer: {
        general: generalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})