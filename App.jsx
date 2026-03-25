import { useState, useEffect, useRef } from "react";
import { Shield, Server, Zap, Wifi, Monitor, Phone, Mail, MapPin, ChevronRight, ChevronDown, Menu, X, MessageCircle, Clock, Users, Award, CheckCircle, ArrowRight, Building, Heart, GraduationCap, Factory, FileText, ExternalLink, Star, Battery, Router as RouterIcon, HardDrive, Lock, Eye, Settings, Headphones, Globe, Download, Send } from "lucide-react";

// ============ DATA ============
const SERVICES = [
  { id: "infra", icon: <Server size={28}/>, title: "IT Infrastructure", desc: "Server & Storage, Network Design, Data Center Setup", details: ["Server & Storage (HCI, Virtualization)", "Network Design (LAN, WAN, Fiber, VLAN)", "Data Center Setup & Migration", "Cloud Integration"] },
  { id: "ups", icon: <Zap size={28}/>, title: "UPS & Power Solution", desc: "Supply, Installation, Maintenance & Monitoring UPS", details: ["Supply UPS (APC, Eaton, dll)", "Installation & Commissioning", "Battery System & Backup Planning", "Maintenance & Monitoring UPS"] },
  { id: "security", icon: <Shield size={28}/>, title: "Networking & Security", desc: "Firewall, VPN, CCTV & Access Control", details: ["Firewall & VPN Setup", "CCTV & Monitoring System", "Access Control System", "Network Security Audit"] },
  { id: "managed", icon: <Headphones size={28}/>, title: "Managed Service", desc: "IT Support, Remote Monitoring, SLA Service", details: ["IT Support & Maintenance", "Remote Monitoring 24/7", "SLA-based Service", "Helpdesk & Ticketing"] }
];

const PRODUCTS = {
  "UPS System": [
    { name: "UPS 1 Phase", brand: "APC / Eaton", spec: "1-10 kVA, Online Double Conversion", icon: <Zap size={22}/> },
    { name: "UPS 3 Phase", brand: "APC / Eaton / Huawei", spec: "10-500 kVA, Enterprise Grade", icon: <Zap size={22}/> },
    { name: "Modular UPS", brand: "Huawei / Vertiv", spec: "Scalable, Hot-swappable", icon: <Zap size={22}/> },
  ],
  "Battery & Power": [
    { name: "Battery Cabinet", brand: "Various", spec: "VRLA / Lithium-ion", icon: <Battery size={22}/> },
    { name: "Inverter System", brand: "Various", spec: "Pure Sine Wave", icon: <Zap size={22}/> },
    { name: "Solar Hybrid", brand: "Various", spec: "Hybrid Inverter + Panel", icon: <Zap size={22}/> },
  ],
  "IT Equipment": [
    { name: "Server", brand: "Dell / HPE / Lenovo", spec: "Rack & Tower Server", icon: <Server size={22}/> },
    { name: "Switch & Router", brand: "Cisco / MikroTik / Huawei", spec: "Managed & Unmanaged", icon: <RouterIcon size={22}/> },
    { name: "Storage", brand: "Dell / Synology / QNAP", spec: "NAS / SAN / HCI", icon: <HardDrive size={22}/> },
  ]
};

const PROJECTS = [
  { name: "RS Awal Bros", scope: "UPS 3 Phase + Network Infrastructure", category: "Rumah Sakit", value: "Enterprise", color: "#E8C547" },
  { name: "Universitas Hasanuddin", scope: "Data Center + CCTV Kampus", category: "Kampus", value: "Enterprise", color: "#2BBBAD" },
  { name: "Pesantren Modern Al-Ikhlas", scope: "Full IT Infrastructure + UPS", category: "Pesantren", value: "Medium", color: "#FF6B6B" },
  { name: "RS Ibnu Sina", scope: "UPS Ruang Operasi + Server Rekam Medis", category: "Rumah Sakit", value: "Enterprise", color: "#E8C547" },
  { name: "Kantor BUMN Regional", scope: "Firewall + VPN + Network Redesign", category: "Perkantoran", value: "Large", color: "#6C5CE7" },
  { name: "Pabrik Makanan Sulsel", scope: "CCTV + Access Control + UPS", category: "Industri", value: "Medium", color: "#00B894" },
];

