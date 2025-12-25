
import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { Menu, X, User, Search, Facebook, Mail, ChevronDown, Globe } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [staffDropdownOpen, setStaffDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStaffDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toNepaliNumerals = (num: number | string) => {
    const nepaliNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map(d => nepaliNums[parseInt(d)] || d).join('');
  };

  const getNepaliDateParts = (date: Date) => {
    const nepaliMonths = ["बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मंसिर", "पुष", "माघ", "फागुन", "चैत"];
    const nepaliDays = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
    const daysInMonths2081 = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30];
    const refDate = new Date("2024-04-13");
    const diffTime = date.getTime() - refDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let year = 2081;
    let monthIndex = 0;
    let day = diffDays + 1;
    if (diffDays < 0) return { year: 2080, month: "चैत", day: 30, dayName: nepaliDays[date.getDay()], time: date.toLocaleTimeString('ne-NP') };
    while (day > daysInMonths2081[monthIndex]) {
      day -= daysInMonths2081[monthIndex];
      monthIndex++;
      if (monthIndex > 11) { monthIndex = 0; year++; }
    }
    return {
      year: toNepaliNumerals(year),
      month: nepaliMonths[monthIndex],
      day: toNepaliNumerals(day),
      dayName: nepaliDays[date.getDay()],
      time: date.toLocaleTimeString('ne-NP', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
  };

  const dateParts = getNepaliDateParts(currentTime);

  const navItems = [
    { label: 'हाम्रो बारेमा', view: 'ABOUT' as ViewState, hasDropdown: false },
    { label: 'सेवाहरू', view: 'SERVICES' as ViewState, hasDropdown: false },
    { label: 'सूचनाहरू', view: 'NOTICES' as ViewState, hasDropdown: false },
    { label: 'डाउनलोड', view: 'DOWNLOADS' as ViewState, hasDropdown: false },
  ];

  const staffSubItems = [
    { label: 'स्वास्थ्य संस्था व्यवस्थापन समिति', view: 'COMMITTEE' as ViewState },
    { label: 'प्रमुखहरू', view: 'CHIEFS' as ViewState },
    { label: 'हाल कार्यरत कर्मचारीहरू', view: 'CURRENT_STAFF' as ViewState },
    { label: 'पूर्व कर्मचारीहरू', view: 'FORMER_STAFF' as ViewState },
  ];

  const isStaffViewActive = ['COMMITTEE', 'CHIEFS', 'CURRENT_STAFF', 'FORMER_STAFF'].includes(currentView);

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-white">
      {/* Top Blue Bar - Optimized for Mobile */}
      <div className="bg-[#1e3a8a] text-white py-2 md:py-3 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={() => setView('HOME')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Emblem_of_Nepal.svg" alt="Nepal Emblem" className="h-10 md:h-14 w-auto" />
            <div className="flex flex-col items-start">
              <span className="text-[9px] md:text-[11px] font-medium opacity-90">चौदण्डीगढी नगरपालिका</span>
              <h1 className="text-base md:text-xl font-black leading-tight">आधारभूत नगर अस्पताल</h1>
              <span className="text-[9px] md:text-[11px] font-bold opacity-80">बेल्टार, उदयपुर</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 bg-blue-900/40 p-1.5 md:p-2 rounded-xl border border-white/5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg" alt="Nepal Flag" className="h-6 md:h-10 w-auto animate-flag-wave" />
            <div className="flex flex-col border-l border-white/20 pl-3 md:pl-4 text-left">
              <span className="text-[11px] md:text-[13px] font-bold leading-tight">
                वि.सं.: {dateParts.year}-{dateParts.month}-{dateParts.day} {dateParts.dayName}
              </span>
              <span className="text-[10px] md:text-[11px] text-blue-200/80 font-bold leading-tight mt-0.5">
                समय: {dateParts.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav - Desktop & Mobile Toggle */}
      <nav className="bg-white text-slate-800 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
          <div className="hidden md:flex items-center space-x-1 h-full">
            <button onClick={() => setView('HOME')} className={`px-4 h-full text-sm font-bold border-b-4 transition-all ${currentView === 'HOME' ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-slate-50'}`}>गृहपृष्ठ</button>
            
            {navItems.map((item) => (
              <button key={item.label} onClick={() => setView(item.view)} className={`px-4 h-full text-sm font-bold border-b-4 transition-all ${currentView === item.view ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-slate-50'}`}>
                {item.label}
              </button>
            ))}

            <div className="relative h-full" ref={dropdownRef}>
              <button 
                onClick={() => setStaffDropdownOpen(!staffDropdownOpen)}
                className={`px-4 h-full flex items-center gap-1 text-sm font-bold border-b-4 transition-all ${isStaffViewActive ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-transparent hover:bg-slate-50'}`}
              >
                कर्मचारी तथा समिति पदाधिकारीहरू <ChevronDown size={14} className={`opacity-50 transition-transform ${staffDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {staffDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white border border-slate-200 shadow-xl rounded-b-xl py-2 animate-in fade-in slide-in-from-top-2">
                  {staffSubItems.map((sub) => (
                    <button
                      key={sub.label}
                      onClick={() => { setView(sub.view); setStaffDropdownOpen(false); }}
                      className={`w-full text-left px-6 py-3 text-sm font-bold hover:bg-blue-50 hover:text-blue-700 transition-colors ${currentView === sub.view ? 'text-blue-700 bg-blue-50' : 'text-slate-700'}`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 md:flex-none justify-end">
            <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200">
              <input type="text" placeholder="खोज्नुहोस्..." className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all font-medium" />
              <Search size={16} className="text-slate-400" />
            </div>
            
            <button 
              onClick={() => setView(isAdmin ? 'ADMIN_DASHBOARD' : 'ADMIN_LOGIN')} 
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Admin Access"
            >
              <User size={18} />
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-slate-600 bg-slate-100 rounded-lg"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 animate-in slide-in-from-top duration-300 shadow-lg">
            <div className="flex flex-col p-2">
              <button 
                onClick={() => { setView('HOME'); setIsOpen(false); }} 
                className={`w-full text-left p-4 font-bold rounded-xl ${currentView === 'HOME' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}
              >
                गृहपृष्ठ
              </button>
              {navItems.map(item => (
                <button 
                  key={item.label} 
                  onClick={() => { setView(item.view); setIsOpen(false); }} 
                  className={`w-full text-left p-4 font-bold rounded-xl ${currentView === item.view ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mt-2 border-t border-slate-100 pt-2">
                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">कर्मचारी तथा समिति विवरण</p>
                {staffSubItems.map(sub => (
                  <button 
                    key={sub.label} 
                    onClick={() => { setView(sub.view); setIsOpen(false); }} 
                    className={`w-full text-left py-3 px-6 text-sm font-bold rounded-xl ${currentView === sub.view ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-blue-50'}`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
