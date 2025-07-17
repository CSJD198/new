import React from 'react';
import { motion } from 'framer-motion';
import { Database, Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onNavigate?: (section: string) => void;
  isMenuOpen?: boolean;
  onMenuToggle?: () => void;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  isMenuOpen, 
  onMenuToggle,
  showBackButton = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = ['Home', 'Features', 'About', 'Pricing', 'Contact'];

  const handleBackClick = () => {
    if (location.pathname.startsWith('/analyze/')) {
      navigate('/dashboard');
    } else if (location.pathname === '/dashboard') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 card-bg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Database className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              DataWhiz
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 ${showBackButton ? 'flex-1 justify-center' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate?.(item.toLowerCase())}
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className={`hidden md:block ${showBackButton ? 'ml-auto' : ''}`}>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Start Analyzing
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-indigo-400 hover:bg-white/10"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden card-bg border-t border-white/10"
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate?.(item.toLowerCase())}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-indigo-400 hover:bg-white/10 rounded-md"
              >
                {item}
              </button>
            ))}
            <div className="pt-2">
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full"
              >
                Start Analyzing
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};