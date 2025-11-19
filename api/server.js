
const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Docker Connection
// Connect to the socket mounted via docker-compose
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// --- CONSTANTS (Mirroring Frontend for Validation) ---
const APP_TEMPLATES = {
  'wp-latest': { image: 'wordpress:latest', port: 80, env: ['WORDPRESS_DB_HOST=mariadb', 'WORDPRESS_DB_USER=nexus_user', 'WORDPRESS_DB_PASSWORD=nexus_password'] },
  'ghost-blog': { image: 'ghost:5-alpine', port: 2368, env: ['url=http://localhost'] },
  'node-stack': { image: 'node:20-alpine', port: 3000, env: ['NODE_ENV=production'] },
  'postgres-db': { image: 'postgres:16', port: 5432, env: ['POSTGRES_PASSWORD=secret'] },
  // Added Nextcloud & n8n
  'nextcloud-server': { image: 'nextcloud:latest', port: 80, env: [] },
  'n8n-workflow': { image: 'n8nio/n8n', port: 5678, env: ['N8N_BASIC_AUTH_ACTIVE=true', 'N8N_BASIC_AUTH_USER=admin', 'N8N_BASIC_AUTH_PASSWORD=password'] }
};

const HOSTING_PLANS = {
  'plan_wp': { cpu: 1000000000, memory: 512 * 1024 * 1024 }, // 1 CPU, 512MB
  'plan_node': { cpu: 2000000000, memory: 2048 * 1024 * 1024 }, // 2 CPU, 2GB
  'plan_stack': { cpu: 4000000000, memory: 8192 * 1024 * 1024 } // 4 CPU, 8GB
};

// --- Helpers ---
const pullImage = async (imageName) => {
  console.log(`[Docker] Pulling image: ${imageName}...`);
  return new Promise((resolve, reject) => {
    docker.pull(imageName, (err, stream) => {
      if (err) return reject(err);
      docker.modem.followProgress(stream, onFinished, onProgress);
      
      function onFinished(err, output) {
        if (err) return reject(err);
        console.log(`[Docker] Pull complete: ${imageName}`);
        resolve(output);
      }
      function onProgress(event) {
        // Optional: Log progress
      }
    });
  });
};

// --- Endpoints ---

// 1. Health Check & Docker Connection Verification
app.get('/api/health', async (req, res) => {
  try {
    const version = await docker.version();
    res.json({
      status: 'ok',
      service: 'nexushost-api',
      dockerConnected: true,
      dockerVersion: version.Version,
      platform: version.Platform.Name
    });
  } catch (error) {
    console.error("Docker Connection Error:", error);
    res.status(500).json({
      status: 'error',
      message: 'Could not connect to Docker Engine. Is /var/run/docker.sock mounted?',
      error: error.message
    });
  }
});

// 2. Service Provisioning (REAL IMPLEMENTATION)
app.post('/api/v1/services/create', async (req, res) => {
  const { templateId, planId, subdomain, zoneId } = req.body;

  console.log(`[API] Provisioning Request: ${subdomain} (${templateId})`);

  const template = APP_TEMPLATES[templateId];
  const plan = HOSTING_PLANS[planId];

  if (!template || !plan) {
    return res.status(400).json({ status: 'error', message: 'Invalid Template or Plan ID' });
  }

  try {
    // Step 1: Pull Image (Ensure it exists on host)
    // Note: In production, you might want to check if image exists first to save time
    await pullImage(template.image);

    // Step 2: Generate Config
    const containerName = `${subdomain}-${Math.random().toString(36).substr(2, 5)}`;
    
    // Determine a random host port (In real prod, use a port manager database)
    // Range: 10000 - 20000
    const hostPort = Math.floor(Math.random() * 10000) + 10000;

    // Step 3: Create Container
    const container = await docker.createContainer({
      Image: template.image,
      name: containerName,
      Env: template.env,
      ExposedPorts: {
        [`${template.port}/tcp`]: {}
      },
      HostConfig: {
        PortBindings: {
          [`${template.port}/tcp`]: [{ HostPort: String(hostPort) }]
        },
        Memory: plan.memory, // Limit RAM
        NanoCpus: plan.cpu,  // Limit CPU
        NetworkMode: 'nexushost-bridge' // Ensure this network exists or use 'bridge'
      }
    });

    console.log(`[Docker] Container Created: ${container.id} (Port: ${hostPort})`);

    // Step 4: Start Container
    await container.start();
    console.log(`[Docker] Container Started`);

    // Step 5: Return Success
    res.json({
      status: 'success',
      message: 'Container provisioned successfully',
      data: {
        serviceId: 'srv-' + container.id.substr(0, 8),
        containerId: container.id,
        publicUrl: `http://${subdomain}.nexushost.app`, // In real setup, this relies on Cloudflare/Nginx
        internalIp: '172.17.0.x', // Placeholder, requires 'inspect' to get real IP
        mappedPort: hostPort
      }
    });

  } catch (error) {
    console.error("Provisioning Failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`NexusHost API running on port ${port}`);
  console.log(`Docker Socket Path: /var/run/docker.sock`);
});
