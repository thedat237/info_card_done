import "./Banner04.css"
import bannerCard from "../../../assets/banner_card.png"
import bannerSocial from "../../../assets/banner_social.png"
import bannerPhone4 from "../../../assets/banner_phone4.png"
import bannerPhone3 from "../../../assets/banner_phone3.png"

export default function Banner04() {
    return (
        <div className="container">
            <div className="mt-5">
                <h2 className='banner__heading text-dark'>Bước 1: Nhập Tên</h2>
                <div className='step-infor row'>
                    <div className='col-xl-6 col-lg-6 col-md-6'>
                        <h5 className='fs-2 mb-3'>Điền tên trên thẻ, đặt mua<br /> và thanh toán</h5>
                        <button className='btn btn-primary'>Đặt mua</button>
                    </div>
                    <img src={bannerCard} className='step-card-img col-xl-6 col-lg-6 col-md-6' alt='banner_img_4'/>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='banner__heading text-dark'>Bước 2: Thêm thông tin <br />cá nhân vào thẻ</h2>
                <div className='step-infor row align-items-center'>
                    <img src={bannerSocial} alt='img' className="col-xl-6 col-lg-6 col-md-6"/>
                    <h2 className='step-text col-xl-6 col-lg-6 col-md-6'>
                        Khi nhận hàng, bạn nhận<br /> được thẻ và tờ hướng dẫn,<br />bạn làm theo tờ hướng dẫn<br /> để tự thêm thông tin cá<br /> nhân vào thẻ.
                    </h2>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='banner__heading text-dark'>Bước 3: Sử dụng</h2>
                <h3>Hoạt động trên cả Android và IOS, không cần cài đặt gì thêm</h3>
                <div className='step-infor row align-items-center justify-content-around'>
                    <div className='d-flex flex-column align-items-center col-xl-6 col-lg-6 col-md-6'>
                        <img src={bannerPhone3} className='step-phone-img mt-5' alt='img'/>
                        <div className='d-flex flex-column align-items-center mt-3'>
                            <h4>QUÉT THẺ</h4>
                            <h6>Hoạt động trên hầu hết điện thoại Android & iOS</h6>
                            <h6>(iPhone 5S trở lên)</h6>
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-center col-xl-6 col-lg-6 col-md-6'>
                        <img src={bannerPhone4} className='step-phone-img mt-5' alt='img'/>
                        <div className='d-flex flex-column align-items-center mt-3'>
                            <h4>CHẠM THẺ</h4>
                            <h6>Hoạt động trên hầu hết điện thoại Android & iOS</h6>
                            <h6>(iPhone XS trở lên)</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
