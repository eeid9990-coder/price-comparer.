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
    const products = [
        { name: "حليب المراعي 1 لتر", price: 6.5, store: "لولو" },
        { name: "أرز بسمتي 5 كجم", price: 45, store: "العثيم" },
        { name: "ماء زمزم 1.5 لتر", price: 3.5, store: "بندة" },
    ];
    const results = products.filter(product => product.name.toLowerCase().includes(query));
    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = ${product.name} - ${product.store} - ${product.price} ريال;
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
    document.getElementById('cart-button').textContent = السلة (${cart.length} منتج);
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
