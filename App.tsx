
import React, { useState, useEffect } from 'react';
import { Activity, Server, HardDrive, Globe, CheckCircle2, Terminal, Cpu, Plus, ShieldCheck, Box, PlayCircle, StopCircle, RotateCcw, ExternalLink, Users, DollarSign, Lock, Search, Cloud, ArrowRight, ShoppingBag, Code2, LayoutTemplate, Database, Feather, LifeBuoy, AlertCircle, PlusCircle, Loader2, Save, RefreshCw, Archive, Settings, Trash2, Zap, Shield, Smartphone, Languages, HelpCircle, Folder, Key, GitBranch } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { APP_TEMPLATES, HOSTING_PLANS, MOCK_LOGS, MOCK_USERS, MOCK_INVOICES, MOCK_ADMIN_STATS, SYSTEM_CONTAINERS, MOCK_BACKUPS } from './constants';
import { AppTemplate, HostingPlan, Service, ServiceStatus, User, Invoice, CloudflareConfig, Ticket, DnsRecord, Backup, BackupStatus } from './types';
import { DashboardLayout } from './components/DashboardLayout';
import { SupportChat } from './components/SupportChat';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);
// Simple Port generator
const generatePort = () => Math.floor(Math.random() * (65000 - 3000) + 3000);

