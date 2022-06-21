import { useNavigate } from 'react-router';
import logo from '../assets/images/logos.png'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function HeaderTop() {
    const { basket } = useSelector(state => state.clothes)
    const { signedIn } = useSelector(state => state.users)
    const navigate = useNavigate();

    function goHome() {
        navigate("/")
    }

    function goToBasketPage() {
        navigate("/basket")
    }

    return (
        <div className="header_top">
            <div className="header_top-left">
                <div onClick={goHome} className="logo">
                    {/* <img src={logo} alt={logo} /> */}
                    <h3 style={{fontWeight:700}}>brandyol</h3>
                </div>
            </div>
            <div className="header_top-middle">
                <select name="" id="">
                    <option value="">EN</option>
                    <option value="">RU</option>
                    <option value="">AZ</option>
                </select>
                <div className="header-search" >
                    <input type="text" name="" id="" placeholder='search' />
                    <i className="far fa-search"></i>
                </div>
            </div>
            
            <div className="header_top-right">
                <div className="sign">
                    <Link to="/sign-in">
                        <i className="far fa-user"></i>
                        {signedIn && <span>Account</span>}
                        {!signedIn && <span>Sign In</span>}
                    </Link>
                </div>
                <div className="sign">
                    <Link to="/favorites">
                        <i className="far fa-heart"></i>
                        <span>Favorites</span>
                    </Link>
                </div>
                <div onClick={goToBasketPage} className="home-shop-card">
                    <i className="far fa-shopping-cart shop-card"></i>
                    <span>Basket</span>
                    {basket.length > 0 && <span className='shop-counter'>{basket.length}</span>}
                </div>
            </div>
        </div>

    )
}
