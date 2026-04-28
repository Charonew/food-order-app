// 1. Sepet Verisini Çek ve Kontrol Et
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Eğer sepet boşsa kullanıcıyı sepet sayfasına veya anasayfaya geri gönder
if (cart.length === 0) {
    window.location.href = '../templates/cart.html';
}

// 2. Fiyat Hesaplamaları ve Ekrana Basma
const deliveryFee = 15;
const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const total = subtotal + deliveryFee;

const orderItemsContainer = document.getElementById('orderItems');
const subtotalDisplay = document.getElementById('subtotalDisplay');
const totalDisplay = document.getElementById('totalDisplay');

// Sepetteki ürünleri sipariş özetine listele
orderItemsContainer.innerHTML = cart.map(item => `
    <div class="order-item-row">
        <span class="item-name">${item.name} x${item.quantity}</span>
        <span class="item-price">₺${(item.price * item.quantity).toFixed(2)}</span>
    </div>
`).join('');

subtotalDisplay.innerText = `₺${subtotal.toFixed(2)}`;
totalDisplay.innerText = `₺${total.toFixed(2)}`;

// 3. Form Input Maskeleme (React'taki regex işlemlerinin karşılığı)
const cardNumberInput = document.getElementById('cardNumber');
const cvvInput = document.getElementById('cvv');

cardNumberInput.addEventListener('input', function(e) {
    // Sadece rakam girilmesine izin ver
    this.value = this.value.replace(/\D/g, '').slice(0, 16);
});

cvvInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '').slice(0, 3);
});

// 4. Form Gönderimi ve Validasyon
const checkoutForm = document.getElementById('checkoutForm');
const errorBox = document.getElementById('errorBox');
const errorMessage = document.getElementById('errorMessage');

checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    errorBox.classList.add('hidden'); // Önceki hataları gizle

    // Değerleri al
    const city = document.getElementById('city').value.trim();
    const district = document.getElementById('district').value.trim();
    const address = document.getElementById('address').value.trim();
    const cardNumber = cardNumberInput.value.trim();
    const cardName = document.getElementById('cardName').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = cvvInput.value.trim();

    // Adres Kontrolü
    if (!city || !district || !address) {
        showError('Lütfen adres bilgilerini eksiksiz doldurun.');
        return;
    }

    // Ödeme Bilgisi Kontrolü
    if (!cardNumber || !cardName || !expiry || !cvv) {
        showError('Lütfen ödeme bilgilerini eksiksiz doldurun.');
        return;
    }

    // Sipariş Başarılı! (Simülasyon)
    
    // 1. Siparişi veritabanına/localStorage'a kaydet (Opsiyonel)
    const orderData = {
        id: `ORD${Date.now()}`,
        date: new Date().toLocaleDateString('tr-TR'),
        items: cart,
        total: total,
        address: `${address}, ${district}/${city}`,
        status: 'Hazırlanıyor'
    };
    
    // 2. Sepeti boşalt
    localStorage.removeItem('cart');

    // 3. Başarı sayfasına yönlendir (veya uyarı verip anasayfaya at)
    alert(`Siparişiniz başarıyla alındı! Sipariş Kodunuz: ${orderData.id}`);
    window.location.href = '../templates/index.html'; // Anasayfaya dön
});

// Hata gösterme fonksiyonu
function showError(msg) {
    errorMessage.innerText = msg;
    errorBox.classList.remove('hidden');
    // Sayfayı hafifçe yukarı kaydır ki kullanıcı hatayı görsün
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lucide ikonlarını çalıştır
lucide.createIcons();