/**
 * Cloudflare Workers - Video Editor Portfolio
 * Lightweight, serverless version with Matrix rain animation
 */

// Store contact submissions in Durable Objects or external service
const CONTACT_WEBHOOK = "https://your-webhook-url.com/contact"; // Replace with your webhook

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Route: GET / - Serve the homepage
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(getHomePage(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Route: POST /api/contact - Handle contact form submissions
    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const formData = await request.json();

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
          return new Response(
            JSON.stringify({ error: "Missing required fields" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        // Send to external webhook (e.g., Discord, Slack, or email service)
        // This is a placeholder - configure with your actual webhook
        if (CONTACT_WEBHOOK !== "https://your-webhook-url.com/contact") {
          await fetch(CONTACT_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              ...formData,
            }),
          });
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: "Message received! I'll get back to you soon.",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Failed to process request" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Route: 404 Not Found
    return new Response("Not Found", { status: 404 });
  },
};

/**
 * Generate the complete HTML page with Matrix rain animation
 */
function getHomePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Video Editor Portfolio - Redefined</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
    }

    body {
      background: #000;
      color: #fff;
      font-family: 'Space Mono', monospace;
      line-height: 1.6;
    }

    /* Scanlines effect */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 1000;
    }

    /* Matrix Rain Background */
    .matrix-rain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .matrix-char {
      position: absolute;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      color: #00ff00;
      text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
      font-size: 1.2rem;
      opacity: 0.7;
      animation: matrix-fall linear infinite;
    }

    @keyframes matrix-fall {
      0% {
        transform: translateY(-100vh);
        opacity: 1;
      }
      90% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(100vh);
        opacity: 0;
      }
    }

    /* Content wrapper */
    .content {
      position: relative;
      z-index: 10;
    }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.03) 2px,
        rgba(0, 255, 255, 0.03) 4px
      );
      pointer-events: none;
    }

    .hero-content {
      max-width: 900px;
      text-align: center;
      position: relative;
      z-index: 10;
    }

    .error-code {
      font-family: 'Space Mono', monospace;
      color: #ff00ff;
      margin-bottom: 2rem;
      font-size: 0.9rem;
      letter-spacing: 2px;
    }

    .error-code .bracket {
      color: #00ffff;
    }

    h1 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(2.5rem, 10vw, 6rem);
      font-weight: 900;
      margin-bottom: 1.5rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      background: linear-gradient(90deg, #00ffff, #fff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(2px 2px 0 #ff00ff) drop-shadow(-2px -2px 0 #00ffff);
    }

    .subtitle {
      font-size: clamp(1rem, 3vw, 1.5rem);
      color: #00ffff;
      margin-bottom: 2rem;
      letter-spacing: 1px;
    }

    .features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .feature-tag {
      padding: 0.75rem 1.5rem;
      border: 2px solid rgba(0, 255, 255, 0.5);
      background: rgba(0, 255, 255, 0.05);
      color: #00ffff;
      font-size: 0.85rem;
      font-weight: 700;
      transition: all 0.3s ease;
    }

    .feature-tag:hover {
      background: rgba(0, 255, 255, 0.15);
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    }

    .cta-button {
      padding: 1rem 2rem;
      background: #00ffff;
      color: #000;
      border: none;
      font-family: 'Orbitron', sans-serif;
      font-size: 1rem;
      font-weight: 900;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
      text-transform: uppercase;
    }

    .cta-button:hover {
      background: #00dddd;
      box-shadow: 0 0 40px rgba(0, 255, 255, 0.8);
      transform: scale(1.05);
    }

    /* Contact Section */
    .contact-section {
      padding: 4rem 2rem;
      background: linear-gradient(180deg, transparent, rgba(0, 255, 255, 0.05), transparent);
    }

    .contact-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .contact-header h2 {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(2rem, 5vw, 3rem);
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #00ffff, #fff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #00ffff;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      background: rgba(0, 0, 0, 0.6);
      border: 2px solid rgba(0, 255, 255, 0.3);
      color: #fff;
      font-family: 'Space Mono', monospace;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: #00ffff;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      background: rgba(0, 0, 0, 0.8);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: #00ffff;
      color: #000;
      border: none;
      font-family: 'Orbitron', sans-serif;
      font-size: 1rem;
      font-weight: 900;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
    }

    .submit-btn:hover:not(:disabled) {
      background: #00dddd;
      box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
      text-align: center;
      display: none;
    }

    .form-message.success {
      background: rgba(0, 255, 0, 0.1);
      color: #00ff00;
      border: 1px solid #00ff00;
      display: block;
    }

    .form-message.error {
      background: rgba(255, 0, 0, 0.1);
      color: #ff0000;
      border: 1px solid #ff0000;
      display: block;
    }

    /* Footer */
    footer {
      border-top: 1px solid rgba(0, 255, 255, 0.2);
      padding: 2rem;
      text-align: center;
      color: #666;
      font-size: 0.85rem;
      background: rgba(0, 0, 0, 0.5);
    }

    /* Responsive */
    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .features {
        gap: 0.5rem;
      }

      .feature-tag {
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
      }
    }
  </style>
