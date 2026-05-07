document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('order-history-root');

    // 1. Kullanıcı Girişi Simülasyonu
    // Şimdilik giriş yapılmış gibi kabul ediyoruz (true). Giriş yapmamış halini görmek istersen bunu false yap.
    const user = true;

    // 2. Sipariş Verilerini Çek
    // Gerçekte localStorage'dan 'orders' anahtarını çekeceğiz.
    // Eğer boşsa, tasarımı görebilmen için sahte bir sipariş (fallback) oluşturuyoruz.
    let orders = JSON.parse(localStorage.getItem('orders')) || [
        {
            id: 'ORD' + Date.now().toString().slice(-6),
            date: new Date().toLocaleDateString('tr-TR'),
            status: 'Hazırlanıyor',
            address: 'Caferağa Mah. Moda Cad. No: 12, Kadıköy/İstanbul',
            total: 225.00,
            items: [
                { id: 101, name: 'Porsiyon İskender', price: 210, quantity: 1 }
            ]
        }
    ];

    // 3. Ekrana Çizme Fonksiyonu
    function render() {
        // Kullanıcı giriş yapmamışsa
        if (!user) {
            root.innerHTML = `
                <div class="container text-center">
                    <div class="empty-icon">
                        <i data-lucide="shopping-bag"></i>
                    </div>
                    <h2 class="empty-title">Sipariş geçmişi için giriş yapın</h2>
                    <a href="../templates/login.html" class="btn-primary" style="margin-top: 1rem;">Giriş Yap</a>
                </div>
            `;
            return;
        }

        // Sipariş listesi boşsa (Yukarıdaki dummy veriyi silersen bu ekran görünür)
        if (orders.length === 0) {
            root.innerHTML = `
                <div class="container text-center">
                    <div class="empty-icon">
                        <i data-lucide="shopping-bag"></i>
                    </div>
                    <h2 class="empty-title">Henüz Siparişiniz Yok</h2>
                    <p class="empty-desc">İlk siparişinizi vermek için restoranları keşfedin</p>
                    <a href="../templates/index.html" class="btn-primary">Restoranları Keşfet</a>
                </div>
            `;
            return;
        }

        // Siparişler varsa
        root.innerHTML = `
            <div class="container">
                <h1 class="page-title">Sipariş Geçmişi</h1>
                
                <div class="orders-list">
                    ${orders.map(order => `
                        <div class="order-card">
                            <div class="card-body">
                                
                                <div class="card-header">
                                    <div>
                                        <h3 class="order-id">Sipariş #${order.id}</h3>
                                        <div class="order-date">
                                            <i data-lucide="calendar"></i>
                                            <span>${order.date}</span>
                                        </div>
                                    </div>
                                    <div class="status-badge">
                                        ${order.status}
                                    </div>
                                </div>

                                <div class="order-items-section">
                                    <div class="items-list">
                                        ${order.items.map(item => `
                                            <div class="item-row">
                                                <span class="item-name">${item.name} x${item.quantity}</span>
                                                <span class="item-price">₺${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <div class="order-address">
                                    <i data-lucide="map-pin"></i>
                                    <span>${order.address}</span>
                                </div>

                                <div class="order-footer">
                                    <span class="total-label">Toplam</span>
                                    <span class="total-amount">₺${order.total.toFixed(2)}</span>
                                </div>

                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // İlk render'ı tetikle ve Lucide ikonlarını canlandır
    render();
    lucide.createIcons();
});