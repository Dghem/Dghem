/* ============================================
   Dghem Portfolio — JavaScript Engine
   Performance Optimized + Premium Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.protocol === 'file:') {
        document.title = "Access Denied";
        const e = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        if (e) e.remove();
        const t = document.createElement('link');
        t.rel = 'icon';
        t.href = 'data:image/x-icon;base64,';
        document.head.appendChild(t);

        document.body.innerHTML = `
        <div style="min-height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #f9fafb; color: #111827; font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 2rem; margin: 0; position: fixed; inset: 0; z-index: 999999; box-sizing: border-box;">
            <svg style="width: 64px; height: 64px; color: #ef4444; margin-bottom: 1.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; margin-top: 0;">File Protocol is Disabled</h1>
            <p style="color: #4b5563; max-width: 28rem; line-height: 1.5; margin-bottom: 2rem; margin-top: 0;">For security reasons and to ensure all features function correctly, this website cannot be run directly from a local file.</p>
            <a href="https://dghem.site" style="background-color: #2563eb; color: white; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 0.375rem; font-weight: 500; font-size: 0.875rem;">Go to Official Website</a>
        </div>
        `;
        return;
    }

    initLoader();
    init3DWireframe();
    initHeaderScroll();
    initMobileMenu();
    initPremiumScrollReveal();
    initSmoothScroll();
    initSecurity();
    initHeavyScroll();
    initCustomCursor();
    initGlowTrail();
    initPageTransitions();
    initSoundDesign();
    initHackerSignature();
});

// --- Shared Utils ---
let isTabVisible = true;
document.addEventListener('visibilitychange', () => {
    isTabVisible = !document.hidden;
});

function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}


/* ==============================================
   LOADING SCREEN
   ============================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loaderProgressBar');
    const particleCanvas = document.getElementById('loaderParticles');

    if (!loader) {
        setTimeout(() => {
            document.querySelector('.hero')?.classList.add('hero-loaded');
        }, 100);
        return;
    }

    // --- Lightweight particle system ---
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let w = window.innerWidth;
        let h = window.innerHeight;
        particleCanvas.width = w * dpr;
        particleCanvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const dots = [];
        const PARTICLE_COUNT = 30;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            dots.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                size: Math.random() * 1.2 + 0.5,
                alpha: Math.random() * 0.25 + 0.05
            });
        }

        let loaderAnimActive = true;

        function drawLoaderParticles() {
            if (!loaderAnimActive) return;
            ctx.clearRect(0, 0, w, h);

            // Draw dots (simple fills, no gradients)
            dots.forEach(d => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0) d.x = w;
                if (d.x > w) d.x = 0;
                if (d.y < 0) d.y = h;
                if (d.y > h) d.y = 0;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${d.alpha})`;
                ctx.fill();
            });

            // Connecting lines (reduced distance check)
            ctx.lineWidth = 0.4;
            for (let i = 0; i < dots.length; i++) {
                for (let j = i + 1; j < dots.length; j++) {
                    const dx = dots[i].x - dots[j].x;
                    const dy = dots[i].y - dots[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 10000) { // 100px radius, no sqrt needed
                        const lineAlpha = (1 - Math.sqrt(distSq) / 100) * 0.05;
                        ctx.beginPath();
                        ctx.moveTo(dots[i].x, dots[i].y);
                        ctx.lineTo(dots[j].x, dots[j].y);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawLoaderParticles);
        }

        drawLoaderParticles();

        const observer = new MutationObserver(() => {
            if (loader.classList.contains('hidden')) {
                setTimeout(() => { loaderAnimActive = false; }, 1200);
                observer.disconnect();
            }
        });
        observer.observe(loader, { attributes: true, attributeFilter: ['class'] });
    }

    // --- Percentage counter & Progress Bar ---
    let percent = 0;
    let displayPercent = 0;

    const interval = setInterval(() => {
        if (percent < 30) {
            percent += Math.random() * 8 + 4;
        } else if (percent < 70) {
            percent += Math.random() * 4 + 2;
        } else if (percent < 95) {
            percent += Math.random() * 6 + 3;
        } else {
            percent = 100;
        }

        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);

            const countUp = setInterval(() => {
                displayPercent += 2;
                if (displayPercent >= 100) {
                    displayPercent = 100;
                    if (progressBar) progressBar.style.width = '100%';
                    clearInterval(countUp);

                    setTimeout(() => {
                        loader.classList.add('hidden');
                        setTimeout(() => {
                            document.querySelector('.hero')?.classList.add('hero-loaded');
                        }, 400);

                        // Wait for the loader to completely fade out and hero to appear, THEN start 3D materialization
                        setTimeout(() => {
                            if (window.trigger3DSpawn) window.trigger3DSpawn();
                        }, 800);
                    }, 1800);
                } else {
                    if (progressBar) progressBar.style.width = displayPercent + '%';
                }
            }, 15);
        } else {
            displayPercent = Math.floor(percent);
            if (progressBar) progressBar.style.width = displayPercent + '%';
        }
    }, 60);
}


/* ==============================================
   3D GEODESIC SPHERE — Performance Optimized
   ============================================== */
