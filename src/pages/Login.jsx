import React, { useState } from 'react'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useLogin } from '../store/useAuth'

function Login() {
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const loginMutation = useLogin()
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const payload = { email: form.email, password: form.password }
        try {
            const data = await loginMutation.mutateAsync(payload)
            console.log("navigating::", !!data)
            if(data){
                
                navigate('/')
            }
        } catch (err) {
            console.error('Login error:', err?.message || err)
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[calc(100dvh-0px)] w-full p-4 md:p-6'>
            <div className='bg-[#347CC6] w-full rounded-lg min-h-[180px] md:min-h-full'></div>
            <div className='bg-[#F4F4F4] w-full rounded-2xl p-4 sm:p-6' >
                <div className='flex flex-col gap-3 py-8 sm:py-10 px-4 sm:px-8 md:px-12' >
                    <h3 className='font-bold text-2xl text-[#023AA2]'>NELAUTOS</h3>
                    <div className='mt-6'>
                        <h1 className='font-semibold text-2xl sm:text-3xl text-[#121212] mb-1'>Login</h1>
                        <p className='font-light text-sm text-[#12121250]'>Welcome,  fill up the form to get started.</p>
                    </div>
                    <form onSubmit={handleSubmit} className='my-5 flex flex-col gap-4'>
                        <Input
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type='password'
                            value={form.password}
                            onChange={handleChange}
                        />
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-1.5'>
                                <input type="checkbox" className='border border-[#121212] cursor-pointer' name="remember" id="remember" checked={form.remember} onChange={handleChange} />
                                <p className='font-light text-sm text-[#12121250]'>Remember Me</p>
                            </div>
                            <div>
                                <Link className='text-sm text-[#023AA2]' to='/login' >Forgot Password</Link>
                            </div>
                        </div>
                        {loginMutation.isError && (
                            <p className='text-red-600 text-sm'>{loginMutation.error?.message}</p>
                        )}
                        <Button type='submit' disabled={loginMutation.isPending}> {loginMutation.isPending ? 'Signing in...' : 'Login'} </Button>
                        <div className="flex justify-center items-center gap-1 mt-4">
                            <span className="font-poppins font-medium text-[13px] leading-5 text-black/70">
                                Don’t have an account?
                            </span>
                            <Link
                                to="/signup"
                                className="font-poppins font-medium text-[13px] leading-5 text-[#023AA2] hover:underline"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login