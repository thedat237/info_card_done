import "./Banner01.css"
import bannerPhone from "../../../assets/banner_phone.png"
import bannerCard4 from "../../../assets/banner_card4.png"
import { Button } from 'react-bootstrap'

export default function Banner01() {
    return (
        <div className='banner-header py-5'>
            <div className='container'>
                <div className="row banner-header justify-content-around">
                    <div className='col-lg-3'>
                        <h1 className="banner__heading banner-title">
                            Chia sẻ<br /> mạng xã hội trong 1s.
                        </h1>
                        <Button variant="primary">Đặt mua</Button>
                    </div>
                    <div className="col-lg-3 text-center">
                        <img src={bannerPhone} className='phone-img' alt='img_banner_1'/>
                    </div>
                    <div className="col-lg-3 text-center">
                        <img src={bannerCard4} className='card-image' alt='img_banner_1'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
