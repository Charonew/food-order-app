// İkonları çalıştır
lucide.createIcons();

const registerForm = document.getElementById('registerForm');
const errorBox = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Değerleri alalım
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Frontend Doğrulaması (React kodundaki mantık)
    if (!name || !email || !password) {
        showError('Lütfen tüm alanları doldurun');
        return;
    }

    if (password.length < 6) {
        showError('Şifre en az 6 karakter olmalıdır');
        return;
    }

    // Eğer her şey tamamsa (Simülasyon)
    errorBox.classList.add('hidden');
    alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
    // window.location.href = '/login'; // Normalde buraya gider
});

function showError(message) {
    errorText.innerText = message;
    errorBox.classList.remove('hidden');
}