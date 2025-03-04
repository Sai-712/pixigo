import React, { useState } from 'react';
import { Menu, X, Upload, Camera, LogIn, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleLoginSuccess = (credentialResponse: any) => {
    try {
      console.log('Login Success:', credentialResponse);
      setIsLoggedIn(true);
      // In a real app, you would decode the JWT token and extract user info
      setUserProfile({
        name: 'User',
        email: 'user@example.com',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      });
    } catch (error) {
      console.error('Error processing login:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  // Alternative login for development/testing
  const handleDevLogin = () => {
    setIsLoggedIn(true);
    setUserProfile({
      name: 'Test User',
      email: 'test@example.com',
      picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    });
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Pixigo</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
            Features
          </a>
          <a href="#testimonials" className="text-sm font-semibold leading-6 text-gray-900">
            Testimonials
          </a>
          <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-900">
            Pricing
          </a>
          <a href="#faq" className="text-sm font-semibold leading-6 text-gray-900">
            FAQ
          </a>
          {isLoggedIn && (
            <>
              <Link to="/upload" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                <Upload className="h-4 w-4 mr-1" /> Upload Photos
              </Link>
              <Link to="/upload_selfie" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                <Camera className="h-4 w-4 mr-1" /> Upload Selfie
              </Link>
            </>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
              {import.meta.env.DEV && (
                <button
                  onClick={handleDevLogin}
                  className="text-sm font-semibold leading-6 text-gray-900 border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
                >
                  Dev Login
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {userProfile?.picture && (
                  <img 
                    src={userProfile.picture} 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full mr-2"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">{userProfile?.name || 'User'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center text-sm font-semibold leading-6 text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-1" /> Log out
              </button>
            </div>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-bold text-indigo-600">Fotos</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a
                    href="#features"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#testimonials"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </a>
                  <a
                    href="#pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a
                    href="#faq"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  {isLoggedIn && (
                    <>
                      <Link
                        to="/upload"
                        className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Upload className="h-5 w-5 mr-2" /> Upload Photos
                      </Link>
                      <Link
                        to="/upload_selfie"
                        className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Camera className="h-5 w-5 mr-2" /> Upload Selfie
                      </Link>
                    </>
                  )}
                </div>
                <div className="py-6">
                  {!isLoggedIn ? (
                    <div className="px-3 py-2 space-y-4">
                      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
                      {import.meta.env.DEV && (
                        <button
                          onClick={() => {
                            handleDevLogin();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-sm font-semibold leading-6 text-gray-900 border border-gray-300 rounded-md px-3 py-1.5 hover:bg-gray-50"
                        >
                          Dev Login
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center px-3">
                        {userProfile?.picture && (
                          <img 
                            src={userProfile.picture} 
                            alt="Profile" 
                            className="h-8 w-8 rounded-full mr-2"
                          />
                        )}
                        <span className="text-base font-medium text-gray-700">{userProfile?.name || 'User'}</span>
                      </div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 flex w-full items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        <LogOut className="h-5 w-5 mr-2" /> Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;