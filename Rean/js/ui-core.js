// --- Global Variables ---
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

// --- UI Control Functions ---
window.toggleMenu = function() {
    const sideNav = document.getElementById('side-nav');
    if (sideNav) sideNav.classList.toggle('active');
};

window.cycleTheme = function() {
    const isRed = document.body.classList.toggle('theme-red-grad');
    localStorage.setItem('re-theme', isRed ? 'red' : 'black');
};

// --- DOM Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Canvasの自動生成と挿入
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    // スタイルをJSから直接付与（CSSに書かなくても確実に背面に配置）
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '-1',
        pointerEvents: 'none'
    });
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    const sideNav = document.getElementById('side-nav');
    const edgeTrigger = document.getElementById('edge-trigger');
    const cursor = document.getElementById('cursor');

    // -- Mouse Tracking --
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (cursor) cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    // -- Side Nav --
    if (edgeTrigger && sideNav) {
        edgeTrigger.addEventListener('mouseenter', () => sideNav.classList.add('active'));
        sideNav.addEventListener('mouseleave', () => sideNav.classList.remove('active'));
    }

    // -- Theme Persistence --
    const savedTheme = localStorage.getItem('re-theme');
    if (savedTheme === 'red') document.body.classList.add('theme-red-grad');

    // -- Canvas Animation Logic --
    let width, height;
    let time = 0;
    let introProgress = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function drawWavyStarFrame(centerX, centerY, size, opacity, waveAmp, waveFreq, introScale) {
        const currentSize = size * introScale;
        const currentOpacity = opacity * introScale;

        ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.lineWidth = 1.0;
        
        ctx.beginPath();
        const points = [
            { x: centerX - currentSize, y: centerY },
            { x: centerX, y: centerY - currentSize },
            { x: centerX + currentSize, y: centerY },
            { x: centerX, y: centerY + currentSize },
            { x: centerX - currentSize, y: centerY }
        ];

        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            const waveOffset = i * (Math.PI / 2); 
            const wavyCX = centerX + Math.sin(time * waveFreq + waveOffset) * waveAmp * introScale;
            const wavyCY = centerY + Math.cos(time * waveFreq + waveOffset) * waveAmp * introScale;

            ctx.quadraticCurveTo(wavyCX, wavyCY, p.x, p.y);
        }
        ctx.stroke();
    }

    function animate() {
        time += 0.01;

        if (introProgress < 1) {
            introProgress += (1 - introProgress) * 0.03;
            if (1 - introProgress < 0.001) introProgress = 1;
        }

        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        ctx.clearRect(0, 0, width, height);

        const midX = width / 2;
        const midY = height / 2;
        const baseSize = Math.max(width, height) * 0.9;

        const intro1 = Math.pow(introProgress, 1.5);
        const intro2 = Math.pow(introProgress, 1.2);
        const intro3 = introProgress;

        drawWavyStarFrame(midX + (mouseX - midX) * 0.01, midY + (mouseY - midY) * 0.01, baseSize * 0.92, 0.1, 15, 0.5, intro1);
        drawWavyStarFrame(midX + (mouseX - midX) * 0.02, midY + (mouseY - midY) * 0.02, baseSize * 0.96, 0.2, 25, 0.6, intro2);
        drawWavyStarFrame(midX + (mouseX - midX) * 0.03, midY + (mouseY - midY) * 0.03, baseSize, 0.4, 35, 0.7, intro3);

        requestAnimationFrame(animate);
    }

    animate();
});