</head>
<body>
  <!-- Matrix Rain Background -->
  <div class="matrix-rain" id="matrixRain"></div>

  <!-- Content -->
  <div class="content">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="error-code">
          <span class="bracket">[</span>
          SYSTEM_INIT_VIDEO_EDIT_PROTOCOL_v2.0
          <span class="bracket">]</span>
        </div>

        <h1>VIDEO EDITING<br>REDEFINED</h1>

        <p class="subtitle">
          <span style="color: #00ffff;">></span> High-tech motion graphics & cinematic storytelling
        </p>

        <div class="features">
          <div class="feature-tag">$ 4K/8K</div>
          <div class="feature-tag">$ VFX</div>
          <div class="feature-tag">$ Color Grade</div>
          <div class="feature-tag">$ Motion Design</div>
          <div class="feature-tag">$ Sound Design</div>
        </div>

        <button class="cta-button" onclick="document.getElementById('contact-section').scrollIntoView({behavior: 'smooth'})">
          ⚡ START YOUR PROJECT
        </button>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section" id="contact-section">
      <div class="contact-container">
        <div class="contact-header">
          <div class="error-code">
            <span class="bracket">[</span>
            CONTACT_PROTOCOL_INITIATED
            <span class="bracket">]</span>
          </div>
          <h2>LET'S CREATE</h2>
          <p style="color: #888;">Send your project details and let's bring your vision to life</p>
        </div>

        <form id="contactForm" onsubmit="handleSubmit(event)">
          <div class="form-group">
            <label for="name"><span style="color: #00ffff;">></span> Name</label>
            <input type="text" id="name" name="name" required placeholder="Your name">
          </div>

          <div class="form-group">
            <label for="email"><span style="color: #00ffff;">></span> Email</label>
            <input type="email" id="email" name="email" required placeholder="your@email.com">
          </div>

          <div class="form-group">
            <label for="projectType"><span style="color: #00ffff;">></span> Project Type</label>
            <select id="projectType" name="projectType" required>
              <option value="">Select a project type</option>
              <option value="commercial">Commercial / Advertising</option>
              <option value="music">Music Video</option>
              <option value="corporate">Corporate Video</option>
              <option value="social">Social Media Content</option>
              <option value="documentary">Documentary</option>
              <option value="animation">Animation / VFX</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message"><span style="color: #00ffff;">></span> Message</label>
            <textarea id="message" name="message" required placeholder="Tell me about your project..."></textarea>
          </div>

          <button type="submit" class="submit-btn">⚡ SEND MESSAGE</button>

          <div id="formMessage" class="form-message"></div>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>
        <span class="bracket">[</span>
        © 2026 VIDEO EDITOR PORTFOLIO
        <span class="bracket">]</span>
      </p>
      <p style="margin-top: 0.5rem; color: #555;">
        <span style="color: #00ffff;">></span> Crafted with precision and passion
      </p>
    </footer>
  </div>

  <script>
    // Matrix Rain Animation
    function initMatrixRain() {
      const container = document.getElementById('matrixRain');
      const matrixChars = 'ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';

      for (let i = 0; i < 150; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        char.style.left = Math.random() * 100 + '%';
        const duration = 15 + Math.random() * 10;
        char.style.animationDuration = duration + 's';
        container.appendChild(char);
      }
    }

    // Handle Contact Form Submission
    async function handleSubmit(event) {
      event.preventDefault();

      const form = document.getElementById('contactForm');
      const submitBtn = form.querySelector('button[type="submit"]');
      const messageDiv = document.getElementById('formMessage');

      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        projectType: document.getElementById('projectType').value,
        message: document.getElementById('message').value,
      };

      // Disable button
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ TRANSMITTING...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          messageDiv.className = 'form-message success';
          messageDiv.textContent = '✓ Message sent! I\'ll get back to you soon.';
          form.reset();
        } else {
          messageDiv.className = 'form-message error';
          messageDiv.textContent = '✗ ' + (data.error || 'Failed to send message');
        }
      } catch (error) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = '✗ Network error. Please try again.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '⚡ SEND MESSAGE';
      }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', initMatrixRain);
  </script>
</body>
</html>`;
}
