import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes.js";
import { serveStatic, setupVite, log } from "./vite.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  serveStatic(app);
}

// Set up routes
const server = await registerRoutes(app);

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Set up Vite in development
if (process.env.NODE_ENV === "development") {
  await setupVite(app, server);
} else {
  // In production, serve the static files and handle client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/client/index.html"));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  log(`serving on port ${PORT}`);
});