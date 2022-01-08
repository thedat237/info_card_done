import "./Banner02.css"
import peopleCard from "../../../assets/people_card.jpg"

export default function Banner02() {
    return (
        <div className='container my-5'>
            <h2 className='banner__heading text-dark'>
                Infor card - Xu hướng kết nối<br /> chuyên nghiệp hiện đại
            </h2>
            <div className='row justify-content-center align-items-center information-banner'>
                <div className="col-xl-6 col-lg-6">
                    <img src={peopleCard} className="section1-img" alt='img_banner_2'/>
                </div>
                <div className='col-xl-6 col-lg-6'>
                    <h2 className='section1-title'>KHÔNG CẦN CÀI ĐẶT GÌ THÊM</h2>
                    <h5 className='section1-desc mt-3'>Chạm thẻ Metap vào điện thoại để chia sẻ thông tin, giảm thời gian trao đổi các mạng xã hội như Facebook, Instagram, Zalo, Số điện thoại, Email và thông tin liên lạc</h5>
                    <ul className='mt-3'>
                        <li className='fs-5 fw-500'>Không thu phí hàng tháng</li>
                        <li className='fs-5 fw-500'>Thoải mái đổi thông tin không giới hạn</li>
                        <li className='fs-5 fw-500'>Không giới hạn số lần chạm thẻ</li>
                        <li className='fs-5 fw-500'>Không yêu cầu mật khẩu khi truy cập</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
