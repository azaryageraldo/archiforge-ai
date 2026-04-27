import { useState } from 'react';
import { ArrowRight, Box, Cpu, Sparkles, Workflow, Zap, Loader2, AlertCircle } from 'lucide-react';
import { generateSystemDesign } from './services/ai';
import type { SystemDesignResponse } from './types';
import SystemDesignView from './components/SystemDesignView';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SystemDesignResponse | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateSystemDesign(prompt);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Efek Latar Belakang Futuristik: Grid & Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-700/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <header className="flex items-center justify-center px-4 py-8 md:py-6 relative z-20">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-[1.5rem] shadow-2xl transform transition-all cursor-pointer ring-1 ring-white/20" onClick={() => setResult(null)}>
                <img src="/logo.png" alt="ArchiForge Logo" className={`${result ? 'h-12 md:h-16' : 'h-24 md:h-32'} w-auto object-contain transition-all duration-700 ease-out`} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col items-center px-4 md:px-6 transition-all duration-700 ${result ? 'py-8' : 'py-12 md:py-20 justify-center'} z-10`}>
          
          {/* Hero Content - Menyusut jika ada result */}
          <div className={`text-center flex flex-col items-center transition-all duration-700 ${result ? 'mb-8 scale-90 opacity-80' : 'mb-14'}`}>
            {!result && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-400 text-xs md:text-sm font-bold mb-8 md:mb-10 tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/10">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-cyan-300" />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">ArchiForge AI Engine v3.0</span>
              </div>
            )}
            
            <h1 className={`${result ? 'text-3xl md:text-5xl' : 'text-5xl md:text-7xl lg:text-[6rem]'} font-black tracking-tight mb-6 text-white max-w-5xl leading-[1.1] drop-shadow-2xl transition-all duration-500`}>
              Desain Sistem Kompleks dalam{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Hitungan Detik</span>
              </span>
            </h1>
            
            {!result && (
              <p className="text-base md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-light px-2">
                Ubah deskripsi teks biasa menjadi diagram arsitektur sistem level produksi secara instan menggunakan kekuatan <strong className="text-slate-200 font-semibold">AI Generatif</strong>.
              </p>
            )}
          </div>

          {/* AI Prompt Input Bar */}
          <div className={`w-full max-w-4xl relative group transition-all duration-500 ${result || isLoading ? 'mb-4' : 'mb-24 md:mb-36'}`}>
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-3xl blur-md transition duration-500 ${isLoading ? 'opacity-100 animate-pulse' : 'opacity-30 group-hover:opacity-60'}`}></div>
            <div className={`relative bg-slate-950/80 border rounded-2xl md:rounded-3xl p-2 md:p-3 backdrop-blur-xl shadow-2xl transition-all ${isLoading ? 'border-cyan-500/80 ring-2 ring-cyan-500/20' : 'border-white/10 focus-within:border-cyan-500/50'}`}>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 relative">
                <div className={`hidden md:flex p-4 rounded-2xl shadow-inner border border-white/5 transition-colors ${isLoading ? 'bg-cyan-900/40 text-cyan-300' : 'bg-slate-900/80 text-cyan-400'}`}>
                  {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Cpu className="w-7 h-7" />}
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                  placeholder="Gambarkan arsitektur Anda (misalnya: 'App Name: POS Toko Sembako, Platform: Web...')" 
                  className="w-full bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 resize-none min-h-[120px] md:min-h-0 md:h-16 py-3 px-3 md:px-2 text-base md:text-xl font-light focus:ring-0 disabled:opacity-30 disabled:cursor-wait"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  className={`w-full md:w-auto text-white p-4 md:p-5 rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-3 shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)] ${isLoading ? 'bg-cyan-900/50 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] group/btn disabled:opacity-50 disabled:cursor-not-allowed'}`}
                >
                  <span className="font-bold text-lg tracking-wide px-2 md:px-4">
                    {isLoading ? 'Membangun...' : 'Buat Desain'}
                  </span>
                  {!isLoading && <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:text-cyan-100 transition-all" />}
                </button>
              </div>
            </div>
          </div>

          {/* Animasi Loading Futuristik */}
          {isLoading && (
            <div className="w-full max-w-4xl mt-12 animate-fade-in-up">
              <div className="relative p-1 rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-md border border-white/5 shadow-2xl">
                {/* Efek Garis Scanner yang berjalan ke atas dan bawah */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="w-full h-1 bg-cyan-400/80 shadow-[0_0_15px_#22d3ee] animate-[scan_2s_ease-in-out_infinite]"></div>
                </div>
                
                <div className="bg-slate-950/80 rounded-2xl p-8 flex flex-col items-center justify-center relative z-10 min-h-[300px]">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-500 animate-spin opacity-80" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-2 rounded-full border-l-2 border-b-2 border-blue-500 animate-spin opacity-60" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                    <div className="absolute inset-4 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin opacity-40" style={{ animationDuration: '1.5s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-300">
                      <Cpu className="w-8 h-8 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="h-8 overflow-hidden relative w-full max-w-md flex justify-center text-center">
                    <div className="animate-[slide-up_8s_steps(4)_infinite] flex flex-col gap-8 absolute top-0 text-lg md:text-xl font-light text-cyan-200/80 tracking-wide">
                      <p>Menganalisis arsitektur sistem...</p>
                      <p>Merancang skema basis data tingkat lanjut...</p>
                      <p>Menentukan end-points API yang optimal...</p>
                      <p>Membangun topologi cloud & jaringan...</p>
                      <p>Menganalisis arsitektur sistem...</p> {/* Duplicate 1st item for smooth loop */}
                    </div>
                  </div>
                  
                  {/* Progress Bar palsu untuk memperkuat efek visual */}
                  <div className="w-64 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-[progress_3s_ease-in-out_infinite] w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <div className="w-full max-w-4xl bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl flex items-center gap-3 mb-8 animate-fade-in-up">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Hasil Generate AI */}
          {result && <SystemDesignView data={result} />}

          {/* Features Grid (Hanya tampil jika belum ada result) */}
          {!result && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 animate-fade-in-up">
              {/* ... (Features grid yang sama seperti sebelumnya) ... */}
              {[
                { icon: Workflow, title: "Pemetaan Cerdas", desc: "AI kami memahami relasi awan yang kompleks dan otomatis merutekan topologi dengan presisi.", color: "from-blue-500 to-blue-600" },
                { icon: Box, title: "Ekspor Multi-Format", desc: "Unduh arsitektur sebagai React Flow, Mermaid.js, atau integrasikan sebagai IaC.", color: "from-cyan-400 to-cyan-500" },
                { icon: Zap, title: "Kolaborasi Real-time", desc: "Bekerja sama dengan tim engineer Anda untuk meninjau dan menyempurnakan desain.", color: "from-purple-500 to-purple-600" }
              ].map((feature, i) => (
                <div key={i} className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] text-left hover:bg-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group cursor-default backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 text-white flex items-center justify-center mb-8 shadow-lg shadow-blue-900/20 transform group-hover:-translate-y-2 transition-all duration-300 relative z-10`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl mix-blend-overlay"></div>
                    <feature.icon className="w-8 h-8 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-wide relative z-10">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg relative z-10 font-light">{feature.desc}</p>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
