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
        filterGenderCombiner: [],
        filterBrandCombiner: [],
        filterPriceCombiner: [],
        filterItemIdBox: [],
        loading: true,
        categoryName: "",
        productItem: {},
        genderFilterObj: {},
        priceFilterObj: {},
        brandFilterObj: {},
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
        filterPrice: (state, { payload }) => {

        },
        filterBrand: (state, { payload }) => {
            state.brandFilterObj = { ...state.brandFilterObj, ...payload }
            // { mavi:true, bershka:false }
            for (let key in state.brandFilterObj) {
                if (state.brandFilterObj[key] === true) {
                    state.filterBrandCombiner.push(key)
                } else {
                    state.filterBrandCombiner.splice(state.filterBrandCombiner.indexOf(key), 1)
                }
            }
            state.filterGenderCombiner = [...new Set(state.filterGenderCombiner)]
        },
        filterGender: (state, { payload }) => {
            state.genderFilterObj = { ...state.genderFilterObj, ...payload }
            // { male:true, female:true, child:false }
            for (let key in state.genderFilterObj) {
                if (state.genderFilterObj[key] === true) {
                    state.filterGenderCombiner.push(key)
                } else {
                    state.filterGenderCombiner.splice(state.filterGenderCombiner.indexOf(key), 1)
                }
            }
            state.filterGenderCombiner = [...new Set(state.filterGenderCombiner)] // her defe yeni true olanlar ust uste yazilmasin deye(["male","male","female"]) ve productsPageClothesdaki kimi sifirlaya bilmirik deye bele unikal deyerleri qaytaririq (["male","female"]) 
        },
        renderFilter: (state) => {
            // filterCombiner = ["female","male"]
            // if no filterItem checked
            if (state.filterBrandCombiner.length === 0 &&
                state.filterGenderCombiner.length === 0 &&
                state.filterPriceCombiner.length === 0
            ) {
                state.productsPageClothes = state.data.filter(item => item.category === state.categoryName)
                return
            }


            state.data.map(item => {
                if (Object.keys(state.genderFilterObj).length > 0 &&
                    Object.keys(state.brandFilterObj).length === 0 &&
                    Object.keys(state.priceFilterObj).length === 0) {
                    if (item.gender === filterItem &&
                        item.category === state.categoryName) {
                        state.filterItemIdBox.push(item.id)
                    }
                }
                if (Object.keys(state.genderFilterObj).length === 0 &&
                    Object.keys(state.brandFilterObj).length > 0 &&
                    Object.keys(state.priceFilterObj).length === 0) {
                    if (item.brand === filterItem &&
                        item.category === state.categoryName) {
                        state.filterItemIdBox.push(item.id)
                    }
                }
                if (Object.keys(state.genderFilterObj).length === 0 &&
                    Object.keys(state.brandFilterObj).length === 0 &&
                    Object.keys(state.priceFilterObj).length > 0) {
                    if (item.price === filterItem &&
                        item.category === state.categoryName) {
                        state.filterItemIdBox.push(item.id)
                    }
                }
                if (Object.keys(state.genderFilterObj).length > 0 &&
                    Object.keys(state.brandFilterObj).length > 0 &&
                    Object.keys(state.priceFilterObj).length === 0) {
                    console.log('1');//["male","Mavi"]
                    // if (item.gender === filterItem &&
                    //     item.brand === filterItem &&
                    //     item.category === state.categoryName) {
                    //         console.log('2');
                    //     state.filterItemIdBox.push(item.id)
                    // }
                    if (Object.values(item).includes(filterItem) && item.category === state.categoryName) {
                        console.log('2');
                        state.filterItemIdBox.push(item.id)
                    }
                }
                if (Object.keys(state.genderFilterObj).length === 0 &&
                    Object.keys(state.brandFilterObj).length > 0 &&
                    Object.keys(state.priceFilterObj).length > 0) {
                    if (item.price === filterItem &&
                        item.brand === filterItem &&
                        item.category === state.categoryName) {
                        state.filterItemIdBox.push(item.id)
                    }
                }
                if (Object.keys(state.genderFilterObj).length > 0 &&
                    Object.keys(state.brandFilterObj).length === 0 &&
                    Object.keys(state.priceFilterObj).length > 0) {
                    if (item.price === filterItem &&
                        item.gender === filterItem &&
                        item.category === state.categoryName) {
                        state.filterItemIdBox.push(item.id)
                    }
                }
                return item
            });

            state.filterItemIdBox = [...new Set(state.filterItemIdBox)]

            // state.productsPageClothes = [] // deyeri sifirlayiriq ve yeniden yaziriq
            state.productsPageClothes = []

            for (let filterId of state.filterItemIdBox) {
                state.productsPageClothes = [
                    ...state.productsPageClothes,
                    ...state.data.filter(item => item.id === filterId && item.category === state.categoryName)
                ]
            }
            state.filterItemIdBox = []

            // for dongusu ancaq sonuncu deyeri qaytarmasin deye ...state.productsPageClothes bele yaziriq
        }
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


export const { renderFilter, filterBrand, filterPrice, filterGender, showMoreClothesItems, showLessClothesItems, setFavoriteInFavBoxToTrue, removeFromBasket, addToBasket, increaseProductItemCount, decreaseProductItemCount, setProductItemSize, showBar, hideBar, setFilteredProducts, setCategoryName, setProductItem, addToFavBox, removeFromFavBox, changeIsFav, setProductItemColor } = clothesSlice.actions
export default clothesSlice.reducer



