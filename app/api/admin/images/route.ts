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
  },
  experiences: [
    {
      id: "exp1",
      title: "Waterfall & Stream Strolls",
      description: "Immerse yourself in our private cascading waterfall and dip your feet in the crystal clear mountain stream flowing directly through the farm.",
      image: "/images/gallery/villa-exterior-3.jpg",
      highlight: "Natural spring water on property"
    },
    {
      id: "exp2",
      title: "Family Stays",
      description: "Bond with family members across spacious lawns, splash in the private pool, and share meals in the grand dining spaces.",
      image: "/images/gallery/villa-exterior-1.jpg",
      highlight: "Private estate exclusively for your family"
    },
    {
      id: "exp3",
      title: "Corporate Retreats",
      description: "Boost team collaboration. Combine high-speed internet work sessions with outdoor stream trails, indoor games, and poolside barbecues.",
      image: "/images/gallery/living-room-1.jpg",
      highlight: "High-speed internet work setup"
    },
    {
      id: "exp4",
      title: "Birthday Celebrations",
      description: "Celebrate your special milestones in a grand setting. Custom decoration, catering, and acoustic bonfire setups can be arranged.",
      image: "/images/gallery/villa-exterior-4.jpg",
      highlight: "Up to 25 guests accommodation"
    },
    {
      id: "exp5",
      title: "Bonfire & Movie Nights",
      description: "Gather around the warm stone bonfire under the starlit sky, roast marshmallows, and projection-screen your favorite movies on the lawn.",
      image: "/images/gallery/pool-view-2.jpg",
      highlight: "150-inch projector screen setup"
    },
    {
      id: "exp6",
      title: "Monsoon Escape",
      description: "Pali transforms into a lush green heaven in the monsoons. Watch waterfalls run off surrounding hills from your cozy room.",
      image: "/images/gallery/villa-exterior-7.jpg",
      highlight: "Breathtaking misty hill views"
    }
  ]
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
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

    // 1. Cloud-storage (Vercel Blob) mode
    if (hasBlobToken) {
      const { blobs } = await list({ prefix: 'custom-images.json' });
      const blob = blobs.find(b => b.pathname === 'custom-images.json');
      if (blob) {
        const res = await fetch(blob.url);
        const config = await res.json();
        return NextResponse.json({ ...config, hasBlobToken: true });
      }
      return NextResponse.json({ ...defaultFallbackConfig, hasBlobToken: true });
    }

    // 2. Local-storage fallback mode
    const data = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(data);
    return NextResponse.json({ ...config, hasBlobToken: false });
  } catch (error) {
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    return NextResponse.json({ ...defaultFallbackConfig, hasBlobToken });
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let file: File | null = null;
    let url: string | null = null;
    let key: string | null = null;
    let payload: any = {};

    if (contentType.includes('application/json')) {
      payload = await req.json();
      key = payload.key;
      url = payload.url;
    } else {
      const formData = await req.formData();
      file = formData.get('file') as File | null;
      url = formData.get('url') as string | null;
      key = formData.get('key') as string | null;
    }

    if (!key) {
      return NextResponse.json({ error: 'Missing configuration key' }, { status: 400 });
    }

    let relativeUrl = url || '';
    let config: any = {};

    // Helper function to update config fields
    const updateConfigFields = (targetConfig: any, pathUrl: string) => {
      if (key === 'heroBg' || key === 'aboutBg' || key === 'waterfallBg' || key === 'waterfallVideo' || key === 'tourVideo') {
        targetConfig[key] = pathUrl;
      } else if (key.startsWith('gallery-')) {
        const parts = key.split('-');
        const category = parts[1];
        const index = parseInt(parts[2], 10);
        
        if (!targetConfig.gallery) targetConfig.gallery = {};
        if (typeof targetConfig.gallery !== 'object' || Array.isArray(targetConfig.gallery)) {
          targetConfig.gallery = {};
        }
        if (!targetConfig.gallery[category]) targetConfig.gallery[category] = [];
        targetConfig.gallery[category][index] = pathUrl;
      } else if (key.startsWith('experience-')) {
        const parts = key.split('-');
        const expId = parts[1];
        const fieldType = parts[2]; // 'image' or 'text'
        
        if (!targetConfig.experiences) {
          targetConfig.experiences = [...defaultFallbackConfig.experiences];
        }
        
        let expIdx = targetConfig.experiences.findIndex((e: any) => e.id === expId);
        if (expIdx === -1) {
          targetConfig.experiences.push({ id: expId, title: '', description: '', image: '', highlight: '' });
          expIdx = targetConfig.experiences.length - 1;
        }

        if (fieldType === 'image') {
          targetConfig.experiences[expIdx].image = pathUrl;
        } else if (fieldType === 'text') {
          targetConfig.experiences[expIdx].title = payload.title !== undefined ? payload.title : targetConfig.experiences[expIdx].title;
          targetConfig.experiences[expIdx].description = payload.description !== undefined ? payload.description : targetConfig.experiences[expIdx].description;
          targetConfig.experiences[expIdx].highlight = payload.highlight !== undefined ? payload.highlight : targetConfig.experiences[expIdx].highlight;
        }
      }
    };

    // 1. Cloud Mode using Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      if (file) {
        const filename = `${key.replace('-', '_')}_${Date.now()}${path.extname(file.name)}`;
        const blobFile = await put(filename, file, { access: 'public' });
        relativeUrl = blobFile.url;
      }

      // Fetch config from Blob
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

      updateConfigFields(config, relativeUrl);

      // Save config back to Vercel Blob
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

    updateConfigFields(config, relativeUrl);

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

    return NextResponse.json({ success: true, url: relativeUrl, config });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Server upload failed' }, { status: 500 });
  }
}
