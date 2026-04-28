const restaurants = [
    {
        id: "1",
        name: "Kebapçı İskender",
        description: "Bursa'nın meşhur lezzeti, bol tereyağlı ve taze pideli.",
        rating: 4.9,
        deliveryTime: "25-35 dk",
        minOrder: 180,
        // DİKKAT: Resim yolunu kendi bilgisayarına göre ayarladık
        image: "https://placehold.co/800x400/orange/white?text=Iskender+Burada" 
    }
];

const menuItems = [
    {
        id: 101,
        restaurantId: "1",
        name: "Porsiyon İskender",
        price: 210,
        description: "Özel sosu, tereyağı ve yoğurduyla gerçek Bursa İskenderi.",
        // DİKKAT: Porsiyon resmi için aynı resmi veya başka resmi koyabilirsin
        image: "https://placehold.co/800x400/orange/white?text=Iskender+Burada" 
    }
];