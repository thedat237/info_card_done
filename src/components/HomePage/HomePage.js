import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth'
import RequireAuth from '../Auth/RequireAuth'
import Banner01 from './Banner/Banner01'
import Banner02 from './Banner/Banner02'
import Banner03 from './Banner/Banner03'
import Banner04 from './Banner/Banner04'
import Banner05 from './Banner/Banner05'
import Banner06 from './Banner/Banner06'

export default function HomePage() {
    const authCtx = useContext(AuthContext)
    return (
        <div>
            <Banner01/>
            <div className='my-5'>
                <Banner02/>
            </div>
            <Banner06 />
            <Banner03 />
            <Banner04 />
            <div>
                <RequireAuth mode="hidden">
                    <Banner05/>
                </RequireAuth>
            </div>
            {
                authCtx.user 
                ? null 
                : (<div className='d-flex justify-content-center container mb-3'>
                    <NavLink to="/login">
                        <button className='btn btn-primary w-100'>Đặt mua</button>
                    </NavLink>
                </div>)
            }
        </div>
    )
}
