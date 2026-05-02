import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  Zap,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Phone,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  Compass,
  Timer,
  Heart,
  WifiOff,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Play,
  Radio,
  Tv,
  Activity
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const DonationSection = ({ onOpenDonate }: { onOpenDonate: () => void }) => {
  const tiers = [
    { name: "Supporter", amount: "₦5,000", description: "Help provide materials for one student delegate.", icon: Heart, color: "text-brand-red" },
    { name: "Patron", amount: "₦20,000", description: "Sponsor a full delegate pass including meals.", icon: ShieldCheck, color: "text-brand-purple" },
    { name: "Visionary", amount: "Custom", description: "Contribute to the overall impact of YLC 2026.", icon: Compass, color: "text-white" }
  ];

  return (
    <section id="donate" className="scroll-mt-20 py-32 bg-zinc-950/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-brand-red font-black uppercase tracking-[0.4em] text-xs">Giving Back</span>
            <h2 className="text-5xl md:text-7xl font-display font-black mt-4 text-white uppercase tracking-tighter leading-tight">
              invest in <br />
              <span className="text-brand-red">Good Success</span>
            </h2>
            <p className="text-xl text-white/60 mt-8 max-w-xl leading-relaxed">
              Your contribution directly empowers the next generation of African leaders. Join us in building a legacy of excellence and moral leadership.
            </p>

            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-white font-bold">100% Direct Impact</p>
                  <p className="text-white/40 text-sm italic">All donations fund delegate scholarships and training materials.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-1 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                onClick={onOpenDonate}
                className="bg-black border border-white/10 p-8 rounded-3xl flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${tier.color} group-hover:scale-110 transition-transform`}>
                    <tier.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-black uppercase tracking-tight">{tier.name}</h4>
                    <p className="text-white/40 text-sm max-w-[200px] mt-1">{tier.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-display font-black ${tier.color}`}>{tier.amount}</p>
                  <button className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Select Tier</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DonationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setConfirmed(false), 500);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (confirmed && isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ea232a', '#a855f7', '#ffffff']
      });
    }
  }, [confirmed, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-zinc-950/95 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-zinc-900/40 border border-white/10 rounded-[40px] shadow-[0_0_80px_rgba(234,35,42,0.15)] backdrop-blur-md"
          >
            {/* Top accent line */}
            <div className="h-2 w-full brand-gradient" />

            <div className="p-8 md:p-12 text-center">
              <button
                onClick={handleClose}
                className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-10"
              >
                <X size={28} />
              </button>

              {!confirmed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 bg-brand-red/10 rounded-3xl flex items-center justify-center text-brand-red brand-glow shadow-[0_0_40px_rgba(234,35,42,0.2)]">
                      <Heart size={48} className="animate-pulse" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-brand-purple rounded-xl p-2 shadow-lg">
                      <ShieldCheck size={20} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
                    FUEL THE <br />
                    <span className="text-brand-red">LEGACY</span>
                  </h3>
                  <p className="text-white/50 mb-12 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                    Your seed supports leadership training, materials, and snacks for delegates from across the region.
                  </p>

                  <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-8 text-left relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                      <Compass size={180} />
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mb-3">Unique Identity</p>
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-4xl md:text-5xl font-display font-black text-white tracking-[0.1em] leading-none">2253108933</p>
                        <button
                          onClick={() => handleCopy("1234567890")}
                          className={`p-4 rounded-2xl transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${copied ? 'bg-brand-red text-white' : 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white'
                            }`}
                        >
                          {copied ? <CheckCircle size={16} /> : <Compass size={16} />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                      <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Banking Institution</p>
                        <p className="text-white font-black text-lg tracking-tight">UNITED BANK FOR AFRICA (UBA)</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Official Beneficiary</p>
                        <p className="text-white font-black text-[15px] tracking-tight">QUINTESSENTIAL LEAD</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-8">
                    <div className="flex items-center gap-3 px-6 py-3 bg-brand-red/10 border border-brand-red/20 rounded-2xl">
                      <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                      <p className="text-[10px] text-brand-red font-black uppercase tracking-widest">Reference: YLC2026-Impact</p>
                    </div>

                    <button
                      onClick={() => setConfirmed(true)}
                      className="w-full bg-white text-black py-7 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl hover:bg-brand-red hover:text-white"
                    >
                      Confirm Secure Transfer
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20"
                >
                  <div className="relative inline-block mb-12">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center text-brand-red mb-4"
                    >
                      <CheckCircle size={64} />
                    </motion.div>
                    <div className="absolute inset-0 border-4 border-brand-red/30 rounded-full animate-ping pointer-events-none" />
                  </div>

                  <h3 className="text-5xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none">
                    SEEDS <br />
                    <span className="text-brand-red">PLANTED</span>
                  </h3>
                  <p className="text-white/60 mb-12 text-lg font-medium leading-relaxed max-w-sm mx-auto">
                    Thank you for your generosity. Your contribution is more than a donation—it's a vote of confidence in the future.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-12 py-5 rounded-full border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
                  >
                    Return to Dashboard
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SponsorshipModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    interest: 'plat',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSent(false);
      setError('');
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company.trim()) {
      setError('Please provide your organization name');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setError('A valid professional email is required');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSent(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isSent && isOpen) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ea232a', '#a855f7', '#ffffff']
      });
    }
  }, [isSent, isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-[40px] shadow-[0_0_80px_rgba(234,35,42,0.15)] no-scrollbar"
          >
            <div className="h-2 w-full brand-gradient" />

            <button
              onClick={handleClose}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              {!isSent ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                        <ShieldCheck size={24} />
                      </div>
                      <span className="text-brand-red font-black uppercase tracking-[0.4em] text-[10px]">Strategic Alliance</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                      BECOME A <br />
                      <span className="opacity-30">PARTNER</span>
                    </h3>
                    <p className="text-white/40 mt-4 text-sm font-medium leading-relaxed max-w-sm">
                      Align your brand with the next generation of Nigerian leaders and innovators.
                    </p>
                  </motion.div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-2">Organization Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Zenith Bank PLC"
                        className={`w-full bg-white/[0.03] border ${error.includes('organization') ? 'border-brand-red' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-red focus:bg-white/[0.05] transition-all`}
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (error.includes('organization')) setError('');
                        }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-2">Contact Email</label>
                      <input
                        type="email"
                        placeholder="partnerships@company.com"
                        className={`w-full bg-white/[0.03] border ${error.includes('email') ? 'border-brand-red' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-red focus:bg-white/[0.05] transition-all`}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (error.includes('email')) setError('');
                        }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-2">Partnership Tier</label>
                      <div className="relative">
                        <select
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-red focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        >
                          <option value="plat" className="bg-zinc-900">Platinum Sponsorship</option>
                          <option value="gold" className="bg-zinc-900">Gold Sponsorship</option>
                          <option value="silver" className="bg-zinc-900">Silver Sponsorship</option>
                          <option value="exhibitor" className="bg-zinc-900">Exhibition Partner</option>
                          <option value="other" className="bg-zinc-900">Custom Partnership</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                          <Compass size={16} />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-widest pl-2">Expression of Interest</label>
                      <textarea
                        placeholder="Briefly describe your goals for this partnership..."
                        rows={4}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-red focus:bg-white/[0.05] transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </motion.div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-4 flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
                            <X size={12} className="text-white" />
                          </div>
                          <p className="text-brand-red text-[10px] font-black uppercase tracking-widest leading-none">{error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={isSubmitting}
                      className="w-full brand-gradient py-6 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:shadow-brand-red/20 transition-all border border-white/10 disabled:opacity-50 flex items-center justify-center min-h-[72px]"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'SEND PARTNERSHIP REQUEST'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="relative inline-block mb-10">
                    <div className="w-24 h-24 bg-brand-red/10 rounded-3xl flex items-center justify-center text-brand-red brand-glow">
                      <CheckCircle size={48} className="animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
                    REQUEST <br />
                    <span className="text-brand-red">RECEIVED</span>
                  </h3>
                  <p className="text-white/50 mb-10 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                    Our strategic partnership team will review your application and reach out within 48 hours with a full proposal.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full py-5 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-colors"
                  >
                    RETURN TO EXPLORATION
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const OfflineNotice = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-24 left-0 right-0 z-[60] flex justify-center px-6 pointer-events-none"
        >
          <div className="bg-zinc-900 border border-brand-red px-6 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 pointer-events-auto">
            <WifiOff className="text-brand-red animate-pulse" size={20} />
            <div>
              <p className="text-white text-xs font-black tracking-widest uppercase">Viewing Offline Mode</p>
              <p className="text-white/50 text-[10px] font-bold tracking-wider uppercase">Content is loaded from cache</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenSponsor }: { onOpenSponsor: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Donate', href: '#donate' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[90] pointer-events-auto transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            {/* If logo.png exists, show it, otherwise fallback to the stylized Y */}
            <div className="absolute inset-0 bg-brand-white rounded-xl rotate-12 opacity-80 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777680125/logo_xinbh0.png"
                alt="YLC"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = document.createElement('span');
                    fallback.className = "text-white font-black text-2xl drop-shadow-md";
                    fallback.innerText = "Y";
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tighter leading-none">YLC <span className="text-brand-red">6.0</span></span>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/50 group-hover:text-brand-red transition-colors">Good Success</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-brand-red transition-colors tracking-wide uppercase"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onOpenSponsor}
            type="button"
            className="text-sm font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            PARTNER
          </button>
          <a
            href="#register"
            className="brand-gradient hover:opacity-90 text-white px-6 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105"
          >
            REGISTER NOW
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden text-white p-3 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-bold hover:text-brand-red transition-colors text-white uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => { setIsOpen(false); onOpenSponsor(); }}
                className="text-2xl font-display font-bold hover:text-brand-red transition-colors text-white uppercase tracking-tighter"
              >
                PARTNER
              </button>
              <a
                href="#register"
                onClick={() => setIsOpen(false)}
                className="brand-gradient text-white px-6 py-4 rounded-2xl font-black text-center transition-all shadow-lg text-lg"
              >
                REGISTER NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CountdownItem = ({ label, value }: { label: string; value: number }) => {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        {/* Glowing Background Pulse */}
        <div className="absolute inset-0 bg-brand-red/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 -z-10" />
        <div className="absolute inset-0 bg-brand-red/5 blur-lg rounded-full animate-pulse -z-10" />

        <div className="flex space-x-1">
          {displayValue.split('').map((digit, idx) => (
            <div key={idx} className="relative w-8 h-12 md:w-12 md:h-16 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center overflow-hidden shadow-2xl">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={digit}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-2xl md:text-4xl font-display font-black text-white"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>

              {/* Horizontal Line across the middle for "flip" feel */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] md:text-xs font-bold text-brand-red tracking-[0.3em] mt-4 uppercase"
      >
        {label}
      </motion.div>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-05-22T08:30:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex space-x-1.5 sm:space-x-3 md:space-x-6 p-3 sm:p-4 md:p-6 rounded-[24px] md:rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/5 shadow-inner"
    >
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          <CountdownItem label={item.label} value={item.value} />
          {idx < items.length - 1 && (
            <div className="flex items-center pt-2">
              <div className="flex flex-col space-y-1.5">
                <div className="w-0.5 md:w-1 h-0.5 md:h-1 bg-brand-red rounded-full opacity-30 shadow-[0_0_10px_rgba(234,35,42,0.8)]" />
                <div className="w-0.5 md:w-1 h-0.5 md:h-1 bg-brand-red rounded-full opacity-30 shadow-[0_0_10px_rgba(234,35,42,0.8)]" />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

const ImageCarousel = () => {
  const images = [
    "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679824/img/pic1_ujecjf.jpg",
    "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679827/img/pic6_hbzfhv.jpg",
    "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679825/img/pic3_kpfdde.jpg",
    "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679825/img/pic4_os8hdh.jpg",
    "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679825/img/pic2_nzcico.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            className="w-full h-full object-cover"
            alt={`Past YLC Event ${currentIndex + 1}`}
          />
          <div className="absolute inset-0 bg-black/70 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex items-center space-x-4 z-20">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-red transition-all group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-red transition-all group"
        >
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-brand-red' : 'w-3 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="scroll-mt-20 relative min-h-screen flex flex-col items-center justify-center pt-10 pb-10 sm:pt-20 sm:pb-20 bg-black overflow-hidden">
      <ImageCarousel />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl mx-auto pt-10 pb-10 md:pt-20 md:pb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center mb-6 sm:mb-8"
          >
            <div className="px-6 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl mb-4">
              <span className="text-brand-red text-[10px] sm:text-xs md:text-sm font-black tracking-widest uppercase">Young Leaders Conference 2026 • Bauchi State</span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
              className="flex items-center space-x-2 bg-brand-red/10 border border-brand-red/20 px-4 py-1 rounded-lg"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-ping" />
              <span className="text-brand-red text-[10px] font-black uppercase tracking-[0.2em] flex items-center">
                <Radio size={10} className="mr-1.5" />
                Live on Main Stage
              </span>
            </motion.div>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-[120px] font-display font-black leading-none mb-6 sm:mb-10 text-white uppercase tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            GOOD<br />
            <span className="text-brand-red italic brand-glow-text">SUCCESS</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-4xl font-serif italic text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
            “Success is what you achieve. Good Success is how you achieve it.”
          </p>

          <div className="flex justify-center mb-16">
            <Countdown />
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-[2px]">
            <a href="#register" className="brand-gradient text-white font-black w-full sm:w-[271.573px] h-[60px] text-[18px] sm:text-[20px] rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_50px_rgba(234,35,42,0.4)] text-center">
              REGISTER FREE
            </a>
            <a href="#donate" className="w-full sm:w-[271.573px] h-[60px] text-[18px] sm:text-[20px] font-bold text-white border-2 border-white rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all text-center">
              SUPPORT YLC
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="scroll-mt-20 pt-[34px] pb-32 bg-zinc-950/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-black mb-10 leading-none tracking-tighter">
              Raising Principled, <span className="text-brand-purple">Visionary</span> Leaders
            </h2>
            <div className="space-y-8 text-xl text-white/70 leading-relaxed font-light">
              <p>
                Young Leaders Conference (YLC) is more than just an event; it's a dynamic ecosystem dedicated to empowering the next generation of impact-driven pioneers.
              </p>
              <p>
                In a world obsessed with shortcuts, YLC returns to the immutable foundations of leadership: character, competence, and compassion. We gather hundreds of young minds to connect them with global mentors.
              </p>
              <p className="border-l-4 border-brand-red pl-6 py-2 italic font-serif text-white/90">
                Join the 6th edition as we explore the blueprint for "Good Success"—the kind that transforms societies.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group cursor-default"
              >
                <div className="text-6xl font-display font-black text-brand-red transition-transform origin-left">100+</div>
                <div className="text-xs font-bold text-white/40 tracking-[0.3em] uppercase mt-2 group-hover:text-white transition-colors">Annual Attendees</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group cursor-default"
              >
                <div className="text-6xl font-display font-black text-brand-purple transition-transform origin-left">5+</div>
                <div className="text-xs font-bold text-white/40 tracking-[0.3em] uppercase mt-2 group-hover:text-white transition-colors">Keynote Faculty</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="relative group overflow-hidden rounded-[32px] aspect-[4/5] shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679825/img/pic2_nzcico.jpg"
                    alt="Past YLC Highlights"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-purple/30 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">YLC 4.0</div>
                </div>
                <div className="relative group overflow-hidden rounded-[32px] aspect-square shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679827/img/pic8_hpxryu.jpg"
                    alt="Past YLC Highlights"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-red/30 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">YLC 3.0</div>
                </div>
              </div>
              <div className="space-y-6 pt-0 lg:pt-12">
                <div className="relative group overflow-hidden rounded-[32px] aspect-square shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679830/img/pic9_f9k9ef.jpg"
                    alt="Past YLC Highlights"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-red/30 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="relative group overflow-hidden rounded-[32px] aspect-[4/5] shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679827/img/pic6_hbzfhv.jpg"
                    alt="Past YLC Highlights"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-purple/30 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">Impact Moments</div>
                </div>
              </div>
            </div>

            {/* Glowing accents behind the gallery */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/20 blur-[80px] rounded-full -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/20 blur-[80px] rounded-full -z-10" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-md p-6 rounded-xl border border-white/10 max-w-[200px] shadow-2xl z-20">
              <p className="text-sm font-serif italic text-white/90 text-center">
                "Real leadership is carved in the heart of the community."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ThemeSection = () => {
  const values = [
    { title: "Character", desc: "The foundation that sustains high achievements.", icon: <Award /> },
    { title: "Integrity", desc: "Unwavering adherence to ethical principles.", icon: <ShieldCheck size={24} /> },
    { title: "Purpose", desc: "Living with clear direction and intention.", icon: <Compass size={24} /> },
    { title: "Discipline", desc: "The bridge between goals and accomplishment.", icon: <Timer size={24} /> },
    { title: "Service", desc: "Leadership is fundamentally about value.", icon: <Heart size={24} /> },
    { title: "Impact", desc: "Leaving the world better than we found it.", icon: <Zap size={24} /> },
  ];

  return (
    <section className="py-24 relative bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,35,42,0.1)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl mx-auto mb-20 relative"
        >
          <h2 className="text-2xl font-bold text-brand-red mb-4 tracking-[0.2em] uppercase">Defining The Theme</h2>
          <h3 className="text-5xl md:text-8xl font-display font-black mb-6 brand-text-gradient">GOOD SUCCESS</h3>
          <p className="text-xl text-white/70">
            It's not just about reaching the top; it's about how you get there and who you stay there as.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.03,
                y: -10,
                backgroundColor: "rgba(24, 24, 27, 0.8)",
                borderColor: "rgba(168, 85, 247, 0.5)"
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-zinc-900 border border-white/5 p-12 rounded-[40px] transition-all group relative overflow-hidden cursor-default"
            >
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-purple/5 blur-3xl group-hover:bg-brand-purple/10 transition-colors" />
              <div className="w-16 h-16 brand-gradient rounded-3xl flex items-center justify-center mb-8 text-white brand-glow group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h4 className="text-3xl font-display font-bold mb-4 group-hover:text-brand-red transition-colors uppercase tracking-wide text-white">{value.title}</h4>
              <p className="text-white/60 leading-relaxed text-lg italic">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyAttend = () => {
  const reasons = [
    { icon: <Users />, title: "Elite Networking", desc: "Connect with high-fying peers and influential industry mentors." },
    { icon: <Lightbulb />, title: "Leadership Insights", desc: "Gain fresh perspectives on modern leadership and global trends." },
    { icon: <Award />, title: "Growth Strategies", desc: "Proven blueprints for personal, professional, and spiritual success." },
    { icon: <TrendingUp />, title: "Mentorship", desc: "Direct access to leaders who have walked the path before you." },
    { icon: <Zap />, title: "Inspiration", desc: "Reignite your passion for excellence and transformative change." },
    { icon: <Users />, title: "Powerful Speakers", desc: "Learn from veterans who have lived the principles of good success." },
  ];

  return (
    <section className="py-24 bg-zinc-950 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-red/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-purple/10 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Why You Should <span className="text-brand-red italic font-serif underline decoration-brand-purple underline-offset-8">Be Present</span></h2>
            <p className="text-white/70 text-lg">YLC 6.0 is an investment in your future. It's the catalyst for the next phase of your journey.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 brand-gradient rounded-full p-0.5 animate-spin-slow">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <ChevronRight className="text-brand-red" size={32} />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(234, 35, 42, 0.5)"
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md p-12 rounded-3xl border border-white/10 transition-all group relative overflow-hidden cursor-default"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-red/20 blur-2xl group-hover:bg-brand-red/40 transition-colors" />
              <div className="text-brand-red mb-8 transform group-hover:scale-110 transition-transform bg-brand-red/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                {reason.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-brand-red transition-colors">{reason.title}</h4>
              <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/80 transition-colors">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Schedule = () => {
  const events = [
    { time: "08:30", event: "Arrival & Ice-Breakers", desc: "Networking and check-ins." },
    { time: "09:00", event: "Opening Note", desc: "Grand opening session and theme introduction." },
    { time: "09:30", event: "Strategy Session I", desc: "First keynote speaker delivery." },
    { time: "10:20", event: "Strategy Session II", desc: "Second keynote speaker delivery." },
    { time: "11:00", event: "Power Break", desc: "Refreshments and networking." },
    { time: "11:20", event: "The Ethical Leader Panel", desc: "Deep dive discussion with industry giants." },
    { time: "12:20", event: "Closing Statement", desc: "Wrap-up, resolutions, and commitment note." },
  ];

  return (
    <section id="schedule" className="scroll-mt-20 py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Program <span className="text-brand-red">Schedule</span></h2>
          <p className="text-white/40 uppercase tracking-[0.3em] font-bold text-xs">Chronology of Transformation</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {events.map((e, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center bg-zinc-900 border border-white/5 rounded-2xl p-6 hover:border-brand-red/30 transition-all group shadow-2xl"
            >
              <div className="w-full md:w-32 mb-4 md:mb-0">
                <span className="text-2xl font-display font-black text-brand-red">{e.time}</span>
                <span className="block text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">UTC+1</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-bold text-white group-hover:text-brand-red transition-colors uppercase tracking-wide">{e.event}</h4>
                <p className="text-white/60 text-sm mt-1">{e.desc}</p>
              </div>
              <div className="hidden md:block w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SpeakerCard = ({ name, role, image }: { name: string, role: string, image: string, key?: React.Key }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl shadow-2xl"
    >
      <div className="aspect-[3/4] overflow-hidden group-hover:grayscale-0 transition-all duration-700">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
        <div className="w-12 h-1 bg-brand-red mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        <h4 className="text-2xl font-display font-bold text-white mb-1 uppercase leading-tight">{name}</h4>
        <p className="text-brand-red text-xs font-black tracking-widest uppercase">{role}</p>

        <div className="mt-6 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
          <Instagram size={18} className="text-white hover:text-brand-red cursor-pointer transition-colors" />
          <Twitter size={18} className="text-white hover:text-brand-red cursor-pointer transition-colors" />
          <Linkedin size={18} className="text-white hover:text-brand-red cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
};

const Speakers = () => {
  const speakers = [
    { name: "Sir Jeremiah Panshak Kassem", role: "Guest Speaker", image: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679817/img/Jerry_ehydf2.jpg" },
    { name: "Mrs Elizabeth George Esq.", role: "Guest Speaker", image: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679814/img/Barr_dit1un.jpg" },
    { name: "Mr Bubchong Lawi", role: "Guest Speaker", image: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679815/img/Lawi_ieydzp.jpg" },
    { name: "Peter James Ola", role: "Host", image: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679822/img/Peter_hmnivc.jpg" },
    { name: "Nuna Praise Quashe", role: "Co-Host", image: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679816/img/Nuna_htidta.jpg" },
    { name: "Luka Micah Zamani", role: "Team Lead", image: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679818/img/micah_uqzvgs.jpg" },
  ];

  return (
    <section id="speakers" className="scroll-mt-20 py-32 relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-brand-red/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8"
        >
          <div>
            <span className="text-brand-red font-black uppercase tracking-[0.4em] text-xs">Visionary Minds</span>
            <h2 className="text-4xl sm:text-6xl md:text-9xl font-display font-black mt-4 text-white leading-none tracking-tighter">2026 <span className="italic font-serif font-normal text-white/20">FACULTY</span></h2>
          </div>
          <p className="max-w-md text-white/50 md:text-right text-base sm:text-lg border-l-2 md:border-l-0 md:border-r-2 border-brand-red pl-6 md:pl-0 md:pr-6 mt-4 md:mt-0">
            World-class leaders coming together to equip and challenge the next generation of impact-driven giants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {speakers.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <SpeakerCard
                name={s.name}
                role={s.role}
                image={s.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Panel = ({ onOpenMainStage }: { onOpenMainStage: () => void }) => {
  return (
    <section className="py-32 bg-white text-black overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Tv size={400} />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <span className="text-xs font-black tracking-[0.4em] uppercase text-zinc-400 mb-8 block">Interactive Dialogue</span>
        <h2 className="text-4xl md:text-8xl font-display font-black leading-none mb-12 tracking-tighter text-zinc-950">
          “Can You Be Highly Successful and <span className="italic font-serif font-normal text-zinc-500">Deeply Ethical</span> in Today’s World?”
        </h2>
        <p className="max-w-2xl mx-auto text-xl text-zinc-600 mb-12 font-medium">
          A high-stakes debate and dialogue tackling the tension between modern ambition and ancient principles. No fluff—just real answers from the frontline.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={onOpenMainStage}
            className="px-10 py-5 border-2 border-black font-black uppercase tracking-[0.2em] text-sm hover:bg-black hover:text-white transition-all group flex items-center space-x-3"
          >
            <Play size={16} className="fill-current group-hover:animate-pulse" />
            <span>Enter Main Stage</span>
          </button>
          <div className="px-10 py-5 bg-black text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl flex items-center space-x-3">
            <Radio size={16} className="text-brand-red animate-pulse" />
            <span>Live @ 11:20 AM</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Testimonials = () => {
  const quotes = [
    { text: "YLC 5.0 changed the trajectory of my career. I stopped chasing titles and started building character.", author: "David Solomon", role: "Software Engineer" },
    { text: "The networking alone was worth it. I met my co-founder during a power break!", author: "Zara Bitrus", role: "Startup Founder" },
    { text: "Hearing from such seasoned leaders in my own backyard was revolutionary. Good Success is now my mantra.", author: "Joshua Abel", role: "Student Leader" },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 brand-gradient rounded-full flex items-center justify-center text-white mb-8 brand-glow">
            <MessageSquare size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-white">Witness of <span className="text-brand-red italic font-serif">Impact</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {quotes.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-left space-y-6 bg-white/5 p-10 rounded-3xl border border-white/5 hover:border-brand-purple/30 transition-colors"
              >
                <p className="text-xl font-serif italic text-white/80 leading-relaxed">"{q.text}"</p>
                <div>
                  <div className="font-bold text-lg text-white underline decoration-brand-red decoration-2 underline-offset-4">{q.author}</div>
                  <div className="text-xs font-black text-brand-red uppercase tracking-widest mt-2">{q.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Sponsors = ({ onOpenSponsor }: { onOpenSponsor: () => void }) => {
  const platinumSponsors = [
    { id: 1, name: "Future-Forward Leaders Platform", img: "/img/fflp.png" },
    { id: 2, name: "Vision & Lenses", img: "/img/v&l.png" },
  ];

  const goldSponsors = [
    { id: 3, name: "Strategic Impact Hub", img: "/img/impact.png" },
    { id: 4, name: "Global Leadership Initiative", img: "/img/gli.png" },
  ];

  const allSponsors = [
    { id: 1, name: "Future-Forward Leaders Platform", img: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679815/img/fflp_m8ehqv.png" },
    { id: 2, name: "Vision & Lenses", img: "https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679827/img/vl_uuolba.png" },
    { id: 3, name: "Strategic Impact Hub", img: "/img/impact.png" },
    { id: 4, name: "Global Leadership Initiative", img: "/img/gli.png" },
    { id: 5, name: "Bauchi Tech Park", img: "/img/tech.png" },
    { id: 6, name: "Leadership Digest", img: "/img/digest.png" },
  ];

  // For the infinite marquee
  const marqueeItems = [...allSponsors, ...allSponsors];

  return (
    <section id="sponsors" className="py-24 bg-black relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-brand-red/5 blur-[120px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-brand-red font-black uppercase tracking-[0.4em] text-xs">Collaboration</span>
          <h2 className="text-4xl md:text-6xl font-display font-black mt-4 text-white uppercase tracking-tighter">Strategic <span className="opacity-30">Partners</span></h2>
        </motion.div>

        {/* Platinum Tier */}
        <div className="mb-24">
          <div className="flex items-center justify-center space-x-4 mb-10">
            <div className="h-[1px] w-12 bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Platinum Partners</span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {platinumSponsors.map(sponsor => (
              <motion.div
                key={sponsor.id}
                whileHover={{ y: -5, borderColor: 'rgba(234,35,42,0.5)' }}
                className="h-32 bg-white/[0.03] border border-white/5 rounded-3xl flex items-center justify-center p-8 backdrop-blur-sm transition-colors group"
              >
                <img
                  src={sponsor.img}
                  alt={sponsor.name}
                  className="max-h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('span');
                      fallback.className = "fallback-text text-lg font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors text-center";
                      fallback.innerText = sponsor.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gold Tier */}
        <div className="mb-24">
          <div className="flex items-center justify-center space-x-4 mb-10">
            <div className="h-[1px] w-8 bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Gold Partners</span>
            <div className="h-[1px] w-8 bg-white/10" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {goldSponsors.map(sponsor => (
              <motion.div
                key={sponsor.id}
                whileHover={{ y: -3, borderColor: 'rgba(234,35,42,0.3)' }}
                className="h-24 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center p-6 backdrop-blur-sm transition-colors group"
              >
                <img
                  src={sponsor.img}
                  alt={sponsor.name}
                  className="max-h-12 w-auto object-contain opacity-40 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.fallback-text')) {
                      const fallback = document.createElement('span');
                      fallback.className = "fallback-text text-sm font-bold uppercase tracking-widest text-white/30 group-hover:text-white transition-colors text-center";
                      fallback.innerText = sponsor.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Partners Marquee */}
        <div>
          <div className="text-center mb-10">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Global Collaborators</span>
          </div>

          <div className="relative flex overflow-hidden group">
            <motion.div
              className="flex whitespace-nowrap py-10"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear"
              }}
            >
              {marqueeItems.map((sponsor, idx) => (
                <div
                  key={`${sponsor.id}-${idx}`}
                  className="flex items-center justify-center mx-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={sponsor.img}
                    alt={sponsor.name}
                    className="h-8 md:h-10 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const fallback = document.createElement('span');
                        fallback.className = "fallback-text text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap";
                        fallback.innerText = sponsor.name;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Gradient masks for smooth marquee edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          </div>
        </div>

        {/* Inquiries */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button
            onClick={onOpenSponsor}
            className="text-xs font-black text-white/30 uppercase tracking-[0.3em] hover:text-brand-red transition-colors inline-flex items-center space-x-2 group"
          >
            <span>Interested in sponsoring?</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tel: '',
    institution: '',
    position: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setError('A valid email address is required for confirmation');
      return;
    }
    if (!formData.tel || formData.tel.length < 8) {
      setError('Please enter a valid phone number for security');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  return (
    <section id="register" className="py-32 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] overflow-hidden brand-gradient p-8 md:p-20 text-center brand-glow shadow-[0_0_100px_rgba(234,35,42,0.3)]"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <h2 className="text-lg md:text-3xl font-black tracking-[0.3em] uppercase mb-6 text-white">Your Future Needs Leadership</h2>
                  <h3 className="text-5xl sm:text-7xl md:text-8xl font-display font-black leading-[0.8] mb-8 text-white tracking-tighter">
                    BUILD <span className="opacity-30">GOOD</span> SUCCESS
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto text-white/90 px-4">
                    Secure your seat today at the conference of the year.
                  </p>

                  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name *"
                          className={`w-full px-8 py-5 rounded-3xl border-2 ${error.includes(' name') ? 'border-white' : 'border-white/30'} bg-white/10 backdrop-blur-md placeholder-white/50 font-bold focus:outline-none text-white focus:border-white transition-all text-lg shadow-inner`}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address *"
                          className={`w-full px-8 py-5 rounded-3xl border-2 ${error.includes('email') ? 'border-white' : 'border-white/30'} bg-white/10 backdrop-blur-md placeholder-white/50 font-bold focus:outline-none text-white focus:border-white transition-all text-lg shadow-inner`}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="tel"
                          name="tel"
                          value={formData.tel}
                          onChange={handleChange}
                          placeholder="Phone Number *"
                          className={`w-full px-8 py-5 rounded-3xl border-2 ${error.includes('phone') ? 'border-white' : 'border-white/30'} bg-white/10 backdrop-blur-md placeholder-white/50 font-bold focus:outline-none text-white focus:border-white transition-all text-lg shadow-inner`}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          placeholder="Institution (Optional)"
                          className="w-full px-8 py-5 rounded-3xl border-2 border-white/30 bg-white/10 backdrop-blur-md placeholder-white/50 font-bold focus:outline-none text-white focus:border-white transition-all text-lg shadow-inner"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative md:col-span-2">
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          placeholder="Position/Role (Optional)"
                          className="w-full px-8 py-5 rounded-3xl border-2 border-white/30 bg-white/10 backdrop-blur-md placeholder-white/50 font-bold focus:outline-none text-white focus:border-white transition-all text-lg shadow-inner"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col items-center">
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 mb-6 border border-white/30"
                          >
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
                              <X size={10} className="text-brand-red" />
                            </div>
                            <p className="text-white text-[10px] font-black uppercase tracking-widest">
                              {error}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-brand-red px-16 py-6 rounded-full font-black uppercase text-xl hover:scale-105 transition-all shadow-2xl hover:bg-zinc-950 hover:text-white disabled:opacity-50 disabled:scale-100 flex items-center justify-center min-w-[240px]"
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
                        ) : (
                          'GET INVITED'
                        )}
                      </button>
                    </div>
                  </form>
                  <p className="text-sm font-bold text-white/60 tracking-widest uppercase mt-12">Limited Seats Available. Registration closes 15th May, 2026</p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                  >
                    <ShieldCheck size={48} className="text-brand-red" />
                  </motion.div>
                  <h3 className="text-6xl md:text-8xl font-display font-black text-white mb-6 uppercase tracking-tighter">YOU'RE IN!</h3>
                  <p className="text-2xl md:text-3xl text-white/90 max-w-xl mx-auto font-medium leading-relaxed">
                    Welcome to the 6.0 blueprint, <span className="text-white font-black">{formData.name}</span>.<br />
                    Confirmation sent to <span className="font-black text-white underline underline-offset-8 decoration-white/30">{formData.email}</span>
                  </p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        tel: '',
                        institution: '',
                        position: ''
                      });
                    }}
                    className="mt-16 text-white/40 hover:text-white text-xs font-black uppercase tracking-[0.4em] transition-colors border border-white/20 px-8 py-3 rounded-full hover:bg-white/10"
                  >
                    Register another seat
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center space-x-3 mb-8 group">
              <div className="relative w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 bg-brand-white rounded-xl rotate-12 opacity-80" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777680125/logo_xinbh0.png"
                    alt="YLC"
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = "text-white font-black text-2xl drop-shadow-md";
                        fallback.innerText = "Y";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>
              <span className="text-2xl font-display font-bold text-white">YLC <span className="text-brand-red">6.0</span></span>
            </a>
            <p className="text-white/40 max-w-sm leading-relaxed text-lg">
              Raising principled, visionary, and impact-driven leaders across Nigeria and the world. Join the movement.
            </p>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs text-brand-red mb-8">Navigation</h5>
            <ul className="space-y-4 text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About YLC</a></li>
              <li><a href="#speakers" className="hover:text-white transition-colors">Faculty</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Program</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs text-brand-red mb-8">Connect</h5>
            <div className="space-y-4 text-white/60">
              <p className="flex items-center space-x-3">
                <Phone size={16} className="text-brand-red" />
                <span className="font-medium">+234 810 333 9993</span>
              </p>
              <p className="flex items-center space-x-3">
                <MessageSquare size={16} className="text-brand-red" />
                <span className="font-medium">quintessentialleadinst@gmail.com</span>
              </p>
              <div className="flex space-x-6 pt-6">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                  <Instagram size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                  <Twitter size={20} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all cursor-pointer">
                  <Facebook size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-white/20 text-xs">© 2026 Young Leaders Conference. Designed for Impact.</p>
          <div className="flex space-x-4">
            <span className="text-brand-red text-[10px] font-black tracking-[0.3em] uppercase">BAUCHI</span>
            <span className="text-white/20 text-[10px] font-black tracking-[0.3em] uppercase">•</span>
            <span className="text-brand-purple text-[10px] font-black tracking-[0.3em] uppercase">NIGERIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/2348103339993"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] brand-gradient text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:rotate-12 brand-glow"
    >
      <Phone size={28} />
    </a>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-[60] bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-brand-red hover:border-brand-red transition-all hover:scale-110 group"
        >
          <ArrowUp size={28} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const MainStageModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const currentSession = {
    title: "The Future of Ethical Leadership in Africa",
    speaker: "Sir Jeremiah Panshak Kassem",
    time: "LIVE NOW",
    viewerCount: "1,248",
    description: "An in-depth exploration of how the next generation can balance massive success with unwavering integrity."
  };

  const upcomingSessions = [
    { title: "Digital Innovation for Social Change", speaker: "Mr Bubchong Lawi", time: "01:30 PM" },
    { title: "Building Cross-Border Alliances", speaker: "Mrs Elizabeth George Esq.", time: "03:00 PM" }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full h-full md:h-auto md:max-w-[90vw] md:max-h-[90vh] bg-zinc-900 border-none md:border md:border-white/10 rounded-none md:rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Radio size={24} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase tracking-tighter text-xl">MAIN STAGE <span className="text-brand-red">LIVE</span></h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{currentSession.viewerCount} Viewers</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar lg:flex">
              {/* Video Feed (Simulated) */}
              <div className="lg:w-2/3 p-4 md:p-8">
                <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-black relative group shadow-2xl border border-white/5">
                  {/* Simulated Video UI */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-[10s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-24 h-24 rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-2xl brand-glow"
                    >
                      <Play size={40} className="ml-2" />
                    </motion.button>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border-2 border-brand-red overflow-hidden">
                        <img src="https://res.cloudinary.com/dxx0r7sdm/image/upload/v1777679817/img/Jerry_ehydf2.jpg" alt="Speaker" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-brand-red uppercase tracking-widest">Speaking Now</p>
                        <p className="text-white font-bold text-sm">{currentSession.speaker}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">1080P HD</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-4">
                    {currentSession.title}
                  </h4>
                  <p className="text-white/50 leading-relaxed max-w-2xl font-medium">
                    {currentSession.description}
                  </p>
                </div>
              </div>

              {/* Sidebar: Chat & Schedule */}
              <div className="lg:w-1/3 lg:border-l border-white/5 flex flex-col">
                <div className="p-8 border-b border-white/5">
                  <div className="flex items-center space-x-3 mb-6">
                    <Activity size={20} className="text-brand-purple" />
                    <h5 className="text-white font-black uppercase tracking-widest text-[10px]">Upcoming Sessions</h5>
                  </div>
                  <div className="space-y-4">
                    {upcomingSessions.map((session, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-purple/20 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-brand-purple font-black text-[10px] uppercase tracking-widest">{session.time}</span>
                          <Clock size={12} className="text-white/20" />
                        </div>
                        <p className="text-white font-bold text-sm mb-1 group-hover:text-brand-purple transition-colors">{session.title}</p>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{session.speaker}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare size={20} className="text-brand-red" />
                    <h5 className="text-white font-black uppercase tracking-widest text-[10px]">Live Interaction</h5>
                  </div>
                  <div className="flex-1 bg-white/[0.02] rounded-2xl border border-white/5 p-4 mb-4 flex flex-col justify-end space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-white/20 text-[10px] font-black uppercase">Sarah K.</p>
                        <p className="text-white/60 text-xs leading-snug bg-zinc-800/50 p-2 rounded-xl border border-white/5">This discussion on ethics is exactly what Nigeria needs right now! 🇳🇬🔥</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-white/20 text-[10px] font-black uppercase">Tolu B.</p>
                        <p className="text-white/60 text-xs leading-snug bg-zinc-800/50 p-2 rounded-xl border border-white/5">Will there be a Q&A after this? I have a question for the speaker.</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Comment something..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white placeholder-white/20 focus:outline-none focus:border-brand-red transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-brand-red">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Where is the venue for YLC 2026?",
      answer: "The conference will be held at the ASUP Secretariat Complex, Federal Polytecnic Bauchi. It's easily located with ample parking and security."
    },
    {
      question: "Is there a registration fee?",
      answer: "No, the Young Leaders Conference is completely FREE. However, registration is mandatory as space is limited to ensure a high-quality experience for all attendees."
    },
    {
      question: "What should I bring to the conference?",
      answer: "Please bring a digital or printed copy of your proof registration, writing material, and your beautiful smile. We also recommend bringing business cards or the exchange of contacts for the networking sessions."
    },
    {
      question: "Will certificates be provided?",
      answer: "On request, all verified attendees will receive an e-certificate of participation. Digital certificates will be sent via email within 7 working days after the event."
    },
    {
      question: "What is the dress code?",
      answer: "The official dress code is Business Casual, official attire, or Traditional Smart. We encourage you to dress in a way that represents your professional brand."
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="text-brand-red w-5 h-5" />
              <span className="text-brand-red font-black uppercase tracking-[0.4em] text-xs">Knowledge Base</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter leading-none">
              FREQUENTLY ASKED <br />
              <span className="opacity-30 underline decoration-brand-red decoration-8 underline-offset-8">QUESTIONS</span>
            </h2>
          </motion.div>

          {/* Map Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 relative group"
          >
            <div className="absolute -inset-1 brand-gradient rounded-[40px] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative aspect-video w-full h-[400px] rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
              <iframe
                title="Venue Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15707.9711649231!2d9.789163!3d10.291778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105500e5e0000001%3A0xe6a67f0f6e6f0b0c!2sFederal%20Polytechnic%20Bauchi!5e0!3m2!1sen!2sng!4v1714600000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-none">
                <div>
                  <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-1">Official Venue</p>
                  <p className="text-white font-bold text-lg tracking-tight">ASUP Secretariat Complex</p>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest">Federal Polytechnic Bauchi</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-brand-red/20 flex items-center justify-center text-brand-red animate-pulse">
                  <MapPin size={20} />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group border rounded-[32px] transition-all duration-500 overflow-hidden ${openIndex === index
                  ? "bg-white/[0.03] border-white/20 shadow-2xl shadow-brand-red/5"
                  : "bg-transparent border-white/5 hover:border-white/10"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${openIndex === index ? "text-white" : "text-white/60 group-hover:text-white"
                    }`}>
                    {faq.question}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index
                    ? "bg-brand-red text-white rotate-180"
                    : "bg-white/5 text-white/30 group-hover:bg-white/10"
                    }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8">
                        <div className="h-px w-full bg-white/5 mb-6" />
                        <p className="text-white/50 text-lg leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-white/30 font-bold uppercase tracking-widest text-[10px]">
              Still have questions? Contact us at
              <a href="quintessentialleadinst@gmail.com" className="text-brand-red ml-2 hover:underline">quintessentialleadinst@gmail.com</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isMainStageOpen, setIsMainStageOpen] = useState(false);

  return (
    <div className="selection:bg-brand-red selection:text-white">
      <OfflineNotice />
      <SponsorshipModal isOpen={isSponsorOpen} onClose={() => setIsSponsorOpen(false)} />
      <DonationModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <MainStageModal isOpen={isMainStageOpen} onClose={() => setIsMainStageOpen(false)} />
      <Navbar onOpenSponsor={() => setIsSponsorOpen(true)} />
      <Hero />
      <About />
      <ThemeSection />
      <WhyAttend />
      <Schedule />
      <Speakers />
      <Panel onOpenMainStage={() => setIsMainStageOpen(true)} />
      <Testimonials />
      <Sponsors onOpenSponsor={() => setIsSponsorOpen(true)} />
      <DonationSection onOpenDonate={() => setIsDonateOpen(true)} />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
