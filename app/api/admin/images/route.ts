import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { put, list } from '@vercel/blob';

const configPath = path.join(process.cwd(), 'data', 'custom-images.json');
const uploadsDir = path.join(process.cwd(), 'public', 'images', 'uploads');

const defaultFallbackConfig = {
  heroBg: "/images/gallery/villa-exterior-1.jpg",
  aboutBg: "/images/gallery/villa-exterior-2.jpg",
  waterfallBg: "/images/gallery/villa-exterior-3.jpg",
  waterfallVideo: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
  tourVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4",
  gallery: {
    exterior: [
      "/images/gallery/villa-exterior-1.jpg",
      "/images/gallery/villa-exterior-2.jpg",
      "/images/gallery/villa-exterior-3.jpg"
    ],
    living: [
      "/images/gallery/living-room-1.jpg",
      "/images/gallery/living-room-2.jpg"
    ],
    pool: [
      "/images/gallery/pool-view-1.jpg",
      "/images/gallery/pool-view-2.jpg"
    ],
    bedroom: [
      "/images/gallery/bedroom-view-1.png"
    ],
    bathroom: [
      "/images/gallery/villa-exterior-day.jpg"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4"
    ]
  }
};

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function GET() {
  try {
    // 1. Cloud-storage (Vercel Blob) mode
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: 'custom-images.json' });
      const blob = blobs.find(b => b.pathname === 'custom-images.json');
      if (blob) {
        const res = await fetch(blob.url);
        const config = await res.json();
        return NextResponse.json(config);
      }
      return NextResponse.json(defaultFallbackConfig);
    }

    // 2. Local-storage fallback mode
    const data = await fs.readFile(configPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json(defaultFallbackConfig);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const url = formData.get('url') as string | null;
    const key = formData.get('key') as string | null;

    if (!key) {
      return NextResponse.json({ error: 'Missing configuration key' }, { status: 400 });
    }

    if (!file && !url) {
      return NextResponse.json({ error: 'Missing file or URL content' }, { status: 400 });
    }

    let relativeUrl = url || '';
    let config: any = {};

    // 1. Cloud Mode using Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // If file is uploaded, push to Vercel Blob
      if (file) {
        const filename = `${key.replace('-', '_')}_${Date.now()}${path.extname(file.name)}`;
        const blobFile = await put(filename, file, { access: 'public' });
        relativeUrl = blobFile.url;
      }

      // Fetch current config from Blob storage
      const { blobs } = await list({ prefix: 'custom-images.json' });
      const blob = blobs.find(b => b.pathname === 'custom-images.json');
      if (blob) {
        try {
          const res = await fetch(blob.url);
          config = await res.json();
        } catch {
          config = { ...defaultFallbackConfig };
        }
      } else {
        config = { ...defaultFallbackConfig };
      }

      // Update config object
      if (key === 'heroBg' || key === 'aboutBg' || key === 'waterfallBg' || key === 'waterfallVideo' || key === 'tourVideo') {
        config[key] = relativeUrl;
      } else if (key.startsWith('gallery-')) {
        const parts = key.split('-');
        const category = parts[1];
        const index = parseInt(parts[2], 10);
        
        if (!config.gallery) config.gallery = {};
        if (typeof config.gallery !== 'object' || Array.isArray(config.gallery)) {
          config.gallery = {};
        }
        if (!config.gallery[category]) config.gallery[category] = [];
        config.gallery[category][index] = relativeUrl;
      }

      // Overwrite custom-images.json on Vercel Blob
      await put('custom-images.json', JSON.stringify(config, null, 2), {
        access: 'public',
        addRandomSuffix: false,
      });

      return NextResponse.json({ success: true, url: relativeUrl, config });
    }

    // 2. Local-Storage Fallback mode
    if (file) {
      await ensureDirectoryExists(uploadsDir);
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${key.replace('-', '_')}_${Date.now()}${path.extname(file.name)}`;
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, buffer);
      relativeUrl = `/images/uploads/${filename}`;
    }

    try {
      const configData = await fs.readFile(configPath, 'utf-8');
      config = JSON.parse(configData);
    } catch {
      config = { ...defaultFallbackConfig };
    }

    if (key === 'heroBg' || key === 'aboutBg' || key === 'waterfallBg' || key === 'waterfallVideo' || key === 'tourVideo') {
      config[key] = relativeUrl;
    } else if (key.startsWith('gallery-')) {
      const parts = key.split('-');
      const category = parts[1];
      const index = parseInt(parts[2], 10);
      
      if (!config.gallery) config.gallery = {};
      if (typeof config.gallery !== 'object' || Array.isArray(config.gallery)) {
        config.gallery = {};
      }
      if (!config.gallery[category]) config.gallery[category] = [];
      config.gallery[category][index] = relativeUrl;
    }

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

    return NextResponse.json({ success: true, url: relativeUrl, config });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Server upload failed' }, { status: 500 });
  }
}
