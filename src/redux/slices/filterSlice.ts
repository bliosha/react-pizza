import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";

type Sort = {
    name: string,
    sortProperty: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price',
}

interface FilterSliceState {
    searchValue: string,
    categoryID: number,
    currentPage: number,
    sort: Sort,
    sortType: Sort,
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryID: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    },
    sortType: {
        name: 'популярности',
        sortProperty: 'rating',
    },

}
const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryID(state, action: PayloadAction<number>) {
            state.categoryID = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.sortType = action.payload.sort;
            state.categoryID = Number(action.payload.categoryID);
        }
    }
});
export const selectSort = (state: RootState) => state.filter.sort
export const {setCategoryID, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;
export default filterSlice.reducer;