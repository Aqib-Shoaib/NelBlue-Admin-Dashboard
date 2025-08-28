import React, { useState } from 'react'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useLogin } from '../store/useAuth'

function Login() {
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const loginMutation = useLogin()
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    function handleBlur(e) {
        const { name } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
        validateField(name, form[name])
    }

    function validateField(name, value) {
        let error = ''
        
        switch (name) {
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required'
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address'
                }
                break
            case 'password':
                if (!value.trim()) {
                    error = 'Password is required'
                } else if (value.length < 6) {
                    error = 'Password must be at least 6 characters'
                }
                break
            default:
                break
        }
        
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }))
        } else {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
        
        return error
    }

    function validateForm() {
        const newErrors = {}
        
        // Validate all fields
        Object.keys(form).forEach(key => {
            if (key !== 'remember') {
                const error = validateField(key, form[key])
                if (error) {
                    newErrors[key] = error
                }
            }
        })
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleSubmit(e) {
        e.preventDefault()
        
        // Mark fields as touched so errors show immediately
        setTouched(prev => ({ ...prev, email: true, password: true }))

        if (!validateForm()) {
            return
        }
        
        const payload = { email: form.email, password: form.password }
        try {
            await loginMutation.mutateAsync(payload)
            navigate('/')
        } catch (err) {
            console.error('Login error:', err?.message || err)
        }
    }

    // Disable submit if required fields are empty or there are known errors
    const isFormFilled = form.email.trim() && form.password.trim()
    const hasErrors = Object.values(errors).some(Boolean)

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 h-screen w-full p-4 md:p-6'>
            <div className='bg-[#347CC6] w-full rounded-lg min-h-[180px] md:min-h-full'></div>
            <div className='py-6' >
            <div className='bg-[#F4F4F4] w-full rounded-2xl p-4 sm:p-6' >
                <div className='flex flex-col gap-3 py-8 sm:py-10 px-4 sm:px-8 md:px-12' >
                    <h3 className='font-bold text-2xl text-[#023AA2] font-inter'>NELAUTOS</h3>
                    <div className='mt-6'>
                        <h1 className='font-semibold text-2xl sm:text-3xl text-[#121212] mb-1'>Login</h1>
                        <p className='font-light text-sm text-[#12121250]'>Welcome,  fill up the form to get started.</p>
                    </div>
                    <form onSubmit={handleSubmit} className='my-5 flex flex-col gap-4' noValidate>
                        <Input
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email}
                        />
                        <Input
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            type='password'
                            value={form.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && errors.password}
                        />
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-1.5'>
                                <input type="checkbox" className='border border-[#121212] w-3.5 h-3.5 cursor-pointer' name="remember" id="remember" checked={form.remember} onChange={handleChange} />
                                <p className='font-normal text-sm text-[#121212]/50'>Remember Me</p>
                            </div>
                            <div>
                                <Link className='text-sm text-[#023AA2]' to='/login' >Forgotten Password</Link>
                            </div>
                        </div>
                        {loginMutation.isError && (
                            <p className='text-red-600 text-sm'>{loginMutation.error?.message}</p>
                        )}
                        <Button type='submit' disabled={loginMutation.isPending || !isFormFilled || hasErrors}> 
                            {loginMutation.isPending ? 'Signing in...' : 'Login'} 
                        </Button>
                        <div className="flex justify-center items-center gap-1 mt-4">
                            <span className="font-poppins font-medium text-[13px] leading-5 text-black/70">
                                Don't have an account?
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
        </div>
    )
}

export default Login