function init3DWireframe() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = 'grab';

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: 0.5, y: 0.5 };

    let isSpawned = false;
    let spawnProgress = 0;
    let timeScale = 1.0;

    window.trigger3DSpawn = function () {
        isSpawned = true;
        window._hasEmittedBurst = false;
        timeScale = 1.0;
    };

    let smoothMouse = { x: 0.5, y: 0.5 };
    let time = 0;
    let isHeroVisible = true;

    let isDragging = false;
    let dragRotX = 0, dragRotY = 0;
    let dragVelocityX = 0, dragVelocityY = 0;
    let lastDragX = 0, lastDragY = 0;
    let mouseScreenX = -999, mouseScreenY = -999;

    const particles = [];
    const MAX_PARTICLES = 20;
    let nearestVertexIdx = -1;
    let scrollProgress = 0;

    // --- Pause when hero is not visible ---
    const heroSection = canvas.closest('.hero') || canvas.parentElement;
    const visObserver = new IntersectionObserver((entries) => {
        isHeroVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    visObserver.observe(heroSection);

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const debouncedResize = debounce(resize, 150);
    window.addEventListener('resize', debouncedResize);

    window.addEventListener('scroll', () => {
        scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
    }, { passive: true });

    /* --- Geodesic sphere generation --- */
    function generateGeodesicSphere(subdivisions) {
        const t = (1 + Math.sqrt(5)) / 2;
        let verts = [
            [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
            [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
            [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
        ];
        verts = verts.map(v => {
            const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            return {
                dx: v[0] / len, dy: v[1] / len, dz: v[2] / len,
                sx: (v[0] / len) * 40 + (Math.random() - 0.5) * 20,
                sy: (v[1] / len) * 40 + (Math.random() - 0.5) * 20,
                sz: (v[2] / len) * 40 + (Math.random() - 0.5) * 20,
                x: 0, y: 0, z: 0
            };
        });

        let faces = [
            [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
            [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
            [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
            [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
        ];

        const midpointCache = {};
        function getMidpoint(i1, i2) {
            const key = Math.min(i1, i2) + '_' + Math.max(i1, i2);
            if (midpointCache[key] !== undefined) return midpointCache[key];
            const v1 = verts[i1], v2 = verts[i2];
            const mx = (v1.dx + v2.dx) / 2, my = (v1.dy + v2.dy) / 2, mz = (v1.dz + v2.dz) / 2;
            const len = Math.sqrt(mx * mx + my * my + mz * mz);
            verts.push({
                dx: mx / len, dy: my / len, dz: mz / len,
                sx: (mx / len) * 40 + (Math.random() - 0.5) * 20,
                sy: (my / len) * 40 + (Math.random() - 0.5) * 20,
                sz: (mz / len) * 40 + (Math.random() - 0.5) * 20,
                x: 0, y: 0, z: 0
            });
            midpointCache[key] = verts.length - 1;
            return verts.length - 1;
        }

        for (let s = 0; s < subdivisions; s++) {
            const newFaces = [];
            faces.forEach(([a, b, c]) => {
                const ab = getMidpoint(a, b), bc = getMidpoint(b, c), ca = getMidpoint(c, a);
                newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
            });
            faces = newFaces;
        }

        const edgeSet = new Set();
        const edges = [];
        faces.forEach(([a, b, c]) => {
            [[a, b], [b, c], [c, a]].forEach(([i, j]) => {
                const key = Math.min(i, j) + '_' + Math.max(i, j);
                if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([i, j]); }
            });
        });

        return { vertices: verts, edges, faces };
    }

    const shape = generateGeodesicSphere(2);

    function rotateY(v, a) { const c = Math.cos(a), s = Math.sin(a); return { x: v.x * c - v.z * s, y: v.y, z: v.x * s + v.z * c }; }
    function rotateX(v, a) { const c = Math.cos(a), s = Math.sin(a); return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c }; }
    function rotateZ(v, a) { const c = Math.cos(a), s = Math.sin(a); return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z }; }

    function project(v) {
        const breathe = 1 + Math.sin(time * 1.5) * 0.015;
        // Cinematic Zoom-out during spawn
        const spawnZoom = 1 + Math.pow(1 - spawnProgress, 4) * 4.0; // Starts 5x larger, zooms out to 1x
        const baseScale = 300 * (Math.min(width, height) / 900) * breathe * spawnZoom;
        const scrollScale = 1 - scrollProgress * 0.3;
        const scale = baseScale * scrollScale;
        const perspective = 3.5;
        const factor = perspective / (perspective + v.z);
        const scrollOffsetY = scrollProgress * -60;
        return {
            x: width * 0.62 + v.x * scale * factor,
            y: height * 0.45 + v.y * scale * factor + scrollOffsetY,
            depth: v.z,
            scale: factor
        };
    }

    function getLight() {
        const lx = 0.4 + (smoothMouse.x - 0.5) * 0.4;
        const ly = 0.6 + (smoothMouse.y - 0.5) * 0.3;
        const lz = -0.7;
        const len = Math.sqrt(lx * lx + ly * ly + lz * lz);
        return { x: lx / len, y: ly / len, z: lz / len };
    }

    function spawnParticle(x, y) {
        if (particles.length >= MAX_PARTICLES) return;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.6;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.2,
            life: 1.0,
            decay: 0.01 + Math.random() * 0.015,
            size: 0.5 + Math.random() * 1,
        });
    }

    /* --- Main draw loop --- */
    function draw() {
        // Skip rendering when not visible or tab hidden
        if (!isHeroVisible || !isTabVisible) {
            requestAnimationFrame(draw);
            return;
        }

        // Slow-motion recovery (Matrix bullet-time effect)
        if (window._hasEmittedBurst && timeScale < 1.0) {
            timeScale += (1.0 - timeScale) * 0.015; // Slow recovery
        } else if (!window._hasEmittedBurst) {
            timeScale = 1.0;
        }

        time += 0.002 * timeScale;

        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.035 * timeScale;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.035 * timeScale;

        if (!isDragging) {
            dragVelocityX *= 0.975;
            dragVelocityY *= 0.975;
            dragRotX += dragVelocityX;
            dragRotY += dragVelocityY;
        }

        const light = getLight();

        if (isSpawned && spawnProgress < 1) {
            spawnProgress += (1 - spawnProgress) * 0.025; // Slower, majestic formation
            if (spawnProgress > 0.999) spawnProgress = 1;
        }

        // --- Multi-stage Cinematic Initialization ---
        const vertexSnapEase = 1 - Math.pow(1 - spawnProgress, 7);
        const vertexRenderProg = Math.min(1, spawnProgress * 2.5); // 0.0 - 0.4
        const edgeRenderProg = Math.min(1, Math.max(0, (spawnProgress - 0.2) * 2)); // 0.2 - 0.7
        const faceRenderProg = Math.min(1, Math.max(0, (spawnProgress - 0.5) * 2)); // 0.5 - 1.0

        const isFatal = document.body.classList.contains('theme-hacked-fatal');

        shape.vertices.forEach((v, i) => {
            // Sci-fi glitch jitter that settles as it snaps
            const jitterAmt = Math.pow(1 - spawnProgress, 3) * 8;
            const jx = Math.sin(time * 15 + i) * jitterAmt;
            const jy = Math.cos(time * 17 + i) * jitterAmt;
            const jz = Math.sin(time * 19 + i) * jitterAmt;

            let tDx = v.dx, tDy = v.dy, tDz = v.dz;

            if (isFatal) {
                const ratio = i / shape.vertices.length;
                let vx, vy;
                if (ratio < 0.5) {
                    const r = ratio * 2;
                    vx = -0.8 + r * 0.8;
                    vy = 0.8 - r * 1.6;
                } else {
                    const r = (ratio - 0.5) * 2;
                    vx = r * 0.8;
                    vy = -0.8 + r * 1.6;
                }
                let vz = Math.sin(i * 13) * 0.2;

                vx += Math.sin(time * 40 + i) * 0.05;
                vy += Math.cos(time * 43 + i) * 0.05;

                if (v._vProg === undefined) v._vProg = 0;
                v._vProg += (1 - v._vProg) * 0.03;

                tDx = v.dx + (vx * 2 - v.dx) * v._vProg;
                tDy = v.dy + (vy * 2 - v.dy) * v._vProg;
                tDz = v.dz + (vz * 2 - v.dz) * v._vProg;
            }

            v.x = v.sx + (tDx - v.sx) * vertexSnapEase + jx;
            v.y = v.sy + (tDy - v.sy) * vertexSnapEase + jy;
            v.z = v.sz + (tDz - v.sz) * vertexSnapEase + jz;
        });

        // Massive but smooth initial multi-axis spin
        const autoRotY = time * 0.8 + Math.pow(1 - spawnProgress, 3) * 20;
        const autoRotX = Math.pow(1 - spawnProgress, 3) * 10;

        const hoverInfluence = isDragging ? 0 : 1;
        const rotXAngle = -0.25 + autoRotX + (smoothMouse.y - 0.5) * 0.8 * hoverInfluence + dragRotX;
        const rotYAngle = autoRotY + (smoothMouse.x - 0.5) * 1.2 * hoverInfluence + dragRotY;
        const rotZAngle = Math.sin(time * 0.7) * 0.06;

        ctx.clearRect(0, 0, width, height);

        ctx.save();
        const isHacked = document.body.classList.contains('theme-hacked') || isFatal;
        const rgbWhite = isHacked ? '0, 255, 65' : '255, 255, 255';
        const rgbCyan = isHacked ? '0, 255, 65' : '34, 211, 238';

        // Screen Shake during impact
        if (window._hasEmittedBurst && timeScale < 0.8) {
            const shake = (0.8 - timeScale) * 15; // Up to 12px shake
            ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
        }

        // 1. Digital Glitch Scanlines during spawn
        if (spawnProgress < 1 && Math.random() < 0.15) {
            const glitchIntensity = Math.pow(1 - spawnProgress, 2);
            ctx.fillStyle = `rgba(${rgbCyan}, ${Math.random() * 0.15 * glitchIntensity})`;
            const numLines = Math.floor(Math.random() * 3) + 1;
            for (let l = 0; l < numLines; l++) {
                ctx.fillRect(0, Math.random() * height, width, Math.random() * 4 + 1);
            }
        }

        // 2. Particle Burst & Time Freeze at climax
        if (spawnProgress > 0.95 && !window._hasEmittedBurst) {
            window._hasEmittedBurst = true;
            timeScale = 0.05; // Engage extreme slow-mo

            for (let i = 0; i < 45; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 8; // High explosion velocity
                particles.push({
                    x: width * 0.62, y: height * 0.45 + scrollProgress * -60,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1.0,
                    decay: 0.015 + Math.random() * 0.02,
                    size: 1 + Math.random() * 2.5,
                });
            }
        }

        // Lens Flare / Burst Anamorphic Glare
        if (window._hasEmittedBurst && timeScale < 0.9) {
            const flareIntensity = (0.9 - timeScale) / 0.85; // 1 to 0
            const flareY = height * 0.45 + scrollProgress * -60;
            const flareW = width * 1.5 * flareIntensity;

            const flareGrad = ctx.createRadialGradient(width * 0.62, flareY, 0, width * 0.62, flareY, flareW / 2);
            flareGrad.addColorStop(0, `rgba(${rgbWhite}, ${flareIntensity})`);
            flareGrad.addColorStop(0.1, `rgba(${rgbCyan}, ${flareIntensity * 0.8})`);
            flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = flareGrad;
            ctx.beginPath();
            ctx.ellipse(width * 0.62, flareY, flareW / 2, 10 * flareIntensity, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(${rgbWhite}, ${flareIntensity * 0.8})`;
            ctx.fillRect(width * 0.62 - flareW / 2, flareY - 1, flareW, 2);
            ctx.globalCompositeOperation = 'source-over';
        }

        // Context alpha limits max brightness before face sequence completes
        ctx.globalAlpha = Math.min(1, spawnProgress * 2);

        const transformed = shape.vertices.map(v => {
            let r = rotateY(v, rotYAngle);
            r = rotateX(r, rotXAngle);
            r = rotateZ(r, rotZAngle);
            return r;
        });

        const projected = transformed.map(v => project(v));

        // Find nearest vertex
        nearestVertexIdx = -1;
        let nearestDist = Infinity;
        for (let i = 0; i < projected.length; i++) {
            if (transformed[i].z > 0.3) continue;
            const dx = projected[i].x - mouseScreenX;
            const dy = projected[i].y - mouseScreenY;
            const dist = dx * dx + dy * dy; // no sqrt needed for comparison
            if (dist < nearestDist && dist < 10000) { // 100px²
                nearestDist = dist;
                nearestVertexIdx = i;
            }
        }

        // Ambient glow (single, simple)
        const cx = width * 0.62;
        const cy = height * 0.45 + scrollProgress * -60;
        const glowSize = 280 * (Math.min(width, height) / 900);
        const pulse = 0.6 + Math.sin(time * 1.8) * 0.2;
        const spawnFlash = Math.max(0, Math.sin(Math.pow(spawnProgress, 2) * Math.PI)) * 0.8; // Peak flash near end of spawn
        const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowSize);
        outerGlow.addColorStop(0, `rgba(${rgbCyan}, ${0.02 * pulse + spawnFlash * 0.15})`);
        outerGlow.addColorStop(0.5, `rgba(${rgbWhite}, ${0.008 * pulse + spawnFlash * 0.05})`);
        outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(cx, cy, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Draw faces (batched fill style changes)
        const facesWithDepth = shape.faces.map(([a, b, c]) => {
            const avgZ = (transformed[a].z + transformed[b].z + transformed[c].z) / 3;
            const ax2 = transformed[b].x - transformed[a].x, ay2 = transformed[b].y - transformed[a].y, az2 = transformed[b].z - transformed[a].z;
            const bx2 = transformed[c].x - transformed[a].x, by2 = transformed[c].y - transformed[a].y, bz2 = transformed[c].z - transformed[a].z;
            const nx = ay2 * bz2 - az2 * by2, ny = az2 * bx2 - ax2 * bz2, nz = ax2 * by2 - ay2 * bx2;
            const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
            const dot = (nx / nLen) * light.x + (ny / nLen) * light.y + (nz / nLen) * light.z;
            return { indices: [a, b, c], avgZ, dot };
        });

        facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

        facesWithDepth.forEach(face => {
            if (faceRenderProg <= 0) return; // Skip faces if not in that stage yet

            const [a, b, c] = face.indices;

            if (isFatal) {
                const aLeft = a / shape.vertices.length < 0.5;
                const bLeft = b / shape.vertices.length < 0.5;
                const cLeft = c / shape.vertices.length < 0.5;
                if (aLeft !== bLeft || bLeft !== cLeft) return;
            }

            const pa = projected[a], pb = projected[b], pc = projected[c];
            const cross = (pb.x - pa.x) * (pc.y - pa.y) - (pb.y - pa.y) * (pc.x - pa.x);
            if (cross < 0) return;

            // Sequential face rendering based on indices for a "scanline" materialization effect
            const fOffset = ((a * 11 + b * 13 + c * 17) % 100) / 100 * 0.6;
            let fProg = Math.max(0, Math.min(1, (faceRenderProg - fOffset) * 2.5));
            if (fProg <= 0) return;

            let brightness = (0.035 + Math.max(0, face.dot) * 0.09) * fProg;
            const isHovered = nearestVertexIdx !== -1 && (a === nearestVertexIdx || b === nearestVertexIdx || c === nearestVertexIdx);
            if (isHovered) brightness += 0.08;

            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.lineTo(pc.x, pc.y);
            ctx.closePath();
            ctx.fillStyle = isHovered
                ? `rgba(${rgbCyan}, ${brightness * 0.5})`
                : `rgba(${rgbWhite}, ${brightness})`;
            ctx.fill();
        });

        // Draw edges (no shadowBlur — it's very expensive)
        shape.edges.forEach(([a, b]) => {
            if (edgeRenderProg <= 0) return;

            if (isFatal) {
                const aLeft = a / shape.vertices.length < 0.5;
                const bLeft = b / shape.vertices.length < 0.5;
                if (aLeft !== bLeft) return;
            }

            const pa = projected[a], pb = projected[b];
            const avgDepth = (pa.depth + pb.depth) / 2;
            let opacity = Math.max(0.05, Math.min(0.4, 0.25 - avgDepth * 0.1));
            const isNearestEdge = nearestVertexIdx !== -1 && (a === nearestVertexIdx || b === nearestVertexIdx);

            // "Laser draw" effect: edges extend from vertex A to B
            const eOffset = ((a * 23 + b * 29) % 100) / 100 * 0.4;
            let localProg = Math.max(0, Math.min(1, (edgeRenderProg - eOffset) * 1.8));
            if (localProg <= 0) return;

            const endX = pa.x + (pb.x - pa.x) * localProg;
            const endY = pa.y + (pb.y - pa.y) * localProg;

            if (isNearestEdge) opacity = Math.min(0.8, opacity + 0.35);

            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = isNearestEdge
                ? `rgba(${rgbCyan}, ${opacity})`
                : `rgba(${rgbWhite}, ${opacity})`;
            ctx.lineWidth = isNearestEdge ? 1.3 : 0.6;
            ctx.stroke();

            // Draw a bright tip at the leading edge if it's currently materializing
            if (localProg > 0 && localProg < 1) {
                ctx.fillStyle = `rgba(${rgbCyan}, ${opacity + 0.5})`;
                ctx.fillRect(endX - 1.5, endY - 1.5, 3, 3);
            }
        });

        // Draw vertices (simple — no per-vertex gradients for non-hovered)
        projected.forEach((p, i) => {
            if (vertexRenderProg <= 0) return;
            const vOffset = (i * 37 % 100) / 100 * 0.3;
            let vProg = Math.max(0, Math.min(1, (vertexRenderProg - vOffset) * 2));
            if (vProg <= 0) return;

            const depth = transformed[i].z;
            let opacity = Math.max(0.06, Math.min(0.7, 0.45 - depth * 0.18)) * vProg;
            let radius = Math.max(0.8, 1.8 * p.scale) * vProg;
            const isNearest = (i === nearestVertexIdx);

            if (isNearest) {
                opacity = 1.0;
                radius *= 3;

                // Pulsing ring
                const ringPulse = 0.5 + Math.sin(time * 20) * 0.3;
                const ringRadius = radius * 3 + ringPulse * 5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${rgbCyan}, ${0.3 + ringPulse * 0.15})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Glow (only for hovered vertex)
                const glowR = radius * 5;
                const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
                glowGrad.addColorStop(0, `rgba(${rgbCyan}, 0.5)`);
                glowGrad.addColorStop(0.4, `rgba(${rgbCyan}, 0.15)`);
                glowGrad.addColorStop(1, `rgba(${rgbCyan}, 0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = glowGrad;
                ctx.fill();

                if (Math.random() < 0.3) spawnParticle(p.x, p.y);
            }

            // Core dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = isNearest
                ? `rgba(${rgbCyan}, ${opacity})`
                : `rgba(${rgbWhite}, ${opacity})`;
            ctx.fill();
        });

        // Floating particles (simple opacity fade, no gradients)
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * timeScale;
            p.y += p.vy * timeScale;
            // Particles decay slower during bullet-time
            p.life -= p.decay * timeScale;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgbCyan}, ${p.life * 0.5})`;
            ctx.fill();
        }

        ctx.restore();
        requestAnimationFrame(draw);
    }

    resize();
    draw();

    // --- Event listeners ---
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseScreenX = e.clientX - rect.left;
        mouseScreenY = e.clientY - rect.top;

        if (isDragging) {
            dragVelocityX = (e.clientY - lastDragY) * 0.003;
            dragVelocityY = (e.clientX - lastDragX) * 0.003;
            dragRotX += dragVelocityX;
            dragRotY += dragVelocityY;
            lastDragX = e.clientX;
            lastDragY = e.clientY;
        }
    });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX / window.innerWidth;
        mouse.y = e.clientY / window.innerHeight;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseScreenX = -999;
        mouseScreenY = -999;
    });

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        canvas.style.cursor = 'grabbing';
        lastDragX = e.clientX;
        lastDragY = e.clientY;
        dragVelocityX = 0;
        dragVelocityY = 0;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            canvas.style.cursor = 'grab';
        }
    });

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            lastDragX = e.touches[0].clientX;
            lastDragY = e.touches[0].clientY;
            dragVelocityX = 0;
            dragVelocityY = 0;
        }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging) {
            dragVelocityX = (e.touches[0].clientY - lastDragY) * 0.003;
            dragVelocityY = (e.touches[0].clientX - lastDragX) * 0.003;
            dragRotX += dragVelocityX;
            dragRotY += dragVelocityY;
            lastDragX = e.touches[0].clientX;
            lastDragY = e.touches[0].clientY;

            const rect = canvas.getBoundingClientRect();
            mouseScreenX = e.touches[0].clientX - rect.left;
            mouseScreenY = e.touches[0].clientY - rect.top;
        }
        mouse.x = e.touches[0].clientX / window.innerWidth;
        mouse.y = e.touches[0].clientY / window.innerHeight;
    }, { passive: true });

    canvas.addEventListener('touchend', () => { isDragging = false; }, { passive: true });
}


/* ==============================================
   HEADER SCROLL
   ============================================== */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    let lastScrolled = false;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;
        if (scrolled !== lastScrolled) {
            header.classList.toggle('scrolled', scrolled);
            lastScrolled = scrolled;
        }
    }, { passive: true });
}


/* ==============================================
   MOBILE MENU
   ============================================== */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}


/* ==============================================
   PREMIUM SCROLL REVEAL
   ============================================== */
function initPremiumScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.scrollDelay || 0;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    const sections = document.querySelectorAll('.projects, .footer');
    sections.forEach(section => {
        const revealables = section.querySelectorAll(
            '.section-label, .section-title, .section-subtitle, .project-card, ' +
            '.footer-cta-title, .footer-cta-text, .discord-btn, .reveal'
        );
        revealables.forEach((el, i) => {
            el.dataset.scrollDelay = i * 150;
            observer.observe(el);
        });
    });

    const standalone = document.querySelectorAll('.hero .section-label, .hero .section-title');
    standalone.forEach(el => observer.observe(el));
}


/* ==============================================
   HEAVY SCROLL — Cinematic Inertia + Parallax
   ============================================== */
function initHeavyScroll() {
    if ('ontouchstart' in window || window.innerWidth <= 768) return;

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let isScrolling = false;

    const ease = 0.055;
    const scrollMultiplier = 1.2;

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    const heroContent = document.querySelector('.hero-content');
    const heroVideoBg = document.querySelector('.hero-video-bg');
    const scrollHint = document.querySelector('.scroll-hint');

    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        targetScroll += e.deltaY * scrollMultiplier;
        targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

        if (!isScrolling) {
            isScrolling = true;
            smoothScrollLoop();
        }
    }, { passive: false });

    function smoothScrollLoop() {
        const diff = targetScroll - currentScroll;
        currentScroll += diff * ease;

        if (Math.abs(diff) < 0.5) {
            currentScroll = targetScroll;
            window.scrollTo(0, currentScroll);
            isScrolling = false;
            updateParallax();
            return;
        }

        window.scrollTo(0, currentScroll);
        updateParallax();
        requestAnimationFrame(smoothScrollLoop);
    }

    function updateParallax() {
        const scrollY = currentScroll;
        const vh = window.innerHeight;
        const scrollRatio = Math.min(scrollY / vh, 1);
        const totalHeight = document.body.scrollHeight - vh;

        const progress = totalHeight > 0 ? (scrollY / totalHeight) : 0;
        progressBar.style.transform = `scaleX(${progress})`;

        if (heroContent) {
            heroContent.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
            heroContent.style.opacity = Math.max(0, 1 - scrollRatio * 1.5);
        }

        if (heroVideoBg) {
            heroVideoBg.style.transform = `scale(1.15) translate3d(0, ${scrollY * 0.15}px, 0)`;
        }

        if (scrollHint) {
            scrollHint.style.opacity = 1 - Math.min(scrollY / 150, 1);
            scrollHint.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }

    window.addEventListener('scroll', () => {
        if (Math.abs(window.scrollY - currentScroll) > 2 && !isScrolling) {
            currentScroll = window.scrollY;
            targetScroll = window.scrollY;
            updateParallax();
        }
    }, { passive: true });

    updateParallax();
}


/* ==============================================
   SMOOTH SCROLL
   ============================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = document.querySelector('.header')?.offsetHeight || 72;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - offset - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}


/* ==============================================
   SECURITY
   ============================================== */
function initSecurity() {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showNotification('Right-click is disabled', 'red');
    });

    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
            (e.metaKey && e.altKey && e.key === 'I')
        ) {
            e.preventDefault();
            showNotification('Developer tools are disabled', 'red');
        }
    });
}


/* ==============================================
   NOTIFICATION
   ============================================== */
function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.className = `notification ${type || ''}`;
    el.innerHTML = `<i class="fas fa-${type === 'red' ? 'shield-alt' : 'check-circle'}"></i> ${message}`;
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 400);
    }, 3000);
}


/* ==============================================
   COPY USERNAME (Contact Page)
   ============================================== */
function copyUsername() {
    const el = document.querySelector('.username');
    if (!el) return;

    navigator.clipboard.writeText(el.textContent.trim())
        .then(() => showNotification('Username copied to clipboard!', ''))
        .catch(() => showNotification('Failed to copy', 'red'));
}


/* ==============================================
   CUSTOM CURSOR — GPU Accelerated
   ============================================== */
function initCustomCursor() {
    if ('ontouchstart' in window || window.matchMedia('(hover: none)').matches) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let dotX = -100, dotY = -100;
    let isVisible = false;

    const hoverSelectors = 'a, button, .btn-primary, .btn-ghost, .project-card, .copy-btn, .back-btn, .discord-btn, .menu-toggle, .nav-link, .header-logo, .username';

    function moveCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            dot.classList.add('visible');
            ring.classList.add('visible');
        }
    }

    function animateCursor() {
        if (!isTabVisible) {
            requestAnimationFrame(animateCursor);
            return;
        }

        dotX += (mouseX - dotX) * 0.9;
        dotY += (mouseY - dotY) * 0.9;
        dot.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`;

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;

        requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', moveCursor);

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.classList.remove('visible');
        ring.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
        isVisible = true;
        dot.classList.add('visible');
        ring.classList.add('visible');
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            dot.classList.add('hovering');
            ring.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            dot.classList.remove('hovering');
            ring.classList.remove('hovering');
        }
    });

    document.addEventListener('mousedown', () => {
        dot.classList.add('clicking');
        ring.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        dot.classList.remove('clicking');
        ring.classList.remove('clicking');
    });

    animateCursor();
}


