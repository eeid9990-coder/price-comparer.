from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# السماح للواجهة تتصل بالباك إند
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # للتجربة فقط
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# بيانات تجريبية عن منتجات سوبرماركت
FAKE_DATA = [
    {"name": "حليب المراعي 1 لتر", "store": "لولو",   "price": 6.5,  "url": "https://www.luluhypermarket.com/ar-sa/fmcg/dairy/حليب-المراعي-1-لتر/p/123456"},
    {"name": "حليب المراعي 1 لتر", "store": "العثيم", "price": 6.0,  "url": "https://www.othaimmarkets.com/ar-sa/fmcg/dairy/حليب-المراعي-1-لتر/p/654321"},
    {"name": "حليب المراعي 1 لتر", "store": "بندة",   "price": 5.75, "url": "https://www.panda.com.sa/product/حليب-المراعي-1-لتر"},
    {"name": "رز بسمتي 5 كجم",    "store": "لولو",   "price": 45.0, "url": "https://www.luluhypermarket.com/ar-sa/fmcg/rice/رز-بسمتي-5-كجم/p/234567"},
    {"name": "رز بسمتي 5 كجم",    "store": "العثيم", "price": 43.5, "url": "https://www.othaimmarkets.com/ar-sa/fmcg/rice/رز-بسمتي-5-كجم/p/765432"},
    {"name": "رز بسمتي 5 كجم",    "store": "بندة",   "price": 44.0, "url": "https://www.panda.com.sa/product/رز-بسمتي-5-كجم"},
    {"name": "ماء زمزم 1.5 لتر", "store": "لولو", "price": 3.5, "url": "https://www.luluhypermarket.com/ar-sa/fmcg/water/ماء-زمزم-1-لتر/p/345678"},
    {"name": "ماء زمزم 1.5 لتر", "store": "العثيم", "price": 3.0, "url": "https://www.othaimmarkets.com/ar-sa/fmcg/water/ماء-زمزم-1-لتر/p/876543"},
    {"name": "ماء زمزم 1.5 لتر", "store": "بندة", "price": 3.25, "url": "https://www.panda.com.sa/product/ماء-زمزم-1-لتر"},
]

def normalize(text: str) -> str:
    """تبسيط النص عشان البحث يكون أذكى شوي"""
    return text.replace(" ", "").replace("ال", "").lower()

@app.get("/search")
def search_products(q: str = ""):
    q = q.strip()
    if not q:
        results = FAKE_DATA.copy()
    else:
        nq = normalize(q)
        results = [item for item in FAKE_DATA if nq in normalize(item["name"])]

    results.sort(key=lambda x: x["price"])
    return results
