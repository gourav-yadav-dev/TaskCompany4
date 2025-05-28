import { FaSearch, FaStar, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
export function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    function handleOffcanvas() {
        setMenuOpen(true)
    }
    return (
        <>
            <header className="flex justify-between lg:px-8 p-3 shadow-md">
                <div className="flex items-center gap-1 lg:ms-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                        <FaStar className="text-white text-sm" />
                    </div>
                    <span className="text-gray-700 text-lg font-medium">
                        Review<span className="text-purple-600">&</span>
                        <span className="font-bold text-black">RATE</span>
                    </span>
                </div>
                <div className="hidden md:flex  mx-8">
                    <div className="flex items-center border rounded-md px-2 py-1 w-100 mx-8">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full outline-none px-2 py-1 text-sm"
                        />
                        <FaSearch className="text-purple-600" />
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-sm mx-8">
                        <button className="font-medium mx-4">SignUp</button>
                        <button className="font-medium mx-4">Login</button>
                    </div>
                </div>
                <div className="md:hidden">
                    <button onClick={handleOffcanvas}>
                        <FaBars className="text-xl text-gray-700" />
                    </button>
                </div>


            </header>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)}>
                        <FaTimes className="text-xl text-gray-700" />
                    </button>
                </div>

                <div className="px-4 py-4 space-y-4">
                    <div className="flex items-center border rounded-md px-2 py-1">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full outline-none px-2 py-1 text-sm"
                        />
                        <FaSearch className="text-purple-600" />
                    </div>
                    <button className="block w-full text-left text-sm hover:text-purple-600">SignUp</button>
                    <button className="block w-full text-left text-sm hover:text-purple-600">Login</button>
                </div>
            </div>


            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                ></div>
            )}
        </>
    )
}