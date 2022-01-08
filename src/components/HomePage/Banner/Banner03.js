import './Banner03.css'
import { BsPersonPlus, BsPencilSquare, BsCreditCard2Front } from 'react-icons/bs'

const Banner03 = () => {
    const styleIcons = {
        fontSize: '45px',
    }

    return (
        <div className='step'>
            <div className='container'>
                <div className='row step justify-content-center'>
                    <div className='step-details col-lg-3'>
                        <BsPersonPlus style={styleIcons} />
                        <h4>Bước 1:</h4>
                        <h4>Nhập tên</h4>
                        <div className='step-line'></div>
                        <h5>Đặt mua thẻ<br /> theo tên của bạn</h5>
                    </div>
                    <div className='step-details col-lg-3'>
                        <BsPencilSquare style={styleIcons} />
                        <h4>Bước 2:</h4>
                        <h4>Thêm thông tin</h4>
                        <div className='step-line'></div>
                        <h5>Tự thêm thông tin theo<br /> hướng dẫn kèm theo thẻ</h5>
                    </div>
                    <div className='step-details col-lg-3'>
                        <BsCreditCard2Front style={styleIcons} />
                        <h4>Bước 3:</h4>
                        <h4>Sử dụng</h4>
                        <div className='step-line'></div>
                        <h5>Chạm thẻ<br /> để chia sẻ thông tin</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner03
