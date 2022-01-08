import { useContext, useEffect, useState } from 'react'
import "./NavBar.css"
import logo from "../../assets/banner_logo.png"
import { Link, NavLink } from "react-router-dom"
import AuthContext from '../../context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { Badge } from "react-bootstrap"
import { connect, useDispatch } from 'react-redux'
import ModalCart from '../HomePage/Modal/ModalCart'
import { UPDATECART } from '../../redux/reducer/cart'
import ModalSuccess from '../HomePage/Modal/ModalSuccess'
// import ModalBuyInCart from '../HomePage/Modal/ModalBuyInCart'
import { FaBars, FaTimes } from 'react-icons/fa';
import { DropdownButton, Dropdown} from 'react-bootstrap'

const NavBar = ({ Infor, CartItems, CartProduct }) => {
    const [showModalCart,setShowModalCart] =useState(false)
    const [showModalBuyCart, setShowModalBuyCart] = useState(false)
    const [clicked, setClicked] = useState(false)
    const authCtx = useContext(AuthContext)
    const dispatch = useDispatch()
    
    // const dataShoppingSuccess = JSON.parse(localStorage.getItem("shoppingSuccess")) || []

    const updateCart = () => {
        const dataCart = JSON.parse(localStorage.getItem("Cart"))
       
        console.log(dataCart);
        if (CartItems === 0) {
            if (dataCart) {
                dispatch({
                    type: UPDATECART,
                    payload: dataCart
                })
            }
        }
    }

    const handleBuyItems = () => {
        setShowModalBuyCart(false)
    }

    const logout = () => {
        window.open(`${process.env.REACT_APP_OAUTH_URL}/auth/logout`, '_self')
    }

    useEffect(() => {
        updateCart()
    },[])

    return (
        <nav className="d-flex justify-content-between container navigation-bars">
            <Link to='/' className='header-logo '>
                <img src={logo} className='logo-img' alt='Logo_Img'/>
            </Link>
            {
                clicked === false ?
                <FaBars className='navigation-icons' onClick={() => setClicked(true)} /> :
                <FaTimes className='navigation-icons' onClick={() => setClicked(false)} />
            }
            <div className={clicked === false ? 'navigation-bars__menu' : 'navigation-bars__menu__click'}>
                <NavLink 
                    to="/gioi-thieu" 
                    className='navigation-bars__menu__navlink'
                >
                    Giới thiệu
                </NavLink>
                <NavLink 
                    to="/huong-dan" 
                    className='navigation-bars__menu__navlink'
                >
                    Hướng dẫn
                </NavLink>
                <NavLink 
                    to={authCtx.user ? `/tao-the/${authCtx.user._id}` : '/login'} 
                    className='navigation-bars__menu__navlink'
                >
                    Tạo thẻ
                </NavLink>
                <NavLink 
                    to={authCtx.user ? `/thong-tin-scan/${authCtx.user._id}` : '/login'} 
                    className='navigation-bars__menu__navlink'
                >
                    Thông tin thẻ
                </NavLink>
                <div className='position-relative me-3' onClick={() => setShowModalCart(true)}>
                    <FontAwesomeIcon icon={faCreditCard} className=' fs-3'/>
                    {CartItems ? <Badge bg="success" className='count-items'>{CartItems}</Badge> : null}
                </div>
                {
                    authCtx.user ?
                    <DropdownButton
                        variant="outline-secondary"
                        title={authCtx.user.username}
                    >
                        <Dropdown.Item>
                            <NavLink to={`/profile/${authCtx.user._id}`} className='text-decoration-none'>Profile</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to={`/edit/${authCtx.user._id}`} className='text-decoration-none'>Edit Card</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                    </DropdownButton>
                    :
                    <Link to="/login" className="text-decoration-none navigation-button">
                        <button className='btn btn-primary'>Tạo thẻ</button>
                    </Link>
                }
                <ModalCart show={showModalCart} 
                    onCloseModalCart={() => {
                        setShowModalCart(false)
                    }}
                    showModalBuyCart={() => {
                        setShowModalCart(false)
                        setShowModalBuyCart(true)
                    }}
                />
                <ModalSuccess show={showModalBuyCart} handleCloseModal={handleBuyItems}/>
            </div>
            {/* {authCtx.user ? 
                <>
                    <ul className="header-menu is-active m-0">
                        <li className="header-menu-item">
                            <Link to="/gioi-thieu" className="header-menu-link text-decoration-none fw-bold fs-6 text">
                                Giới thiệu
                            </Link>
                        </li>
                        <li className="header-menu-item">
                            <Link to="/huong-dan" className="header-menu-link text-decoration-none fw-bold fs-6 text">Hướng dẫn</Link>
                        </li>
                        <li className="header-menu-item">
                            <Link to={`/tao-the/${authCtx.user.id}`} className="header-menu-link text-decoration-none fw-bold fs-6 text">Tạo thẻ</Link>
                        </li>
                        {Infor.length !== 0 || dataShoppingSuccess.length !== 0 ?   
                            <li className="header-menu-item">
                                <Link to={`/thong-tin-scan/${authCtx.user.id}`} className="header-menu-link text-decoration-none fw-bold fs-6 text">Thông tin thẻ</Link>
                            </li> 
                            : 
                            <li className="header-menu-item">
                                <Link to={`/thong-tin-scan/${authCtx.user.id}`} className="header-menu-link text-decoration-none fw-bold fs-6 disabled text">Thông tin thẻ</Link>
                            </li> 
                        }

                    </ul>
                    <div className='d-flex align-items-center cart'>
                        <div className='position-relative me-3' onClick={() => setShowModalCart(true)}>
                            <FontAwesomeIcon icon={faCreditCard} className=' fs-3'/>
                            {CartItems ? <Badge bg="success" className='count-items'>{CartItems}</Badge> : null}
                        </div>
                        <div className='p-2 bg-dark text-white rounded'>
                            {authCtx.user.username}
                        </div>
                    </div>
                    <ModalCart show={showModalCart} 
                        onCloseModalCart={() => {
                            setShowModalCart(false)
                        }}
                        showModalBuyCart={() => {
                            setShowModalCart(false)
                            setShowModalBuyCart(true)
                        }}
                    />
                    <ModalSuccess show={showModalBuyCart} handleCloseModal={handleBuyItems}/>
                </>
                :
                <>
                    <ul class="header-menu is-active m-0">
                        <li class="header-menu-item">
                            <Link to="/gioi-thieu" className="header-menu-link text-decoration-none fw-bold fs-6 text">
                                Giới thiệu
                            </Link>
                        </li>
                        <li class="header-menu-item">
                            <Link to="/huong-dan" className="header-menu-link text-decoration-none fw-bold fs-6 text">Hướng dẫn</Link>
                        </li>
                        <li class="header-menu-item">
                                <Link to="/login" className="header-menu-link text-decoration-none fw-bold fs-6 text">Tạo thẻ</Link>
                        </li>
                        <li class="header-menu-item">
                            <Link to="/login" className="header-menu-link text-decoration-none fw-bold fs-6 text">Thông tin thẻ</Link>
                        </li>
                    </ul>
                    <NavLink to="/login" className="text-decoration-none">
                        <button className='btn btn-primary'>Tạo thẻ</button>
                    </NavLink>
                </>
            } */}
        </nav>
    )
}

const maptoStatetoProps = state => ({
    Infor: state.Infor.data,
    CartItems: state.Cart.items,
    CartProduct: state.Cart.product
})

export default connect(maptoStatetoProps, null)(NavBar)