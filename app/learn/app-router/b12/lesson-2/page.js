import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "B12.2: Deployment Platforms - Next.js Mastery",
  description: "Complete guide to deployment platforms in Next.js App Router",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/app-router/b12"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to B12 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          B12.2: Deployment Platforms
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to deploy Next.js App Router applications: Vercel
          deployment, self-hosting, Docker deployment, Node.js server, and
          static hosting.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Vercel Deployment */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Vercel Deployment
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Deploy to Vercel, the platform created by the makers of Next.js.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Vercel CLI Deployment
          </h3>
          <CodeBlock
            code={`// Install Vercel CLI
npm i -g vercel

// Login to Vercel
vercel login

// Deploy to production
vercel --prod

// Deploy to preview
vercel

// Link project to Vercel
vercel link

// Environment variables:
vercel env add VARIABLE_NAME

// Or set in Vercel dashboard:
// Settings → Environment Variables

// vercel.json configuration
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            GitHub Integration
          </h3>
          <CodeBlock
            code={`// Connect GitHub repository:
// 1. Go to Vercel dashboard
// 2. Import project
// 3. Connect GitHub repository
// 4. Configure build settings
// 5. Deploy automatically on push

// Automatic deployments:
// - Production: main/master branch
// - Preview: all other branches
// - Pull requests: preview deployments

// Build settings:
// - Framework Preset: Next.js
// - Root Directory: ./
// - Build Command: npm run build
// - Output Directory: .next
// - Install Command: npm install

// Environment variables:
// - Set in Vercel dashboard
// - Different for production/preview/development
// - Automatic injection during build

// Custom domains:
// - Add in Vercel dashboard
// - Automatic SSL certificates
// - DNS configuration

// Vercel features:
// - Edge Functions
// - Image Optimization
// - Analytics
// - Speed Insights
// - Automatic HTTPS
// - Global CDN`}
            language="javascript"
          />
        </section>

        {/* Section 2: Self-Hosting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Self-Hosting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Host Next.js applications on your own servers.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Self-Hosting Setup
          </h3>
          <CodeBlock
            code={`// Build application
npm run build

// Start production server
npm start

// Or directly:
node server.js

// Process management with PM2:
npm install -g pm2

// Start application:
pm2 start npm --name "nextjs-app" -- start

// Or with standalone:
pm2 start .next/standalone/server.js --name "nextjs-app"

// PM2 commands:
pm2 list              # List processes
pm2 logs nextjs-app   # View logs
pm2 restart nextjs-app # Restart
pm2 stop nextjs-app   # Stop
pm2 delete nextjs-app # Delete

// Systemd service (Linux):
// /etc/systemd/system/nextjs-app.service
[Unit]
Description=Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/nextjs-app
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target

// Enable and start:
sudo systemctl enable nextjs-app
sudo systemctl start nextjs-app`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Reverse Proxy (Nginx)
          </h3>
          <CodeBlock
            code={`// Nginx configuration
// /etc/nginx/sites-available/nextjs-app
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

// Enable site:
sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

// SSL with Let's Encrypt:
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com

// Automatic renewal:
sudo systemctl enable certbot.timer`}
            language="nginx"
          />
        </section>

        {/* Section 3: Docker Deployment */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Docker Deployment
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Deploy Next.js applications using Docker containers.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Basic Dockerfile
          </h3>
          <CodeBlock
            code={`// Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

// Build image:
docker build -t my-nextjs-app .

// Run container:
docker run -p 3000:3000 my-nextjs-app

// With environment variables:
docker run -p 3000:3000 \\
  -e DATABASE_URL=postgresql://... \\
  -e API_KEY=secret \\
  my-nextjs-app

// Docker Compose:
// docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - API_KEY=secret
    restart: unless-stopped`}
            language="dockerfile"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Standalone Dockerfile
          </h3>
          <CodeBlock
            code={`// next.config.js
module.exports = {
  output: 'standalone',
};

// Dockerfile with standalone
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]

// Build:
docker build -t my-app .

// Run:
docker run -p 3000:3000 my-app`}
            language="dockerfile"
          />
        </section>

        {/* Section 4: Node.js Server */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            4. Node.js Server
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Deploy Next.js as a Node.js server application.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Custom Server
          </h3>
          <CodeBlock
            code={`// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(\`> Ready on http://\${hostname}:\${port}\`);
  });
});

// package.json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}

// Start production server:
npm start

// With environment variables:
NODE_ENV=production PORT=3000 node server.js`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Express Server
          </h3>
          <CodeBlock
            code={`// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom API route
  server.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

// With middleware
server.use(express.json());
server.use('/api', customMiddleware);

// Production setup
const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(\`> Ready on http://0.0.0.0:\${port}\`);
});`}
            language="javascript"
          />
        </section>

        {/* Section 5: Static Hosting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Static Hosting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Deploy Next.js as static files to static hosting platforms.
          </p>

          <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Export Setup
          </h3>
          <CodeBlock
            code={`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

// Build:
npm run build

// Output: out/ directory

// Deploy to Netlify:
// 1. Connect GitHub repository
// 2. Build command: npm run build
// 3. Publish directory: out
// 4. Deploy automatically

// Deploy to GitHub Pages:
// 1. Build with basePath
// 2. Push out/ to gh-pages branch
// 3. Enable GitHub Pages

// next.config.js for GitHub Pages
module.exports = {
  output: 'export',
  basePath: '/repository-name',
  assetPrefix: '/repository-name',
  images: {
    unoptimized: true,
  },
};

// Deploy script:
// package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}

// Deploy to AWS S3:
aws s3 sync out/ s3://bucket-name --delete

// Deploy to Cloudflare Pages:
// 1. Connect GitHub repository
// 2. Build command: npm run build
// 3. Output directory: out
// 4. Deploy automatically`}
            language="javascript"
          />

          <h3 className="mb-2 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Static Hosting Platforms
          </h3>
          <CodeBlock
            code={`// Supported platforms:
// - Netlify
// - GitHub Pages
// - AWS S3 + CloudFront
// - Cloudflare Pages
// - Vercel (static export)
// - Firebase Hosting

// Netlify deployment:
// netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

// Firebase Hosting:
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

// AWS S3 + CloudFront:
// 1. Build static export
// 2. Upload to S3 bucket
// 3. Configure CloudFront distribution
// 4. Set up custom domain

// Cloudflare Pages:
// - Automatic deployments
// - Global CDN
// - Custom domains
// - SSL certificates
// - Build optimization`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link
            href="/learn/app-router/b12/lesson-1"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Previous: B12.1 Build Process
          </Link>
          <Link
            href="/learn/app-router/b12/lesson-3"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Next: B12.3 Production Configuration →
          </Link>
        </div>
      </div>
    </div>
  );
}
