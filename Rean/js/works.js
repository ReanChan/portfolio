const reanWorksData = [
    {
        title: "REAN_test_01",
        desc: "Motion Graphics",
        ytId: "dQw4w9WgXcQ"
    }, // ← ここが }. になっていたのを修正
    {
        title: "REAN_test_02",
        desc: "3D Animation",
        ytId: "dQw4w9WgXcQ" // サンプルとして同じIDを入れています
    }
];

function renderWorksGallery() {
    const container = document.getElementById('works-container');
    if (!container) return;

    // 変数名を reanWorksData に統一
    container.innerHTML = reanWorksData.map(work => `
        <div class="work-card">
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/${work.ytId}" allowfullscreen></iframe>
            </div>
            <div class="work-info">
                <h3 style="font-weight: 700; font-size: 18px;">${work.title}</h3>
                <p style="opacity:0.6; font-size:14px; margin-top:5px;">${work.desc}</p>
            </div>
        </div>
    `).join('');
}

// 実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderWorksGallery);
} else {
    renderWorksGallery();
}