const SOLUTIONS = [
  { icon: <Heart size={32}/>, title: "Rumah Sakit", desc: "UPS ruang operasi, backup server rekam medis, network redundancy, CCTV monitoring", color: "#E8C547" },
  { icon: <GraduationCap size={32}/>, title: "Kampus", desc: "Data center, jaringan kampus terpadu, e-learning infrastructure, CCTV keamanan", color: "#2BBBAD" },
  { icon: <Building size={32}/>, title: "Perkantoran", desc: "Network design, firewall & VPN, UPS system, managed IT service", color: "#6C5CE7" },
  { icon: <Factory size={32}/>, title: "Industri", desc: "Power backup kontinyu, SCADA network, CCTV area produksi, access control", color: "#00B894" },
];

const BLOGS = [
  { title: "Cara Memilih UPS yang Tepat untuk Bisnis Anda", date: "20 Mar 2026", tag: "UPS", excerpt: "Panduan lengkap memilih UPS berdasarkan kebutuhan daya, jenis beban, dan budget perusahaan Anda." },
  { title: "Perbedaan UPS Online vs Offline vs Line Interactive", date: "15 Mar 2026", tag: "UPS", excerpt: "Memahami perbedaan fundamental ketiga jenis UPS dan kapan harus menggunakan masing-masing." },
  { title: "Tips Desain Jaringan Kantor Modern", date: "10 Mar 2026", tag: "Network", excerpt: "Best practice merancang infrastruktur jaringan yang scalable, secure, dan reliable." },
  { title: "Studi Kasus: IT Infrastructure RS Awal Bros", date: "5 Mar 2026", tag: "Case Study", excerpt: "Bagaimana kami membangun infrastruktur IT terpadu untuk rumah sakit dengan zero downtime." },
];

const STATS = [
  { num: "150+", label: "Project Selesai" },
  { num: "50+", label: "Client Aktif" },
  { num: "10+", label: "Tahun Pengalaman" },
  { num: "24/7", label: "Support" },
];