const TRANSLATIONS = {
  en: {
    landing: {
      adminAccess: 'Admin Access',
      clientConsole: 'Client Console',
      heroTitle: 'Hosting Reimagined with',
      heroHighlight: 'Docker Containers',
      heroDesc: 'Deploy WordPress, Node.js, and Databases in seconds. Isolated environments, automated SSL, and zero-port-forwarding security.',
      deployBtn: 'Deploy Now',
      viewDocs: 'View Documentation',
      featSecure: 'Secure by Default',
      featSecureDesc: 'No open ports on your host machine. We use Cloudflare Tunnels to securely expose your containers to the web.',
      featInstant: 'Instant Provisioning',
      featInstantDesc: 'From click to live in under 60 seconds. Our automated orchestration engine handles Docker networking for you.',
      featPortal: 'Self-Service Portal',
      featPortalDesc: 'Full control over your services. Start, stop, restart, view logs, and manage backups from a beautiful dashboard.',
      priceTitle: 'Simple, Transparent Pricing',
      priceDesc: 'Choose the resources that fit your application needs.',
      mostPopular: 'Most Popular',
      choose: 'Choose',
      footerText: 'The next generation of self-hosted container management. Simple, secure, and built for developers.',
      infraReliability: 'Infrastructure Grade Reliability',
      infraDesc: 'Built on Ubuntu Server 24.04 LTS and powered by enterprise-grade open source technology.',
      features: 'Features',
      pricing: 'Pricing',
      tech: 'Technology',
      navDashboard: 'Dashboard',
      navServices: 'Services',
      navBilling: 'Billing',
    },
    dash: {
      marketplace: 'App Marketplace',
      marketplaceDesc: 'One-click deployment for popular applications.',
      supportTickets: 'Support Tickets',
      needHelp: 'Need help? Open a ticket or chat with AI.',
      newTicket: 'New Ticket',
      myServices: 'My Services',
      manageServices: 'Manage your running containers.',
      newService: 'New Service',
      noServices: 'No Services Running',
      deployFirst: 'Deploy your first application from the marketplace.',
      goToMarket: 'Go to Marketplace',
      domain: 'Domain',
      image: 'Image',
      status: 'Status',
      created: 'Created At',
      action: 'Action',
      manage: 'Manage',
      running: 'Running',
      stop: 'Stop',
      restart: 'Restart',
      openSite: 'Open Site',
      usage: 'Usage',
      network: 'DNS & Network',
      publicUrl: 'Public URL',
      internalIp: 'Internal IP',
      tunnelId: 'Tunnel ID',
      backups: 'Backups & Snapshots',
      createSnapshot: 'Create Snapshot',
      restore: 'RESTORE',
      adminOverview: 'Admin Overview',
      hostCpu: 'Host CPU (Ubuntu 24)',
      memory: 'Memory',
      activeTunnels: 'Active Tunnels',
      monthlyRev: 'Monthly Revenue',
      infraHealth: 'System Infrastructure Status',
      allSysOp: 'All Systems Operational',
      recentActivity: 'Recent Activity',
      hostLogs: 'Host Logs',
      planConfig: 'Plan & Container Configuration',
      pricingPlans: 'Pricing Plans (WHMCS Module)',
      addPlan: 'Add Plan',
      globalSettings: 'Global Container Settings',
      domainManager: 'Cloudflare Domain Manager',
      syncApi: 'Sync with API',
      addDns: 'Add DNS Record',
      clientMgmt: 'Client Management',
      setupTitle: 'NexusHost Installer',
      setupDesc: 'Initial System Configuration (Admin Only)',
      completeInstall: 'Complete Installation',
      planName: 'Plan Name',
      monthlyPrice: 'Monthly Price',
      resources: 'Resources',
      dockerLimits: 'Docker Limits',
      type: 'Type',
      name: 'Name',
      content: 'Content',
      ttl: 'TTL',
      proxyStatus: 'Proxy Status',
      proxied: 'Proxied',
      dnsOnly: 'DNS Only',
      user: 'User',
      email: 'Email',
      joined: 'Joined',
      services: 'Services',
      adminCreds: 'Admin Credentials',
      cfIntegration: 'Cloudflare Integration',
      back: 'Back',
      provisioning: 'Provisioning',
      deployContainer: 'Deploy Container',
      subdomain: 'Subdomain',
      envVars: 'Environment Variables (Optional)',
      configInstance: 'Configure Instance',
      planDetails: 'Plan Details',
      changeApp: 'Change App',
      ticketId: 'Ticket ID',
      subject: 'Subject',
      lastUpdate: 'Last Update',
      size: 'Size',
      serverMetrics: 'Real-time Metrics',
      cpuMem: 'CPU & Memory Usage',
      netTraffic: 'Network Traffic',
      diskIo: 'Disk I/O Operations',
      inbound: 'Inbound',
      outbound: 'Outbound',
      read: 'Read',
      write: 'Write',
      statusStopped: 'Stopped',
      statusError: 'Error',
      statusPending: 'Pending',
      database: 'Databases',
      files: 'Files / FTP',
      dbName: 'DB Name',
      dbUser: 'User',
      dbHost: 'Internal Host',
      ftpHost: 'SFTP Host',
      ftpPort: 'Port',
      ftpUser: 'ชื่อผู้ใช้',
      ftpPass: 'รหัสผ่าน'
    }
  },
  th: {
    landing: {
      adminAccess: 'เข้าสู่ระบบแอดมิน',
      clientConsole: 'คอนโซลลูกค้า',
      heroTitle: 'มิติใหม่แห่งการโฮสติ้งด้วย',
      heroHighlight: 'Docker Containers',
      heroDesc: 'ติดตั้ง WordPress, Node.js และฐานข้อมูลได้ในไม่กี่วินาที ด้วยสภาพแวดล้อมที่แยกส่วน SSL อัตโนมัติ และความปลอดภัยแบบไม่ต้องเปิดพอร์ต',
      deployBtn: 'ติดตั้งเลย',
      viewDocs: 'ดูคู่มือ',
      featSecure: 'ปลอดภัยเป็นมาตรฐาน',
      featSecureDesc: 'ไม่มีการเปิดพอร์ตที่เครื่องโฮสต์ เราใช้ Cloudflare Tunnels เพื่อเผยแพร่คอนเทนเนอร์ของคุณสู่เว็บอย่างปลอดภัย',
      featInstant: 'ติดตั้งทันที',
      featInstantDesc: 'จากคลิกสู่ใช้งานจริงในไม่ถึง 60 วินาที ระบบอัตโนมัติของเราจัดการเครือข่าย Docker ให้คุณ',
      featPortal: 'พอร์ทัลบริการตนเอง',
      featPortalDesc: 'ควบคุมบริการของคุณได้อย่างเต็มที่ เริ่ม หยุด รีสตาร์ท ดูบันทึก และจัดการการสำรองข้อมูลจากแดชบอร์ดที่สวยงาม',
      priceTitle: 'ราคาที่เรียบง่ายและโปร่งใส',
      priceDesc: 'เลือกทรัพยากรที่เหมาะกับความต้องการของแอปพลิเคชันของคุณ',
      mostPopular: 'ยอดนิยมที่สุด',
      choose: 'เลือก',
      footerText: 'ยุคใหม่ของการจัดการคอนเทนเนอร์แบบ Self-hosted ง่าย ปลอดภัย และสร้างมาเพื่อนักพัฒนา',
      infraReliability: 'โครงสร้างพื้นฐานระดับ Enterprise',
      infraDesc: 'สร้างบน Ubuntu Server 24.04 LTS และขับเคลื่อนด้วยเทคโนโลยี Open Source ระดับโลก',
      features: 'คุณสมบัติ',
      pricing: 'ราคา',
      tech: 'เทคโนโลยี',
      navDashboard: 'แดชบอร์ด',
      navServices: 'บริการ',
      navBilling: 'การชำระเงิน',
    },
    dash: {
      marketplace: 'ตลาดแอปพลิเคชัน',
      marketplaceDesc: 'ติดตั้งแอปพลิเคชันยอดนิยมด้วยคลิกเดียว',
      supportTickets: 'ตั๋วสนับสนุน',
      needHelp: 'ต้องการความช่วยเหลือ? เปิดตั๋วหรือคุยกับ AI',
      newTicket: 'สร้างตั๋วใหม่',
      myServices: 'บริการของฉัน',
      manageServices: 'จัดการคอนเทนเนอร์ที่ทำงานอยู่',
      newService: 'สร้างบริการใหม่',
      noServices: 'ยังไม่มีบริการที่รันอยู่',
      deployFirst: 'ติดตั้งแอปพลิเคชันแรกของคุณจากตลาด',
      goToMarket: 'ไปที่ตลาดแอป',
      domain: 'โดเมน',
      image: 'อิมเมจ',
      status: 'สถานะ',
      created: 'สร้างเมื่อ',
      action: 'ดำเนินการ',
      manage: 'จัดการ',
      running: 'กำลังทำงาน',
      stop: 'หยุด',
      restart: 'เริ่มใหม่',
      openSite: 'เปิดเว็บไซต์',
      usage: 'การใช้งาน',
      network: 'DNS & เครือข่าย',
      publicUrl: 'ลิงก์สาธารณะ',
      internalIp: 'IP ภายใน',
      tunnelId: 'รหัส Tunnel',
      backups: 'สำรองข้อมูล & สแนปชอต',
      createSnapshot: 'สร้างสแนปชอต',
      restore: 'กู้คืน',
      adminOverview: 'ภาพรวมผู้ดูแลระบบ',
      hostCpu: 'CPU โฮสต์ (Ubuntu 24)',
      memory: 'หน่วยความจำ',
      activeTunnels: 'Tunnel ที่ทำงาน',
      monthlyRev: 'รายได้ต่อเดือน',
      infraHealth: 'สถานะโครงสร้างพื้นฐาน',
      allSysOp: 'ทุกระบบทำงานปกติ',
      recentActivity: 'กิจกรรมล่าสุด',
      hostLogs: 'บันทึกโฮสต์',
      planConfig: 'ตั้งค่าแพ็กเกจ & คอนเทนเนอร์',
      pricingPlans: 'แพ็กเกจราคา (โมดูล WHMCS)',
      addPlan: 'เพิ่มแพ็กเกจ',
      globalSettings: 'ตั้งค่าคอนเทนเนอร์ทั่วไป',
      domainManager: 'ตัวจัดการโดเมน Cloudflare',
      syncApi: 'ซิงค์กับ API',
      addDns: 'เพิ่มระเบียน DNS',
      clientMgmt: 'จัดการลูกค้า',
      setupTitle: 'ตัวช่วยติดตั้ง NexusHost',
      setupDesc: 'การตั้งค่าระบบเบื้องต้น (สำหรับ Admin)',
      completeInstall: 'เสร็จสิ้นการติดตั้ง',
      planName: 'ชื่อแพ็กเกจ',
      monthlyPrice: 'ราคาต่อเดือน',
      resources: 'ทรัพยากร',
      dockerLimits: 'ข้อจำกัด Docker',
      type: 'ประเภท',
      name: 'ชื่อ',
      content: 'เนื้อหา',
      ttl: 'TTL',
      proxyStatus: 'สถานะ Proxy',
      proxied: 'ผ่าน Proxy',
      dnsOnly: 'DNS เท่านั้น',
      user: 'ผู้ใช้',
      email: 'อีเมล',
      joined: 'วันที่เข้าร่วม',
      services: 'บริการ',
      adminCreds: 'ข้อมูลเข้าสู่ระบบผู้ดูแล',
      cfIntegration: 'การเชื่อมต่อ Cloudflare',
      back: 'ย้อนกลับ',
      provisioning: 'กำลังเตรียมระบบ',
      deployContainer: 'ติดตั้งคอนเทนเนอร์',
      subdomain: 'ซับโดเมน',
      envVars: 'ตัวแปรสภาพแวดล้อม (ไม่บังคับ)',
      configInstance: 'ตั้งค่าอินสแตนซ์',
      planDetails: 'รายละเอียดแพ็กเกจ',
      changeApp: 'เปลี่ยนแอป',
      ticketId: 'รหัสตั๋ว',
      subject: 'หัวข้อ',
      lastUpdate: 'อัปเดตล่าสุด',
      size: 'ขนาด',
      serverMetrics: 'สถิติเรียลไทม์',
      cpuMem: 'การใช้ CPU & Memory',
      netTraffic: 'ปริมาณการใช้เครือข่าย',
      diskIo: 'การอ่าน/เขียนดิสก์',
      inbound: 'ขาเข้า',
      outbound: 'ขาออก',
      read: 'อ่าน',
      write: 'เขียน',
      statusStopped: 'หยุดทำงาน',
      statusError: 'เกิดข้อผิดพลาด',
      statusPending: 'รอดำเนินการ',
      database: 'ฐานข้อมูล',
      files: 'จัดการไฟล์ / FTP',
      dbName: 'ชื่อฐานข้อมูล',
      dbUser: 'ผู้ใช้',
      dbHost: 'Internal Host',
      ftpHost: 'SFTP โฮสต์',
      ftpPort: 'พอร์ต',
      ftpUser: 'ชื่อผู้ใช้',
      ftpPass: 'รหัสผ่าน'
    }
  }
};