/* ==============================================
   GLOW TRAIL — Lightweight Canvas Trail
   ============================================== */
function initGlowTrail() {
    if ('ontouchstart' in window || window.matchMedia('(hover: none)').matches) return;

    const canvas = document.getElementById('cursorGlowCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    const trail = [];
    const MAX_TRAIL = 12;
    let mouseX = -100, mouseY = -100;
    let frameCount = 0;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', debounce(resize, 200));

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function draw() {
        if (!isTabVisible) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        frameCount++;

        // Add point every other frame to reduce trail density
        if (frameCount % 2 === 0) {
            trail.push({ x: mouseX, y: mouseY });
            if (trail.length > MAX_TRAIL) trail.shift();
        }

        // Draw trail as a fading line
        if (trail.length > 1) {
            for (let i = 1; i < trail.length; i++) {
                const progress = i / trail.length;
                const alpha = progress * 0.15;
                const lineWidth = progress * 8;

                ctx.beginPath();
                ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
                ctx.lineTo(trail[i].x, trail[i].y);
                ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }

        // Small glow at cursor (single gradient, not per-trail-point)
        if (mouseX > 0 && mouseY > 0) {
            const mainGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 25);
            mainGlow.addColorStop(0, 'rgba(34, 211, 238, 0.1)');
            mainGlow.addColorStop(1, 'rgba(34, 211, 238, 0)');
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 25, 0, Math.PI * 2);
            ctx.fillStyle = mainGlow;
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    draw();
}


/* ==============================================
   PAGE TRANSITIONS — Cinematic Slide
   ============================================== */
function initPageTransitions() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    window.addEventListener('load', () => {
        transition.classList.add('leaving');
        setTimeout(() => {
            transition.classList.remove('leaving');
        }, 600);
    });

    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const isInternal = (
            (href.endsWith('.html') || href === 'index.html' || href === 'contact.html') &&
            !href.startsWith('http') &&
            !href.startsWith('#') &&
            link.getAttribute('target') !== '_blank'
        );

        if (!isInternal) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHref = link.getAttribute('href');
            transition.classList.add('entering');
            setTimeout(() => {
                window.location.href = targetHref;
            }, 600);
        });
    });
}