// ============ COMPONENTS ============
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-20 px-4 md:px-8 ${className}`}>{children}</section>
);

const SectionTitle = ({ sub, title, light = false }) => (
  <div className="text-center mb-16">
    <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: "rgba(43,187,173,0.1)", color: "#2BBBAD" }}>{sub}</span>
    <h2 className={`text-3xl md:text-4xl font-bold ${light ? "text-white" : "text-gray-900"}`}>{title}</h2>
    <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #2BBBAD, #E8C547)" }}/>
  </div>
);

// ============ MAIN APP ============
export default function ProtexSolutions() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [prodCat, setProdCat] = useState("UPS System");
  const [formData, setFormData] = useState({ nama: "", perusahaan: "", email: "", kebutuhan: "", budget: "" });
  const [formSent, setFormSent] = useState(false);

  const NAV = ["home","about","services","products","solutions","projects","blog","contact"];
  const NAV_LABELS = { home: "Home", about: "About Us", services: "Services", products: "Products", solutions: "Solutions", projects: "Projects", blog: "Blog", contact: "Contact" };

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const sections = NAV.map(id => document.getElementById(id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 120) {
          setActiveSection(NAV[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navBg = scrollY > 50;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", background: "#FAFBFC" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Serif+Display&display=swap');
        :root { --teal: #2BBBAD; --teal-dark: #1A8A7F; --gold: #E8C547; --night: #071A1F; --night-mid: #0C2E2A; }
        * { scroll-behavior: smooth; }
        .grad-text { background: linear-gradient(135deg, #2BBBAD, #1A8A7F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .card-hover { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(43,187,173,0.15); }
        .glow-btn { position: relative; overflow: hidden; transition: all 0.3s; }
        .glow-btn::before { content:''; position:absolute; inset:-2px; background:linear-gradient(135deg,#2BBBAD,#E8C547,#2BBBAD); border-radius:inherit; z-index:-1; opacity:0; transition:opacity 0.3s; }
        .glow-btn:hover::before { opacity:1; }
        .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(43,187,173,0.3); }
        .fade-up { opacity:0; transform:translateY(30px); animation:fadeUp 0.8s ease forwards; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .hero-grid { background-image: radial-gradient(rgba(43,187,173,0.07) 1px, transparent 1px); background-size: 32px 32px; }
        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .pulse-ring { animation: pulseRing 2s ease infinite; }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(43,187,173,0.4)} 70%{box-shadow:0 0 0 15px rgba(43,187,173,0)} 100%{box-shadow:0 0 0 0 rgba(43,187,173,0)} }
        .marquee { display:flex; animation:marquee 30s linear infinite; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .line-anim { background: linear-gradient(90deg, transparent, rgba(43,187,173,0.3), transparent); background-size: 200% 100%; animation: lineMove 3s linear infinite; }
        @keyframes lineMove { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .diagonal-lines { background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(43,187,173,0.03) 35px, rgba(43,187,173,0.03) 36px); }
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg ? "shadow-lg" : ""}`} style={{ background: navBg ? "rgba(7,26,31,0.97)" : "transparent", backdropFilter: navBg ? "blur(16px)" : "none" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg" style={{ background: "linear-gradient(135deg, #2BBBAD, #1A8A7F)", color: "#fff" }}>P</div>
            <div>
              <div className="font-bold text-sm text-white leading-none">PROTEX</div>
              <div className="text-xs font-medium leading-none" style={{ color: "#2BBBAD" }}>SOLUTIONS</div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)} className="px-3 py-2 rounded-lg text-sm font-medium transition-all" style={{ color: activeSection === n ? "#2BBBAD" : "rgba(255,255,255,0.7)", background: activeSection === n ? "rgba(43,187,173,0.1)" : "transparent" }}>
                {NAV_LABELS[n]}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="ml-3 px-5 py-2 rounded-lg text-sm font-semibold text-white glow-btn" style={{ background: "#2BBBAD" }}>Konsultasi Gratis</button>
          </div>
          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 px-4 pb-4" style={{ background: "rgba(7,26,31,0.98)" }}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n)} className="block w-full text-left px-4 py-3 text-sm font-medium rounded-lg" style={{ color: activeSection === n ? "#2BBBAD" : "rgba(255,255,255,0.7)" }}>
                {NAV_LABELS[n]}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="w-full mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-white" style={{ background: "#2BBBAD" }}>Konsultasi Gratis</button>
          </div>
        )}
      </nav>

      {/* ===== HERO / HOME ===== */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(160deg, #071A1F 0%, #0C2E2A 40%, #134D44 70%, #0C2E2A 100%)" }}>
        <div className="absolute inset-0 hero-grid opacity-60"/>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{ background: "radial-gradient(circle at 70% 30%, #2BBBAD, transparent 60%)" }}/>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-10" style={{ background: "radial-gradient(circle at 30% 80%, #E8C547, transparent 50%)" }}/>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full float" style={{ animationDelay: "0s" }}/>
        <div className="absolute bottom-32 right-40 w-40 h-40 border border-white/5 rounded-2xl float" style={{ animationDelay: "2s", transform: "rotate(45deg)" }}/>
        <div className="absolute top-40 left-20 w-20 h-20 rounded-full float" style={{ animationDelay: "4s", background: "rgba(43,187,173,0.05)" }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 mb-8" style={{ background: "rgba(43,187,173,0.08)" }}>
                <div className="w-2 h-2 rounded-full pulse-ring" style={{ background: "#2BBBAD" }}/>
                <span className="text-xs font-medium" style={{ color: "#2BBBAD" }}>Reliable IT & Power Solution Partner</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Solusi <span style={{ color: "#2BBBAD" }}>Infrastruktur IT</span> & <span style={{ color: "#E8C547" }}>UPS</span> Terpercaya
              </h1>
              <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
                Powering Your Business Continuity — dari server, networking, hingga power backup untuk skala kecil sampai enterprise.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <button onClick={() => scrollTo("contact")} className="px-8 py-4 rounded-xl text-white font-bold text-sm glow-btn flex items-center gap-2" style={{ background: "#2BBBAD" }}>
                  Konsultasi Gratis <ArrowRight size={16}/>
                </button>
                <button onClick={() => scrollTo("contact")} className="px-8 py-4 rounded-xl font-bold text-sm border-2 flex items-center gap-2 transition-all hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                  Minta Penawaran
                </button>
              </div>
              {/* Highlights */}
              <div className="flex flex-wrap gap-6">
                {[{ icon: <Users size={16}/>, text: "Tim Berpengalaman" }, { icon: <Clock size={16}/>, text: "Support 24/7" }, { icon: <Award size={16}/>, text: "Project Kecil – Enterprise" }].map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(43,187,173,0.15)", color: "#2BBBAD" }}>{h.icon}</div>
                    <span className="text-xs font-medium text-white/60">{h.text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right side: service cards preview */}
            <div className="hidden lg:block relative">
              <div className="relative" style={{ perspective: "1000px" }}>
                {SERVICES.slice(0, 3).map((s, i) => (
                  <div key={i} className="card-hover rounded-2xl p-6 mb-4 border border-white/10 flex items-center gap-4 cursor-pointer" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", animationDelay: `${i * 0.2}s` }} onClick={() => scrollTo("services")}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(43,187,173,0.12)", color: "#2BBBAD" }}>{s.icon}</div>
                    <div>
                      <div className="font-bold text-white text-sm">{s.title}</div>
                      <div className="text-xs text-white/40 mt-1">{s.desc}</div>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-white/20"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="text-center py-6 rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
                <div className="text-3xl font-black" style={{ color: "#2BBBAD" }}>{s.num}</div>
                <div className="text-xs text-white/40 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <Section id="about" className="diagonal-lines">
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Tentang Kami" title="CV. Protex Solutions"/>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong className="text-gray-900">CV. Protex Solutions</strong> adalah perusahaan penyedia solusi IT Infrastructure dan Power System yang berpengalaman melayani berbagai sektor industri di Indonesia. Kami berkomitmen memberikan layanan terbaik dengan standar kualitas tinggi.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl border border-gray-100" style={{ background: "rgba(43,187,173,0.03)" }}>
                  <div className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Eye size={16} style={{ color: "#2BBBAD" }}/> Visi</div>
                  <p className="text-sm text-gray-500 leading-relaxed">Menjadi mitra terpercaya dalam solusi IT dan power system di Indonesia.</p>
                </div>
                <div className="p-5 rounded-2xl border border-gray-100" style={{ background: "rgba(232,197,71,0.03)" }}>
                  <div className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Star size={16} style={{ color: "#E8C547" }}/> Misi</div>
                  <p className="text-sm text-gray-500 leading-relaxed">Menyediakan produk berkualitas dengan layanan profesional dan harga kompetitif.</p>
                </div>
              </div>
              <div className="space-y-3">
                {["Tim engineer bersertifikat", "Legalitas lengkap (CV terdaftar)", "Pengalaman di berbagai sektor industri", "Garansi produk & after-sales support"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} style={{ color: "#2BBBAD" }}/>
                    <span className="text-sm text-gray-600 font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden p-8" style={{ background: "linear-gradient(135deg, #071A1F, #134D44)" }}>
                <div className="text-center mb-6">
                  <div className="inline-flex w-20 h-20 rounded-2xl items-center justify-center text-3xl font-black text-white mb-4" style={{ background: "linear-gradient(135deg, #2BBBAD, #1A8A7F)" }}>P</div>
                  <div className="text-white font-bold text-xl">PROTEX SOLUTIONS</div>
                  <div className="text-xs mt-1" style={{ color: "#2BBBAD" }}>Reliable IT & Power Solution Partner</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map((s, i) => (
                    <div key={i} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="text-2xl font-black" style={{ color: "#2BBBAD" }}>{s.num}</div>
                      <div className="text-xs text-white/50 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-dashed opacity-20" style={{ borderColor: "#2BBBAD" }}/>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl opacity-20" style={{ background: "#E8C547" }}/>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 px-4 md:px-8" style={{ background: "linear-gradient(160deg, #071A1F, #0C2E2A, #071A1F)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Layanan Kami" title="Services" light/>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-hover rounded-2xl p-8 border border-white/10 group cursor-pointer" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style={{ background: "rgba(43,187,173,0.12)", color: "#2BBBAD" }}>{s.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                    <p className="text-sm text-white/40 mb-4">{s.desc}</p>
                    <div className="space-y-2">
                      {s.details.map((d, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#2BBBAD" }}/>
                          <span className="text-xs text-white/50">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <Section id="products">
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Produk" title="Products"/>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.keys(PRODUCTS).map(cat => (
              <button key={cat} onClick={() => setProdCat(cat)} className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ background: prodCat === cat ? "#2BBBAD" : "rgba(43,187,173,0.08)", color: prodCat === cat ? "#fff" : "#2BBBAD" }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCTS[prodCat]?.map((p, i) => (
              <div key={i} className="card-hover rounded-2xl p-6 border border-gray-100 bg-white group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: "rgba(43,187,173,0.1)", color: "#2BBBAD" }}>{p.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{p.name}</h4>
                <div className="text-xs font-medium mb-2" style={{ color: "#2BBBAD" }}>{p.brand}</div>
                <p className="text-sm text-gray-400 mb-5">{p.spec}</p>
                <button onClick={() => scrollTo("contact")} className="w-full py-3 rounded-xl text-sm font-semibold border-2 transition-all hover:text-white" style={{ borderColor: "#2BBBAD", color: "#2BBBAD" }} onMouseEnter={e => { e.target.style.background = "#2BBBAD"; e.target.style.color = "#fff"; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#2BBBAD"; }}>
                  Minta Harga
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== SOLUTIONS ===== */}
      <section id="solutions" className="py-20 px-4 md:px-8" style={{ background: "linear-gradient(160deg, #071A1F, #0C2E2A)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Solusi per Industri" title="Solutions" light/>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="card-hover rounded-2xl p-6 border border-white/10 text-center group cursor-pointer" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all group-hover:scale-110" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                <h4 className="font-bold text-white mb-3">{s.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
                <button onClick={() => scrollTo("contact")} className="mt-5 text-xs font-semibold flex items-center gap-1 mx-auto transition-all" style={{ color: s.color }}>
                  Pelajari <ChevronRight size={14}/>
                </button>
              </div>
            ))}
          </div>
          {/* UPS Solution highlight */}
          <div className="mt-16 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden" style={{ background: "rgba(43,187,173,0.05)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ background: "radial-gradient(circle, #E8C547, transparent 60%)" }}/>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(232,197,71,0.15)", color: "#E8C547" }}>Highlight</span>
                <h3 className="text-2xl font-bold text-white mb-4">Solusi UPS untuk Bisnis Tanpa Downtime</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6">UPS yang tepat menjamin kelangsungan operasional bisnis Anda. Kami menyediakan solusi lengkap mulai dari konsultasi, supply, instalasi, hingga maintenance.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["UPS Online", "Line Interactive", "Rumah Sakit", "Data Center"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: "#2BBBAD" }}/>
                      <span className="text-xs text-white/60">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button onClick={() => scrollTo("contact")} className="px-8 py-4 rounded-xl text-white font-bold text-sm glow-btn" style={{ background: "#2BBBAD" }}>
                  Hitung Kebutuhan UPS Anda
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <Section id="projects">
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Portfolio" title="Projects"/>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={i} className="card-hover rounded-2xl overflow-hidden border border-gray-100 bg-white group">
                <div className="h-3 w-full" style={{ background: p.color }}/>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: `${p.color}15`, color: p.color }}>{p.category}</span>
                    <span className="text-xs text-gray-400">{p.value}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{p.name}</h4>
                  <p className="text-sm text-gray-400">{p.scope}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== BLOG ===== */}
      <section id="blog" className="py-20 px-4 md:px-8" style={{ background: "#F4F6F8" }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Blog & Insight" title="Artikel Terbaru"/>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOGS.map((b, i) => (
              <div key={i} className="card-hover rounded-2xl bg-white border border-gray-100 overflow-hidden group cursor-pointer">
                <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #2BBBAD, #E8C547)" }}/>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(43,187,173,0.1)", color: "#2BBBAD" }}>{b.tag}</span>
                    <span className="text-xs text-gray-400">{b.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-2 leading-snug group-hover:text-teal-600 transition-colors">{b.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{b.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: "#2BBBAD" }}>
                    Baca Selengkapnya <ChevronRight size={12}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-20 px-4 md:px-8" style={{ background: "linear-gradient(160deg, #071A1F, #0C2E2A, #071A1F)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle sub="Hubungi Kami" title="Contact" light/>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Mari Diskusikan Kebutuhan IT Anda</h3>
              <p className="text-white/50 mb-8 leading-relaxed">Tim kami siap membantu Anda menemukan solusi terbaik. Konsultasi gratis tanpa komitmen.</p>
              <div className="space-y-5 mb-8">
                {[
                  { icon: <MapPin size={20}/>, label: "Alamat", value: "Makassar, Sulawesi Selatan, Indonesia" },
                  { icon: <Phone size={20}/>, label: "WhatsApp", value: "+62 812-XXXX-XXXX" },
                  { icon: <Mail size={20}/>, label: "Email", value: "info@protexsolutions.id" },
                  { icon: <Clock size={20}/>, label: "Jam Kerja", value: "Senin – Jumat, 08:00 – 17:00 WITA" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(43,187,173,0.12)", color: "#2BBBAD" }}>{c.icon}</div>
                    <div>
                      <div className="text-xs text-white/40 font-medium">{c.label}</div>
                      <div className="text-sm text-white/80 font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2" style={{ background: "rgba(43,187,173,0.12)", color: "#2BBBAD" }}>
                  <Download size={16}/> Company Profile
                </button>
                <button className="px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2" style={{ background: "rgba(43,187,173,0.12)", color: "#2BBBAD" }}>
                  <Globe size={16}/> English
                </button>
              </div>
            </div>
            {/* Form */}
            <div className="rounded-3xl p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
              {formSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(43,187,173,0.15)" }}>
                    <CheckCircle size={32} style={{ color: "#2BBBAD" }}/>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Terima Kasih!</h4>
                  <p className="text-sm text-white/50">Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.</p>
                </div>
              ) : (
                <>
                  <h4 className="font-bold text-white mb-6">Request Quotation</h4>
                  <div className="space-y-4">
                    {[
                      { key: "nama", label: "Nama Lengkap", ph: "Nama Anda", type: "text" },
                      { key: "perusahaan", label: "Perusahaan", ph: "Nama perusahaan", type: "text" },
                      { key: "email", label: "Email", ph: "email@perusahaan.com", type: "email" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-xs text-white/50 font-medium mb-1 block">{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={formData[f.key]} onChange={e => setFormData({...formData, [f.key]: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all focus:ring-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", focusRing: "#2BBBAD" }}/>
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-white/50 font-medium mb-1 block">Kebutuhan</label>
                      <textarea rows={3} placeholder="Jelaskan kebutuhan Anda..." value={formData.kebutuhan} onChange={e => setFormData({...formData, kebutuhan: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none resize-none transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}/>
                    </div>
                    <div>
                      <label className="text-xs text-white/50 font-medium mb-1 block">Budget (Opsional)</label>
                      <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <option value="" style={{ color: "#333" }}>Pilih range budget</option>
                        <option value="<50jt" style={{ color: "#333" }}>{"< Rp 50 Juta"}</option>
                        <option value="50-100jt" style={{ color: "#333" }}>Rp 50 – 100 Juta</option>
                        <option value="100-500jt" style={{ color: "#333" }}>Rp 100 – 500 Juta</option>
                        <option value=">500jt" style={{ color: "#333" }}>{"> Rp 500 Juta"}</option>
                      </select>
                    </div>
                    <button onClick={() => setFormSent(true)} className="w-full py-4 rounded-xl text-white font-bold text-sm glow-btn flex items-center justify-center gap-2" style={{ background: "#2BBBAD" }}>
                      <Send size={16}/> Kirim Pesan
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-4 md:px-8 border-t border-white/5" style={{ background: "#050F13" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg" style={{ background: "linear-gradient(135deg, #2BBBAD, #1A8A7F)", color: "#fff" }}>P</div>
                <div>
                  <div className="font-bold text-sm text-white leading-none">PROTEX SOLUTIONS</div>
                  <div className="text-xs font-medium leading-none" style={{ color: "#2BBBAD" }}>Reliable IT & Power Solution Partner</div>
                </div>
              </div>
              <p className="text-xs text-white/30 max-w-sm leading-relaxed">Solusi IT Infrastructure & UPS terpercaya untuk bisnis Anda. Dari server, networking, hingga power backup.</p>
            </div>
            <div>
              <div className="font-bold text-white text-sm mb-3">Layanan</div>
              {["IT Infrastructure", "UPS & Power", "Networking & Security", "Managed Service"].map((l, i) => (
                <div key={i} className="text-xs text-white/30 mb-2 cursor-pointer hover:text-white/60 transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <div className="font-bold text-white text-sm mb-3">Perusahaan</div>
              {["About Us", "Projects", "Blog", "Contact"].map((l, i) => (
                <div key={i} className="text-xs text-white/30 mb-2 cursor-pointer hover:text-white/60 transition-colors" onClick={() => scrollTo(l.toLowerCase().replace(" ", ""))}>{l}</div>
              ))}
            </div>
          </div>
          <div className="h-px w-full mb-6" style={{ background: "rgba(255,255,255,0.05)" }}/>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/20">© 2026 CV. Protex Solutions. All rights reserved.</div>
            <div className="text-xs text-white/20">Makassar, Sulawesi Selatan, Indonesia</div>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOATING BUTTON ===== */}
      <a href="https://wa.me/62812XXXXXXXX" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 pulse-ring" style={{ background: "#25D366" }}>
        <MessageCircle size={26} color="#fff" fill="#fff"/>
      </a>
    </div>
  );
}
