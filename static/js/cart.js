const cartRoot = document.getElementById('cart-root');

// 1. Veri Yönetimi (React'taki State ve Context karşılığı)
// Tarayıcı hafızasını kontrol et, boşsa test amaçlı örnek bir ürün koy
let cart = JSON.parse(localStorage.getItem('cart')) || [
    { 
        id: 101, 
        name: "Porsiyon İskender", 
        description: "Özel sosu, tereyağı ve yoğurduyla gerçek Bursa İskenderi.", 
        price: 210, 
        quantity: 1, 
        image: "/static/images/iskender.jpg" // Kendi resim yolunu ayarla
    }
];

// Hafızayı Güncelle
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 2. Aksiyon Fonksiyonları (Artırma, Azaltma, Silme)
window.updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // 1'in altına düşmesini engelle
    
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        renderCart(); // React'taki gibi ekranı tekrar çiz (re-render)
    }
};

window.removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
};

window.handleCheckout = () => {
    // Burada normalde kullanıcı girişi kontrolü yapılır
    alert("Siparişi Onaylama (Checkout) sayfasına yönlendiriliyorsunuz...");
    // window.location.href = "checkout.html";
};

// 3. Ekranı Çizme (React'taki return bloğu)
function renderCart() {
    // Boş Sepet Durumu
    if (cart.length === 0) {
        cartRoot.innerHTML = `
            <div class="container empty-cart text-center">
                <div class="empty-icon"><i data-lucide="shopping-bag"></i></div>
                <h2 class="empty-title">Sepetiniz Boş</h2>
                <p class="empty-desc">Sepetinize ürün eklemek için restoranları inceleyin</p>
                <a href="../templates/index.html" class="btn-primary" style="width: auto;">Restoranları Keşfet</a>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    // Dolu Sepet Hesaplamaları
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 15 : 0;
    const total = subtotal + deliveryFee;

    // Dolu Sepet Arayüzü
    cartRoot.innerHTML = `
        <div class="container">
            <h1 class="cart-title">Sepetim</h1>
            <div class="cart-grid">
                
                <div class="cart-items">
                    ${cart.map(item => `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="item-img" />
                            <div class="item-details">
                                <h3 class="item-title">${item.name}</h3>
                                <p class="item-desc">${item.description}</p>
                                <p class="item-price">₺${item.price.toFixed(2)}</p>
                            </div>
                            <div class="item-actions">
                                <button onclick="removeFromCart(${item.id})" class="btn-delete">
                                    <i data-lucide="trash-2"></i>
                                </button>
                                <div class="quantity-control">
                                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="btn-qty">
                                        <i data-lucide="minus" style="width: 14px;"></i>
                                    </button>
                                    <span class="qty-text">${item.quantity}</span>
                                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="btn-qty">
                                        <i data-lucide="plus" style="width: 14px;"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="cart-summary">
                    <div class="summary-box">
                        <h2 class="summary-title">Sipariş Özeti</h2>
                        <div class="summary-row">
                            <span>Ara Toplam</span>
                            <span>₺${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Teslimat Ücreti</span>
                            <span>₺${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div class="summary-row summary-divider summary-total">
                            <span>Toplam</span>
                            <span class="total-price">₺${total.toFixed(2)}</span>
                        </div>
                        <button onclick="handleCheckout()" class="btn-primary" style="margin-top: 1.5rem;">Sipariş Ver</button>
                        <a href="../templates/index.html" class="btn-outline">Alışverişe Devam Et</a>
                    </div>
                </div>

            </div>
        </div>
    `;

    // İkonları tekrar oluştur (Çünkü innerHTML ile DOM'u baştan yazdık)
    lucide.createIcons();
}

// Sayfa yüklendiğinde sepeti çiz
document.addEventListener('DOMContentLoaded', renderCart);