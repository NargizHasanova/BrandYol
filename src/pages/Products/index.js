import React from 'react'
import Brand from './Brand'
import ProductCards from './ProductCards';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { showBar, hideBar } from '../../redux/clothesSlice'

export default function Products() {
    const dispatch = useDispatch()
    const { productsPageClothes, categoryName, filterBarVisible } = useSelector(state => state.clothes)
    const [rotateArrowGender, setRotateArrowGender] = useState(true)
    const [rotateArrowBrand, setRotateArrowBrand] = useState(true)
    const [rotateArrowPrice, setRotateArrowPrice] = useState(true)

    function showFilterBar() {
        dispatch(showBar())
    }

    function hideFilterBar() {
        dispatch(hideBar())
    }

    return (
        <section className='products container'>
            <h3 className="search_results">{productsPageClothes.length} results are listed for the search "{categoryName}"</h3>
            <div className="products-wrapper">
                <div className={`products__filterBar ${filterBarVisible ? "position-left" : ""}`}>
                    <i className='filter-back' onClick={hideFilterBar}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </i>
                    <div className="filterItem">
                        <div className="filter-gender"
                            onClick={() => setRotateArrowGender(prev => !prev)} >
                            <span>Gender</span>
                            <i className={`far fa-chevron-down ${rotateArrowGender ? "rotate180" : "rotate0"}`}></i>
                        </div>
                        <div className={`option ${rotateArrowGender ? "d-block" : "d-none"}`}>
                            <div className="male-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='gender'
                                    value='male'
                                />
                                <span>male</span>
                            </div>
                            <div className="female-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='gender'
                                    value='female'
                                />
                                <span>female</span>
                            </div>
                            <div className="child-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name="gender"
                                    value='child'
                                />
                                <span>child</span>
                            </div>
                        </div>
                    </div>
                    <div className="filterItem">
                        <div onClick={() => setRotateArrowBrand(prev => !prev)} className="filter-brand">
                            <span>Brand</span>
                            <i className={`far fa-chevron-down ${rotateArrowBrand ? "rotate180" : "rotate0"}`}></i>
                        </div>
                        <div className={`option ${rotateArrowBrand ? "d-block" : "d-none"}`}>
                            <Brand />
                        </div>
                    </div>
                    <div className="filterItem">
                        <div onClick={() => setRotateArrowPrice(prev => !prev)} className="filter-price">
                            <span>Price</span>
                            <i className={`far fa-chevron-down ${rotateArrowPrice ? "rotate180" : "rotate0"}`}></i>
                        </div>
                        <div className={`option ${rotateArrowPrice ? "d-block" : "d-none"}`}>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="0$-50$"

                                />
                                <span>0$-50$</span>
                            </div>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="50$-150$"

                                />
                                <span>50$-150$</span>
                            </div>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="150$-350$"

                                />
                                <span>150$-350$</span>
                            </div>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="350$-2250$"

                                />
                                <span>350$-2250$</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-shortbar'>
                    <i className='filter-icon' onClick={showFilterBar}>
                        <FontAwesomeIcon icon={faFilter} />
                    </i>
                </div>
                <div className="products-box"
                    style={{ width: `${filterBarVisible ? "68%" : ""}` }} >
                    <ProductCards />
                </div>
            </div>
        </section>
    )
}
