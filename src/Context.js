import React, { createContext, useEffect, useState } from 'react'
import { Axios } from './servicesAPI';

export const DataContext = createContext()
export const LoadContext = createContext()
export const RefetchContext = createContext()
export const CategoryNameContext = createContext()
export const ProductItemContext = createContext()
export const BasketContext = createContext()
export const ClothesContext = createContext()
export const FilterContext = createContext()
export const FavoriteContext = createContext()
export const FilterBarContext = createContext()
export const CardTotalPrice = createContext()

export default function Context({ children }) {
    // console.log("context.js")
    const [getData, setGetData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [productItem, setProductItem] = useState("");
    const [basket, setBasket] = useState([]);
    const [clothes, setClothes] = useState([]);
    const [filter, setFilter] = useState({});
    const [favorite, setFavorite] = useState([]);
    const [filterBarVisible, setFilterBarVisible] = useState(false);
    const [totalCardPrice, setTotalCardPrice] = useState(null);


    async function fetchData() {
        try {
            const { data } = await Axios.get("/clothes.json")
            setGetData(() => data.map(item => ({ ...item, totalSum: item.price * item.count })));
            setLoading(false)
        } catch (err) {
            Promise.reject("Something went wrong :(")
        }
    }

    useEffect(() => {
        fetchData()
    }, [refetch])

    return (
        <DataContext.Provider value={{ getData, setGetData }} >
            <LoadContext.Provider value={{ loading, setLoading }}>
                <RefetchContext.Provider value={{ refetch, setRefetch }}>
                    <CategoryNameContext.Provider value={{ categoryName, setCategoryName }}>
                        <ProductItemContext.Provider value={{ productItem, setProductItem }}>
                            <ClothesContext.Provider value={{ clothes, setClothes }}>
                                <BasketContext.Provider value={{ basket, setBasket }}>
                                    <FilterContext.Provider value={{ filter, setFilter }}>
                                        <FavoriteContext.Provider value={{ favorite, setFavorite }}>
                                            <FilterBarContext.Provider value={{ filterBarVisible, setFilterBarVisible }}>
                                                <CardTotalPrice.Provider value={{ totalCardPrice, setTotalCardPrice }}>
                                                    {children}
                                                </CardTotalPrice.Provider>
                                            </FilterBarContext.Provider>
                                        </FavoriteContext.Provider>
                                    </FilterContext.Provider>
                                </BasketContext.Provider>
                            </ClothesContext.Provider>
                        </ProductItemContext.Provider>
                    </CategoryNameContext.Provider>
                </RefetchContext.Provider>
            </LoadContext.Provider>
        </DataContext.Provider>
    )
}
