window.toggleMenu = function() {
    const sideNav = document.getElementById('side-nav');
    if (sideNav) sideNav.classList.toggle('active');
};

window.cycleTheme = function() {
    const isRed = document.body.classList.toggle('theme-red-grad');
    localStorage.setItem('loxy-theme', isRed ? 'red' : 'black');
};

document.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.getElementById('side-nav');
    const edgeTrigger = document.getElementById('edge-trigger');
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', (e) => {
        if (cursor) cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });

    if (edgeTrigger && sideNav) {
        edgeTrigger.addEventListener('mouseenter', () => sideNav.classList.add('active'));
        sideNav.addEventListener('mouseleave', () => sideNav.classList.remove('active'));
    }

    const savedTheme = localStorage.getItem('loxy-theme');
    if (savedTheme === 'red') document.body.classList.add('theme-red-grad');
});