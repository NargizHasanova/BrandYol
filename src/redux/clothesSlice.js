import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from '../servicesAPI';

export const fetchClothesData = createAsyncThunk("clothes/fetchClothes",
    async () => {
        const { data } = await Axios.get("/clothes.json")
        // return data.map(item => ({ ...item, totalSum: item.price * item.count }))
        return data
    }
)

export const clothesSlice = createSlice({
    name: "clothes",
    initialState: {
        data: [],
        favoriteBox: [],
        productsPageClothes: [],
        basket: [],
        loading: true,
        categoryName: "",
        productItem: {},
        favorite: false,
        numOfItem: 10,
        filterBarIsVisible: false,
        pending: false,
        error: false
    },
    reducers: {
        setCategoryName: (state, { payload }) => {
            state.categoryName = payload
        },
        setFilteredProducts: (state, { payload }) => {
            state.productsPageClothes = state.data.filter(item => item.category === payload)
        },
        setProductItem: (state, { payload } = state.productItem) => {
            state.productItem = payload
        },
        showMoreClothesItems: (state) => {
            state.numOfItem = state.numOfItem + 10
        },
        showLessClothesItems: (state) => {
            state.numOfItem = state.numOfItem - 10
        },
        setProductItemColor: (state, { payload }) => {
            state.productItem.color = payload
            state.data.map(item => {
                if (item.id === state.productItem.id) {
                    item.color = payload
                }
                return item
            })
        },
        setProductItemSize: (state, { payload }) => {
            state.productItem.size = payload
            state.data.map(item => {
                if (item.id === state.productItem.id) {
                    item.size = payload
                }
                return item
            })
        },
        addToBasket: (state) => {
            state.basket = [...new Set([...state.basket, state.productItem])]
        },
        removeFromBasket: (state, { payload }) => {
            state.basket = state.basket.filter(item => item.id !== payload)
        },
        changeIsFav: (state, { payload }) => {
            state.productItem.favorite = !state.productItem.favorite
            state.data.map(item => {
                if (item.id === payload) {
                    item.favorite = !item.favorite
                }
                return item
            })
            state.productsPageClothes.map(item => {
                if (item.id === payload) {
                    item.favorite = !item.favorite
                }
                return item
            })
        },
        addToFavBox: (state, { payload }) => {
            console.log(state.favoriteBox);
            state.favoriteBox = [...new Set([...state.favoriteBox, payload])]
        },
        setFavoriteInFavBoxToTrue: (state) => {
            state.favoriteBox.map(item => {
                item.favorite = true
                return item
            })
        },
        removeFromFavBox: (state, { payload }) => {
            state.favoriteBox = state.favoriteBox.filter(item => item.id !== payload)
        },
        showBar: (state) => {
            state.filterBarIsVisible = true
        },
        hideBar: (state) => {
            state.filterBarIsVisible = false
        },
        increaseProductItemCount: (state, { payload }) => {
            state.productItem.count = state.productItem.count + 1
            state.basket.map(item => {
                if (item.id === payload) {
                    item.count += 1
                }
                return item
            })
        },
        decreaseProductItemCount: (state, { payload }) => {
            if (state.productItem.count > 1) {
                state.productItem.count = state.productItem.count - 1
                state.basket.map(item => {
                    if (item.id === payload) {
                        item.count -= 1
                    }
                    return item
                })
            }
        },
    },
    extraReducers: {
        [fetchClothesData.pending]: (state) => {
            state.pending = true
            state.error = false
        },
        [fetchClothesData.fulfilled]: (state, { payload }) => {
            console.log('fulfilled');
            state.pending = false
            state.data = payload
        },
        [fetchClothesData.rejected]: (state, action) => {
            console.log('rejected');
            state.error = action.error.message
            state.pending = false
        },
    }
})


export const { showMoreClothesItems, showLessClothesItems, setFavoriteInFavBoxToTrue, removeFromBasket, addToBasket, increaseProductItemCount, decreaseProductItemCount, setProductItemSize, showBar, hideBar, setFilteredProducts, setCategoryName, setProductItem, addToFavBox, removeFromFavBox, changeIsFav, setProductItemColor } = clothesSlice.actions
export default clothesSlice.reducer



