import type { SystemDesignResponse } from '../types';
import { Database, Server, Layout, ShieldAlert, CheckCircle2, Cpu, Globe, Lightbulb, GitMerge, Scale, GitBranch, Code2 } from 'lucide-react';

interface Props {
  data: SystemDesignResponse;
}

export default function SystemDesignView({ data }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 md:mt-12 mb-20 animate-fade-in-up space-y-6 md:space-y-8">
      
      {/* Header / Overview & Insights */}
      <div className="bg-slate-900/60 border border-cyan-500/30 rounded-2xl md:rounded-3xl p-5 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/60 transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
          <div className="bg-cyan-950/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-cyan-500/20 shrink-0 self-start">
            <Cpu className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-3">Ringkasan Sistem</h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-4 md:mb-6">
              {data.system_overview}
            </p>
          </div>
        </div>

        {data.ai_insights && (
          <div className="mt-4 md:mt-6 bg-blue-950/30 border border-blue-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-blue-500/10 rotate-12">
              <Lightbulb className="w-32 h-32 md:w-40 md:h-40" />
            </div>
            <h3 className="text-blue-400 font-bold text-base md:text-lg mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
              AI Architect Insights
            </h3>
            <p className="text-slate-300 leading-relaxed relative z-10 text-sm md:text-base">
              {data.ai_insights}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        
        {/* Kolom Kiri */}
        <div className="flex flex-col gap-6 md:gap-8">
          
          {/* Tech Stack & Rationale */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <Server className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              Keputusan Tech Stack
            </h3>
            
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              {[
                { label: 'Frontend', value: data.architecture.frontend, icon: Layout },
                { label: 'Backend', value: data.architecture.backend, icon: Server },
                { label: 'Database', value: data.architecture.database, icon: Database },
                { label: 'Deployment', value: data.architecture.deployment, icon: Globe },
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5 gap-2">
                  <div className="flex items-center gap-3 text-slate-400">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-xs md:text-sm">{item.label}</span>
                  </div>
                  <span className="text-white font-medium text-left sm:text-right text-sm md:text-base">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 border-l-4 border-l-blue-500">
              <span className="text-[10px] md:text-xs text-blue-400 font-bold uppercase tracking-wider mb-1 block">Alasan Arsitektural</span>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{data.architecture.rationale}</p>
            </div>
          </div>

          {/* System Flow */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              Alur Sistem (End-to-End)
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/20 before:to-transparent">
              {data.system_flow.map((flow, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border border-cyan-500/30 bg-slate-900 text-cyan-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xs md:text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-950/60 p-3 md:p-4 rounded-xl border border-white/5 group-hover:border-cyan-500/30 transition-colors text-xs md:text-sm text-slate-300">
                    {flow}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              Fitur Utama
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 bg-slate-950/30 p-3 rounded-xl border border-white/5">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-500 mt-1.5 shrink-0 shadow-[0_0_8px_#a855f7]"></div>
                  <span className="leading-snug text-xs md:text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col gap-6 md:gap-8">
          
          {/* Trade-Offs */}
          {data.trade_offs && data.trade_offs.length > 0 && (
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                <Scale className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                Engineering Trade-Offs
              </h3>
              <div className="space-y-4 md:space-y-6">
                {data.trade_offs.map((trade, i) => (
                  <div key={i} className="bg-slate-950/50 rounded-xl md:rounded-2xl border border-white/5 overflow-hidden">
                    <div className="bg-slate-900/80 px-3 py-2 md:px-4 md:py-3 border-b border-white/5 text-slate-200 font-medium text-xs md:text-sm flex items-center gap-2">
                      <GitMerge className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 shrink-0" />
                      {trade.decision}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                      <div className="p-3 md:p-4">
                        <span className="text-[10px] md:text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2 block">Kelebihan (Pros)</span>
                        <ul className="space-y-1.5 md:space-y-2">
                          {trade.pros.map((pro, j) => (
                            <li key={j} className="text-[11px] md:text-xs text-slate-300 flex items-start gap-1.5 md:gap-2">
                              <span className="text-emerald-500 mt-0.5">+</span> {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 md:p-4">
                        <span className="text-[10px] md:text-xs text-red-400 font-bold uppercase tracking-wider mb-2 block">Kekurangan (Cons)</span>
                        <ul className="space-y-1.5 md:space-y-2">
                          {trade.cons.map((con, j) => (
                            <li key={j} className="text-[11px] md:text-xs text-slate-300 flex items-start gap-1.5 md:gap-2">
                              <span className="text-red-500 mt-0.5">-</span> {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-red-500/30 transition-colors flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              Tantangan & Risiko
            </h3>
            <ul className="space-y-3">
              {data.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 bg-red-950/10 p-3 md:p-4 rounded-xl border border-red-500/10">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_#ef4444]"></div>
                  <span className="leading-snug text-xs md:text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Database Schema (Full Width) */}
      <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
          Skema Basis Data (Struktur & Relasi)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.database_schema.map((table, i) => (
            <div key={i} className="bg-slate-950/80 rounded-xl md:rounded-2xl border border-cyan-900/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors"></div>
              <div className="p-3 md:p-4 border-b border-white/5 bg-slate-900/50">
                <h4 className="text-cyan-300 font-bold text-base md:text-lg">{table.table}</h4>
              </div>
              <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                {table.fields.map((field, j) => (
                  <div key={j} className="flex flex-col gap-0.5 md:gap-1 pb-2 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-slate-200 font-mono text-[11px] md:text-sm truncate">{field.name}</span>
                      <span className="text-slate-500 font-mono text-[10px] md:text-xs px-1.5 py-0.5 md:px-2 md:py-0.5 bg-slate-900 rounded shrink-0">{field.type}</span>
                    </div>
                    {field.relation && (
                      <span className="text-[10px] md:text-xs text-emerald-400/80 italic flex items-center gap-1">
                        ↳ {field.relation}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints (Full Width) */}
      <div className="bg-slate-900/50 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
          Kontrak API Endpoints
        </h3>
        <div className="space-y-3 md:space-y-4">
          {data.api_endpoints.map((api, i) => {
            const getMethodColor = (method: string) => {
              switch (method.toUpperCase()) {
                case 'GET': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
                case 'POST': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
                case 'PUT': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
                case 'DELETE': return 'text-red-400 bg-red-400/10 border-red-400/20';
                default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
              }
            };

            const getStatusColor = (status: number) => {
              if (status >= 200 && status < 300) return 'text-emerald-400';
              if (status >= 400 && status < 500) return 'text-amber-400';
              return 'text-red-400';
            };

            return (
              <div key={i} className="flex flex-col bg-slate-950/60 rounded-xl md:rounded-2xl border border-white/5 overflow-hidden group hover:border-emerald-500/30 transition-all">
                <div className="p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 border-b border-white/5">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <span className={`px-2 py-1 md:px-3 md:py-1 rounded-md md:rounded-lg text-[10px] md:text-xs font-black tracking-wider border w-16 md:w-20 text-center shrink-0 ${getMethodColor(api.method)}`}>
                      {api.method.toUpperCase()}
                    </span>
                    <code className="text-slate-200 font-mono text-[11px] md:text-sm break-all">{api.endpoint}</code>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 mt-1 sm:mt-0">
                    <span className="text-slate-400 text-[11px] md:text-sm truncate sm:hidden lg:block max-w-[200px] xl:max-w-none">{api.description}</span>
                    <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-slate-900 font-mono text-[10px] md:text-xs border border-white/5 flex items-center gap-1 shrink-0 ${getStatusColor(api.status_code)}`}>
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current"></span>
                      {api.status_code}
                    </span>
                  </div>
                </div>
                
                {/* Example Response / Details Area */}
                <div className="p-3 md:p-4 bg-slate-900/30 grid grid-cols-1 gap-3 md:gap-4">
                  <div className="sm:block lg:hidden text-slate-400 text-xs md:text-sm">
                    <strong className="text-slate-300">Desc: </strong>{api.description}
                  </div>
                  
                  {api.example_response && (
                    <div className="col-span-1">
                      <div className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2">
                        <Code2 className="w-3 h-3 md:w-4 md:h-4" /> Response Example
                      </div>
                      <div className="bg-slate-950 p-2 md:p-3 rounded-lg md:rounded-xl border border-white/5 font-mono text-[10px] md:text-xs text-emerald-300/80 overflow-x-auto whitespace-pre-wrap break-words">
                        {api.example_response}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
