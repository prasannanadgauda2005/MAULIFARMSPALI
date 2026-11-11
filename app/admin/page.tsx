'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Lock, Home, Image as ImageIcon, Eye, RefreshCw, AlertCircle, CheckCircle2, Film, Link as LinkIcon, Save, Sparkles, Tag, Plus, Trash2, ToggleLeft, ToggleRight, Clock, FileText, Radio } from 'lucide-react';
import { upload } from '@vercel/blob/client';
import { Button } from '../../components/ui/Button';

interface GalleryAlbums {
  exterior: string[];
  living: string[];
  pool: string[];
  bedroom: string[];
  bathroom: string[];
  videos: string[];
}

interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  highlight: string;
}

export interface DealsOffer {
  enabled: boolean;
  badge: string;
  title: string;
  description: string;
  posterImage?: string;
  perks: string[];
  code: string;
  ctaText: string;
  ctaUrl: string;
}

export interface SiteContent {
  announcement?: string;
  waterfallSeasonStatus?: string;
  templeNote?: string;
  poolNote?: string;
  plotArea?: string;
  lastUpdated?: string;
}

interface CustomImages {
  heroBg: string;
  aboutBg: string;
  waterfallBg: string;
  waterfallVideo: string;
  tourVideo: string;
  posterImage?: string;
  posters?: string[];
  siteContent?: SiteContent;
  gallery: GalleryAlbums;
  experiences: ExperienceItem[];
  deals?: DealsOffer;
  hasBlobToken?: boolean;
}

const ALBUM_SCHEMAS = [
  { id: 'exterior', label: 'Villa Exterior & Grounds Album (Max 3)', size: 3, isVideo: false },
  { id: 'living', label: 'Living Room & Interiors Album (Max 3)', size: 3, isVideo: false },
  { id: 'pool', label: 'Private Pool Area Album (Max 3)', size: 3, isVideo: false },
  { id: 'bedroom', label: 'Bedroom Suites Album (Max 3)', size: 3, isVideo: false },
  { id: 'bathroom', label: 'Bathrooms & Washrooms Album (Max 3)', size: 3, isVideo: false },
  { id: 'videos', label: 'Cinematic Video Tours Album (Max 3)', size: 3, isVideo: true }
];

const defaultSlotImages: Record<string, string[]> = {
  exterior: [
    "/images/gallery/villa-exterior-1.jpg",
    "/images/gallery/villa-exterior-2.jpg",
    "/images/gallery/villa-exterior-3.jpg"
  ],
  living: [
    "/images/gallery/living-room-1.jpg",
    "/images/gallery/living-room-2.jpg",
    "/images/gallery/living-room-2.jpg"
  ],
  pool: [
    "/images/gallery/pool-view-1.jpg",
    "/images/gallery/pool-view-2.jpg",
    "/images/gallery/pool-view-2.jpg"
  ],
  bedroom: [
    "/images/gallery/bedroom-view-1.png",
    "/images/gallery/bedroom-view-1.png",
    "/images/gallery/bedroom-view-1.png"
  ],
  bathroom: [
    "/images/gallery/villa-exterior-day.jpg",
    "/images/gallery/villa-exterior-day.jpg",
    "/images/gallery/villa-exterior-day.jpg"
  ],
  videos: [
    "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4"
  ]
};

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  const [config, setConfig] = useState<CustomImages | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [inputUrls, setInputUrls] = useState<Record<string, string>>({});
  
  // Custom states for editing experiences
  const [expTextStates, setExpTextStates] = useState<Record<string, { title: string; highlight: string; description: string }>>({});

  // Deals & Offers popup state
  const [dealsState, setDealsState] = useState<DealsOffer>({
    enabled: true,
    badge: 'Monsoon & Weekend Special',
    title: 'Family & Friends Gathering Offer',
    description: 'Book for 10 or more guests and enjoy a complimentary evening stone bonfire with barbecue grill setup, plus special packages for multi-night stays!',
    posterImage: '/images/gallery/pool-deck.jpg',
    perks: [
      'Complimentary Evening Bonfire & Charcoal BBQ Setup',
      'Exclusive private access to in-plot natural waterfall & stream',
      'Home-cooked village feasts prepared by local caretakers',
      '100% Gated 1-Acre Lawn for kids and pets to play safely'
    ],
    code: 'FAMILYMAULI',
    ctaText: 'Claim Deal on WhatsApp',
    ctaUrl: ''
  });
  const [newPerkInput, setNewPerkInput] = useState('');

  // Website Content & Live Notice state
  const [siteContentState, setSiteContentState] = useState<SiteContent>({
    announcement: "Welcome to Mauli Farms! Current Season: Private Swimming Pool, Bonfire Nights & Peaceful Sahyadri Hill Stays.",
    waterfallSeasonStatus: "Monsoon Seasonal (Active July – Sept) · Private Pool & Freshwater Stream Year-Round",
    templeNote: "Vitthal Rukhmini Mandir: Sacred private temple inside our 1-acre property for quiet morning darshan and prayer.",
    poolNote: "Private 12×24 ft Swimming Pool with sun loungers, daily filtration, and scenic forest views.",
    plotArea: "1 Acre"
  });

  const [liveClock, setLiveClock] = useState('');

  const ADMIN_PASSCODE = 'mauli123';

  // Live real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/images');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (err) {
      console.error('Failed to load configurations', err);
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('mauli_admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchConfig();
    }
  }, []);

  useEffect(() => {
    if (config?.experiences) {
      const initialStates: Record<string, { title: string; highlight: string; description: string }> = {};
      config.experiences.forEach((exp) => {
        initialStates[exp.id] = {
          title: exp.title || '',
          highlight: exp.highlight || '',
          description: exp.description || ''
        };
      });
      setExpTextStates(initialStates);
    }
    if (config?.deals) {
      setDealsState(config.deals);
    }
    if (config?.siteContent) {
      setSiteContentState({
        announcement: config.siteContent.announcement || '',
        waterfallSeasonStatus: config.siteContent.waterfallSeasonStatus || '',
        templeNote: config.siteContent.templeNote || '',
        poolNote: config.siteContent.poolNote || '',
        plotArea: config.siteContent.plotArea || '1 Acre'
      });
    }
  }, [config]);

  const handleSaveSiteContent = async () => {
    setUploadingKey('siteContent');
    setStatusMsg(null);
    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'siteContent',
          siteContent: siteContentState
        }),
      });
      if (!res.ok) throw new Error('Failed to update website content');
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setStatusMsg({ type: 'success', text: `Website content & notices updated live in real-time (${new Date().toLocaleTimeString()})!` });
      } else {
        throw new Error(data.error || 'Failed to save website content');
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to save content' });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSaveDeals = async () => {
    setUploadingKey('deals');
    setStatusMsg(null);
    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'deals',
          deals: dealsState
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to update deals configuration');
      }
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setStatusMsg({ type: 'success', text: 'Deals & Offers popup settings updated successfully!' });
      } else {
        throw new Error(data.error || 'Failed to save deals');
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to save deals settings' });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError(false);
      localStorage.setItem('mauli_admin_authenticated', 'true');
      fetchConfig();
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mauli_admin_authenticated');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, isVideo: boolean = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Type validation
    if (isVideo && !file.type.startsWith('video/')) {
      setStatusMsg({ type: 'error', text: 'Please upload valid video files only (MP4, WebM)' });
      return;
    }
    if (!isVideo && !file.type.startsWith('image/')) {
      setStatusMsg({ type: 'error', text: 'Please upload valid image files only (JPG, PNG, WebP)' });
      return;
    }

    setUploadingKey(key);
    setStatusMsg(null);

    try {
      // 1. Direct Cloud Mode (Client-Side Upload directly to Vercel Blob)
      // Bypasses 4.5MB payload limit entirely!
      if (config?.hasBlobToken) {
        setStatusMsg({ type: 'success', text: `Uploading file directly to cloud storage (bypassing size limits)...` });
        
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/images/upload-token',
        });

        // Save URL config change on server
        const saveRes = await fetch('/api/admin/images', {
          method: 'POST',
          body: JSON.stringify({ key, url: newBlob.url }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!saveRes.ok) {
          throw new Error('Failed to register uploaded URL to configuration');
        }

        const saveData = await saveRes.json();
        setConfig(saveData.config);
        setStatusMsg({ type: 'success', text: `${isVideo ? 'Video' : 'Image'} uploaded directly to Vercel Blob successfully!` });
      } else {
        // 2. Local Fallback Mode (Filesystem server uploads)
        // Check size limit for local storage
        if (file.size > 200 * 1024 * 1024) {
          throw new Error('File exceeds local size limit (200MB). Please compress files before uploading.');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('key', key);

        const res = await fetch('/api/admin/images', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || 'Server upload failed');
        }

        const data = await res.json();
        if (data.success) {
          setConfig(data.config);
          setStatusMsg({ type: 'success', text: `${isVideo ? 'Video' : 'Image'} updated locally successfully!` });
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      }
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message || 'Failed to upload file' });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleLinkUpdate = async (key: string) => {
    const url = inputUrls[key];
    if (!url || !url.trim()) return;

    setUploadingKey(key);
    setStatusMsg(null);

    const formData = new FormData();
    formData.append('key', key);
    formData.append('url', url.trim());

    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to save URL link');
      }

      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setStatusMsg({ type: 'success', text: 'Asset URL updated successfully!' });
        setInputUrls(prev => ({ ...prev, [key]: '' })); // Clear input field
      } else {
        throw new Error(data.error || 'Failed to update URL link');
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to save link' });
    } finally {
      setUploadingKey(null);
    }
  };

  const handleExpTextChange = (id: string, field: 'title' | 'highlight' | 'description', value: string) => {
    setExpTextStates(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSaveExpText = async (id: string) => {
    const fields = expTextStates[id];
    if (!fields) return;

    const fieldKey = `experience-${id}-text`;
    setUploadingKey(fieldKey);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: fieldKey,
          title: fields.title,
          highlight: fields.highlight,
          description: fields.description
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to update experience details');
      }

      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setStatusMsg({ type: 'success', text: `Experience "${fields.title}" details updated successfully!` });
      } else {
        throw new Error(data.error || 'Update failed');
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to save experience details' });
    } finally {
      setUploadingKey(null);
    }
  };

  // Login Form Shield Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center p-6 text-white font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(137,11,11,0.15),rgba(255,255,255,0))]" />
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full glass rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10 text-center"
        >
          <div className="relative h-16 w-16 mx-auto mb-6 overflow-hidden rounded-full border border-white/20 shadow-md">
            <Image
              src="/images/logo.png"
              alt="Mauli Farms Pali Logo"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <h1 className="font-serif text-2xl font-bold tracking-wide mb-2">Mauli Farms Pali</h1>
          <p className="text-sm font-light text-white/60 mb-8">Management Admin Console</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                placeholder="Enter Admin Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-accent transition-colors"
                required
              />
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 rounded-xl bg-accent/25 border border-accent/40 text-xs font-semibold text-accent-light flex items-center gap-2 justify-center"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                Incorrect passcode. Try again.
              </motion.div>
            )}

            <Button type="submit" variant="accent" className="w-full py-3 rounded-2xl">
              Access Console
            </Button>
          </form>

          <div className="mt-8 text-[10px] text-white/30 tracking-widest uppercase">
            Secured Access Only
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-dark/20 text-dark font-sans pb-16">
      {/* Navbar header */}
      <header className="bg-primary text-white py-4 px-6 md:px-12 sticky top-0 z-30 shadow-md border-b border-primary-light">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="Mauli Farms Pali Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wide block">Mauli Farms Pali</span>
              <span className="text-[9px] font-bold text-accent tracking-widest uppercase block -mt-0.5">Admin Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time live date/time indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs text-amber-200 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <Clock className="h-3.5 w-3.5 text-amber-300" />
              <span>Live: {liveClock || 'Real-Time Synchronized'}</span>
            </div>

            <a 
              href="/" 
              target="_blank" 
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:text-accent border border-white/10 hover:border-accent rounded-full transition-colors flex items-center gap-2"
            >
              <Eye className="h-3.5 w-3.5" />
              Live Site
            </a>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-accent hover:text-white rounded-full transition-all border border-transparent"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-primary">Website Asset Manager</h1>
            <p className="text-sm font-light text-dark/60 mt-1">
              Upload files OR paste cloud links directly to update images and videos.
              {config?.hasBlobToken && <span className="text-emerald-700 font-bold ml-1">✓ Cloud direct-upload active (No file size limits!)</span>}
            </p>
          </div>
          <button 
            onClick={fetchConfig}
            className="p-2 rounded-full border border-secondary-dark/60 hover:bg-secondary text-primary transition-colors bg-white shadow-sm"
            title="Refresh Config"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Global Success / Error Message Banner */}
        <AnimatePresence>
          {statusMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-2xl border mb-8 flex items-start gap-3 ${
                statusMsg.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800'
                  : 'bg-accent/10 border-accent/20 text-accent-dark'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-accent mt-0.5" />
              )}
              <div>
                <p className="text-sm font-semibold">{statusMsg.type === 'success' ? 'Success' : 'Error'}</p>
                <p className="text-xs font-light mt-0.5">{statusMsg.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {config ? (
          <div className="space-y-12">
            
            {/* 1. Primary Sections images */}
            <div className="border-b border-secondary-dark/60 pb-8">
              <h2 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-accent" />
                Featured Hero & About Cover
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Hero BG Card */}
                <div className="bg-white rounded-3xl p-6 border border-secondary-dark/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">Hero Background Image</h3>
                    <p className="text-xs text-dark/50 font-light mb-4">The main background image displayed when visiting your homepage.</p>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-secondary-dark/80 bg-secondary mb-4 shadow-inner">
                      <Image
                        src={config.heroBg}
                        alt="Hero BG Thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="relative w-full block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'heroBg')}
                        disabled={uploadingKey !== null}
                      />
                      <span className="w-full py-2.5 rounded-xl border border-secondary-dark/80 bg-secondary hover:bg-secondary-dark text-xs font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                        <Upload className={`h-3.5 w-3.5 ${uploadingKey === 'heroBg' ? 'animate-bounce' : ''}`} />
                        {uploadingKey === 'heroBg' ? 'Uploading...' : 'Replace Hero Photo'}
                      </span>
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Or paste direct image URL link"
                        value={inputUrls['heroBg'] || ''}
                        onChange={(e) => setInputUrls({ ...inputUrls, heroBg: e.target.value })}
                        className="flex-grow text-xs px-3 py-2 border border-secondary-dark/60 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={() => handleLinkUpdate('heroBg')}
                        disabled={uploadingKey !== null}
                        className="p-2 bg-primary text-white hover:bg-primary-light rounded-xl transition-colors"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* About BG Card */}
                <div className="bg-white rounded-3xl p-6 border border-secondary-dark/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">About Section Cover</h3>
                    <p className="text-xs text-dark/50 font-light mb-4">The narrative image next to the "Sanctuary in the Wild" story block.</p>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-secondary-dark/80 bg-secondary mb-4 shadow-inner">
                      <Image
                        src={config.aboutBg}
                        alt="About BG Thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="relative w-full block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'aboutBg')}
                        disabled={uploadingKey !== null}
                      />
                      <span className="w-full py-2.5 rounded-xl border border-secondary-dark/80 bg-secondary hover:bg-secondary-dark text-xs font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                        <Upload className={`h-3.5 w-3.5 ${uploadingKey === 'aboutBg' ? 'animate-bounce' : ''}`} />
                        {uploadingKey === 'aboutBg' ? 'Uploading...' : 'Replace About Photo'}
                      </span>
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Or paste direct image URL link"
                        value={inputUrls['aboutBg'] || ''}
                        onChange={(e) => setInputUrls({ ...inputUrls, aboutBg: e.target.value })}
                        className="flex-grow text-xs px-3 py-2 border border-secondary-dark/60 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={() => handleLinkUpdate('aboutBg')}
                        disabled={uploadingKey !== null}
                        className="p-2 bg-primary text-white hover:bg-primary-light rounded-xl transition-colors"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 2. Waterfall USP & Videos Section */}
            <div className="border-b border-secondary-dark/60 pb-8">
              <h2 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                <Film className="h-5 w-5 text-accent" />
                monsoon Waterfall & Tour Videos (USP)
              </h2>
              <p className="text-xs text-dark/50 font-light mb-6 -mt-3">
                Upload MP4 clips or paste direct links for your private waterfall showcase and virtual tour bubble. 
                {config?.hasBlobToken ? (
                  <span className="text-emerald-700 font-bold ml-1">✓ Cloud direct-upload is active! You can upload videos of any size with zero restrictions.</span>
                ) : (
                  <span className="text-accent font-semibold ml-1">Note: Enable Vercel Blob inside your Vercel Dashboard Storage tab to upload large files directly.</span>
                )}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Waterfall BG Image Card */}
                <div className="bg-white rounded-3xl p-6 border border-secondary-dark/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">Waterfall Video Thumbnail</h3>
                    <p className="text-xs text-dark/50 font-light mb-4">Fallback image displayed while the waterfall video loads.</p>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-secondary-dark/80 bg-secondary mb-4">
                      <Image
                        src={config.waterfallBg}
                        alt="Waterfall Cover Thumbnail"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="relative w-full block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'waterfallBg')}
                        disabled={uploadingKey !== null}
                      />
                      <span className="w-full py-2.5 rounded-xl border border-secondary-dark/80 bg-secondary hover:bg-secondary-dark text-xs font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                        <Upload className="h-3.5 w-3.5" />
                        Replace Cover Image
                      </span>
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Or paste image URL"
                        value={inputUrls['waterfallBg'] || ''}
                        onChange={(e) => setInputUrls({ ...inputUrls, waterfallBg: e.target.value })}
                        className="flex-grow text-xs px-3 py-2 border border-secondary-dark/60 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={() => handleLinkUpdate('waterfallBg')}
                        disabled={uploadingKey !== null}
                        className="p-2 bg-primary text-white hover:bg-primary-light rounded-xl transition-colors"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Waterfall Video Card */}
                <div className="bg-white rounded-3xl p-6 border border-secondary-dark/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">Waterfall Loop Video</h3>
                    <p className="text-xs text-dark/50 font-light mb-4">The cinematic video for your signature waterfall section.</p>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-secondary-dark/80 bg-secondary mb-4 flex items-center justify-center">
                      <video
                        src={config.waterfallVideo}
                        controls
                        muted
                        className="h-full w-full object-cover"
                        key={config.waterfallVideo}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="relative w-full block">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'waterfallVideo', true)}
                        disabled={uploadingKey !== null}
                      />
                      <span className="w-full py-2.5 rounded-xl border border-secondary-dark/80 bg-secondary hover:bg-secondary-dark text-xs font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                        <Upload className={`h-3.5 w-3.5 ${uploadingKey === 'waterfallVideo' ? 'animate-bounce' : ''}`} />
                        {uploadingKey === 'waterfallVideo' ? 'Uploading...' : 'Replace Video Clip'}
                      </span>
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Or paste video URL"
                        value={inputUrls['waterfallVideo'] || ''}
                        onChange={(e) => setInputUrls({ ...inputUrls, waterfallVideo: e.target.value })}
                        className="flex-grow text-xs px-3 py-2 border border-secondary-dark/60 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={() => handleLinkUpdate('waterfallVideo')}
                        disabled={uploadingKey !== null}
                        className="p-2 bg-primary text-white hover:bg-primary-light rounded-xl transition-colors"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Property Tour Video Card */}
                <div className="bg-white rounded-3xl p-6 border border-secondary-dark/60 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">Virtual Property Tour Video</h3>
                    <p className="text-xs text-dark/50 font-light mb-4">The drone/walkthrough clip loaded inside the floating tour badge.</p>
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-secondary-dark/80 bg-secondary mb-4 flex items-center justify-center">
                      <video
                        src={config.tourVideo}
                        controls
                        muted
                        className="h-full w-full object-cover"
                        key={config.tourVideo}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="relative w-full block">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'tourVideo', true)}
                        disabled={uploadingKey !== null}
                      />
                      <span className="w-full py-2.5 rounded-xl border border-secondary-dark/80 bg-secondary hover:bg-secondary-dark text-xs font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                        <Upload className={`h-3.5 w-3.5 ${uploadingKey === 'tourVideo' ? 'animate-bounce' : ''}`} />
                        {uploadingKey === 'tourVideo' ? 'Uploading...' : 'Replace Tour Clip'}
                      </span>
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Or paste video URL"
                        value={inputUrls['tourVideo'] || ''}
                        onChange={(e) => setInputUrls({ ...inputUrls, tourVideo: e.target.value })}
                        className="flex-grow text-xs px-3 py-2 border border-secondary-dark/60 rounded-xl focus:outline-none"
                      />
                      <button
                        onClick={() => handleLinkUpdate('tourVideo')}
                        disabled={uploadingKey !== null}
                        className="p-2 bg-primary text-white hover:bg-primary-light rounded-xl transition-colors"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. Categorized Gallery Albums Section */}
            <div className="border-b border-secondary-dark/60 pb-8">
              <h2 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-accent" />
                Live Gallery Albums (Up to 3 Photos Each)
              </h2>
              <p className="text-xs text-dark/50 font-light mb-6 -mt-3">
                Upload photos/videos or paste links to update album slides. Categories will sync inside the gallery lightbox.
              </p>

              <div className="space-y-10">
                {ALBUM_SCHEMAS.map((album) => {
                  const albumImages = config.gallery[album.id as keyof GalleryAlbums] || [];
                  const defaultList = defaultSlotImages[album.id] || [];

                  return (
                    <div key={album.id} className="bg-white/50 rounded-3xl p-6 border border-secondary-dark/60 shadow-sm">
                      <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 pb-2 border-b border-secondary-dark">
                        {album.label}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {Array.from({ length: album.size }).map((_, slotIdx) => {
                          const fileUrl = albumImages[slotIdx] || defaultList[slotIdx] || "/images/gallery/villa-exterior-day.jpg";
                          const fieldKey = `gallery-${album.id}-${slotIdx}`;
                          return (
                            <div key={slotIdx} className="bg-white rounded-2xl p-4 border border-secondary-dark/40 shadow-sm flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] font-bold text-primary/50 uppercase block mb-2">
                                  {album.isVideo ? 'Video' : 'Photo'} Slot {slotIdx + 1}
                                </span>
                                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-secondary-dark bg-secondary mb-4 flex items-center justify-center">
                                  {album.isVideo ? (
                                    <video
                                      src={fileUrl}
                                      controls
                                      muted
                                      className="h-full w-full object-cover"
                                      key={fileUrl}
                                    />
                                  ) : (
                                    <Image
                                      src={fileUrl}
                                      alt={`${album.label} Slot ${slotIdx + 1}`}
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-2 mt-2">
                                <label className="relative w-full block">
                                  <input
                                    type="file"
                                    accept={album.isVideo ? "video/mp4,video/webm,video/ogg,video/quicktime" : "image/*"}
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, fieldKey, album.isVideo)}
                                    disabled={uploadingKey !== null}
                                  />
                                  <span className="w-full py-1.5 rounded-lg border border-secondary-dark bg-secondary hover:bg-secondary-dark text-[9px] font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm">
                                    <Upload className="h-3 w-3" />
                                    {uploadingKey === fieldKey ? 'Uploading...' : 'Replace File'}
                                  </span>
                                </label>
                                <div className="flex gap-1.5 items-center">
                                  <input
                                    type="text"
                                    placeholder={album.isVideo ? "Paste video link" : "Paste image link"}
                                    value={inputUrls[fieldKey] || ''}
                                    onChange={(e) => setInputUrls({ ...inputUrls, [fieldKey]: e.target.value })}
                                    className="flex-grow text-[10px] px-2.5 py-1.5 border border-secondary-dark/60 rounded-lg focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleLinkUpdate(fieldKey)}
                                    disabled={uploadingKey !== null}
                                    className="p-1.5 bg-primary text-white hover:bg-primary-light rounded-lg transition-colors"
                                  >
                                    <LinkIcon className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Curated Private Experiences Editor Section */}
            <div>
              <h2 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Curated Private Experiences Editor
              </h2>
              <p className="text-xs text-dark/50 font-light mb-6 -mt-3">
                Update the photos, titles, descriptions, and highlights for your 6 signature estate experiences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {config.experiences?.map((exp) => {
                  const state = expTextStates[exp.id] || { title: '', highlight: '', description: '' };
                  const imgKey = `experience-${exp.id}-image`;

                  return (
                    <div key={exp.id} className="bg-white rounded-3xl p-6 border border-secondary-dark/60 shadow-sm flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Title & Highlight */}
                        <div className="flex items-center justify-between border-b border-secondary-dark pb-2">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Experience Block ({exp.id.toUpperCase()})</span>
                        </div>

                        {/* Image Preview & Upload */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          <div className="relative aspect-video w-full sm:w-40 shrink-0 rounded-xl overflow-hidden border border-secondary-dark bg-secondary">
                            <Image
                              src={exp.image || '/images/gallery/villa-exterior-day.jpg'}
                              alt={exp.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="w-full space-y-2.5">
                            <label className="relative w-full block">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, imgKey)}
                                disabled={uploadingKey !== null}
                              />
                              <span className="w-full py-2 rounded-lg border border-secondary-dark bg-secondary hover:bg-secondary-dark text-[10px] font-bold text-primary tracking-wide uppercase flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm">
                                <Upload className="h-3.5 w-3.5" />
                                {uploadingKey === imgKey ? 'Uploading...' : 'Replace Photo'}
                              </span>
                            </label>
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="text"
                                placeholder="Or paste direct image URL"
                                value={inputUrls[imgKey] || ''}
                                onChange={(e) => setInputUrls({ ...inputUrls, [imgKey]: e.target.value })}
                                className="flex-grow text-[10px] px-2.5 py-1.5 border border-secondary-dark/60 rounded-lg focus:outline-none"
                              />
                              <button
                                onClick={() => handleLinkUpdate(imgKey)}
                                disabled={uploadingKey !== null}
                                className="p-1.5 bg-primary text-white hover:bg-primary-light rounded-lg transition-colors"
                              >
                                <LinkIcon className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Text input fields */}
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-bold text-primary/60 uppercase block mb-1">Experience Title</label>
                            <input
                              type="text"
                              value={state.title}
                              onChange={(e) => handleExpTextChange(exp.id, 'title', e.target.value)}
                              className="w-full text-xs px-3 py-2 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-primary/60 uppercase block mb-1">Highlight Badge text</label>
                            <input
                              type="text"
                              value={state.highlight}
                              onChange={(e) => handleExpTextChange(exp.id, 'highlight', e.target.value)}
                              className="w-full text-xs px-3 py-2 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-primary/60 uppercase block mb-1">Description Narrative</label>
                            <textarea
                              rows={3}
                              value={state.description}
                              onChange={(e) => handleExpTextChange(exp.id, 'description', e.target.value)}
                              className="w-full text-xs px-3 py-2 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent resize-none leading-relaxed"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Save Text button */}
                      <button
                        onClick={() => handleSaveExpText(exp.id)}
                        disabled={uploadingKey !== null}
                        className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        <Save className="h-3.5 w-3.5" />
                        Save Text Details
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Deals, Offers & Updates Popup Window Manager */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-secondary-dark shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/80 mb-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                    <Tag className="h-5 w-5 text-accent" />
                    Deals, Offers & Updates Popup Manager
                  </h2>
                  <p className="text-xs text-dark/60 font-light mt-1">
                    Manage the promotional window that appears to visitors, announcing seasonal discounts, group offers, and packages.
                  </p>
                </div>

                {/* Enable/Disable Toggle */}
                <button
                  type="button"
                  onClick={() => setDealsState(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all shadow-sm ${
                    dealsState.enabled
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-secondary text-dark/60 border border-secondary-dark hover:bg-secondary-dark'
                  }`}
                >
                  {dealsState.enabled ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      <span>Popup Active (Visible to Visitors)</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      <span>Popup Disabled (Hidden)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Badge Text */}
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Offer Badge Label
                    </label>
                    <input
                      type="text"
                      value={dealsState.badge}
                      onChange={(e) => setDealsState(prev => ({ ...prev, badge: e.target.value }))}
                      placeholder="e.g. Monsoon & Weekend Special"
                      className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Promo Code */}
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Mention / Coupon Code
                    </label>
                    <input
                      type="text"
                      value={dealsState.code}
                      onChange={(e) => setDealsState(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                      placeholder="e.g. FAMILYMAULI"
                      className="w-full text-xs font-mono font-bold px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Offer Headline */}
                <div>
                  <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                    Offer Headline / Title
                  </label>
                  <input
                    type="text"
                    value={dealsState.title}
                    onChange={(e) => setDealsState(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Family & Friends Gathering Offer"
                    className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>

                {/* Offer Description */}
                <div>
                  <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                    Offer Narrative / Details
                  </label>
                  <textarea
                    rows={3}
                    value={dealsState.description}
                    onChange={(e) => setDealsState(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the offer details, group size discounts, or seasonal bonus..."
                    className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent resize-none leading-relaxed"
                  />
                </div>

                {/* Perks list */}
                <div>
                  <label className="text-[10px] font-bold text-primary/70 uppercase block mb-2">
                    Deal Highlights & Included Perks
                  </label>
                  <div className="space-y-2 mb-3">
                    {dealsState.perks?.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={perk}
                          onChange={(e) => {
                            const newPerks = [...dealsState.perks];
                            newPerks[idx] = e.target.value;
                            setDealsState(prev => ({ ...prev, perks: newPerks }));
                          }}
                          className="flex-grow text-xs px-3 py-2 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPerks = dealsState.perks.filter((_, i) => i !== idx);
                            setDealsState(prev => ({ ...prev, perks: newPerks }));
                          }}
                          className="p-2 text-dark/40 hover:text-accent rounded-lg transition-colors"
                          title="Remove perk"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new perk or bonus..."
                      value={newPerkInput}
                      onChange={(e) => setNewPerkInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newPerkInput.trim()) {
                            setDealsState(prev => ({ ...prev, perks: [...(prev.perks || []), newPerkInput.trim()] }));
                            setNewPerkInput('');
                          }
                        }
                      }}
                      className="flex-grow text-xs px-3 py-2 border border-secondary-dark/80 rounded-xl focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPerkInput.trim()) {
                          setDealsState(prev => ({ ...prev, perks: [...(prev.perks || []), newPerkInput.trim()] }));
                          setNewPerkInput('');
                        }
                      }}
                      className="px-4 py-2 bg-secondary hover:bg-secondary-dark border border-secondary-dark text-xs font-semibold text-primary rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Perk</span>
                    </button>
                  </div>
                </div>

                {/* Deal Promotional Poster Banner */}
                <div>
                  <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                    Deal Promotional Poster / Banner Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={dealsState.posterImage || ''}
                      onChange={(e) => setDealsState(prev => ({ ...prev, posterImage: e.target.value }))}
                      placeholder="e.g. /images/gallery/pool-deck.jpg or pasted cloud URL"
                      className="flex-grow text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                    />
                    <label className="relative shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingKey('deals-poster');
                          try {
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('key', 'posterImage');
                            const res = await fetch('/api/admin/images', { method: 'POST', body: formData });
                            const data = await res.json();
                            if (data.url) {
                              setDealsState(prev => ({ ...prev, posterImage: data.url }));
                              setStatusMsg({ type: 'success', text: 'Poster image uploaded and attached to deals popup!' });
                            }
                          } catch (err: any) {
                            setStatusMsg({ type: 'error', text: err.message || 'Upload failed' });
                          } finally {
                            setUploadingKey(null);
                          }
                        }}
                      />
                      <span className="px-4 py-2.5 rounded-xl border border-secondary-dark/80 bg-secondary hover:bg-secondary-dark text-xs font-bold text-primary tracking-wide uppercase flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload Poster</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Primary Button Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Action Button Text
                    </label>
                    <input
                      type="text"
                      value={dealsState.ctaText}
                      onChange={(e) => setDealsState(prev => ({ ...prev, ctaText: e.target.value }))}
                      placeholder="e.g. Claim Deal on WhatsApp"
                      className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Save button */}
                <div className="pt-4 border-t border-secondary-dark/80 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleSaveDeals}
                    disabled={uploadingKey !== null}
                    className="px-8 py-3 bg-accent hover:bg-accent-light text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    <span>{uploadingKey === 'deals' ? 'Saving...' : 'Save Deals & Offers'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Live Website Content & Real-Time Notices Manager */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-secondary-dark shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/80 mb-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Website Content & Real-Time Seasonal Notices
                  </h2>
                  <p className="text-xs text-dark/60 font-light mt-1">
                    Update text announcements, seasonal waterfall availability status, Vitthal Rukhmini Mandir details, and property features.
                  </p>
                </div>

                {config.siteContent?.lastUpdated && (
                  <span className="text-[11px] text-dark/60 bg-secondary px-3 py-1.5 rounded-full border border-secondary-dark">
                    Last Published: {new Date(config.siteContent.lastUpdated).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {/* Announcement Bar */}
                <div>
                  <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                    Top Announcement / Welcome Notice
                  </label>
                  <input
                    type="text"
                    value={siteContentState.announcement || ''}
                    onChange={(e) => setSiteContentState(prev => ({ ...prev, announcement: e.target.value }))}
                    placeholder="e.g. Welcome to Mauli Farms! Current Season: Private Swimming Pool, Bonfire Nights..."
                    className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Waterfall Season Status */}
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Waterfall Seasonal Availability Note
                    </label>
                    <input
                      type="text"
                      value={siteContentState.waterfallSeasonStatus || ''}
                      onChange={(e) => setSiteContentState(prev => ({ ...prev, waterfallSeasonStatus: e.target.value }))}
                      placeholder="e.g. Monsoon Seasonal (Active July – Sept) · Pool & Stream Year-Round"
                      className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>

                  {/* Plot Area */}
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Property Plot Area
                    </label>
                    <input
                      type="text"
                      value={siteContentState.plotArea || '1 Acre'}
                      onChange={(e) => setSiteContentState(prev => ({ ...prev, plotArea: e.target.value }))}
                      placeholder="1 Acre"
                      className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vitthal Rukhmini Mandir Note */}
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Vitthal Rukhmini Mandir Feature Note
                    </label>
                    <textarea
                      rows={3}
                      value={siteContentState.templeNote || ''}
                      onChange={(e) => setSiteContentState(prev => ({ ...prev, templeNote: e.target.value }))}
                      placeholder="Describe the peaceful private temple inside your 1-acre property..."
                      className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent resize-none leading-relaxed"
                    />
                  </div>

                  {/* Swimming Pool Note */}
                  <div>
                    <label className="text-[10px] font-bold text-primary/70 uppercase block mb-1">
                      Swimming Pool Feature Note
                    </label>
                    <textarea
                      rows={3}
                      value={siteContentState.poolNote || ''}
                      onChange={(e) => setSiteContentState(prev => ({ ...prev, poolNote: e.target.value }))}
                      placeholder="Describe the 12×24 ft pool, deck, clean water filtration, and views..."
                      className="w-full text-xs px-3.5 py-2.5 border border-secondary-dark/80 rounded-xl focus:outline-none focus:border-accent resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Publish Button */}
                <div className="pt-4 border-t border-secondary-dark/80 flex items-center justify-between">
                  <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                    <span>Saves instantly to live website with real-time timestamp</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveSiteContent}
                    disabled={uploadingKey !== null}
                    className="px-8 py-3 bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
                  >
                    <Save className="h-4 w-4" />
                    <span>{uploadingKey === 'siteContent' ? 'Publishing...' : 'Publish Content Live'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 7. Promotional Posters & Marketing Flyers Manager */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-secondary-dark shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-secondary-dark/80 mb-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-accent" />
                    Promotional Posters & Marketing Flyers Manager
                  </h2>
                  <p className="text-xs text-dark/60 font-light mt-1">
                    Upload new promotional posters, festival banners, or seasonal offer flyers. You can assign any poster to the popup deals window.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Upload New Poster Card */}
                <div className="p-5 rounded-2xl bg-secondary border border-secondary-dark/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Upload New Poster / Banner Graphic
                    </h3>
                    <p className="text-xs text-dark/60 font-light">
                      Supports JPG, PNG, WebP flyers and event posters.
                    </p>
                  </div>

                  <label className="relative shrink-0">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingKey('new-poster');
                        try {
                          const formData = new FormData();
                          formData.append('file', file);
                          formData.append('key', 'posterImage');
                          const res = await fetch('/api/admin/images', { method: 'POST', body: formData });
                          const data = await res.json();
                          if (data.url) {
                            setConfig(data.config);
                            setStatusMsg({ type: 'success', text: 'New marketing poster uploaded and saved successfully!' });
                          }
                        } catch (err: any) {
                          setStatusMsg({ type: 'error', text: err.message || 'Upload failed' });
                        } finally {
                          setUploadingKey(null);
                        }
                      }}
                    />
                    <span className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-sm">
                      <Upload className={`h-4 w-4 ${uploadingKey === 'new-poster' ? 'animate-bounce' : ''}`} />
                      <span>{uploadingKey === 'new-poster' ? 'Uploading...' : 'Upload Poster Flyer'}</span>
                    </span>
                  </label>
                </div>

                {/* Display Current Poster & Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                  {(config.posters || [config.posterImage || '/images/gallery/villa-exterior-day.jpg', '/images/gallery/pool-deck.jpg']).map((posterUrl, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 border border-secondary-dark shadow-sm flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-dark/50 uppercase">Poster {idx + 1}</span>
                          {dealsState.posterImage === posterUrl && (
                            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Active in Deals Popup
                            </span>
                          )}
                        </div>
                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-secondary border border-secondary-dark">
                          <Image
                            src={posterUrl}
                            alt={`Poster ${idx + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setDealsState(prev => ({ ...prev, posterImage: posterUrl }));
                          setStatusMsg({ type: 'success', text: `Selected Poster ${idx + 1} as active deals popup poster!` });
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-semibold transition-all border ${
                          dealsState.posterImage === posterUrl
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-secondary hover:bg-secondary-dark text-primary border-secondary-dark'
                        }`}
                      >
                        {dealsState.posterImage === posterUrl ? 'Active In Deals Popup' : 'Set as Popup Poster'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="h-60 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}
      </main>
    </div>
  );
}
