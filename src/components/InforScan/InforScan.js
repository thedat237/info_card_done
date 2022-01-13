import React, { useContext, useEffect, useState } from 'react'
import "./InforScan.css"
import BannerInfoScan4 from "../../assets/banner_info_scan4.png"
import QRCode from "qrcode.react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import facebook from "../../assets/socialLogo_facebook.png"
import instagram from "../../assets/socialLogo_instagram.png"
import email from "../../assets/socialLogo_email.png"
import AuthContext from '../../context/auth'
import { connect, useDispatch } from 'react-redux'
import { RESETCART, UPDATESHOPPINGSUCCESS } from '../../redux/reducer/infor'
import { useNavigate } from 'react-router-dom'

const socialLogo = {
    Facebook: facebook,
    Instagram: instagram,
    Email: email
}


const InforScan = ({Infor}) => {
    const dataShoppingSuccess=JSON.parse(localStorage.getItem("shoppingSuccess"))
    console.log("data", dataShoppingSuccess);
    console.log("abc", Infor);
    const authCtx = useContext(AuthContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState(Infor)
    
    const handleReloadCard = () => {
        dispatch({
            type: RESETCART,
        })
        localStorage.removeItem("shoppingSuccess")
        navigate(`/tao-the/${authCtx.user.id}`)
    }

    const updateShoppingSuccess = () => {
        dispatch({
            type: UPDATESHOPPINGSUCCESS,
            payload: dataShoppingSuccess
        })
    }

    // const convertArr = () => {
    //     let Infor = data
    //     console.log("fgh", Infor);

    if(Infor.lenght === 1){
        setData(Infor[0])
    }
    console.log(data);
    // }

    useEffect(() => {
        updateShoppingSuccess()
        // convertArr()
    },[])

    return (
        <div className='container'>
            {dataShoppingSuccess.map((item, idx) => <div className='d-flex justify-content-between align-items-center' key={idx}>
                    <div className='demo-card'>
                        <img src={item?.nameCard} className='demo-card-img'/>
                        <QRCode 
                            className="scanned-qr"  
                            size={100}
                            value={item?.qrImage}
                            bgColor={"#f7f7f7"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={false}
                            renderAs={"svg"}
                        />
                        <h6 className='demo-card-name'>{item?.nameUser}</h6>
                    </div>
                    <div className='position-relative'>
                        <img src={BannerInfoScan4} className="img-info-scan"/>
                        <div className='line'></div>
                        <div className='border-avatarUrl position-absolute border-scanned'>
                            <img src={item?.avatarUrl} className='scanned-avatar'/>
                        </div>
                        <div className='header-name'>
                            <h4 className='scanned-name text-dark'>{item?.nameUser}</h4>
                            <p className='scanned-address text-break'>{item?.overview}</p>
                        </div>
                        {item?.social.length !== 0 && item?.social.map((social, idx) => (
                            <a href={social?.socialLink} className={`scanned-card scanned-card-${idx}`} key={idx}>
                                <img src={socialLogo[social?.socialName]} className='logo-social'/>
                                <span>{social?.socialName}</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </a>
                        ))}
                    </div>
                </div>
            )}
            <div className='d-flex justify-content-center my-4'>
                <button className='btn btn-primary' onClick={handleReloadCard}>
                    <FontAwesomeIcon icon={faArrowLeft} className='me-2'/>
                    Làm thẻ mới
                </button>
            </div>
        </div>
    )
}
const maptoStatetoProps = (state) => ({
    Infor: state.Infor.data
})
export default connect(maptoStatetoProps, null)(InforScan)