/* ==============================================
   PREMIUM SOUND DESIGN — Web Audio API
   ============================================== */
function initSoundDesign() {
    // Skip on touch/mobile devices for better UX
    if ('ontouchstart' in window || window.matchMedia('(hover: none)').matches) return;

    let audioCtx = null;
    let isUnlocked = false;

    // Interactive elements to trigger sounds
    const selectors = 'a, button, .btn-primary, .btn-ghost, .project-card, .copy-btn, .back-btn, .discord-btn, .menu-toggle, .nav-link, .header-logo, .username, .hero-signature';

    // Initialize AudioContext on first user interaction
    function unlockAudio() {
        if (isUnlocked) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isUnlocked = true;

        // Remove listeners once unlocked
        document.removeEventListener('mousedown', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
    }

    document.addEventListener('mousedown', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    // --- Sound Synthesis ---

    function playHoverSound() {
        if (!audioCtx || audioCtx.state !== 'running') return;

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Formal, ultra-calm soft focus hum
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.04);

        // Very soft envelope
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
    }

    function playClickSound() {
        if (!audioCtx || audioCtx.state !== 'running') return;

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Glassy, elegant muted 'tick' (not robotic)
        osc.type = 'sine'; // Sine is softer and feels more premium
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        // Rapid pitch drop creates a percussive tick without the beep sound
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.02);

        // Crisp, fast volume envelope
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.002);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.06);
    }

    // --- Attach Listeners ---

    // Use event delegation for performance
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(selectors)) {
            playHoverSound();
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest(selectors)) {
            playClickSound();
        }
    });
}

