// İkonları başlat
lucide.createIcons();

// Mock Data (Normalde bu veriler backend'den veya ayrı bir dosyadan gelir)
const restaurants = [
    {
        id: 1,
        name: "Kebapçı İskender",
        description: "Bursa'nın meşhur lezzeti, bol tereyağlı ve taze pideli.",
        category: "Kebap",
        rating: 4.9,
        deliveryTime: "25-35 dk",
        minOrder: 180,
        image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&q=80"
    },
    {
        id: 2,
        name: "Burger Station",
        description: "Özel harçlı köfte, karamelize soğan ve çıtır patates.",
        category: "Burger",
        rating: 4.7,
        deliveryTime: "20-30 dk",
        minOrder: 120,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80"
    },
    {
        id: 3,
        name: "Sushi Sakura",
        description: "Taze deniz ürünleri ve el yapımı Uzak Doğu sushileri.",
        category: "Deniz Ürünleri",
        rating: 4.6,
        deliveryTime: "40-50 dk",
        minOrder: 350,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80"
    },
    {
        id: 4,
        name: "Pizza Napoletana",
        description: "Odun ateşinde pişen, ince hamurlu gerçek İtalyan pizzası.",
        category: "Pizza",
        rating: 4.8,
        deliveryTime: "30-40 dk",
        minOrder: 220,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80"
    },
    {
        id: 5,
        name: "Tatlıcı Efendi",
        description: "Antep fıstıklı baklava ve günlük taze sütlü tatlılar.",
        category: "Tatlı",
        rating: 4.9,
        deliveryTime: "15-25 dk",
        minOrder: 100,
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80"
    },
    {
        id: 6,
        name: "Denizden Taze",
        description: "Mevsimlik taze balıklar ve özel Ege mezeleri.",
        category: "Deniz Ürünleri",
        rating: 4.5,
        deliveryTime: "35-45 dk",
        minOrder: 400,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80"
    }
];

// Elementleri seçelim
const restaurantGrid = document.getElementById('restaurantGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const listTitle = document.getElementById('listTitle');

// Restoranları ekrana basan fonksiyon
function displayRestaurants(data) {
    restaurantGrid.innerHTML = '';
    
    if (data.length === 0) {
        document.getElementById('noResults').classList.remove('hidden');
        return;
    }
    
    document.getElementById('noResults').classList.add('hidden');

    data.forEach(res => {
        const card = `
            <a href="/restaurant/${res.id}" class="restaurant-card">
                <div class="card-image-wrapper">
                    <img src="${res.image}" alt="${res.name}">
                    <div class="rating-badge">
                        <i data-lucide="star" style="width:16px; height:16px; fill:#fbbf24; color:#fbbf24;"></i>
                        <span>${res.rating}</span>
                    </div>
                </div>
                <div class="card-content">
                    <h3>${res.name}</h3>
                    <p class="card-description">${res.description}</p>
                    <div class="card-footer">
                        <div class="footer-item">
                            <i data-lucide="clock" style="width:16px; height:16px;"></i>
                            <span>${res.deliveryTime}</span>
                        </div>
                        <span style="font-weight:500;">Min. ₺${res.minOrder}</span>
                    </div>
                </div>
            </a>
        `;
        restaurantGrid.innerHTML += card;
    });
    
    // Yeni eklenen ikonlar için Lucide'i tekrar çalıştır
    lucide.createIcons();
}

// Kategori filtresi dinleyicisi
categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Aktif buton görselini değiştir
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        listTitle.innerText = category === 'Tümü' ? 'Tüm Restoranlar' : category;

        // Filtreleme mantığı
        const filtered = category === 'Tümü' 
            ? restaurants 
            : restaurants.filter(r => r.category === category);
        
        displayRestaurants(filtered);
    });
});

// Sayfa ilk açıldığında restoranları göster
displayRestaurants(restaurants);