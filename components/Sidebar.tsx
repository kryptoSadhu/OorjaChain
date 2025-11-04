import React from 'react';
import { Page } from '../types';
import { DashboardIcon, CalculatorIcon, WalletIcon, ChatIcon, AboutIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { page: Page; label: string; icon: React.FC<{className?: string}> }[] = [
    { page: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { page: 'calculator', label: 'Calculator', icon: CalculatorIcon },
    { page: 'wallet', label: 'Wallet', icon: WalletIcon },
    { page: 'chatbot', label: 'Oorja AI', icon: ChatIcon },
    { page: 'about', label: 'About Us', icon: AboutIcon },
  ];

  const NavLink: React.FC<{ page: Page; label: string; icon: React.FC<{className?: string}> }> = ({ page, label, icon: Icon }) => {
    const isActive = currentPage === page;
    const activeClass = 'bg-yellow-400 text-black';
    const inactiveClass = 'text-gray-300 hover:bg-gray-700 hover:text-white';

    return (
      <li className="mb-2">
        <button
          onClick={() => setCurrentPage(page)}
          className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
        >
          <Icon className="h-6 w-6 mr-4" />
          <span className="font-medium">{label}</span>
        </button>
      </li>
    );
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 flex-shrink-0">
      <nav className="mt-16">
        <ul>
          {navItems.map(item => <NavLink key={item.page} {...item} />)}
        </ul>
      </nav>
      <div className="mt-auto text-center text-gray-400 text-xs">
        <p>&copy; {new Date().getFullYear()} OorjaChain. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;