/* ==============================================
   HACKER TRIPLE-CLICK EVENTS
   ============================================== */
function initHackerSignature() {
    let signature = document.querySelector('.hero-signature');
    if (!signature) return;

    let clickCount = 0; // Cumulative, no timeout resets

    function applyHoverState() {
        let sig = document.querySelector('.hero-signature');
        if (!sig) return;

        // Clear old inline styles that blocked hover
        sig.style.removeProperty('animation');
        sig.style.removeProperty('filter');

        // Apply progressive hover classes
        sig.classList.remove('hack-level-1', 'hack-level-2', 'hack-level-3', 'hack-level-4', 'hack-level-5');
        if (clickCount >= 30) sig.classList.add('hack-level-5');
        else if (clickCount >= 20) sig.classList.add('hack-level-4');
        else if (clickCount >= 10) sig.classList.add('hack-level-3');
        else if (clickCount >= 5) sig.classList.add('hack-level-2');
        else if (clickCount >= 2) sig.classList.add('hack-level-1');
    }

    function spawnSignatureParticles(x, y) {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.style.position = 'fixed';
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            p.style.width = Math.random() * 6 + 2 + 'px';
            p.style.height = p.style.width;
            p.style.background = Math.random() > 0.5 ? '#fff' : '#00ff41';
            p.style.borderRadius = '50%';
            p.style.pointerEvents = 'none';
            p.style.zIndex = '999999';
            p.style.transition = 'all 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)';

            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 80 + 30;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 40;

            document.body.appendChild(p);

            requestAnimationFrame(() => {
                p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                p.style.opacity = '0';
            });
            setTimeout(() => p.remove(), 600);
        }
    }

    function triggerWhiteFlash() {
        document.body.classList.add('theme-flash-white');
        document.body.style.animation = 'lightQuake 0.2s infinite';
        setTimeout(() => {
            document.body.classList.remove('theme-flash-white');
            document.body.style.animation = '';
        }, 3000);
    }

    function triggerCreepyGlitchEvent() {
        const sub = document.querySelector('.hero-subtitle');
        if (sub && !sub.hasAttribute('data-glitched')) {
            sub.setAttribute('data-glitched', 'true');
            const og = sub.innerHTML;
            sub.innerHTML = '<span style="color:#ff003c; text-shadow:0 0 10px red;">S Y S T E M_ C O M P R O M I S E D</span>';
            setTimeout(() => {
                sub.innerHTML = og;
                sub.removeAttribute('data-glitched');
                document.body.classList.add('ambient-glitch-quake');
                setTimeout(() => document.body.classList.remove('ambient-glitch-quake'), 600);
            }, 800);
        }
    }

    document.addEventListener('click', (e) => {
        let sigHit = e.target.closest('.hero-signature');

        if (document.body.classList.contains('theme-hacked-fatal')) {
            document.body.classList.add('glitch-stage-8');
            setTimeout(() => document.body.classList.remove('glitch-stage-8'), 150);
            return;
        }

        // To start the hack, they MUST hit the signature.
        // Once phase 1 begins, everywhere counts.
        if (!sigHit && clickCount === 0) return;
        if (!sigHit && !document.body.classList.contains('theme-hacked') && clickCount < 40) return;

        clickCount++;
        applyHoverState();

        if (clickCount === 1 && sigHit) {
            spawnSignatureParticles(e.clientX, e.clientY);
            playClickSound(); // Add sound explicitly for this effect
        }

        if (clickCount === 5) {
            triggerWhiteFlash();
        }

        // Intermediate creepy glitch events after 20 clicks but before 40
        if (clickCount === 20 || (clickCount > 20 && clickCount < 40 && Math.random() < 0.15)) {
            triggerCreepyGlitchEvent();
        }

        if (!document.body.classList.contains('theme-hacked')) {
            if (clickCount === 40) {
                triggerSystemBreach();
                clickCount = 0; // Reset for phase 2 countdown
                applyHoverState();
            }
        } else {
            if (clickCount === 20) {
                triggerFatalBreach();
                clickCount = 0;
            }
        }
    });
}

