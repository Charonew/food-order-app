lucide.createIcons();

const loginForm = document.getElementById('loginForm');
const errorAlert = document.getElementById('errorAlert');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('Lütfen tüm alanları doldurun');
        return;
    }

    // Login simülasyonu (Backend olmadığı için şimdilik manuel hata veriyoruz)
    // Gerçek sistemde burada login(email, password) fonksiyonu çağrılır
    if (email === "test@test.com" && password === "123456") {
        errorAlert.classList.add('hidden');
        alert("Giriş başarılı!");
    } else {
        showError('Email veya şifre hatalı');
    }
});

function showError(message) {
    errorMsg.innerText = message;
    errorAlert.classList.remove('hidden');
}