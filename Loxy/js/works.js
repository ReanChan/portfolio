const reanWorksData = [
    {
        title: "REAN_VISUAL_01",
        desc: "Motion Graphics",
        ytId: "dQw4w9WgXcQ"
    }
];

// ... (以下、render関数の変数名も reanWorksData に合わせる)

function renderWorksGallery() {
    const container = document.getElementById('works-container');
    if (!container) return;

    container.innerHTML = loxyWorksData.map(work => `
        <div class="work-card">
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${work.ytId}" allowfullscreen></iframe>
            </div>
            <div class="work-info">
                <h3>${work.title}</h3>
                <p style="opacity:0.6; font-size:14px; margin-top:5px;">${work.desc}</p>
            </div>
        </div>
    `).join('');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWorksGallery);
} else {
    renderWorksGallery();
}