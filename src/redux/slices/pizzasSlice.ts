import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {CartItem} from "./cartSlices";
import {RootState} from "./store";

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
        const {
            order,
            sortBy,
            category,
            search,
            currentPage,
        } = params;
        const {data} = await axios.get<Pizza[]>(
            `https://66f4604d77b5e88970995272.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    },
)

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    rating: number;
}

interface PizzaSliceState {
    items: Pizza[],
    status: 'loading' | 'error' | 'success',

}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
}
const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = "loading"
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = "success"
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = "error"
                state.items = []
            })
    }
});
export const selectPizzaData = (state: RootState) => state.pizza
export const {setItems} = pizzaSlice.actions;
export default pizzaSlice.reducer;