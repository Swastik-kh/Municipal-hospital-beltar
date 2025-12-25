
import React, { useState } from 'react';
import { Notice, Service, Doctor } from '../types';
import { ArrowRight, MessageCircle, Send, Loader2, Info, ChevronLeft, ChevronRight, FileDown, UserCircle } from 'lucide-react';
import { getHealthAdvice } from '../services/geminiService';

interface HomeProps {
  notices: Notice[];
  services: Service[];
  doctors: Doctor[];
  setView: (view: any) => void;
}

const Home: React.FC<HomeProps> = ({ notices, services, doctors, setView }) => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAiConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setLoading(true);
    const advice = await getHealthAdvice(aiQuery);
    setAiResponse(advice);
    setLoading(false);
  };

  // Extract key officials based on designated featuredRole
  const chairperson = doctors.find(d => d.featuredRole === 'CHAIRPERSON');
  const chief = doctors.find(d => d.featuredRole === 'CHIEF');
  const infoOfficer = doctors.find(d => d.featuredRole === 'INFO_OFFICER');

  return (
    <div className="space-y-0 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[400px] md:h-[600px] flex items-center overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.3] md:brightness-[0.4]"
            alt="अस्पताल भवन"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 md:from-blue-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-1 text-white text-center md:text-left">
            <span className="inline-block bg-blue-600/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 border border-blue-400/30">
              आधिकारिक पोर्टलमा स्वागत छ
            </span>
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">तपाईंको स्वास्थ्य,<br/>हाम्रो सर्वोच्च प्राथमिकता</h2>
            <p className="text-sm md:text-xl mb-6 md:mb-10 opacity-90 font-medium max-w-2xl leading-relaxed md:border-l-4 md:border-blue-500 md:pl-6">
              चौदण्डीगढी नगरपालिकाका बासिन्दाहरूका लागि सुलभ, प्रभावकारी र गुणस्तरीय स्वास्थ्य सेवा उपलब्ध गराउन हामी सधैं तत्पर छौं।
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setView('SERVICES')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-sm transition-all shadow-xl flex items-center gap-2 group"
              >
                हाम्रा सेवाहरू <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setView('ABOUT')}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-sm transition-all"
              >
                हाम्रो बारेमा
              </button>
            </div>
          </div>

          <div className="hidden md:block w-full max-w-[400px]">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500 p-2 rounded-xl text-white">
                  <MessageCircle size={20} />
                </div>
                <h3 className="text-xl font-black text-white">डिजिटल स्वास्थ्य परामर्श</h3>
              </div>
              {aiResponse ? (
                <div className="bg-white/90 p-4 rounded-xl mb-4 max-h-[200px] overflow-y-auto text-blue-900 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                   {aiResponse}
                </div>
              ) : (
                <p className="text-sm text-blue-100/80 mb-6 font-medium leading-snug">स्वास्थ्य सम्बन्धी कुनै पनि जिज्ञासा तत्काल राख्नुहोस्।</p>
              )}
              
              <form onSubmit={handleAiConsult} className="space-y-4">
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="यहाँ टाइप गर्नुहोस्..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-white/30 min-h-[80px]"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-blue-900 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-50 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'परामर्श लिनुहोस्'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col lg:flex-row gap-12 md:gap-16">
        {/* Main Content Area */}
        <div className="flex-1 space-y-8 md:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-4 border-blue-700 pb-4 gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900">सूचना तथा समाचार</h3>
              <p className="text-slate-500 text-[10px] md:text-sm font-bold mt-1 uppercase tracking-widest">Latest Updates & Notices</p>
            </div>
            <button onClick={() => setView('NOTICES')} className="text-blue-700 font-black text-sm hover:underline flex items-center gap-1 self-start sm:self-auto">
              सबै हेर्नुहोस् <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid gap-6">
            {notices.map((notice) => (
              <div key={notice.id} className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-24 md:w-32 sm:h-24 md:h-32 bg-blue-50 rounded-2xl flex flex-row sm:flex-col items-center justify-center text-blue-800 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors p-4 sm:p-0">
                  <div className="flex flex-col items-center flex-1 sm:flex-none">
                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">बैशाख</span>
                    <span className="text-2xl md:text-3xl font-black">{notice.date.split('-')[2]}</span>
                    <span className="text-[10px] font-bold opacity-70">२०८१</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider ${
                      notice.category === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {notice.category}
                    </span>
                    {notice.pdfUrl && (
                      <a 
                        href={notice.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase"
                      >
                        <FileDown size={14} /> PDF
                      </a>
                    )}
                  </div>
                  <h4 
                    className="text-lg md:text-2xl font-black text-slate-900 mb-2 md:mb-3 group-hover:text-blue-700 transition-colors leading-snug cursor-pointer"
                    onClick={() => setView('NOTICES')}
                  >
                    {notice.title}
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2">{notice.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          
          {/* Key Officials Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-blue-700 p-4 text-white text-center">
              <h4 className="font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                <UserCircle size={18} /> मुख्य पदाधिकारीहरू
              </h4>
            </div>
            <div className="p-6 space-y-6">
              {/* Chairperson */}
              {chairperson && (
                <div className="flex items-center gap-4 group">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0 shadow-md">
                    <img src={chairperson.image} alt={chairperson.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1">अध्यक्ष</span>
                    <h5 className="font-black text-slate-900 leading-tight">{chairperson.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{chairperson.specialization}</p>
                  </div>
                </div>
              )}

              {/* Chief */}
              {chief && (
                <div className="flex items-center gap-4 group border-t border-slate-50 pt-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0 shadow-md">
                    <img src={chief.image} alt={chief.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="inline-block bg-green-50 text-green-700 px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1">हालका प्रमुख</span>
                    <h5 className="font-black text-slate-900 leading-tight">{chief.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{chief.specialization}</p>
                  </div>
                </div>
              )}

              {/* Information Officer */}
              {infoOfficer && (
                <div className="flex items-center gap-4 group border-t border-slate-50 pt-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shrink-0 shadow-md">
                    <img src={infoOfficer.image} alt={infoOfficer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="inline-block bg-orange-50 text-orange-700 px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1">सूचना अधिकारी</span>
                    <h5 className="font-black text-slate-900 leading-tight">{infoOfficer.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{infoOfficer.department}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
               <button onClick={() => setView('CHIEFS')} className="text-xs font-black text-blue-700 hover:underline">सबै विवरण हेर्नुहोस्</button>
            </div>
          </div>

          {/* Important Contacts */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h4 className="text-xl font-black mb-6 relative">जरुरी सम्पर्क</h4>
            <div className="space-y-4 md:space-y-6 relative">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all cursor-default">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1 block">२४/७ एम्बुलेन्स</span>
                <span className="text-2xl md:text-3xl font-black block tracking-tighter">१०२ / ९८४२०XXXXX</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all cursor-default">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1 block">सोधपुछ कक्ष</span>
                <span className="text-xl md:text-2xl font-black block tracking-tighter">०३५-४४XXXX</span>
              </div>
            </div>
            <button className="w-full mt-6 md:mt-8 bg-blue-600 hover:bg-blue-700 py-3 md:py-4 rounded-xl font-black text-sm transition-all shadow-lg active:scale-95">
              सम्पर्क निर्देशिका
            </button>
          </div>

          {/* Location Map */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
             <div className="bg-blue-700 p-4 text-white">
                <h4 className="font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">अस्पतालको स्थान</h4>
             </div>
             <img src="https://picsum.photos/seed/location/600/400" className="w-full h-40 md:h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Map Location" />
             <div className="p-6 bg-white">
                <p className="text-xs font-bold text-slate-500 mb-2">बेल्टार, चौदण्डीगढी-४, उदयपुर</p>
                <button className="text-blue-700 font-black text-sm flex items-center gap-1 group active:translate-x-1 transition-all">
                   गुगल म्यापमा हेर्नुहोस् <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
