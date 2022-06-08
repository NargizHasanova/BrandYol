import { configureStore } from "@reduxjs/toolkit"
import clothesReducer from "./clothesSlice"

export const store = configureStore({
    reducer: {
        clothes: clothesReducer
    }
})

