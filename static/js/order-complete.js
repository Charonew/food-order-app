document.addEventListener('DOMContentLoaded', () => {
    // 1. URL'den sipariş numarasını (orderId) al
    // Örnek URL: order-complete.html?orderId=ORD123456
    const urlParams = new URLSearchParams(window.location.search);
    let orderId = urlParams.get('orderId');

    // Eğer URL'de orderId yoksa (sayfaya direkt girildiyse), rastgele sahte bir ID oluştur
    if (!orderId) {
        orderId = 'ORD' + Date.now().toString().slice(-6);
    }

    // 2. ID'yi HTML'deki ilgili yere yazdır
    const orderIdDisplay = document.getElementById('orderIdDisplay');
    if (orderIdDisplay) {
        orderIdDisplay.innerText = orderId;
    }

    // 3. İkonları oluştur
    lucide.createIcons();
});