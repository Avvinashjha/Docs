const data = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        actualPrice: 89.99,
        description: "Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality",
        images: ["headphones-1.jpg", "headphones-2.jpg", "headphones-3.jpg"],
        discountPercentage: 15,
        tags: ["electronics", "audio", "wireless"],
        rating: [4.5, 4.7, 4.6, 4.8, 4.4]
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        actualPrice: 24.99,
        description: "Breathable 100% organic cotton t-shirt with comfortable fit and sustainable production",
        images: ["tshirt-1.jpg", "tshirt-2.jpg"],
        discountPercentage: 10,
        tags: ["clothing", "sustainable", "casual"],
        rating: [4.2, 4.3, 4.1, 4.5, 4.0]
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        actualPrice: 29.99,
        description: "Insulated double-wall stainless steel bottle that keeps drinks cold for 24 hours or hot for 12",
        images: ["bottle-1.jpg", "bottle-2.jpg", "bottle-3.jpg", "bottle-4.jpg"],
        discountPercentage: 20,
        tags: ["kitchen", "travel", "eco-friendly"],
        rating: [4.8, 4.9, 4.7, 5.0, 4.8]
    },
    {
        id: 4,
        name: "Professional Chef's Knife",
        actualPrice: 79.99,
        description: "8-inch high-carbon stainless steel knife with ergonomic handle and precision sharpness",
        images: ["knife-1.jpg", "knife-2.jpg"],
        discountPercentage: 0,
        tags: ["kitchen", "cooking", "premium"],
        rating: [4.9, 4.8, 5.0, 4.7, 4.9]
    },
    {
        id: 5,
        name: "Yoga Mat Premium",
        actualPrice: 44.99,
        description: "Non-slip, extra thick yoga mat with alignment markers and carrying strap",
        images: ["yogamat-1.jpg", "yogamat-2.jpg"],
        discountPercentage: 25,
        tags: ["fitness", "yoga", "exercise"],
        rating: [4.6, 4.5, 4.7, 4.4, 4.6]
    }
]

export const getCarouselData = ()=>{
    return new Promise((resolve, reject) => {
        try {
            setTimeout(()=>{
                resolve(data);
            }, 1000);
        } catch (error) {
            reject(error);
        }
    })
}