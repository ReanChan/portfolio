const reanStoreData = [
    {
        title: "くいっくらんてゃ",
        category: "AE Script",
        price: "¥350",
        link: "https://nosechans.booth.pm/items/7943646" 
    },
    {
        title: "test test",
        category: "test Asset",
        price: "FREE",
        link: "downloads/test.zip" 
    },
    {
        title: "test test Pack",
        category: "test Asset",
        price: "FREE",
        link: "downloads/test.txt" 
    }
];

function renderStore() {
    const container = document.getElementById('store-container');
    if (!container) return;

    container.innerHTML = reanStoreData.map(item => `
        <div class="product-card">
            <div>
                <span class="p-category">${item.category}</span>
                <h3 class="p-title">${item.title}</h3>
                <p class="p-price">${item.price}</p>
            </div>
            <a href="${item.link}" class="btn-download" target="_blank">
                ${item.price === 'FREE' ? 'DOWNLOAD' : 'BUY NOW'}
            </a>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderStore);