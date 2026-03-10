import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Terminal, Library, 
  LayoutDashboard, Menu, X, ChevronDown, User, Settings, LogOut, Award, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Mock authentication state (For testing purposes)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const location = useLocation();
  const exploreRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
      if (communityRef.current && !communityRef.current.contains(event.target as Node)) {
        setCommunityOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExploreOpen(false);
    setCommunityOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Tính năng Interactive Lab đang được phát triển và sẽ sớm ra mắt. Vui lòng quay lại sau!');
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3' 
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* 1. Logo - Left */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">BAIEdu</span>
          </Link>

          {/* 2. Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-2">
            
            {/* Khám phá Dropdown */}
            <div className="relative" ref={exploreRef}>
              <button 
                onClick={() => {
                  setExploreOpen(!exploreOpen);
                  setCommunityOpen(false);
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition-colors ${
                  exploreOpen || location.pathname.includes('/courses') || location.pathname.includes('/library')
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Khám phá <ChevronDown size={16} className={`transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {exploreOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2"
                  >
                    <Link to="/courses" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Khóa học</div>
                        <div className="text-xs text-slate-500 mt-0.5">Lộ trình học tập bài bản</div>
                      </div>
                    </Link>
                    <button onClick={handleLabClick} className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg group-hover:bg-emerald-100 transition-colors">
                        <Terminal size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">Phòng Lab</div>
                        <div className="text-xs text-slate-500 mt-0.5">Thực hành tương tác AI</div>
                      </div>
                    </button>
                    <Link to="/library" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="bg-orange-50 text-orange-600 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                        <Library size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">Thư viện</div>
                        <div className="text-xs text-slate-500 mt-0.5">Tài liệu & Prompt Hub</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cộng đồng Dropdown */}
            <div className="relative" ref={communityRef}>
              <button 
                onClick={() => {
                  setCommunityOpen(!communityOpen);
                  setExploreOpen(false);
                }}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition-colors ${
                  communityOpen || location.pathname.includes('/community')
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
                }`}
              >
                Cộng đồng <ChevronDown size={16} className={`transition-transform duration-200 ${communityOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {communityOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2"
                  >
                    <Link to="/community" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="bg-purple-50 text-purple-600 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">Diễn đàn</div>
                        <div className="text-xs text-slate-500 mt-0.5">Thảo luận & Peer Review</div>
                      </div>
                    </Link>
                    <Link to="/community" className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="bg-yellow-50 text-yellow-600 p-2 rounded-lg group-hover:bg-yellow-100 transition-colors">
                        <Award size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">Bảng xếp hạng</div>
                        <div className="text-xs text-slate-500 mt-0.5">Vinh danh thành viên</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* 3. Desktop Actions - Right */}
          <div className="hidden md:flex items-center gap-4 relative">
            
            {/* Dev Toggle for testing */}
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)} 
              className="absolute -top-6 right-0 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded hover:bg-slate-200 transition-colors"
              title="Toggle Login State (Dev only)"
            >
              Toggle Auth
            </button>

            {isLoggedIn ? (
              // Logged In State
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <LayoutDashboard size={18} /> Bảng điều khiển
                </Link>
                
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img src="https://picsum.photos/seed/user1/100/100" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-slate-200 hover:border-blue-500 transition-colors object-cover" referrerPolicy="no-referrer" />
                  </button>
                  
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2"
                      >
                        <div className="px-4 py-3 border-b border-slate-100 mb-2">
                          <div className="font-bold text-slate-900">Trần Minh Tuấn</div>
                          <div className="text-xs text-slate-500">tuan.tran@example.com</div>
                        </div>
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors">
                          <User size={18} /> Hồ sơ cá nhân
                        </Link>
                        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition-colors">
                          <Settings size={18} /> Cài đặt
                        </Link>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <button onClick={() => setIsLoggedIn(false)} className="w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors">
                          <LogOut size={18} /> Đăng xuất
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              // Guest State
              <>
                <button onClick={() => setIsLoggedIn(true)} className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 rounded-xl transition-colors">
                  Đăng nhập
                </button>
                <button onClick={() => setIsLoggedIn(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                  Đăng ký ngay
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-slate-600 hover:text-blue-600 p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Sidebar / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-bold text-lg tracking-tight text-slate-900">BAIEdu</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
                
                {/* Mobile User Section */}
                {isLoggedIn ? (
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <img src="https://picsum.photos/seed/user1/100/100" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-slate-900">Trần Minh Tuấn</div>
                      <div className="text-xs text-slate-500">tuan.tran@example.com</div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setIsLoggedIn(true)} className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-50">Đăng nhập</button>
                    <button onClick={() => setIsLoggedIn(true)} className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700">Đăng ký</button>
                  </div>
                )}

                {/* Mobile Links */}
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Khám phá</div>
                  <Link to="/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <BookOpen size={20} className="text-blue-500" /> Khóa học
                  </Link>
                  <button onClick={handleLabClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-left">
                    <Terminal size={20} className="text-emerald-500" /> Phòng Lab
                  </button>
                  <Link to="/library" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <Library size={20} className="text-orange-500" /> Thư viện
                  </Link>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Cộng đồng</div>
                  <Link to="/community" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <MessageSquare size={20} className="text-purple-500" /> Diễn đàn
                  </Link>
                  <Link to="/community" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <Award size={20} className="text-yellow-500" /> Bảng xếp hạng
                  </Link>
                </div>

                {isLoggedIn && (
                  <div className="space-y-1 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Tài khoản</div>
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                      <LayoutDashboard size={20} className="text-slate-400" /> Bảng điều khiển
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                      <User size={20} className="text-slate-400" /> Hồ sơ cá nhân
                    </Link>
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                      <Settings size={20} className="text-slate-400" /> Cài đặt
                    </Link>
                    <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-medium text-left">
                      <LogOut size={20} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
