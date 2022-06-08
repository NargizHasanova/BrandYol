import { useContext } from 'react'
import WaitingGif from '../../components/WaitingGif'
import { LoadContext, FavoriteContext, CategoryNameContext, ProductItemContext } from '../../Context'
import { useNavigate } from 'react-router';
import { FaHeart } from "react-icons/fa";

export default function Favorites() {
    const { loading, setLoading } = useContext(LoadContext)
    const { favorite, setFavorite } = useContext(FavoriteContext)
    const { categoryName, setCategoryName } = useContext(CategoryNameContext)
    const { productItem, setProductItem } = useContext(ProductItemContext)
    const navigate = useNavigate();

    function itemInfo(item) {
        setCategoryName(item.category)
        setProductItem(item)
        navigate(`/product_item/${item.id}`)
    }

    function removeFromFavorites(id) {
        const filtered = favorite.filter(item => item.id !== id)
        setFavorite(filtered)
    }
    console.log(favorite.length)

    return (
        favorite.length > 0 ?
            <section className="clothes-home clothes-home-favorites">
                <div className="container">
                    <h1 className="title">Favorites List</h1>
                    <div className="clothes clothes-favorite">
                        {loading ? <WaitingGif /> : (
                            favorite?.map(item => {
                                const { id, images, name, price, category, brand, desc, favorite } = item
                                return (
                                    <div key={id} className="clothes__item">
                                        <div className="clothes__img">
                                            <img src={images[0]} alt="product" />
                                            <div className="clothes__layer">
                                                <div className="layer__inner">
                                                    <div className="layer-desc">
                                                        <i className="fas fa-share-alt"></i>
                                                        <i onClick={() => itemInfo(item)}
                                                            className="far fa-search">
                                                        </i>
                                                        <i onClick={() => removeFromFavorites(id)} className="filled-heart"><FaHeart /></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="clothes__desc">
                                            <p>{brand}<span> {category + " "} {desc}</span></p>
                                            <div className="stars">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                            <div className="clothes-price">${price}</div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </section> : <h1 className='title' style={{textAlign:'center'}}>empty list</h1>
    )
}