function triggerSystemBreach() {
    const overlay = document.createElement('div');
    overlay.className = 'system-breach-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'black';
    overlay.style.zIndex = '9999999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.overflow = 'hidden';

    const bg = document.createElement('div');
    bg.style.position = 'absolute';
    bg.style.inset = '0';
    bg.style.background = 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.15), rgba(0, 255, 65, 0.15) 1px, transparent 1px, transparent 4px)';
    bg.style.zIndex = '1';

    const alert = document.createElement('div');
    alert.innerText = 'HACKING IN PROGRESS';
    alert.style.position = 'relative';
    alert.style.zIndex = '2';
    alert.style.color = '#00ff41';
    alert.style.fontSize = 'clamp(2rem, 6vw, 5rem)';
    alert.style.fontWeight = '800';
    alert.style.textShadow = '0 0 20px #00ff41';
    alert.style.letterSpacing = '5px';
    alert.style.marginBottom = '30px';
    alert.style.textAlign = 'center';

    const terminal = document.createElement('div');
    terminal.style.position = 'relative';
    terminal.style.zIndex = '2';
    terminal.style.width = '90%';
    terminal.style.maxWidth = '1000px';
    terminal.style.height = '50vh';
    terminal.style.color = '#00ff41';
    terminal.style.fontSize = '1.1rem';
    terminal.style.lineHeight = '1.4';
    terminal.style.overflow = 'hidden';
    terminal.style.whiteSpace = 'pre-wrap';
    terminal.style.wordBreak = 'break-all';

    overlay.appendChild(bg);
    overlay.appendChild(alert);
    overlay.appendChild(terminal);
    document.body.appendChild(overlay);

    const chars = '0123456789ABCDEF010101010101!!&%$*>/?#';
    const streamHex = setInterval(() => {
        let chunk = '';
        for (let i = 0; i < 150; i++) {
            chunk += chars[Math.floor(Math.random() * chars.length)];
        }
        terminal.innerHTML += '0x' + Math.floor(Math.random() * 9999).toString(16).toUpperCase() + ' ' + chunk + '\n';
        terminal.scrollTop = terminal.scrollHeight;
    }, 50);

    setTimeout(() => {
        clearInterval(streamHex);
        overlay.style.transition = 'all 0.5s';
        overlay.style.transform = 'scaleY(0)';
        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.remove();
            engagePermanentHackerMode();
        }, 500);
    }, 5000);
}

