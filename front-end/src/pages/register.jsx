import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (credentials.password !== credentials.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Registration successful
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            setError(error.message);
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat gap-40"
            style={{
                backgroundImage: `url('src/assets/Register-BG.png')`,
            }}
        >
            <div>
                <img
                    src="src/assets/Logo.png"
                    alt="Logo"
                    className="w-auto h-[30rem] mx-auto"
                    style={{ animation: 'slideInFromRight 1s ease-out' }}
                />
            </div>

            <div
                style={{ animation: 'slideInFromLeft 1s ease-out' }}
                className="max-w-md w-full bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
            >
                <h2 className="text-center text-4xl font-extrabold text-white">Create Account</h2>
                <p className="text-center text-gray-200">Sign up to get started</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            placeholder="Full Name"
                            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-[#F39E60]"
                            required
                            id="name"
                            name="name"
                            type="text"
                            value={credentials.name}
                            onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#F39E60] peer-focus:text-sm"
                            htmlFor="name"
                        >
                            Full Name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            placeholder="Email Address"
                            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-[#F39E60]"
                            required
                            id="email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#F39E60] peer-focus:text-sm"
                            htmlFor="email"
                        >
                            Email Address
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
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#F39E60] peer-focus:text-sm"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            placeholder="Confirm Password"
                            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-[#F39E60]"
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={credentials.confirmPassword}
                            onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#F39E60] peer-focus:text-sm"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                    </div>
                    <button
                        className="w-full py-2 px-4 bg-[#F39E60] hover:bg-[#E16A54] rounded-md shadow-lg text-white font-semibold transition duration-200"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="text-center text-gray-300">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#F39E60] hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
