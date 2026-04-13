// İkonları canlandır
lucide.createIcons();

// Kullanıcı menüsü açma/kapama mantığı
const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');

if (userMenuBtn) {
    userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
    });
}

// Menü açıkken dışarıya tıklanırsa kapat
document.addEventListener('click', () => {
    if (userDropdown && !userDropdown.classList.contains('hidden')) {
        userDropdown.classList.add('hidden');
    }
});