function triggerFatalBreach() {
    window._ambientBaseGlitchTime = 1000;
    document.body.classList.add('fatal-shake-body');

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = '#000';
    overlay.style.zIndex = '9999999';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    const bg = document.createElement('div');
    bg.style.position = 'absolute';
    bg.style.inset = '0';
    bg.style.background = 'radial-gradient(ellipse at center, rgba(255,0,60,0.2) 0%, #000 100%)';
    bg.style.zIndex = '1';

    const alert = document.createElement('div');
    alert.innerText = 'KILLING WEBSITE';
    alert.style.position = 'relative';
    alert.style.zIndex = '2';
    alert.style.color = '#ff003c';
    alert.style.fontSize = 'clamp(2rem, 6vw, 5rem)';
    alert.style.fontWeight = '900';
    alert.style.textShadow = '0 0 20px #ff003c, -5px 0 0 #00ff41';
    alert.style.marginBottom = '30px';
    alert.style.textAlign = 'center';


    const terminal = document.createElement('div');
    terminal.style.position = 'relative';
    terminal.style.zIndex = '2';
    terminal.style.width = '90%';
    terminal.style.maxWidth = '1000px';
    terminal.style.height = '50vh';
    terminal.style.color = '#ff003c';
    terminal.style.fontSize = '1.1rem';
    terminal.style.lineHeight = '1.4';
    terminal.style.overflow = 'hidden';
    terminal.style.whiteSpace = 'pre-wrap';
    terminal.style.wordBreak = 'break-all';

    overlay.appendChild(bg);
    overlay.appendChild(alert);
    overlay.appendChild(terminal);
    document.body.appendChild(overlay);

    const chars = 'FATAL_ERR0xDF01##!&%$*>/?#';
    const streamHex = setInterval(() => {
        let chunk = '';
        for (let i = 0; i < 50; i++) {
            chunk += chars[Math.floor(Math.random() * chars.length)];
        }
        terminal.innerHTML += '[SYS PUMP] ' + Math.floor(Math.random() * 999999).toString(16).toUpperCase() + ' ' + chunk + '\n';
        terminal.scrollTop = terminal.scrollHeight;
    }, 30);

    setTimeout(() => {
        clearInterval(streamHex);
        overlay.style.transition = 'all 0.5s';
        overlay.style.transform = 'scaleY(0)';
        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove('fatal-shake-body');
            engageFatalHackerMode();
        }, 500);
    }, 5000);
}

