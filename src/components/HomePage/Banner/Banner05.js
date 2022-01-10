import { useContext, useEffect, useState} from 'react'
import "./Banner05.css"
import cardType from '../../../data/dataCard'
// import InforScan from '../../InforScan/InforScan'
import QRCode from "qrcode.react"
// import logoScan from "../../../assets/logo_scan.png"
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../../context/auth'
import { Dropdown, FormControl, InputGroup, DropdownButton, Button } from "react-bootstrap"
import socialNetWork from '../../../data/socialNetWork'
import ModalSuccess from '../Modal/ModalSuccess'
import ModalEmptyInput from '../Modal/ModalEmptyInput'
import DropDownLink from '../../DropDown/DropDownLink'
import { connect, useDispatch } from 'react-redux'
import { SAVECART } from '../../../redux/reducer/infor'
import { ADDPRODUCT } from '../../../redux/reducer/cart'

const Banner05 = ({ Infor, Cart, ShoppingCart }) => {
    const [selectedImg, setSelectedImg] = useState(cardType[0].src)
    const [selectedNameCard, setSelectedNameCard] = useState(cardType[0].name)
    const [name, setName] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [overview, setOverview] = useState("")
    const [listSocials, setListSocials] = useState([])
    // const [socialName, setSocialName] = useState('')
    const [socialName, setSocialName] = useState(socialNetWork[0].name)
    const [socialLink, setSocialLink] = useState('')
    const [socials, setSocials] = useState([
        {socialName: socialName, socialLink: ""},
    ])
    const [newData, setNewData] = useState([])
    const [imageQRcode, setImageQRcode] = useState("")
    const [data, setData] = useState(() => {
        const storageInfoQR = JSON.parse(localStorage.getItem("dataQR"))
        return storageInfoQR
    })
    const [showModal, setShowModal] = useState(false);

    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleBuyItems = () => {
        setShowModal(false)
        navigate(`/thong-tin-scan/${authCtx.user.id}`)
    }

    useEffect(() => {
        return () => {
            avatarUrl && URL.revokeObjectURL(avatarUrl.preview)
        }
    }, [avatarUrl])

    const onChangeAvatar = e => {
        const fileAvatar = e.target.files[0]
        fileAvatar.preview = URL.createObjectURL(fileAvatar)
        setAvatarUrl(fileAvatar)
    }

    // const handleChangeSocial = e => {
    //     setSocialLink(e.target.value)
    // }

    // const handleSelect = name => {
    //     setSocialName(name)
    // }

    // const handleAddSocial = e => {
    //     e.preventDefault()
    //     setListSocials([
    //         ...listSocials,
    //         { 
    //             name: socialName,
    //             link: socialLink
    //         }
    //     ])
    //     setSocialName('')
    //     setSocialLink('')
    // }

    const handleSelectSocial = (item) => {
        let result = socials
        result[result.length - 1].socialName = item.name
        console.log("result", result);
        console.log("item", item);
        setSocialName(result[result.length - 1].socialName)
    }

    const handleChangeSocial = (id, e) => {
        console.log(e.target.value);
        const values = [...socials]
        values[id][e.target.name] = e.target.value
        setSocials(values)
    }
    console.log("socials",socials);
    const handleAddSocial = () => {
        setSocials([...socials, {socialName:socialName, socialLink: ""}])
    }

    useEffect(() => {
        setImageQRcode(`http://localhost:3000/thong-tin-scan/${authCtx.user._id}`)
    }, [data])

    console.log("Infor Scan", Infor)

    const addToCart = newData => {
        dispatch({
            type: ADDPRODUCT,
            payload: newData
        })
        const checkCart = localStorage.getItem("Cart")
        if (checkCart) {
            const parseCheckCart = JSON.parse(checkCart)
            parseCheckCart.push(newData)
            const jsonDataAddProduct = JSON.stringify(parseCheckCart)
            localStorage.setItem("Cart", jsonDataAddProduct)
        } else {
            let result = []
            result.push(newData)
            const jsonDataAddProduct = JSON.stringify(result)
            localStorage.setItem("Cart", jsonDataAddProduct)
        }
    }
    console.log("add to cart", Cart);

    const buyInfoCard = () => {
        console.log("new data", newData);
        let result = []
        result.push(newData)
        dispatch({
            type: SAVECART,
            payload: newData
        })

        localStorage.setItem("dataQR", JSON.stringify(newData))
        localStorage.setItem("shoppingSuccess", JSON.stringify(result))
        setShowModal(true)
    }

    const all = (e, typeButton) => {
        let data = onSubmitForm(e)
        if (typeButton === 1) {
            addToCart(data)
        } else {
            setShowModal(true)
            setNewData(data)
            localStorage.setItem("dataQR", JSON.stringify(data))
        }
    }
    // buyInfoCard(data)
    const randId = () =>{
        return Math.random().toString(36).replace('0.',  '');
    }

    const onSubmitForm = e => {
        e.preventDefault()
        const newData = {
            id: randId(),
            nameUser: name,
            avatarUrl: (avatarUrl === "" ? "" : avatarUrl.preview),
            nameCard: selectedImg,
            overview: overview,
            colorCard: selectedNameCard,
            qrImage: imageQRcode,
            social: (listSocials[0].socialLink === "" ? [] : listSocials)
        }
        console.log(newData)
        return newData
    }

    return (
        <>
            <div className='container m-5'>
                <div className='d-flex flex-column align-items-center'>
                    <h2 className='banner__heading text-dark fw-bold'>
                        Info card
                    </h2>
                    <h2 className='banner__heading text-dark fw-bold'>
                        Thẻ cá nhân thông minh
                    </h2>
                </div>
                <div className='d-flex gap-5'>
                    <div className='demo-card'>
                        <img src={selectedImg} className='demo-card-img' alt='img'/>
                        <QRCode 
                            className="demo-card-qr"  
                            size={100}
                            value={imageQRcode ? imageQRcode : "NA"}
                            bgColor={"#f7f7f7"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            renderAs={"svg"}
                        /> 
                        <h6 className='demo-card-name'>{name}</h6>
                    </div>
                    <div className='d-flex flex-column align-items-start form-demo-card'>
                        <form className='w-100' onSubmit={onSubmitForm}>
                            <div className='d-flex fw-bold fs-5 mb-3'>
                                <span>Loại thẻ:</span>
                                <span className='ms-3'>{selectedNameCard}</span>
                            </div>
                            <div className='d-flex fw-bold fs-5 mb-3'>
                                <span>Màu sắc:</span>
                                <div className='d-flex'>
                                    {cardType.map(img => (
                                        <div className='cursor-pointer card-type' key={img.id}>
                                            <img
                                                src={img.src} 
                                                alt='img'
                                                className='card-demo-luxury ms-3'
                                                onClick={() => {
                                                    setSelectedImg(img.src)
                                                    setSelectedNameCard(img.name)
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='d-flex w-100 gap-2 mb-3'>
                                <div className='w-100'>
                                    <label className='form-label fw-bold fs-5'>Tên của bạn</label>
                                    <input 
                                        name="nameUser"
                                        type="text"
                                        className='form-control' placeholder='Nhập tên của bạn'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className='w-100'>
                                    <label className='form-label fw-bold fs-5'>Avatar</label>
                                    <input 
                                        className='form-control' 
                                        placeholder='Nhập tên của bạn' 
                                        type="file"
                                        name="avatarUrl"
                                        onChange={onChangeAvatar}
                                    />
                                    {avatarUrl && (
                                        <div className='border-avatarUrl mt-2'>
                                            <img src={avatarUrl.preview} alt='hình của bạn' className='avatrUrl rounded-circle' />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='w-100 mb-3'>
                                <div className='w-100'>
                                    <label className='form-label fw-bold fs-5'>Giới thiệu</label>
                                    <textarea 
                                        name="overview"
                                        type="text"
                                        className='form-control' 
                                        placeholder=''
                                        value={overview}
                                        onChange={e => setOverview(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-100 d-flex flex-column align-items-end'>
                                {socials?.map((social, idx) =>  <>
                                    <DropDownLink 
                                        key={idx}
                                        title={social.socialName} 
                                        onClick={handleSelectSocial} 
                                        valueLink={social.socialLink} 
                                        onChangeLink={e => handleChangeSocial(idx, e)}
                                        nameInput="socialLink"
                                    />
                                    {socials.length - 1 === idx && 
                                        <button 
                                            className='btn btn-primary' 
                                            onClick={handleAddSocial}
                                        >
                                            Thêm mạng xã hội
                                        </button>
                                    }
                                    </>
                                )}
                                {/* <div className="mb-3 w-100">
                                    <InputGroup className='mt-3'>
                                        <DropdownButton
                                            variant="outline-secondary"
                                            title={socialName || 'Choose'}
                                            onSelect={handleSelect}
                                        >
                                            {socialNetWork.map(item => (
                                                <Dropdown.Item 
                                                    key={item.id} 
                                                    eventKey={item.name}
                                                >
                                                    {item.name}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                        <FormControl 
                                            name="socialLink" 
                                            value={socialLink} 
                                            onChange={handleChangeSocial}
                                        />
                                    </InputGroup>
                                    
                                    <button 
                                        className='btn btn-primary mt-3' 
                                        onClick={handleAddSocial}
                                    >
                                        Thêm Link cá nhân
                                    </button>
                                </div> */}
                            </div>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <div className='d-flex'>
                                    <p className='fw-bold fs-3 '>159,000đ</p>
                                    <p className='ms-3 fw-bold fst-italic fs-3 text-secondary text-decoration-line-through'>
                                        259,000đ
                                    </p>
                                </div>
                                <h6 className='fw-bold'>Freeship toàn quốc</h6>
                            </div>
                            <button className='btn btn-success mb-3 me-3' onClick={e => all(e, 1)}>Thêm vào giỏ hàng</button>
                            <button className='btn btn-primary mb-3' onClick={e => all(e, 2)}>Đặt mua</button>
                            {
                                name === "" ?
                                <ModalEmptyInput show={showModal} onClose={handleBuyItems}/>
                                :
                                <ModalSuccess show={showModal}
                                    handleCancleModal={() => setShowModal(false)}
                                    handleCloseModal={handleBuyItems}
                                    isLiveShopping
                                    buyInfoCard = {() => buyInfoCard()}
                                />
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

const maptoStatetoProps = state => ({
    Infor: state.Infor,
    ShoppingCart: state.Infor.data,
    Cart: state.Cart
})

export default connect(maptoStatetoProps, null)(Banner05)