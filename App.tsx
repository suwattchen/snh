import React, { useState, useEffect } from 'react';
import { Activity, Server, HardDrive, Globe, CheckCircle2, Terminal, Cpu, Plus, ShieldCheck, Box, PlayCircle, StopCircle, RotateCcw, ExternalLink, Users, DollarSign, Lock, Search, Cloud, ArrowRight, ShoppingBag, Code2, LayoutTemplate, Database, Feather, LifeBuoy, AlertCircle } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { APP_TEMPLATES, HOSTING_PLANS, MOCK_LOGS, MOCK_USERS, MOCK_INVOICES, MOCK_ADMIN_STATS } from './constants';
import { AppTemplate, HostingPlan, Service, ServiceStatus, User, Invoice, CloudflareConfig, Ticket } from './types';
import { DashboardLayout } from './components/DashboardLayout';
import { SupportChat } from './components/SupportChat';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);
// Simple Port generator
const generatePort = () => Math.floor(Math.random() * (65000 - 3000) + 3000);

const App = () => {
  // System State
  const [isSetupComplete, setIsSetupComplete] = useState(false); // Simulates fresh install
  const [cloudflareConfig, setCloudflareConfig] = useState<CloudflareConfig>({
    apiToken: '',
    zoneId: '',
    baseDomain: 'nexushost.app',
    tunnelId: '',
    isConfigured: false
  });

  // Routing & Roles
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [view, setView] = useState<string>('landing');
  
  // Data State
  const [services, setServices] = useState<Service[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '#8821', subject: 'Cannot connect to Redis container', status: 'Open', priority: 'High', lastUpdate: '2 mins ago' },
    { id: '#8819', subject: 'Billing cycle question', status: 'Answered', priority: 'Low', lastUpdate: '1 day ago' }
  ]);
  
  // Marketplace & Provisioning State
  const [selectedTemplate, setSelectedTemplate] = useState<AppTemplate | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionLogs, setProvisionLogs] = useState<string[]>([]);
  const [newSubdomain, setNewSubdomain] = useState('');

  // --- Handlers ---

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this saves to backend env/config
    setCloudflareConfig(prev => ({ ...prev, isConfigured: true }));
    setIsSetupComplete(true);
    setRole('admin');
    setView('admin-dashboard');
  };

  const handleStartInstall = (template: AppTemplate) => {
    setSelectedTemplate(template);
    // Auto-select recommended plan
    const plan = HOSTING_PLANS.find(p => p.id === template.recommendedPlan) || HOSTING_PLANS[0];
    setSelectedPlan(plan);
    setView('order');
  };

  const handleProvision = () => {
    if (!newSubdomain || !selectedTemplate || !selectedPlan) return;
    setIsProvisioning(true);
    setProvisionLogs([]);

    const containerId = generateId();
    const port = generatePort();
    const recordId = generateId();

    // Simulate automated provisioning process
    let step = 0;
    const interval = setInterval(() => {
      if (step >= MOCK_LOGS.length) {
        clearInterval(interval);
        const newService: Service = {
          id: generateId(),
          domain: `${newSubdomain}.${cloudflareConfig.baseDomain}`,
          planId: selectedPlan.id,
          appTemplateId: selectedTemplate.id,
          status: ServiceStatus.ACTIVE,
          ipAddress: `172.17.0.${Math.floor(Math.random()*255)}`, // Docker Network IP
          containerId: containerId,
          portMapping: `${port}->${selectedTemplate.minPort}`,
          publicUrl: `https://${newSubdomain}.${cloudflareConfig.baseDomain}`,
          image: selectedTemplate.image,
          created_at: new Date().toISOString(),
          diskUsage: 1,
          bandwidthUsage: 0
        };
        setServices(prev => [...prev, newService]);
        setIsProvisioning(false);
        setView('dashboard');
      } else {
        const logTemplate = MOCK_LOGS[step];
        const log = logTemplate
          .replace('{image}', selectedTemplate.image)
          .replace('{container_id}', containerId)
          .replace('{port}', selectedTemplate.minPort.toString())
          .replace('{id}', generateId())
          .replace('{subdomain}', newSubdomain)
          .replace('{base_domain}', cloudflareConfig.baseDomain)
          .replace('{zone_id}', cloudflareConfig.zoneId || 'mock-zone')
          .replace('{record_id}', recordId)
          .replace('{domain}', cloudflareConfig.baseDomain);
          
        setProvisionLogs(prev => [...prev, log]);
        step++;
      }
    }, 800); 
  };

  const handleNavigate = (page: string) => {
    setView(page);
  };

  const handleViewService = (id: string) => {
    setActiveServiceId(id);
    setView('service-detail');
  };

  // --- Special Views ---

  // 0. Initial Setup Wizard (First Run)
  if (!isSetupComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-800 p-8">
           <div className="flex items-center gap-3 mb-6 text-white">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <Server className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">NexusHost Installer</h1>
                <p className="text-slate-400 text-sm">Initial System Configuration</p>
              </div>
           </div>
           
           <form onSubmit={handleSetupSubmit} className="space-y-6">
              <div className="space-y-4">
                 <h3 className="text-slate-200 font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-500" /> Admin Credentials
                 </h3>
                 <input required type="email" placeholder="Admin Email" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none" />
                 <input required type="password" placeholder="Create Root Password" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none" />
              </div>
              
              <div className="space-y-4 border-t border-slate-800 pt-6">
                 <h3 className="text-slate-200 font-medium flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-orange-500" /> Cloudflare Integration
                 </h3>
                 <p className="text-xs text-slate-400">Required for automated DNS & Tunnel provisioning.</p>
                 <input 
                    type="text" 
                    required
                    placeholder="Cloudflare API Token" 
                    value={cloudflareConfig.apiToken}
                    onChange={e => setCloudflareConfig({...cloudflareConfig, apiToken: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none font-mono text-sm" 
                  />
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Account ID" 
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none font-mono text-sm" 
                    />
                    <input 
                      type="text" 
                      required
                      placeholder="Zone ID" 
                      value={cloudflareConfig.zoneId}
                      onChange={e => setCloudflareConfig({...cloudflareConfig, zoneId: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none font-mono text-sm" 
                    />
                 </div>
                 <input 
                    type="text" 
                    required
                    placeholder="Base Domain (e.g., myhost.com)" 
                    value={cloudflareConfig.baseDomain}
                    onChange={e => setCloudflareConfig({...cloudflareConfig, baseDomain: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none" 
                  />
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-colors flex justify-center items-center gap-2">
                 Complete Installation <ArrowRight className="w-4 h-4" />
              </button>
           </form>
        </div>
      </div>
    );
  }

  // 1. Client Landing Page
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-slate-900 text-white py-6 px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Box className="w-5 h-5 text-white" />
            </div>
            NexusHost
          </div>
          <div className="flex gap-4">
            <button onClick={() => {setRole('admin'); setView('admin-dashboard');}} className="text-slate-400 hover:text-white text-sm">Admin Login</button>
            <button onClick={() => {setRole('client'); setView('dashboard');}} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Client Console</button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-orange-100">
               <Cloud className="w-4 h-4" /> Powered by Cloudflare Tunnel
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Deploy Apps in <br/>
              <span className="text-indigo-600">Isolated Docker Containers</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              One-click install for WordPress, Ghost, Node.js and more. 
              Zero configuration ingress protected by Cloudflare.
            </p>
            <button onClick={() => {setRole('client'); setView('marketplace');}} className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all shadow-lg">
              Browse Marketplace
            </button>
          </div>
        </main>
      </div>
    );
  }

  // 2. Provisioning / Order Screen
  if (view === 'order') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-200">
        <div className="bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
          {isProvisioning ? (
            <div className="p-12">
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <h2 className="text-2xl font-bold text-white">Provisioning {selectedTemplate?.name}</h2>
                <p className="text-slate-400">Talking to Cloudflare API & Docker Engine...</p>
              </div>
              
              <div className="bg-black rounded-lg p-6 font-mono text-sm h-80 overflow-y-auto border border-slate-800 shadow-inner">
                {provisionLogs.map((log, idx) => (
                  <div key={idx} className="mb-2 flex">
                    <span className="text-slate-600 mr-3 select-none">root@ubuntu24:~#</span>
                    <span className="text-green-400">{log}</span>
                  </div>
                ))}
                <div className="animate-pulse text-indigo-500">_</div>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-10 bg-white text-slate-900 flex flex-col md:flex-row gap-8">
              {/* Left: Summary */}
              <div className="md:w-1/3 border-r border-slate-100 pr-8">
                 <div className="flex items-center gap-3 mb-6">
                    {selectedTemplate?.icon === 'LayoutTemplate' && <LayoutTemplate className="w-8 h-8 text-blue-600" />}
                    {selectedTemplate?.icon === 'Feather' && <Feather className="w-8 h-8 text-teal-600" />}
                    {selectedTemplate?.icon === 'Code2' && <Code2 className="w-8 h-8 text-green-600" />}
                    {selectedTemplate?.icon === 'Database' && <Database className="w-8 h-8 text-slate-600" />}
                    <div>
                       <h3 className="font-bold text-lg">{selectedTemplate?.name}</h3>
                       <p className="text-xs text-slate-500">{selectedTemplate?.image}</p>
                    </div>
                 </div>
                 <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="text-xs uppercase font-bold text-slate-400 mb-2">Plan Details</div>
                    <div className="flex justify-between mb-1">
                       <span className="font-medium">{selectedPlan?.name}</span>
                       <span className="font-bold">${selectedPlan?.price}/mo</span>
                    </div>
                    <div className="text-xs text-slate-500 space-y-1 mt-2">
                       <p>• {selectedPlan?.cpu}</p>
                       <p>• {selectedPlan?.ram}</p>
                       <p>• {selectedPlan?.storage}</p>
                    </div>
                 </div>
                 <button onClick={() => setView('marketplace')} className="text-sm text-indigo-600 font-medium hover:underline">
                    Change App / Plan
                 </button>
              </div>

              {/* Right: Config */}
              <div className="flex-1">
                 <h2 className="text-2xl font-bold mb-6">Configure Instance</h2>
                 
                 <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subdomain</label>
                      <div className="flex rounded-lg shadow-sm">
                        <input 
                          type="text" 
                          placeholder="my-app" 
                          value={newSubdomain}
                          onChange={(e) => setNewSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className="flex-1 border border-r-0 border-slate-300 rounded-l-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                        />
                        <span className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 text-slate-500 font-mono text-sm">
                          .{cloudflareConfig.baseDomain}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-green-500" />
                        SSL Certificate will be auto-generated by Cloudflare.
                      </p>
                    </div>

                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">Environment Variables (Optional)</label>
                       <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono space-y-2 text-slate-600">
                          {selectedTemplate?.envVars.map(env => (
                             <div key={env} className="flex items-center gap-2">
                                <span className="text-indigo-600">{env}=</span>
                                <span className="text-slate-400 italic">auto-generated</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={handleProvision}
                      disabled={!newSubdomain}
                      className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 mt-6"
                    >
                      <Terminal className="w-5 h-5" />
                      Deploy Container
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // Views handled by DashboardLayout
  // ----------------------------------------------------------------

  // Helper to wrap content
  const Layout = ({ children }: { children: React.ReactNode }) => (
    <DashboardLayout 
      currentPage={view} 
      currentRole={role}
      onNavigate={handleNavigate}
      onSwitchRole={() => {
         setRole(role === 'client' ? 'admin' : 'client');
         setView(role === 'client' ? 'admin-dashboard' : 'dashboard');
      }}
    >
      {children}
    </DashboardLayout>
  );

  // --- CLIENT VIEWS ---

  if (view === 'marketplace') {
    return (
      <Layout>
        <div className="mb-8">
           <h2 className="text-2xl font-bold text-slate-900">App Marketplace</h2>
           <p className="text-slate-500">One-click deployment for popular applications.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {APP_TEMPLATES.map(template => (
              <div key={template.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-500 hover:shadow-lg transition-all group cursor-pointer" onClick={() => handleStartInstall(template)}>
                 <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                       {template.icon === 'LayoutTemplate' && <LayoutTemplate className="w-6 h-6" />}
                       {template.icon === 'Feather' && <Feather className="w-6 h-6" />}
                       {template.icon === 'Code2' && <Code2 className="w-6 h-6" />}
                       {template.icon === 'Database' && <Database className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">{template.category}</span>
                 </div>
                 <h3 className="font-bold text-lg text-slate-900 mb-2">{template.name}</h3>
                 <p className="text-sm text-slate-500 mb-4 h-10">{template.description}</p>
                 <div className="flex items-center text-xs font-mono text-slate-400 border-t border-slate-100 pt-4">
                    <Box className="w-3 h-3 mr-1" /> {template.image}
                 </div>
              </div>
           ))}
        </div>
      </Layout>
    );
  }

  if (view === 'support') {
    return (
      <Layout>
         <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Support Tickets</h2>
              <p className="text-slate-500">Need help? Open a ticket or chat with AI.</p>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
               <Plus className="w-4 h-4" /> New Ticket
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-3 font-medium">Ticket ID</th>
                     <th className="px-6 py-3 font-medium">Subject</th>
                     <th className="px-6 py-3 font-medium">Status</th>
                     <th className="px-6 py-3 font-medium">Last Update</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {tickets.map(t => (
                     <tr key={t.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-mono text-slate-600">{t.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{t.subject}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              t.status === 'Open' ? 'bg-green-100 text-green-700' :
                              t.status === 'Answered' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                           }`}>{t.status}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{t.lastUpdate}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <SupportChat context="Support Ticket Page" />
      </Layout>
    );
  }

  if (view === 'dashboard' || (view === 'service-detail' && !activeServiceId)) {
    return (
      <Layout>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My Services</h2>
            <p className="text-slate-500">Manage your running containers.</p>
          </div>
          <button 
            onClick={() => setView('marketplace')} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Service
          </button>
        </div>

        {services.length === 0 ? (
           <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No Services Running</h3>
              <p className="text-slate-500 mb-6">Deploy your first application from the marketplace.</p>
              <button onClick={() => setView('marketplace')} className="text-indigo-600 font-medium hover:underline">Go to Marketplace</button>
           </div>
        ) : (
          <div className="grid gap-4">
            {services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                       {service.image.includes('word') && <LayoutTemplate className="w-6 h-6" />}
                       {service.image.includes('node') && <Code2 className="w-6 h-6" />}
                       {!service.image.includes('word') && !service.image.includes('node') && <Server className="w-6 h-6" />}
                    </div>
                    <div>
                       <h3 className="font-bold text-lg text-slate-900">{service.domain}</h3>
                       <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                          <span>{service.image}</span>
                          <span>•</span>
                          <span className="text-green-600 flex items-center gap-1"><Activity className="w-3 h-3" /> Running</span>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => handleViewService(service.id)} className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium">
                    Manage
                 </button>
              </div>
            ))}
          </div>
        )}
        <SupportChat context="Client Dashboard" />
      </Layout>
    );
  }

  if (view === 'service-detail' && activeServiceId) {
    const activeService = services.find(s => s.id === activeServiceId);
    if (!activeService) return null;

    return (
      <Layout>
         <div className="mb-6">
            <button onClick={() => setView('dashboard')} className="text-sm text-slate-500 hover:text-indigo-600 mb-4 flex items-center gap-1">← Back</button>
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold text-slate-900">{activeService.domain}</h1>
                  <p className="text-slate-500 font-mono text-sm mt-1">{activeService.containerId}</p>
               </div>
               <div className="flex gap-2">
                  <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100">Stop</button>
                  <button className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Restart</button>
                  <a href={activeService.publicUrl} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                     Open Site <ExternalLink className="w-3 h-3" />
                  </a>
               </div>
            </div>
         </div>
         
         {/* Simplified Details for brevity */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold mb-4 flex items-center gap-2"><Activity className="w-4 h-4" /> Usage</h3>
               <div className="space-y-4">
                  <div>
                     <div className="flex justify-between text-xs mb-1"><span>CPU</span><span>12%</span></div>
                     <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full" style={{width: '12%'}}></div></div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs mb-1"><span>RAM</span><span>245MB / 512MB</span></div>
                     <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div></div>
                  </div>
               </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
               <h3 className="font-bold mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> DNS & Network</h3>
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                     <span className="text-slate-500">Public URL</span>
                     <span className="font-mono">{activeService.publicUrl}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                     <span className="text-slate-500">Internal IP</span>
                     <span className="font-mono">{activeService.ipAddress}</span>
                  </div>
                  <div className="flex justify-between py-2">
                     <span className="text-slate-500">Tunnel ID</span>
                     <span className="font-mono text-xs">cf-tunnel-{generateId()}</span>
                  </div>
               </div>
            </div>
         </div>
      </Layout>
    );
  }

  // --- ADMIN VIEWS ---

  if (view === 'admin-dashboard') {
    return (
      <Layout>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Admin Overview</h2>
        
        {/* Server Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Host CPU (Ubuntu 24)</div>
              <div className="text-2xl font-bold text-slate-900">{MOCK_ADMIN_STATS.cpuLoad}%</div>
              <div className="w-full bg-slate-100 h-1 mt-2 rounded-full"><div className="bg-indigo-500 h-1 rounded-full" style={{width: `${MOCK_ADMIN_STATS.cpuLoad}%`}}></div></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Memory</div>
              <div className="text-2xl font-bold text-slate-900">{MOCK_ADMIN_STATS.memoryUsage}%</div>
              <div className="w-full bg-slate-100 h-1 mt-2 rounded-full"><div className="bg-purple-500 h-1 rounded-full" style={{width: `${MOCK_ADMIN_STATS.memoryUsage}%`}}></div></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Active Tunnels</div>
              <div className="text-2xl font-bold text-slate-900">{services.length + MOCK_ADMIN_STATS.activeTunnels}</div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">Monthly Revenue</div>
              <div className="text-2xl font-bold text-green-600">${MOCK_ADMIN_STATS.totalRevenue}</div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                 <div className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                    <div><p className="font-medium">Container Created</p><p className="text-slate-500 text-xs">wp-blog-01 (User: u1)</p></div>
                    <span className="ml-auto text-xs text-slate-400">2m ago</span>
                 </div>
                 <div className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                    <div><p className="font-medium">Backup Completed</p><p className="text-slate-500 text-xs">System Weekly Backup</p></div>
                    <span className="ml-auto text-xs text-slate-400">1h ago</span>
                 </div>
                 <div className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                    <div><p className="font-medium">Failed Login Attempt</p><p className="text-slate-500 text-xs">IP: 192.168.1.44</p></div>
                    <span className="ml-auto text-xs text-slate-400">4h ago</span>
                 </div>
              </div>
           </div>
           <div className="bg-slate-900 text-slate-300 p-6 rounded-xl font-mono text-xs overflow-hidden relative">
              <div className="absolute top-4 right-4 bg-slate-800 px-2 py-1 rounded text-white">Host Logs</div>
              <div className="space-y-2 mt-6">
                 <p>systemd[1]: Started Docker Application Container Engine.</p>
                 <p>cloudflared[882]: Connection to edge established.</p>
                 <p>kernel: [ 12.442] IPv6: ADDRCONF(NETDEV_UP): eth0: link is not ready</p>
                 <p>sshd[1200]: Accepted publickey for root from 10.0.0.2 port 52334</p>
              </div>
           </div>
        </div>
        <SupportChat context="Admin Dashboard" />
      </Layout>
    );
  }

  if (view === 'admin-domains') {
     return (
        <Layout>
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h2 className="text-2xl font-bold text-slate-900">Cloudflare Domain Manager</h2>
                 <p className="text-slate-500">Zone: {cloudflareConfig.baseDomain || 'Not Configured'} (ID: {cloudflareConfig.zoneId})</p>
              </div>
              <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                 Sync with API <RotateCcw className="w-3 h-3" />
              </button>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-3">Type</th>
                       <th className="px-6 py-3">Name</th>
                       <th className="px-6 py-3">Content</th>
                       <th className="px-6 py-3">Proxy Status</th>
                       <th className="px-6 py-3">TTL</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {services.map((svc) => (
                       <tr key={svc.id}>
                          <td className="px-6 py-4 font-mono font-bold text-slate-600">CNAME</td>
                          <td className="px-6 py-4 font-mono text-indigo-600">{svc.domain.split('.')[0]}</td>
                          <td className="px-6 py-4 font-mono text-slate-500 text-xs">{svc.publicUrl}</td>
                          <td className="px-6 py-4">
                             <span className="flex items-center gap-1 text-orange-600 font-medium">
                                <Cloud className="w-4 h-4 fill-orange-500" /> Proxied
                             </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500">Auto</td>
                       </tr>
                    ))}
                    {/* Mock existing records */}
                    <tr>
                       <td className="px-6 py-4 font-mono font-bold text-slate-600">A</td>
                       <td className="px-6 py-4 font-mono text-indigo-600">@</td>
                       <td className="px-6 py-4 font-mono text-slate-500 text-xs">1.2.3.4</td>
                       <td className="px-6 py-4"><span className="flex items-center gap-1 text-orange-600 font-medium"><Cloud className="w-4 h-4 fill-orange-500" /> Proxied</span></td>
                       <td className="px-6 py-4 text-slate-500">Auto</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </Layout>
     );
  }

  if (view === 'admin-clients') {
     return (
        <Layout>
           <h2 className="text-2xl font-bold text-slate-900 mb-8">Client Management</h2>
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-3">User</th>
                       <th className="px-6 py-3">Email</th>
                       <th className="px-6 py-3">Status</th>
                       <th className="px-6 py-3">Services</th>
                       <th className="px-6 py-3">Joined</th>
                       <th className="px-6 py-3">Action</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {MOCK_USERS.map(user => (
                       <tr key={user.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                          <td className="px-6 py-4 text-slate-500">{user.email}</td>
                          <td className="px-6 py-4">
                             <span className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {user.status.toUpperCase()}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{user.servicesCount}</td>
                          <td className="px-6 py-4 text-slate-500">{user.joinedDate}</td>
                          <td className="px-6 py-4">
                             <button className="text-indigo-600 hover:underline">Edit</button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </Layout>
     );
  }

  // Fallback
  return <Layout><div>Page Not Found</div></Layout>;
};

export default App;