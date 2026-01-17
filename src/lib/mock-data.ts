export const MOCK_MENU = {
    restaurant: {
        id: "1",
        name: "Sultan's Kebab House",
        address: "28 May Street, Baku",
        rating: 4.8,
        reviews: 1240,
        deliveryTime: "25-35 min",
        coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1974", // BBQ Kebab
        categories: ["Kebabs", "Plov", "Sides", "Drinks"],
    },
    items: [
        {
            id: "101",
            name: "Adana Kebab Platter",
            description: "Spicy minced lamb kebab served with grilled vegetables and sumac onions.",
            price: 18,
            currency: "AZN",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=2000",
            category: "Kebabs",
            popular: true,
        },
        {
            id: "102",
            name: "Shah Plov Special",
            description: "Traditional Azerbaijani rice dish in a crispy crust with dried fruits and chestnut.",
            price: 25,
            currency: "AZN",
            image: "https://images.unsplash.com/photo-1626804475297-411d8c6b932d?auto=format&fit=crop&q=80&w=2000", // Rice dish equivalent
            category: "Plov",
            popular: true,
        },
        {
            id: "103",
            name: "Lamb Chops",
            description: "Juicy grilled lamb chops seasoned with local herbs.",
            price: 30,
            currency: "AZN",
            image: "https://images.unsplash.com/photo-1603360946369-dc9bb6f54249?auto=format&fit=crop&q=80&w=2000",
            category: "Kebabs",
            popular: false,
        },
        {
            id: "104",
            name: "Fresh Mangal Salad",
            description: "Grilled eggplants, tomatoes, and peppers chopped with garlic and greens.",
            price: 8,
            currency: "AZN",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2000",
            category: "Sides",
            popular: false,
        }
    ]
};
