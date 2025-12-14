let products = [
    { name: "حليب المراعي 1 لتر", store: "لولو", price: 6.5, url: "https://www.luluhypermarket.com" },
    { name: "أرز بسمتي 5 كجم", store: "العثيم", price: 45, url: "https://www.othaimmarkets.com" },
    { name: "ماء زمزم 1.5 لتر", store: "بندة", price: 3.5, url: "https://www.panda.com.sa" },
];

let cart = [];

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    document.documentElement.lang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', document.documentElement.lang);
}

function searchProducts() {
    const query = document.getElementById('search-query').value.toLowerCase();
    const results = products.filter(product => product.name.toLowerCase().includes(query));
    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = '${product.name} - ${product.store} - ${product.price} ريال';
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = 'أضف إلى السلة';
        addToCartBtn.onclick = () => addToCart(product);
        productDiv.appendChild(addToCartBtn);
        resultsDiv.appendChild(productDiv);
    });
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartButton();
}

function updateCartButton() {
    document.getElementById('cart-button').textContent =' السلة (${cart.length} منتج)';
}

function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
    } else {
        alert('تم إتمام الشراء بنجاح!');
        localStorage.removeItem('cart');
        cart = [];
        updateCartButton();
    }
}

// استرجاع الإعدادات المحفوظة
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
    }

    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
    }
    updateCartButton();
};
// دالة لتبديل الوضع الليلي
const toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
};

// دالة لتبديل اللغة بين العربية والإنجليزية
const toggleLanguage = () => {
    const currentLang = document.documentElement.lang;
    document.documentElement.lang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', document.documentElement.lang);
};

// دالة لتسجيل المستخدم الجديد
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // حفظ بيانات المستخدم في localStorage
    localStorage.setItem('user', JSON.stringify({ name, email, password }));

    alert("تم إنشاء الحساب بنجاح!");
    window.location.href = "login.html"; // بعد التسجيل يتم توجيه المستخدم إلى صفحة تسجيل الدخول
});

// دالة لتسجيل الدخول
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("تم تسجيل الدخول بنجاح!");
        window.location.href = "index.html"; // بعد تسجيل الدخول يتم توجيه المستخدم إلى الصفحة الرئيسية
    } else {
        alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
});

// استرجاع اللغة والتطبيق التلقائي بعد تحميل الصفحة
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        document.documentElement.lang = savedLanguage;
    }
};