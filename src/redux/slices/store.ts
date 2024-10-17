import {configureStore} from '@reduxjs/toolkit'
import filter from "./filterSlice"
import cart from "./cartSlices"
import pizza from "./pizzasSlice"

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    }
})
export type RootState = ReturnType<typeof store.getState>;
