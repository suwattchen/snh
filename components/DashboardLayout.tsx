import React from 'react';
import { LayoutDashboard, Server, CreditCard, Settings, LogOut, Users, Globe, Activity, ShoppingBag, LifeBuoy, Languages, Bell, User } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  currentRole: 'client' | 'admin';
  onNavigate: (page: string) => void;
  onSwitchRole: () => void;
  lang: 'th' | 'en';
  onToggleLang: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, currentPage, currentRole, onNavigate, onSwitchRole, lang, onToggleLang 
}) => {
  
  const labels = {
    en: {
      overview: 'Overview',
      marketplace: 'App Marketplace',
      services: 'My Services',
      billing: 'Billing',
      support: 'Support Tickets',
      account: 'Account',
      serverHealth: 'Server Health',
      clientMgmt: 'Client Management',
      containerCtrl: 'Container Control',
      dns: 'Cloudflare DNS',
      revenue: 'Revenue & Invoices',
      sysSettings: 'System Settings',
      switchRole: 'Switch to',
      signOut: 'Sign Out',
      dashboard: 'Dashboard'
    },
    th: {
      overview: 'ภาพรวม',
      marketplace: 'ตลาดแอปพลิเคชัน',
      services: 'บริการของฉัน',
      billing: 'การชำระเงิน',
      support: 'แจ้งปัญหาการใช้งาน',
      account: 'บัญชีผู้ใช้',
      serverHealth: 'สถานะเซิร์ฟเวอร์',
      clientMgmt: 'จัดการลูกค้า',
      containerCtrl: 'ควบคุมคอนเทนเนอร์',
      dns: 'Cloudflare DNS',
      revenue: 'รายได้ & ใบแจ้งหนี้',
      sysSettings: 'ตั้งค่าระบบ',
      switchRole: 'สลับไปยัง',
      signOut: 'ออกจากระบบ',
      dashboard: 'แดชบอร์ด'
    }
  };

  const t = labels[lang];

  const clientNavItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.overview },
    { id: 'marketplace', icon: ShoppingBag, label: t.marketplace },
    { id: 'services', icon: Server, label: t.services },
    { id: 'billing', icon: CreditCard, label: t.billing },
    { id: 'support', icon: LifeBuoy, label: t.support },
    { id: 'settings', icon: Settings, label: t.account },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', icon: Activity, label: t.serverHealth },
    { id: 'admin-clients', icon: Users, label: t.clientMgmt },
    { id: 'admin-services', icon: Server, label: t.containerCtrl },
    { id: 'admin-domains', icon: Globe, label: t.dns },
    { id: 'admin-billing', icon: CreditCard, label: t.revenue },
    { id: 'admin-settings', icon: Settings, label: t.sysSettings },
  ];

  const items = currentRole === 'client' ? clientNavItems : adminNavItems;
  const sidebarColor = currentRole === 'client' ? 'bg-slate-900' : 'bg-slate-950';
  const logoColor = currentRole === 'client' ? 'bg-indigo-500' : 'bg-red-600';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`w-64 ${sidebarColor} text-slate-300 hidden md:flex flex-col fixed h-full transition-colors duration-300 z-20`}>
        <div className="p-6 border-b border-slate-800 h-20 flex items-center">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <div className={`w-8 h-8 ${logoColor} rounded-lg flex items-center justify-center shadow-lg`}>
              <span className="text-lg font-bold text-white">N</span>
            </div>
            NexusHost
            {currentRole === 'admin' && <span className="text-xs bg-red-900 text-red-200 px-1.5 py-0.5 rounded border border-red-800">ADM</span>}
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id 
                  ? 'bg-white/10 text-white shadow-md' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button 
            onClick={onToggleLang}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
          >
            <Languages className="w-5 h-5" />
            <span>{lang === 'th' ? 'Language: TH' : 'Language: EN'}</span>
          </button>

          <button 
            onClick={onSwitchRole}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs uppercase font-bold text-slate-500 hover:text-white transition-colors border border-slate-800 rounded-lg hover:bg-slate-800"
          >
             {t.switchRole} {currentRole === 'client' ? 'Admin' : 'Client'}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-red-500/10 rounded-lg">
            <LogOut className="w-5 h-5" />
            <span>{t.signOut}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Navigation Bar (Fixed Top) */}
        <header className="bg-slate-900 text-white shadow-md h-20 sticky top-0 z-10 hidden md:flex items-center justify-between px-10">
            <div className="flex items-center gap-8">
              {/* Quick Navigation Links */}
              <nav className="flex gap-6">
                <button 
                  onClick={() => onNavigate(currentRole === 'admin' ? 'admin-dashboard' : 'dashboard')}
                  className={`text-sm font-medium transition-colors ${currentPage.includes('dashboard') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {t.dashboard}
                </button>
                <button 
                  onClick={() => onNavigate(currentRole === 'admin' ? 'admin-services' : 'services')}
                  className={`text-sm font-medium transition-colors ${currentPage.includes('services') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {t.services}
                </button>
                <button 
                  onClick={() => onNavigate(currentRole === 'admin' ? 'admin-billing' : 'billing')}
                  className={`text-sm font-medium transition-colors ${currentPage.includes('billing') ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {t.billing}
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
               <button className="p-2 text-slate-400 hover:text-white relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
               </button>
               <div className="h-8 w-px bg-slate-700"></div>
               <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onNavigate('settings')}>
                  <div className="text-right hidden lg:block">
                     <div className="text-sm font-bold text-white">{currentRole === 'admin' ? 'Administrator' : 'Alice Engineer'}</div>
                     <div className="text-xs text-slate-400">{currentRole === 'admin' ? 'System Root' : 'Pro Plan Member'}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
                     {currentRole === 'admin' ? 'AD' : 'AL'}
                  </div>
               </div>
            </div>
        </header>

        {/* Mobile Header */}
        <div className={`md:hidden fixed top-0 left-0 w-full ${sidebarColor} text-white p-4 z-40 flex justify-between items-center shadow-md h-16`}>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 ${logoColor} rounded flex items-center justify-center`}>
              <span className="font-bold text-xs">N</span>
            </div>
            <span className="font-bold">NexusHost</span>
          </div>
          <button className="p-2">Menu</button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 pt-20 md:pt-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};