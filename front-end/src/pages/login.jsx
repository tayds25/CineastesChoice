import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            // Add authentication logic here
            navigate('/home')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        // PARENT CONTAINER
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat gap-40"
            style={{
                backgroundImage: `url('src/assets/Login-BG.png')`,
            }}
        >
            {/* LOGO */}
            <div>
                <img
                    src="src/assets/Logo.png"
                    alt="Logo"
                    className="w-auto h-[30rem] mx-auto"
                    style={{ animation: 'slideInFromRight 1s ease-out' }}
                />
            </div>

            {/* Login Form */}
            <div
                style={{ animation: 'slideInFromLeft 1s ease-out' }}
                className="max-w-md w-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
            >
                <h2
                    style={{ animation: 'appear 2s ease-out' }}
                    className="text-center text-4xl font-extrabold text-white"
                >
                    Welcome!
                </h2>
                <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-gray-200">
                    Sign in to your account
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            placeholder="Email Address"
                            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-[#F39E60]"
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#F39E60] peer-focus:text-sm"
                            htmlFor="email"
                        >
                            Email address
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            placeholder="Password"
                            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-[#F39E60]"
                            required
                            id="password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#F39E60] peer-focus:text-sm"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-[#F39E60] hover:bg-[#E16A54] rounded-md shadow-lg text-white font-semibold transition duration-200"
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-center text-gray-300">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#F39E60] hover:underline" href="#">
                        Sign up
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Login