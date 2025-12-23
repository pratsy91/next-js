import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";

export const metadata = {
  title: "A10.2: Deployment Platforms - Next.js Mastery",
  description: "Complete guide to deploying Next.js Pages Router applications",
};

export default function Lesson2Page() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn/pages-router/a10"
          className="mb-4 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to A10 Lessons
        </Link>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          A10.2: Deployment Platforms
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Learn how to deploy Next.js Pages Router applications to various
          platforms: Vercel, self-hosting, Docker, Node.js server, and static
          hosting.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Vercel Deployment */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            1. Vercel Deployment
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Deploy to Vercel, the platform built by the creators of Next.js.
          </p>

          <CodeBlock
            code={`// Install Vercel CLI
npm i -g vercel

// Deploy from project directory
vercel

// Or deploy to production
vercel --prod

// Vercel automatically detects Next.js and:
// - Runs next build
// - Optimizes for production
// - Configures CDN
// - Sets up environment variables
// - Enables analytics

// vercel.json configuration
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}

// Environment variables
// Set in Vercel dashboard or CLI:
vercel env add DATABASE_URL

// Deploy from Git
// 1. Connect GitHub/GitLab/Bitbucket
// 2. Import repository
// 3. Vercel auto-deploys on push

// Custom domains
// 1. Add domain in Vercel dashboard
// 2. Configure DNS records
// 3. SSL automatically provisioned

// Preview deployments
// Every push creates a preview deployment:
// - Unique URL for each branch/PR
// - Shareable preview links
// - Automatic rollback on failure

// Production deployment
// Deploy to production:
vercel --prod

// Or merge to main branch (if connected to Git)

// Vercel features:
// - Automatic HTTPS
// - Global CDN
// - Serverless functions
// - Edge network
// - Analytics
// - Performance monitoring
// - Preview deployments

// Deployment settings
// vercel.json
{
  "github": {
    "enabled": true,
    "autoAlias": false
  },
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": false
    }
  }
}`}
            language="javascript"
          />
        </section>

        {/* Section 2: Self-hosting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            2. Self-hosting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Host your Next.js application on your own server or infrastructure.
          </p>

          <CodeBlock
            code={`// Build the application
npm run build

// Start production server
npm start

// Or with PM2
pm2 start npm --name "nextjs" -- start

// PM2 ecosystem file
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'nextjs',
      script: 'npm',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};

// Start with PM2
pm2 start ecosystem.config.js

// Nginx reverse proxy
// /etc/nginx/sites-available/nextjs
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

// Enable site
sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

// SSL with Let's Encrypt
sudo certbot --nginx -d example.com

// Systemd service
// /etc/systemd/system/nextjs.service
[Unit]
Description=Next.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/nextjs
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target

// Enable and start service
sudo systemctl enable nextjs
sudo systemctl start nextjs

// Monitoring
// Use PM2 monitoring or systemd journal
pm2 monit
sudo journalctl -u nextjs -f`}
            language="javascript"
          />
        </section>

        {/* Section 3: Docker Deployment */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            3. Docker Deployment
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Containerize your Next.js application with Docker for consistent
            deployments.
          </p>

          <CodeBlock
            code={`// Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

// Build Docker image
docker build -t nextjs-app .

// Run container
docker run -p 3000:3000 nextjs-app

// Docker Compose
// docker-compose.yml
version: '3.8'
services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/db
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

// Start with Docker Compose
docker-compose up -d

// Multi-stage build optimization
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]

// .dockerignore
node_modules
.next
.git
.env*.local
npm-debug.log*
.DS_Store`}
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

          <CodeBlock
            code={`// Custom server
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

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

// Production server with HTTPS
const https = require('https');
const fs = require('fs');

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

https.createServer(httpsOptions, async (req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.statusCode = 500;
    res.end('internal server error');
  }
}).listen(443, () => {
  console.log('> Ready on https://localhost:443');
});

// Server with Express
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/custom', (req, res) => {
    return res.json({ message: 'Custom API route' });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

// Cluster mode for better performance
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork();
  });
} else {
  // Start Next.js server
  const app = next({ dev: false });
  app.prepare().then(() => {
    const server = createServer(async (req, res) => {
      const parsedUrl = parse(req.url, true);
      await app.getRequestHandler()(req, res, parsedUrl);
    });
    server.listen(3000);
  });
}`}
            language="javascript"
          />
        </section>

        {/* Section 5: Static Hosting */}
        <section className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            5. Static Hosting
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Deploy static exports to static hosting platforms.
          </p>

          <CodeBlock
            code={`// Configure for static export
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

// Build static export
npm run build

// Output: out/ directory with static files

// Deploy to GitHub Pages
// 1. Build static export
npm run build

// 2. Deploy to gh-pages branch
// package.json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}

// Install gh-pages
npm install --save-dev gh-pages

// Deploy
npm run deploy

// GitHub Actions workflow
// .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out

// Deploy to Netlify
// netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

// Deploy to AWS S3
// 1. Build static export
npm run build

// 2. Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

// 3. Configure CloudFront (optional)
// For CDN and HTTPS

// Deploy to Firebase Hosting
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

// Deploy
firebase deploy --only hosting

// Deploy to Vercel (static)
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": null
}

// Static hosting platforms:
// - GitHub Pages
// - Netlify
// - AWS S3 + CloudFront
// - Firebase Hosting
// - Vercel (static)
// - Cloudflare Pages
// - Any static file server`}
            language="javascript"
          />
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t pt-8">
          <Link
            href="/learn/pages-router/a10/lesson-1"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            ← Previous: A10.1 Build Process
          </Link>
          <Link
            href="/learn/pages-router/a10/lesson-3"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500"
          >
            Next: A10.3 Production Configuration →
          </Link>
        </div>
      </div>
    </div>
  );
}
