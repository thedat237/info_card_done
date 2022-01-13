import { useState } from "react"
import axios from "../../util/http"
import { useNavigate } from "react-router-dom"
import bannerPeople from '../../assets/banner_people_card.jfif'
import "./Login.css"
const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onRegisterSubmit = async e => {
        e.preventDefault()
        await axios.post('/auth/register', {
            username: username,
            password: password
        })
        navigate('/login')
    }

    return (
        <div className='bg-dark'>
            <section className='Form py-5'>
                <div className='container py-3'>
                    <div className='row'>
                        <div className='col-lg-5 col-md-5 col-sm-5 img'>
                            <img src={bannerPeople} className='login-img .d-none .d-sm-block' alt='banner'/>
                        </div>
                        <div className='col-lg-7 col-md-7 col-sm-7 mt-3 col-sm-12'>
                            <h1 className='fw-bold py-3'>Register</h1>
                            <h4>Register your account</h4>
                            <form className='my-5' onSubmit={onRegisterSubmit}> 
                                <div className='form-row'>
                                    <div className='col-lg-12'>
                                        <input  type="email"
                                            placeholder='Email-Address'
                                            className='form-control my-3 p-3'
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row mb-5'>
                                    <div className='col-lg-12'>
                                        <input type="password" 
                                            placeholder='******' 
                                            className='form-control my-3 p-3'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-lg-12'>
                                        <button className='btn1'>
                                            Register
                                        </button>
                                    </div>
                                </div>
                                <p>Do you already have an account? <a href='/login'>Login here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register