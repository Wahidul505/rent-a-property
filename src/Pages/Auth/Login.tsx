import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks';
import { storeUser } from '../../features/userSlice';
import { User } from '../../modals/Auth';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location: any = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = {
            email,
            password
        };
        const res = await fetch('https://rent-property.onrender.com/login', {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newUser)
        });
        const data = await res.json();
        if (data.status) {
            localStorage.setItem('TokenInfo', JSON.stringify({ token: data.token, name: data.user.name, email: data.user.email }));
            await dispatch(storeUser({ name: data.user.name, email: data.user.email, token: data.token }));
            navigate(from, { replace: true })
        }
        else {
            toast.error(data.error, { id: 'login-failed' });
        }
    }

    return (
        <div className='w-11/12 md:w-1/2 lg:w-2/5 mx-auto flex-shrink-0 shadow-2xl bg-base-100 p-2 md:p-4'>
            <form onSubmit={(e) => handleLogin(e)}>
                <h1 className='text-center text-2xl text-primary mb-6'>Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl">Email</span>
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" placeholder="email" className="input input-bordered text-lg" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl">Password</span>
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder="password" className="input input-bordered text-lg" required />
                    <label className="label">
                        <p>New to this website? <Link to='/sign-up' className='underline text-secondary'>SignUp</Link></p>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className='btn btn-primary'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login