import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-[#1e201e] border-b-[1px] border-[#2d2d2d]">
            <div className="w-full h-20 mx-auto px-4">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex items-center pl-4">
                        <Link to="/home" className="flex items-center">
                            <img
                                src="/src/assets/Navbar-Logo.png"
                                alt="Logo"
                                className="h-14 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-8 pr-4">
                        <Link
                            to="/recommendation"
                            className="text-gray-300 hover:text-[#F39E60] px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out"
                        >
                            Recommendation
                        </Link>
                        <Link
                            to="/genres"
                            className="text-gray-300 hover:text-[#F39E60] px-3 py-2 rounded-md text-lg font-medium transition duration-150 ease-in-out"
                        >
                            Genres
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar