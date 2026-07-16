import { configureStore } from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger'
import generalReducer from './generalReducer'
import APIReducer from './APIReducer'

let logger = createLogger()

export default configureStore({
    reducer: {
        general: generalReducer,
        api: APIReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})