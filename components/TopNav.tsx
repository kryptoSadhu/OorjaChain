import React, { useState, useRef, useEffect, createRef } from 'react';
import { Page } from '../types';
import { DashboardIcon, CalculatorIcon, WalletIcon, ChatIcon, AboutIcon, OorjaChainLogo } from './icons';

interface TopNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems: { page: Page; label: string; icon: React.FC<{className?: string}> }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { page: 'calculator', label: 'Calculator', icon: CalculatorIcon },
    { page: 'wallet', label: 'Wallet', icon: WalletIcon },
    { page: 'chatbot', label: 'Oorja AI', icon: ChatIcon },
    { page: 'about', label: 'About Us', icon: AboutIcon },
];

const TopNav: React.FC<TopNavProps> = ({ currentPage, setCurrentPage }) => {
    const [sliderStyle, setSliderStyle] = useState({});
    const navRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef(navItems.map(() => createRef<HTMLLIElement>()));

    useEffect(() => {
        const activeIndex = navItems.findIndex(item => item.page === currentPage);
        const activeItem = itemRefs.current[activeIndex]?.current;

        if (activeItem) {
            setSliderStyle({
                left: `${activeItem.offsetLeft}px`,
                width: `${activeItem.offsetWidth}px`,
            });
        }
    }, [currentPage]);

    return (
        <header className="bg-gray-800 text-white shadow-md z-10">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo and Brand Name */}
                <div className="flex items-center">
                    <OorjaChainLogo className="h-10 w-10 mr-3" />
                    <h1 className="text-xl font-bold tracking-wider">OorjaChain</h1>
                </div>

                {/* Navigation Tabs */}
                <nav className="relative">
                    <ul ref={navRef} className="flex items-center space-x-2">
                        {navItems.map((item, index) => (
                            <li
                                key={item.page}
                                ref={itemRefs.current[index]}
                                className="z-10"
                            >
                                <button
                                    onClick={() => setCurrentPage(item.page)}
                                    className={`px-4 py-2 flex flex-col items-center text-sm font-medium rounded-md transition-colors duration-300 focus:outline-none ${
                                        currentPage === item.page ? 'text-amber-400' : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 mb-1" />
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* The animated slider */}
                    <div
                        className="absolute bottom-0 h-1 bg-amber-500 rounded-full transition-all duration-300 ease-in-out"
                        style={sliderStyle}
                    />
                </nav>
            </div>
        </header>
    );
};

export default TopNav;