const App = () => {
  // System State
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [cloudflareConfig, setCloudflareConfig] = useState<CloudflareConfig>({
    apiToken: '',
    zoneId: '',
    baseDomain: 'nexushost.app',
    tunnelId: '',
    isConfigured: false
  });
  
  // Language State - Default to Thai
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const t = TRANSLATIONS[lang];

  const toggleLang = () => setLang(prev => prev === 'th' ? 'en' : 'th');

  // Routing & Roles
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [view, setView] = useState<string>('landing');
  
  // Data State
  const [services, setServices] = useState<Service[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '#8821', subject: 'Cannot connect to Redis container', status: 'Open', priority: 'High', lastUpdate: '2 mins ago' },
    { id: '#8819', subject: 'Billing cycle question', status: 'Answered', priority: 'Low', lastUpdate: '1 day ago' }
  ]);
  
  // DNS Records State
  const [customDnsRecords, setCustomDnsRecords] = useState<DnsRecord[]>([]);
  const [dnsForm, setDnsForm] = useState({
    type: 'A',
    name: '',
    content: '',
    ttl: 1,
    proxied: true
  });
  const [isAddingDns, setIsAddingDns] = useState(false);

  // Backup State
  const [backups, setBackups] = useState<Backup[]>(MOCK_BACKUPS);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Server Metrics State
  const [serverMetrics, setServerMetrics] = useState<any[]>([]);

  // Marketplace & Provisioning State
  const [selectedTemplate, setSelectedTemplate] = useState<AppTemplate | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionLogs, setProvisionLogs] = useState<string[]>([]);
  const [newSubdomain, setNewSubdomain] = useState('');

  // Service Tabs State
  const [activeServiceTab, setActiveServiceTab] = useState<'overview' | 'database' | 'files' | 'backups'>('overview');


  // --- Effects ---

  // Simulate real-time server metrics
  useEffect(() => {
    if (view === 'admin-dashboard') {
      // Initial historical data
      const data = [];
      const now = new Date();
      for (let i = 20; i > 0; i--) {
        data.push({
          time: new Date(now.getTime() - i * 3000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}),
          cpu: 30 + Math.random() * 20,
          memory: 45 + Math.random() * 10,
          diskRead: Math.random() * 50,
          diskWrite: Math.random() * 30,
          netIn: Math.random() * 500,
          netOut: Math.random() * 800
        });
      }
      setServerMetrics(data);

      const interval = setInterval(() => {
        setServerMetrics(prev => {
          const newTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
          const newData = {
            time: newTime,
            cpu: 30 + Math.random() * 20,
            memory: 45 + Math.random() * 10,
            diskRead: Math.random() * 50,
            diskWrite: Math.random() * 30,
            netIn: Math.random() * 500,
            netOut: Math.random() * 800
          };
          // Keep last 20 data points
          return [...prev.slice(1), newData];
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [view]);

  // --- Handlers ---

  const handleAdminAccess = () => {
    if (!isSetupComplete) {
      setView('setup');
    } else {
      setRole('admin');
      setView('admin-dashboard');
    }
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCloudflareConfig(prev => ({ ...prev, isConfigured: true }));
    setIsSetupComplete(true);
    setRole('admin');
    setView('admin-dashboard');
  };

  const handleStartInstall = (template: AppTemplate) => {
    setSelectedTemplate(template);
    const plan = HOSTING_PLANS.find(p => p.id === template.recommendedPlan) || HOSTING_PLANS[0];
    setSelectedPlan(plan);
    setView('order');
  };

  // Updated: Use Real API for Provisioning
  const handleProvision = async () => {
    if (!newSubdomain || !selectedTemplate || !selectedPlan) return;
    setIsProvisioning(true);
    setProvisionLogs(["Initiating request to NexusHost Backend API...", "Waiting for response..."]);

    try {
      const API_URL = 'http://localhost:3001/api/v1/services/create';
      
      // Simulate API Latency visually
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          planId: selectedPlan.id,
          subdomain: newSubdomain,
          zoneId: cloudflareConfig.zoneId
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setProvisionLogs(prev => [...prev, "API Response: Success", "Container ID: " + result.data.containerId, "Redirecting..."]);
        
        // Short delay to read logs
        setTimeout(() => {
          const newService: Service = {
            id: result.data.serviceId || generateId(),
            domain: `${newSubdomain}.${cloudflareConfig.baseDomain}`,
            planId: selectedPlan.id,
            appTemplateId: selectedTemplate.id,
            status: ServiceStatus.ACTIVE,
            ipAddress: `172.18.0.${Math.floor(Math.random()*255)}`, // Mock internal IP
            containerId: result.data.containerId,
            portMapping: `80->${selectedTemplate.minPort}`,
            publicUrl: result.data.publicUrl,
            image: selectedTemplate.image,
            created_at: new Date().toISOString(),
            diskUsage: 0,
            bandwidthUsage: 0
          };
          setServices(prev => [...prev, newService]);
          setIsProvisioning(false);
          setView('dashboard');
        }, 1500);

      } else {
         setProvisionLogs(prev => [...prev, "API Error: " + result.message]);
         setIsProvisioning(false);
      }

    } catch (error) {
      console.error("Provisioning Error:", error);
      setProvisionLogs(prev => [...prev, "Network Error: Could not connect to backend API (localhost:3001).", "Is docker-compose up running?"]);
      // Do not stop loading immediately so user can see error
    }
  };

  const handleAddDnsRecord = async () => {
    if (!dnsForm.name || !dnsForm.content) return;
    setIsAddingDns(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newRecord: DnsRecord = {
      id: generateId(),
      type: dnsForm.type,
      name: dnsForm.name,
      content: dnsForm.content,
      proxied: dnsForm.proxied,
      ttl: dnsForm.ttl
    };
    
    setCustomDnsRecords(prev => [newRecord, ...prev]);
    setDnsForm(prev => ({ ...prev, name: '', content: '' }));
    setIsAddingDns(false);
  };

  const handleDeleteDnsRecord = (id: string) => {
    setCustomDnsRecords(prev => prev.filter(r => r.id !== id));
  };

  const handleCreateBackup = async () => {
    if (!activeServiceId) return;
    setIsBackingUp(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBackup: Backup = {
      id: `bk-${generateId()}`,
      serviceId: activeServiceId,
      name: `Manual Backup ${new Date().toLocaleTimeString()}`,
      size: '45MB',
      created_at: new Date().toISOString(),
      status: BackupStatus.COMPLETED,
      type: 'Manual'
    };
    setBackups(prev => [newBackup, ...prev]);
    setIsBackingUp(false);
  }

  const handleNavigate = (page: string) => {
    setView(page);
  };

  const handleViewService = (id: string) => {
    setActiveServiceId(id);
    setActiveServiceTab('overview');
    setView('service-detail');
  };

  // --- Views ---

  if (view === 'setup') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-['Kanit']">
        <div className="bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-800 p-8">
           <div className="flex items-center gap-3 mb-6 text-white">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <Server className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{t.dash.setupTitle}</h1>
                <p className="text-slate-400 text-sm">{t.dash.setupDesc}</p>
              </div>
           </div>
           
           <form onSubmit={handleSetupSubmit} className="space-y-6">
              <div className="space-y-4">
                 <h3 className="text-slate-200 font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-500" /> {t.dash.adminCreds}
                 </h3>
                 <input required type="email" placeholder={t.dash.email} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none" />
                 <input required type="password" placeholder="Create Root Password" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none" />
              </div>
              
              <div className="space-y-4 border-t border-slate-800 pt-6">
                 <h3 className="text-slate-200 font-medium flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-orange-500" /> {t.dash.cfIntegration}
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
                    placeholder={t.dash.domain}
                    value={cloudflareConfig.baseDomain}
                    onChange={e => setCloudflareConfig({...cloudflareConfig, baseDomain: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 outline-none" 
                  />
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold transition-colors flex justify-center items-center gap-2">
                 {t.dash.completeInstall} <ArrowRight className="w-4 h-4" />
              </button>
           </form>
        </div>
      </div>
    );
  }

  // Landing Page (Sales Front)
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 font-['Kanit'] text-slate-900">
        {/* Header */}
        <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <div className="flex items-center gap-2 text-2xl font-bold tracking-tight cursor-pointer" onClick={() => setView('landing')}>
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-inner">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span>NexusHost</span>
            </div>
            
            {/* Updated Nav Links as requested */}
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                <button onClick={() => {setRole('client'); setView('dashboard');}} className="hover:text-white transition-colors">{t.landing.navDashboard}</button>
                <button onClick={() => {setRole('client'); setView('marketplace');}} className="hover:text-white transition-colors">{t.landing.navServices}</button>
                <button onClick={() => {setRole('client'); setView('billing');}} className="hover:text-white transition-colors">{t.landing.navBilling}</button>
            </div>

            <div className="flex gap-3 items-center">
              <button onClick={toggleLang} className="text-slate-400 hover:text-white mr-2 font-medium flex items-center gap-1">
                <Languages className="w-4 h-4" /> {lang.toUpperCase()}
              </button>
              <button 
                onClick={handleAdminAccess}
                className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"
              >
                {t.landing.adminAccess}
              </button>
              <button 
                onClick={() => {setRole('client'); setView('dashboard');}} 
                className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-900/20"
              >
                {t.landing.clientConsole}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-slate-900 text-white pt-20 pb-32 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="background" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
           </div>
           
           <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-8 border border-white/5 backdrop-blur-sm">
                 <Cloud className="w-3 h-3" /> Cloudflare Tunnel Native
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                {t.landing.heroTitle} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{t.landing.heroHighlight}</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                 {t.landing.heroDesc}
              </p>
              <div className="flex justify-center gap-4">
                 <button onClick={() => {setRole('client'); setView('marketplace');}} className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-2">
                    {t.landing.deployBtn} <ArrowRight className="w-5 h-5" />
                 </button>
                 <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all border border-slate-700">
                    {t.landing.viewDocs}
                 </button>
              </div>
           </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.landing.infraReliability}</h2>
                <p className="text-slate-500">{t.landing.infraDesc}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t.landing.featSecure}</h3>
                    <p className="text-slate-500 leading-relaxed">{t.landing.featSecureDesc}</p>
                </div>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t.landing.featInstant}</h3>
                    <p className="text-slate-500 leading-relaxed">{t.landing.featInstantDesc}</p>
                </div>
                <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{t.landing.featPortal}</h3>
                    <p className="text-slate-500 leading-relaxed">{t.landing.featPortalDesc}</p>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">{t.landing.priceTitle}</h2>
                    <p className="text-slate-400">{t.landing.priceDesc}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {HOSTING_PLANS.map((plan, idx) => (
                        <div key={plan.id} className={`relative p-8 rounded-2xl border ${idx === 1 ? 'bg-slate-800 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10' : 'bg-slate-900 border-slate-800'}`}>
                            {idx === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t.landing.mostPopular}</div>}
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold">${plan.price}</span>
                                <span className="text-slate-400">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8 text-sm text-slate-300">
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> {plan.cpu}</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> {plan.ram}</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> {plan.storage}</li>
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-indigo-400" /> {f}</li>
                                ))}
                            </ul>
                            <button 
                                onClick={() => {setRole('client'); setView('marketplace');}}
                                className={`w-full py-3 rounded-lg font-bold transition-colors ${idx === 1 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
                            >
                                {t.landing.choose} {plan.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
             <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
                 <div className="col-span-2">
                     <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                        <Box className="w-5 h-5" /> NexusHost
                     </div>
                     <p className="max-w-xs">{t.landing.footerText}</p>
                 </div>
                 <div>
                     <h4 className="text-white font-bold mb-4">{t.landing.features}</h4>
                     <ul className="space-y-2">
                         <li><a href="#" className="hover:text-white">Marketplace</a></li>
                         <li><a href="#" className="hover:text-white">Pricing</a></li>
                         <li><a href="#" className="hover:text-white">Status</a></li>
                     </ul>
                 </div>
                 <div>
                     <h4 className="text-white font-bold mb-4">Legal</h4>
                     <ul className="space-y-2">
                         <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                         <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                         <li><a href="#" className="hover:text-white">SLA</a></li>
                     </ul>
                 </div>
             </div>
             <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-900 text-center text-xs">
                 © 2024 NexusHost Automation. All rights reserved.
             </div>
        </footer>
        <SupportChat context="Landing Page" />
      </div>
    );
  }

  if (view === 'order') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-200 font-['Kanit']">
        <div className="bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
          {isProvisioning ? (
            <div className="p-12">
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                <h2 className="text-2xl font-bold text-white">{t.dash.provisioning} {selectedTemplate?.name}</h2>
                <p className="text-slate-400">Talking to Cloudflare API & Docker Engine...</p>
              </div>
              
              <div className="bg-black rounded-lg p-6 font-mono text-sm h-80 overflow-y-auto border border-slate-800 shadow-inner">
                {provisionLogs.map((log, idx) => (
                  <div key={idx} className="mb-2 flex">
                    <span className="text-slate-600 mr-3 select-none">API ></span>
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
                    {selectedTemplate?.icon === 'Cloud' && <Cloud className="w-8 h-8 text-blue-500" />}
                    {selectedTemplate?.icon === 'GitBranch' && <GitBranch className="w-8 h-8 text-orange-500" />}
                    <div>
                       <h3 className="font-bold text-lg">{selectedTemplate?.name}</h3>
                       <p className="text-xs text-slate-500">{selectedTemplate?.image}</p>
                    </div>
                 </div>
                 <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="text-xs uppercase font-bold text-slate-400 mb-2">{t.dash.planDetails}</div>
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
                    {t.dash.changeApp}
                 </button>
              </div>

              {/* Right: Config */}
              <div className="flex-1">
                 <h2 className="text-2xl font-bold mb-6">{t.dash.configInstance}</h2>
                 
                 <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t.dash.subdomain}</label>
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
                       <label className="block text-sm font-medium text-slate-700 mb-2">{t.dash.envVars}</label>
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
                      {t.dash.deployContainer}
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

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
      lang={lang}
      onToggleLang={toggleLang}
    >
      <div className="font-['Kanit']">
        {children}
      </div>
    </DashboardLayout>
  );

  // --- CLIENT VIEWS ---

  if (view === 'marketplace') {
    return (
      <Layout>
        <div className="mb-8">
           <h2 className="text-2xl font-bold text-slate-900">{t.dash.marketplace}</h2>
           <p className="text-slate-500">{t.dash.marketplaceDesc}</p>
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
                       {template.icon === 'Cloud' && <Cloud className="w-6 h-6" />}
                       {template.icon === 'GitBranch' && <GitBranch className="w-6 h-6" />}
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
              <h2 className="text-2xl font-bold text-slate-900">{t.dash.supportTickets}</h2>
              <p className="text-slate-500">{t.dash.needHelp}</p>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
               <Plus className="w-4 h-4" /> {t.dash.newTicket}
            </button>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-3 font-medium">{t.dash.ticketId}</th>
                     <th className="px-6 py-3 font-medium">{t.dash.subject}</th>
                     <th className="px-6 py-3 font-medium">{t.dash.status}</th>
                     <th className="px-6 py-3 font-medium">{t.dash.lastUpdate}</th>
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

  if (view === 'dashboard' || view === 'services' || (view === 'service-detail' && !activeServiceId)) {
    return (
      <Layout>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{t.dash.myServices}</h2>
            <p className="text-slate-500">{t.dash.manageServices}</p>
          </div>
          <button 
            onClick={() => setView('marketplace')} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> {t.dash.newService}
          </button>
        </div>

        {services.length === 0 ? (
           <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">{t.dash.noServices}</h3>
              <p className="text-slate-500 mb-6">{t.dash.deployFirst}</p>
              <button onClick={() => setView('marketplace')} className="text-indigo-600 font-medium hover:underline">{t.dash.goToMarket}</button>
           </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                     <th className="px-6 py-3">{t.dash.domain}</th>
                     <th className="px-6 py-3">{t.dash.image}</th>
                     <th className="px-6 py-3">{t.dash.status}</th>
                     <th className="px-6 py-3">{t.dash.created}</th>
                     <th className="px-6 py-3">{t.dash.action}</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {services.map(service => (
                     <tr key={service.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-900">{service.domain}</div>
                           <div className="text-xs text-slate-500 font-mono">{service.publicUrl}</div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                              {service.image.includes('word') && <LayoutTemplate className="w-4 h-4 text-blue-600" />}
                              {service.image.includes('node') && <Code2 className="w-4 h-4 text-green-600" />}
                              {service.image.includes('nextcloud') && <Cloud className="w-4 h-4 text-blue-500" />}
                              {service.image.includes('n8n') && <GitBranch className="w-4 h-4 text-orange-500" />}
                              {!service.image.includes('word') && !service.image.includes('node') && !service.image.includes('nextcloud') && !service.image.includes('n8n') && <Server className="w-4 h-4 text-slate-400" />}
                              <span className="font-mono text-slate-600">{service.image}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           {service.status === ServiceStatus.ACTIVE && (
                              <span className="text-green-700 flex items-center gap-1.5 text-xs font-bold bg-green-50 px-2.5 py-1 rounded-full w-fit border border-green-200">
                                 <Activity className="w-3.5 h-3.5" /> {t.dash.running}
                              </span>
                           )}
                           {service.status === ServiceStatus.STOPPED && (
                              <span className="text-slate-600 flex items-center gap-1.5 text-xs font-bold bg-slate-100 px-2.5 py-1 rounded-full w-fit border border-slate-200">
                                 <StopCircle className="w-3.5 h-3.5" /> {t.dash.statusStopped || 'Stopped'}
                              </span>
                           )}
                           {service.status === ServiceStatus.PROVISIONING && (
                              <span className="text-blue-700 flex items-center gap-1.5 text-xs font-bold bg-blue-50 px-2.5 py-1 rounded-full w-fit border border-blue-200">
                                 <Loader2 className="w-3.5 h-3.5 animate-spin" /> {t.dash.provisioning}
                              </span>
                           )}
                           {service.status === ServiceStatus.ERROR && (
                              <span className="text-red-700 flex items-center gap-1.5 text-xs font-bold bg-red-50 px-2.5 py-1 rounded-full w-fit border border-red-200">
                                 <AlertCircle className="w-3.5 h-3.5" /> {t.dash.statusError || 'Error'}
                              </span>
                           )}
                           {(service.status === ServiceStatus.PENDING) && (
                              <span className="text-yellow-700 flex items-center gap-1.5 text-xs font-bold bg-yellow-50 px-2.5 py-1 rounded-full w-fit border border-yellow-200">
                                 <Loader2 className="w-3.5 h-3.5" /> {t.dash.statusPending || 'Pending'}
                              </span>
                           )}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                           {new Date(service.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                           <button onClick={() => handleViewService(service.id)} className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 text-xs font-medium">
                              {t.dash.manage}
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>
        )}
        <SupportChat context="Client Dashboard" />
      </Layout>
    );
  }

  if (view === 'service-detail' && activeServiceId) {
    const activeService = services.find(s => s.id === activeServiceId);
    if (!activeService) return null;

    // Filter backups for this service
    const serviceBackups = backups.filter(b => b.serviceId === activeServiceId || b.serviceId.startsWith('srv-'));

    return (
      <Layout>
         <div className="mb-6">
            <button onClick={() => setView('dashboard')} className="text-sm text-slate-500 hover:text-indigo-600 mb-4 flex items-center gap-1">← {t.dash.back}</button>
            <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-3xl font-bold text-slate-900">{activeService.domain}</h1>
                  <p className="text-slate-500 font-mono text-sm mt-1">{activeService.containerId}</p>
               </div>
               <div className="flex gap-2">
                  <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100">{t.dash.stop}</button>
                  <button className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">{t.dash.restart}</button>
                  <a href={activeService.publicUrl} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                     {t.dash.openSite} <ExternalLink className="w-3 h-3" />
                  </a>
               </div>
            </div>
         </div>

         {/* Service Navigation Tabs */}
         <div className="flex border-b border-slate-200 mb-6">
            <button 
              onClick={() => setActiveServiceTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeServiceTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              {t.dash.manage}
            </button>
            <button 
              onClick={() => setActiveServiceTab('database')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeServiceTab === 'database' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              {t.dash.database}
            </button>
            <button 
              onClick={() => setActiveServiceTab('files')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeServiceTab === 'files' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              {t.dash.files}
            </button>
            <button 
              onClick={() => setActiveServiceTab('backups')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeServiceTab === 'backups' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              {t.dash.backups}
            </button>
         </div>
         
         {/* OVERVIEW TAB */}
         {activeServiceTab === 'overview' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                 <h3 className="font-bold mb-4 flex items-center gap-2"><Activity className="w-4 h-4" /> {t.dash.usage}</h3>
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
                 <h3 className="font-bold mb-4 flex items-center gap-2"><Globe className="w-4 h-4" /> {t.dash.network}</h3>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-slate-50">
                       <span className="text-slate-500">{t.dash.publicUrl}</span>
                       <span className="font-mono">{activeService.publicUrl}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-50">
                       <span className="text-slate-500">{t.dash.internalIp}</span>
                       <span className="font-mono">{activeService.ipAddress}</span>
                    </div>
                    <div className="flex justify-between py-2">
                       <span className="text-slate-500">{t.dash.tunnelId}</span>
                       <span className="font-mono text-xs">cf-tunnel-{generateId()}</span>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {/* DATABASE TAB */}
         {activeServiceTab === 'database' && (
           <div className="bg-white rounded-xl border border-slate-200 p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-900 flex items-center gap-2"><Database className="w-5 h-5 text-blue-600" /> MySQL Database</h3>
               <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 font-medium">Open phpMyAdmin</button>
             </div>
             
             <div className="grid gap-6 md:grid-cols-2">
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="text-xs text-slate-500 font-bold uppercase mb-2">{t.dash.dbHost}</div>
                 <div className="font-mono text-slate-800 bg-white px-3 py-2 rounded border border-slate-200">mariadb-system:3306</div>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="text-xs text-slate-500 font-bold uppercase mb-2">{t.dash.dbName}</div>
                 <div className="font-mono text-slate-800 bg-white px-3 py-2 rounded border border-slate-200">db_{activeService.id}</div>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="text-xs text-slate-500 font-bold uppercase mb-2">{t.dash.dbUser}</div>
                 <div className="font-mono text-slate-800 bg-white px-3 py-2 rounded border border-slate-200">usr_{activeService.id}</div>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                 <div className="text-xs text-slate-500 font-bold uppercase mb-2">{t.dash.ftpPass}</div>
                 <div className="flex gap-2">
                   <div className="font-mono text-slate-800 bg-white px-3 py-2 rounded border border-slate-200 flex-1 blur-sm hover:blur-none transition-all cursor-help select-all">
                     a89s7d98f7s89d7f
                   </div>
                   <button className="p-2 text-slate-400 hover:text-indigo-600"><RefreshCw className="w-4 h-4" /></button>
                 </div>
               </div>
             </div>
           </div>
         )}

         {/* FILES TAB */}
         {activeServiceTab === 'files' && (
           <div className="bg-white rounded-xl border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6"><Folder className="w-5 h-5 text-yellow-600" /> SFTP Details</h3>
             
             <div className="bg-slate-900 text-slate-300 rounded-xl p-6 font-mono text-sm space-y-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-slate-800 text-xs px-3 py-1 rounded-bl-xl text-slate-400">Read-Only View</div>
               
               <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                 <span className="text-slate-500">{t.dash.ftpHost}:</span>
                 <span className="text-white">sftp.{cloudflareConfig.baseDomain}</span>
               </div>
               <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                 <span className="text-slate-500">{t.dash.ftpPort}:</span>
                 <span className="text-green-400">2222</span>
               </div>
               <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                 <span className="text-slate-500">{t.dash.ftpUser}:</span>
                 <span className="text-yellow-400">user_{activeService.id}</span>
               </div>
               <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                 <span className="text-slate-500">{t.dash.ftpPass}:</span>
                 <span className="blur-sm hover:blur-none transition-all cursor-pointer text-white">8723ksdfh823!</span>
               </div>
             </div>
             
             <div className="mt-6 flex gap-4">
               <button className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
                 <ExternalLink className="w-4 h-4" /> Open Web File Manager
               </button>
               <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                 <Key className="w-4 h-4" /> Reset SFTP Password
               </button>
             </div>
           </div>
         )}

         {/* BACKUPS TAB */}
         {activeServiceTab === 'backups' && (
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2"><Archive className="w-4 h-4" /> {t.dash.backups}</h3>
                  <button 
                    onClick={handleCreateBackup}
                    disabled={isBackingUp}
                    className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-200 flex items-center gap-2 disabled:opacity-50"
                  >
                     {isBackingUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                     {t.dash.createSnapshot}
                  </button>
              </div>
              <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                          <th className="px-6 py-3">{t.dash.name}</th>
                          <th className="px-6 py-3">{t.dash.type}</th>
                          <th className="px-6 py-3">{t.dash.size}</th>
                          <th className="px-6 py-3">{t.dash.created}</th>
                          <th className="px-6 py-3">{t.dash.action}</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {serviceBackups.length === 0 && !isBackingUp && (
                         <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No backups created yet.</td>
                         </tr>
                      )}
                      {serviceBackups.map(bk => (
                          <tr key={bk.id}>
                              <td className="px-6 py-4 font-medium text-slate-900">{bk.name}</td>
                              <td className="px-6 py-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">{bk.type}</span></td>
                              <td className="px-6 py-4 text-slate-500">{bk.size}</td>
                              <td className="px-6 py-4 text-slate-500">{new Date(bk.created_at).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                  <button className="text-indigo-600 hover:underline text-xs font-bold">{t.dash.restore}</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
           </div>
         )}
      </Layout>
    );
  }

  // --- ADMIN VIEWS ---

  if (view === 'admin-dashboard') {
    return (
      <Layout>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{t.dash.adminOverview}</h2>
            <span className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Metrics
            </span>
        </div>
        
        {/* Server Stats Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t.dash.hostCpu}</div>
              <div className="text-2xl font-bold text-slate-900">{MOCK_ADMIN_STATS.cpuLoad}%</div>
              <div className="w-full bg-slate-100 h-1 mt-2 rounded-full"><div className="bg-indigo-500 h-1 rounded-full" style={{width: `${MOCK_ADMIN_STATS.cpuLoad}%`}}></div></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t.dash.memory}</div>
              <div className="text-2xl font-bold text-slate-900">{MOCK_ADMIN_STATS.memoryUsage}%</div>
              <div className="w-full bg-slate-100 h-1 mt-2 rounded-full"><div className="bg-purple-500 h-1 rounded-full" style={{width: `${MOCK_ADMIN_STATS.memoryUsage}%`}}></div></div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t.dash.activeTunnels}</div>
              <div className="text-2xl font-bold text-slate-900">{services.length + MOCK_ADMIN_STATS.activeTunnels}</div>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">{t.dash.monthlyRev}</div>
              <div className="text-2xl font-bold text-green-600">${MOCK_ADMIN_STATS.totalRevenue}</div>
           </div>
        </div>

        {/* Real-time Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* CPU & Memory Chart */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-indigo-600"/> {t.dash.cpuMem}
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={serverMetrics}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                            <XAxis dataKey="time" hide />
                            <YAxis domain={[0, 100]} tick={{fontSize: 12}} stroke="#94a3b8"/>
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Area type="monotone" dataKey="cpu" stroke="#6366f1" fillOpacity={1} fill="url(#colorCpu)" name="CPU %" isAnimationActive={false} />
                            <Area type="monotone" dataKey="memory" stroke="#a855f7" fillOpacity={1} fill="url(#colorMem)" name="Memory %" isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Network Chart */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600"/> {t.dash.netTraffic} (Kbps)
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={serverMetrics}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                            <XAxis dataKey="time" hide />
                            <YAxis tick={{fontSize: 12}} stroke="#94a3b8"/>
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Line type="monotone" dataKey="netIn" stroke="#10b981" strokeWidth={2} dot={false} name={t.dash.inbound} isAnimationActive={false} />
                            <Line type="monotone" dataKey="netOut" stroke="#3b82f6" strokeWidth={2} dot={false} name={t.dash.outbound} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Disk I/O Chart */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-orange-600"/> {t.dash.diskIo} (IOPS)
                </h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={serverMetrics}>
                            <defs>
                                <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorWrite" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                            <XAxis dataKey="time" hide />
                            <YAxis tick={{fontSize: 12}} stroke="#94a3b8"/>
                            <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                            <Area type="monotone" dataKey="diskRead" stroke="#f97316" fillOpacity={1} fill="url(#colorRead)" name={t.dash.read} isAnimationActive={false} />
                            <Area type="monotone" dataKey="diskWrite" stroke="#ef4444" fillOpacity={1} fill="url(#colorWrite)" name={t.dash.write} isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
         </div>

        {/* Infrastructure Health */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-8 overflow-hidden">
             <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-500" /> {t.dash.infraHealth}
                 </h3>
                 <span className="text-xs text-green-600 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                    <Activity className="w-3 h-3" /> {t.dash.allSysOp}
                 </span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                 {SYSTEM_CONTAINERS.map(container => (
                    <div key={container.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                        <div className={`p-2 rounded-lg ${
                           container.role === 'Reverse Proxy' ? 'bg-blue-100 text-blue-600' : 
                           container.role === 'Database' ? 'bg-yellow-100 text-yellow-600' :
                           container.role === 'Tunnel' ? 'bg-orange-100 text-orange-600' :
                           'bg-purple-100 text-purple-600'
                        }`}>
                           <Box className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-sm font-bold text-slate-900">{container.name}</div>
                           <div className="text-xs text-slate-500 mb-1">{container.role}</div>
                           <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {container.uptime}
                           </div>
                        </div>
                    </div>
                 ))}
             </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">{t.dash.recentActivity}</h3>
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
              <div className="absolute top-4 right-4 bg-slate-800 px-2 py-1 rounded text-white">{t.dash.hostLogs}</div>
              <div className="space-y-2 mt-6">
                 <p>systemd[1]: Started Docker Application Container Engine.</p>
                 <p>cloudflared[882]: Connection to edge established.</p>
                 <p>kernel: [ 12.442] IPv6: ADDRCONF(NETDEV_UP): eth0: link is not ready</p>
                 <p>sshd[1200]: Accepted publickey for root from 10.0.0.2 port 52334</p>
                 <p className="text-green-400">nginx-proxy-manager[443]: Reloading configuration...</p>
                 <p className="text-yellow-400">mariadb-system[3306]: 128 connections active.</p>
              </div>
           </div>
        </div>
        <SupportChat context="Admin Dashboard" />
      </Layout>
    );
  }

  // ... (Admin Service, Domain, and Clients view remain the same)
  // Re-injecting to ensure file validity
  
  if (view === 'admin-services') {
      return (
          <Layout>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.dash.planConfig}</h2>
              
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8">
                  <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                      <h3 className="font-bold text-slate-900">{t.dash.pricingPlans}</h3>
                      <button className="text-indigo-600 text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4"/> {t.dash.addPlan}</button>
                  </div>
                  <table className="w-full text-left text-sm">
                      <thead>
                          <tr className="text-slate-500 border-b border-slate-200">
                              <th className="px-6 py-3">{t.dash.planName}</th>
                              <th className="px-6 py-3">{t.dash.monthlyPrice}</th>
                              <th className="px-6 py-3">{t.dash.resources}</th>
                              <th className="px-6 py-3">{t.dash.dockerLimits}</th>
                              <th className="px-6 py-3">{t.dash.action}</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {HOSTING_PLANS.map(plan => (
                              <tr key={plan.id}>
                                  <td className="px-6 py-4 font-bold text-slate-800">{plan.name}</td>
                                  <td className="px-6 py-4 text-green-600 font-mono">${plan.price}.00</td>
                                  <td className="px-6 py-4 text-slate-500">{plan.cpu} / {plan.ram}</td>
                                  <td className="px-6 py-4 text-xs font-mono bg-slate-50">--cpus="{plan.cpu.charAt(0)}" --memory="{plan.ram}"</td>
                                  <td className="px-6 py-4">
                                      <button className="text-slate-400 hover:text-indigo-600"><Settings className="w-4 h-4" /></button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                 <h3 className="font-bold text-slate-900 mb-4">{t.dash.globalSettings}</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Default Registry</label>
                        <input type="text" value="docker.io" className="w-full border border-slate-200 rounded p-2 text-sm" readOnly />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">Network Bridge</label>
                        <input type="text" value="nexushost-bridge (172.18.0.0/16)" className="w-full border border-slate-200 rounded p-2 text-sm" readOnly />
                    </div>
                 </div>
              </div>
          </Layout>
      )
  }

  if (view === 'admin-domains') {
     return (
        <Layout>
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h2 className="text-2xl font-bold text-slate-900">{t.dash.domainManager}</h2>
                 <p className="text-slate-500">Zone: {cloudflareConfig.baseDomain || 'Not Configured'} (ID: {cloudflareConfig.zoneId})</p>
              </div>
              <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                 {t.dash.syncApi} <RotateCcw className="w-3 h-3" />
              </button>
           </div>

           {/* Add DNS Record Form */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-indigo-600" /> {t.dash.addDns}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Type */}
                  <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">{t.dash.type}</label>
                      <select 
                          value={dnsForm.type}
                          onChange={e => setDnsForm({...dnsForm, type: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
                      >
                          <option value="A">A</option>
                          <option value="CNAME">CNAME</option>
                          <option value="TXT">TXT</option>
                          <option value="MX">MX</option>
                      </select>
                  </div>
                  
                  {/* Name */}
                  <div className="md:col-span-3">
                      <label className="block text-xs font-medium text-slate-700 mb-1">{t.dash.name}</label>
                      <input 
                          type="text" 
                          placeholder="@ or subdomain"
                          value={dnsForm.name}
                          onChange={e => setDnsForm({...dnsForm, name: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-4">
                      <label className="block text-xs font-medium text-slate-700 mb-1">{t.dash.content}</label>
                      <input 
                          type="text" 
                          placeholder="192.0.2.1 or example.com"
                          value={dnsForm.content}
                          onChange={e => setDnsForm({...dnsForm, content: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                      />
                  </div>

                  {/* TTL */}
                  <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">{t.dash.ttl}</label>
                       <select 
                          value={dnsForm.ttl}
                          onChange={e => setDnsForm({...dnsForm, ttl: Number(e.target.value)})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50"
                      >
                          <option value={1}>Auto</option>
                          <option value={3600}>1 Hour</option>
                          <option value={86400}>1 Day</option>
                      </select>
                  </div>

                   {/* Button */}
                  <div className="md:col-span-1">
                      <button 
                          onClick={handleAddDnsRecord}
                          disabled={isAddingDns || !dnsForm.name || !dnsForm.content}
                          className="w-full bg-indigo-600 text-white rounded-lg py-2 flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
                      >
                          {isAddingDns ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                      </button>
                  </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                 <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                    <input 
                        type="checkbox" 
                        checked={dnsForm.proxied}
                        onChange={e => setDnsForm({...dnsForm, proxied: e.target.checked})}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                    />
                    {t.dash.proxyStatus} (Orange Cloud)
                 </label>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-3">{t.dash.type}</th>
                       <th className="px-6 py-3">{t.dash.name}</th>
                       <th className="px-6 py-3">{t.dash.content}</th>
                       <th className="px-6 py-3">
                          <div className="flex items-center gap-1">
                             {t.dash.proxyStatus}
                             <div className="group relative">
                                <HelpCircle className="w-3 h-3 text-slate-400 cursor-help" />
                                {/* Tooltip Content */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-slate-900 text-slate-200 text-xs rounded-lg p-3 hidden group-hover:block shadow-xl border border-slate-700 z-50">
                                  <p className="mb-2 font-semibold text-white border-b border-slate-700 pb-1">Cloudflare Proxy Modes</p>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                       <Cloud className="w-3 h-3 text-orange-500 fill-orange-500" />
                                       <span><span className="text-orange-500 font-bold">Proxied:</span> CDN & Security enabled. IP hidden.</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <Cloud className="w-3 h-3 text-slate-500" />
                                       <span><span className="text-slate-400 font-bold">DNS Only:</span> Direct connection. IP exposed.</span>
                                    </div>
                                  </div>
                                   {/* Arrow */}
                                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                </div>
                             </div>
                          </div>
                       </th>
                       <th className="px-6 py-3">{t.dash.ttl}</th>
                       <th className="px-6 py-3">{t.dash.action}</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {/* Newly Added Custom Records */}
                    {customDnsRecords.map(rec => (
                       <tr key={rec.id} className="bg-indigo-50/30">
                          <td className="px-6 py-4 font-mono font-bold text-slate-600">{rec.type}</td>
                          <td className="px-6 py-4 font-mono text-indigo-600">{rec.name}</td>
                          <td className="px-6 py-4 font-mono text-slate-500 text-xs">{rec.content}</td>
                          <td className="px-6 py-4">
                             {rec.proxied ? (
                                 <span className="flex items-center gap-1 text-orange-600 font-medium">
                                    <Cloud className="w-4 h-4 fill-orange-500" /> {t.dash.proxied}
                                 </span>
                             ) : (
                                 <span className="flex items-center gap-1 text-slate-500 font-medium">
                                    <Globe className="w-4 h-4" /> {t.dash.dnsOnly}
                                 </span>
                             )}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{rec.ttl === 1 ? 'Auto' : rec.ttl}</td>
                          <td className="px-6 py-4">
                             <button onClick={() => handleDeleteDnsRecord(rec.id)} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors" title="Delete Record">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </td>
                       </tr>
                    ))}

                    {/* Existing Service CNAMEs */}
                    {services.map((svc) => (
                       <tr key={svc.id}>
                          <td className="px-6 py-4 font-mono font-bold text-slate-600">CNAME</td>
                          <td className="px-6 py-4 font-mono text-indigo-600">{svc.domain.split('.')[0]}</td>
                          <td className="px-6 py-4 font-mono text-slate-500 text-xs">{svc.publicUrl}</td>
                          <td className="px-6 py-4">
                             <span className="flex items-center gap-1 text-orange-600 font-medium">
                                <Cloud className="w-4 h-4 fill-orange-500" /> {t.dash.proxied}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500">Auto</td>
                          <td className="px-6 py-4 text-slate-400 text-xs italic">
                             System Managed
                          </td>
                       </tr>
                    ))}
                    
                    {/* Mock Base Records */}
                    <tr>
                       <td className="px-6 py-4 font-mono font-bold text-slate-600">A</td>
                       <td className="px-6 py-4 font-mono text-indigo-600">@</td>
                       <td className="px-6 py-4 font-mono text-slate-500 text-xs">1.2.3.4</td>
                       <td className="px-6 py-4"><span className="flex items-center gap-1 text-orange-600 font-medium"><Cloud className="w-4 h-4 fill-orange-500" /> {t.dash.proxied}</span></td>
                       <td className="px-6 py-4 text-slate-500">Auto</td>
                       <td className="px-6 py-4 text-slate-400 text-xs italic">
                          System Managed
                       </td>
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
           <h2 className="text-2xl font-bold text-slate-900 mb-8">{t.dash.clientMgmt}</h2>
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                       <th className="px-6 py-3">{t.dash.user}</th>
                       <th className="px-6 py-3">{t.dash.email}</th>
                       <th className="px-6 py-3">{t.dash.status}</th>
                       <th className="px-6 py-3">{t.dash.services}</th>
                       <th className="px-6 py-3">{t.dash.joined}</th>
                       <th className="px-6 py-3">{t.dash.action}</th>
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
