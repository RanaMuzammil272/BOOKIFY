import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/userSlice'; // Import logoutUser action creator
import { FaBarsStaggered, FaBlog, FaXmark } from 'react-icons/fa6';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Navbar items
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'Blog', path: '/blog' },
        { link: 'Books', path: '/allBooks' },
        { link: 'ChatRoom', path: '/chat' },
        { link: 'Login', path: '/login' },
    ];

    const navItemsL = [
        { link: 'Home', path: '/' },
        { link: 'Blog', path: '/blog' },
        { link: 'Books', path: '/allBooks' },
        { link: 'ChatRoom', path: '/chat' },
        { link: 'Logout', path: '/login', onClick: () => dispatch(logoutUser()) }, // Dispatch logoutUser action directly
    ];

    return (
        <header className="w-full bg-transparent fixed top-0 right-0 transition-all ease-in duration-300 z-50">
            <nav className="py-4 lg:px-24 sticky top-0 left-0 right-0 backdrop-blur">
                <div className="flex justify-between items-center text-base gap-8">
                    <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                        <FaBlog className="inline-block" />
                        Bookify
                    </Link>
                    
                    {/* Render nav items based on user authentication */}
                    <ul className="md:flex space-x-12 hidden">
                        {user ? (
                            navItemsL.map(({ link, path, onClick }) => (
                                <li key={path}>
                                    <Link to={path} onClick={onClick} className="block text-base text-black uppercase cursor-pointer hover:text-blue-700">
                                        {link}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            navItems.map(({ link, path }) => (
                                <li key={path}>
                                    <Link to={path} className="block text-base text-black uppercase cursor-pointer hover:text-blue-700">
                                        {link}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>

                    {/* Button for large device */}
                    <div className="space-x-12 hidden lg:flex items-center">
                        <button>
                            <FaBarsStaggered className="w-s hover:text-blue-700" />
                        </button>
                    </div>

                    {/* Menu button for mobile devices */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            {isMenuOpen ? <FaXmark className="h-5 w-5 text-black" /> : <FaBarsStaggered className="h-5 w-5 text-black" />}
                        </button>
                    </div>
                </div>

                {/* Render nav items for small device */}
                <div className={'space-y-4 px-4 mt-16 py-7  bg-black ' + (isMenuOpen ? 'block fixed top-0 left-0 right-0' : 'hidden')}>
                    {navItemsL.map(({ link, path }) => (
                        <Link key={path} to={path} className="block text-base text-white uppercase cursor-pointer">
                            {link}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