function engagePermanentHackerMode() {
    document.body.classList.add('theme-hacked');

    const sigImg = document.querySelector('img.hero-signature');
    if (sigImg) {
        const newSig = document.createElement('div');
        newSig.className = 'hero-signature hacked-text';
        newSig.innerText = '</hacked>';
        sigImg.replaceWith(newSig);
    }

    document.title = "Viromic | Web Hacker";


    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) {
        heroSub.innerText = "VIROMIC HATES TRAITORS";
    }

    const footerTitle = document.querySelector('.footer-cta-title');
    if (footerTitle) {
        footerTitle.innerHTML = `<strong>Let's HACK</strong> Someone<br><strong>Together</strong>`;
    }

    const footerText = document.querySelector('.footer-cta-text');
    if (footerText) {
        footerText.innerText = "Do you know someone who's a traitor? Or hate them? Viromic is here.";
    }

    window._ambientBaseGlitchTime = 3000;
    runAmbientGlitches();
    runTextScrambler();
}

function engageFatalHackerMode() {
    document.body.classList.add('theme-hacked-fatal');
    window._ambientBaseGlitchTime = 500;
    eradicateDghemBranding();

    const icon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (icon) {
        icon.href = 'https://i.ibb.co/cXF6yCMr/Gemini-Generated-Image-l85g3sl85g3sl85g.png';
    } else {
        const newIcon = document.createElement('link');
        newIcon.rel = 'icon';
        newIcon.href = 'https://i.ibb.co/cXF6yCMr/Gemini-Generated-Image-l85g3sl85g3sl85g.png';
        document.head.appendChild(newIcon);
    }

    // Halt any existing scramblers
    if (window._textScrambleIntervals) {
        window._textScrambleIntervals.forEach(id => clearInterval(id));
        window._textScrambleIntervals.forEach(id => clearTimeout(id));
    }
    window._textScrambleIntervals = [];

    // Modify hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const signature = heroTitle.querySelector('.hero-signature');
        heroTitle.innerHTML = '';
        if (signature) heroTitle.appendChild(signature);
        heroTitle.innerHTML += `<strong>Developing WORST</strong><br><strong>Websites</strong> Today`;
    }

    // Restart scrambler to capture the new title nodes
    runTextScrambler();
}

function eradicateDghemBranding() {
    const navLogo = document.querySelector('.header-logo img');
    if (navLogo) {
        navLogo.outerHTML = '<span class="fatal-hacked">&lt;Viromic&gt;</span>';
    }

    const footerTitle = document.querySelector('.footer-title');
    if (footerTitle) {
        footerTitle.innerHTML = '<span class="fatal-hacked">HACKED_SYSTEM</span>';
    }

    const footerDesc = document.querySelector('.footer-desc');
    if (footerDesc) {
        footerDesc.innerHTML = 'All data corrupted. Viromic protocols breached. Warning: System meltdown imminent.';
    }

    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.innerHTML = '&copy; ' + new Date().getFullYear() + ' <span class="fatal-hacked">Viromic</span>. ALL RIGHTS REVOKED.';
    }
}

function runAmbientGlitches() {
    if (window._hasStartedAmbientGlitches) return;
    window._hasStartedAmbientGlitches = true;

    const ambientClasses = ['ambient-glitch-slice', 'ambient-glitch-quake', 'ambient-glitch-freeze'];

    function triggerRandomGlitch() {
        const glitch = ambientClasses[Math.floor(Math.random() * ambientClasses.length)];
        document.body.classList.add(glitch);

        setTimeout(() => {
            document.body.classList.remove(glitch);
        }, 1600);

        const baseTime = window._ambientBaseGlitchTime || 3000;
        const randOffset = document.body.classList.contains('theme-hacked-fatal') ? 3000 : 7000;
        const nextGlitchTime = Math.floor(Math.random() * randOffset) + baseTime;

        setTimeout(triggerRandomGlitch, nextGlitchTime);
    }

    setTimeout(triggerRandomGlitch, window._ambientBaseGlitchTime || 3000);
}

function runTextScrambler() {
    if (!window._textScrambleIntervals) window._textScrambleIntervals = [];

    const titleNodes = [];
    const subtitle = document.querySelector('.hero-subtitle');

    const titleEl = document.querySelector('.hero-title');
    if (titleEl) {
        const walker = document.createTreeWalker(titleEl, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() !== '') {
                titleNodes.push({ node: node, original: node.nodeValue });
            }
        }
    }

    if (subtitle) {
        titleNodes.push({ node: subtitle.childNodes[0], original: subtitle.innerText });
    }

    const footerStrong = document.querySelector('.footer-cta-title strong');
    if (footerStrong) {
        titleNodes.push({ node: footerStrong.childNodes[0], original: footerStrong.innerText });
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    function triggerScramble() {
        if (titleNodes.length === 0) return;
        const target = titleNodes[Math.floor(Math.random() * titleNodes.length)];
        let originalText = target.original;

        let scramblesLeft = 20;

        const scrambleInterval = setInterval(() => {
            let scrambled = '';
            for (let i = 0; i < originalText.length; i++) {
                if (originalText[i] === ' ' || originalText[i] === '\n') {
                    scrambled += originalText[i];
                } else if (Math.random() < 0.4) {
                    scrambled += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    scrambled += originalText[i];
                }
            }
            target.node.nodeValue = scrambled;

            scramblesLeft--;
            if (scramblesLeft <= 0) {
                clearInterval(scrambleInterval);
                target.node.nodeValue = originalText;
            }
        }, 50);
        window._textScrambleIntervals.push(scrambleInterval);

        const nextScrambleTime = Math.floor(Math.random() * 7000) + 5000;
        const tId = setTimeout(triggerScramble, nextScrambleTime);
        window._textScrambleIntervals.push(tId);
    }

    // Browser Tab Title Scrambler
    const tabInterval = setInterval(() => {
        if (document.body.classList.contains('theme-hacked')) {
            const og = document.title;
            if (!og.includes('Hacker')) return; // Sanity check
            let scrambled = "";
            for (let i = 0; i < og.length; i++) {
                scrambled += Math.random() < 0.3 && og[i] !== ' ' && og[i] !== '|' ? chars[Math.floor(Math.random() * chars.length)] : og[i];
            }
            document.title = scrambled;

            const tId2 = setTimeout(() => {
                document.title = "Viromic | Web Hacker";
            }, 400);
            window._textScrambleIntervals.push(tId2);
        }
    }, 8000);
    window._textScrambleIntervals.push(tabInterval);

    const tId3 = setTimeout(triggerScramble, 2000);
    window._textScrambleIntervals.push(tId3);
}