// --- SAHTE VERİLER (mockData.js içeriği) ---
const restaurants = [
    {
        id: "1",
        name: "Kebapçı İskender",
        description: "Bursa'nın meşhur lezzeti, bol tereyağlı ve taze pideli.",
        rating: 4.9,
        deliveryTime: "25-35 dk",
        minOrder: 180,
        image: "https://images.unsplash.com/photo-1633321702518-7feccaf0ad44?w=800&q=80"
    }
];

const menuItems = [
    {
        id: 101,
        restaurantId: "1",
        name: "Porsiyon İskender",
        price: 210,
        description: "Özel sosu, tereyağı ve yoğurduyla gerçek Bursa İskenderi.",
        image: "https://images.unsplash.com/photo-1633321702518-7feccaf0ad44?w=400&q=80"
    }
];

// --- SAYFA MANTIĞI ---

// URL'den parametre alma (React'taki useParams karşılığı)
const urlParams = new URLSearchParams(window.location.search);
const currentId = urlParams.get('id');

const appContainer = document.getElementById('app');

function renderPage() {
    const restaurant = restaurants.find(r => r.id === currentId);
    const menu = menuItems.filter(item => item.restaurantId === currentId);

    // Restoran bulunamadı durumu
    if (!restaurant) {
        appContainer.innerHTML = `
            <div class="container py-12 text-center">
                <p class="text-gray-600">Restoran bulunamadı</p>
                <p style="font-size:0.875rem; margin-top:10px; color:#9ca3af;">İpucu: URL'nin sonuna ?id=1 ekleyin.</p>
            </div>
        `;
        return;
    }

    // Ana yapıyı oluşturma (React'taki return bloğu)
    appContainer.innerHTML = `
        <div class="container">
            
            <div id="notification" class="notification hidden">
                <i data-lucide="shopping-cart"></i>
                <span id="notificationText"></span>
            </div>

            <div class="restaurant-header">
                <div class="header-image-wrapper">
                    <img src="${restaurant.image}" alt="${restaurant.name}" />
                    <div class="header-gradient"></div>
                    <div class="header-content">
                        <h1 class="header-title">${restaurant.name}</h1>
                        <p class="header-desc">${restaurant.description}</p>
                        <div class="header-meta">
                            <div class="meta-item">
                                <i data-lucide="star" style="fill: #fbbf24; color: #fbbf24;"></i>
                                <span class="font-semibold">${restaurant.rating}</span>
                            </div>
                            <div class="meta-item">
                                <i data-lucide="clock"></i>
                                <span>${restaurant.deliveryTime}</span>
                            </div>
                            <div>
                                <span class="font-medium">Min. Sipariş: ₺${restaurant.minOrder}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="menu-title">Menü</h2>
                ${menu.length > 0 ? `
                    <div class="menu-grid">
                        ${menu.map(item => `
                            <div class="menu-card">
                                <div class="card-image-wrapper">
                                    <img src="${item.image}" alt="${item.name}" />
                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">${item.name}</h3>
                                    <p class="card-desc">${item.description}</p>
                                    <div class="card-footer">
                                        <span class="card-price">₺${item.price}</span>
                                        <button onclick="handleAddToCart('${item.name}')" class="btn-add">
                                            <i data-lucide="plus"></i>
                                            <span>Ekle</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="text-center py-12">
                        <p class="text-gray-600">Menü henüz eklenmemiş</p>
                    </div>
                `}
            </div>
        </div>
    `;

    // Lucide ikonlarını HTML'e işleme
    lucide.createIcons();
}

// Global Sepete Ekleme Fonksiyonu
window.handleAddToCart = function(itemName) {
    // Burada "useApp" içerisindeki addToCart tetiklenir gibi düşünülebilir
    // Vanilla JS versiyonunda şimdilik sadece UI bildirimini gösteriyoruz.
    
    const notification = document.getElementById('notification');
    const textElement = document.getElementById('notificationText');
    
    textElement.innerText = `${itemName} sepete eklendi!`;
    
    // Görünür yap
    notification.classList.remove('hidden');
    
    // 3 saniye sonra gizle (React'taki setTimeout karşılığı)
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
};

// Sayfa yüklendiğinde render işlemini başlat
document.addEventListener('DOMContentLoaded', renderPage);