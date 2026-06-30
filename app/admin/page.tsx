'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Lock, Home, Image as ImageIcon, Eye, RefreshCw, AlertCircle, CheckCircle2, Film, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface GalleryAlbums {
  exterior: string[];
  living: string[];
  pool: string[];
  bedroom: string[];
  bathroom: string[];
  videos: string[];
}

interface CustomImages {
  heroBg: string;
  aboutBg: string;
  waterfallBg: string;
  waterfallVideo: string;
  tourVideo: string;
  gallery: GalleryAlbums;
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
  
  // Custom states for pasting links manually
  const [inputUrls, setInputUrls] = useState<Record<string, string>>({});

  const ADMIN_PASSCODE = 'mauli123';

  useEffect(() => {
    const authStatus = localStorage.getItem('mauli_admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchConfig();
    }
  }, []);

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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);

    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 413) {
          throw new Error('File exceeds Vercel Serverless size limit (4.5MB). Please compress the file to under 4MB, or upload it to your Vercel Blob dashboard and paste the link below!');
        }
        const errorText = await res.text();
        throw new Error(errorText || 'Server upload failed');
      }

      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setStatusMsg({ type: 'success', text: `${isVideo ? 'Video' : 'Image'} updated successfully!` });
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err: any) {
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
            <p className="text-sm font-light text-dark/60 mt-1">Upload files OR paste cloud links directly to update images and videos</p>
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
                <span className="text-accent font-semibold ml-1">Tip: For video files larger than 4.5MB, upload to the Vercel Blob dashboard and paste the link below!</span>
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
            <div>
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
