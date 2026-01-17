export const MOCK_MENU = {
    restaurant: {
        id: "1",
        name: "Teravaze Food", // Keeping App Name
        address: "28 May Street, Baku",
        rating: 4.8,
        reviews: 1240,
        deliveryTime: "30-45 min",
        coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000",
        categories: ["Appetizers", "Burgers", "Sandwiches", "Steaks", "BBQ"],
    },
    items: [
        // Appetizers
        {
            id: "201",
            name: "Chicken Corn Soup",
            description: "Pure chicken stock with chicken chunks and bits of corn. (Serves 1-2)",
            price: 3.50, // 495 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-soup1.png",
            category: "Appetizers",
            popular: true,
        },
        {
            id: "202",
            name: "Hot & Sour Soup",
            description: "Made with chicken broth, chunks of chicken and variety vegetable with a tangy taste.",
            price: 4.00, // 595 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-soup2.png",
            category: "Appetizers",
            popular: false,
        },
        {
            id: "203",
            name: "Crunchy Finger Fish",
            description: "5 Pcs of extra crispy boneless fish strips. Served with tartar sauce and fries.",
            price: 8.50, // 1345 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-fish1.png",
            category: "Appetizers",
            popular: true,
        },

        // Burgers
        {
            id: "301",
            name: "Classic Chicken Burger",
            description: "Grilled chicken patty (130g) with cheese slice, lettuce and sauce; served with fries & coleslaw.",
            price: 3.50, // 520 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-burger1.png",
            category: "Burgers",
            popular: true,
        },
        {
            id: "302",
            name: "Classic Beef Burger",
            description: "Grilled beef patty (150g) with cheese slice, lettuce and sauce; served with fries & coleslaw.",
            price: 3.80, // 545 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-burger2.png",
            category: "Burgers",
            popular: true,
        },
        {
            id: "303",
            name: "Crispy Zinger Burger",
            description: "Crunchy chicken boneless fillet (100g) on ice berg with spicy sauce.",
            price: 3.50, // 545 PKR (Discounted)
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-zinger.png",
            category: "Burgers",
            popular: true,
        },

        // Sandwiches
        {
            id: "401",
            name: "Club Sandwich",
            description: "Breast Fillet Chicken with cheese slice, egg and vegetables. (Serves 1-2)",
            price: 7.50, // 1095 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-sandwich1.png",
            category: "Sandwiches",
            popular: false,
        },
        {
            id: "402",
            name: "BBQ Club Sandwich",
            description: "Chicken barbecued bihari boti with cheese slice, egg and vegetables.",
            price: 7.00, // 1095 PKR (Discounted)
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-sandwich3.png",
            category: "Sandwiches",
            popular: false,
        },

        // Steaks
        {
            id: "501",
            name: "Chicken Steak",
            description: "2 Pieces of Char-grilled chicken fillet topped with sauce of your choice. (Serves 1-2)",
            price: 11.50, // 1650 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-steak1.png",
            category: "Steaks",
            popular: true,
        },
        {
            id: "502",
            name: "Beef Steak",
            description: "One Piece of Char-grilled beef fillet topped with sauce of your choice. (Serves 1-2)",
            price: 16.50, // 2570 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-steak2.png",
            category: "Steaks",
            popular: true,
        },

        // BBQ
        {
            id: "601",
            name: "Chicken Tikka",
            description: "Barbecued Quarter chicken, marinated in ginger, garlic, red chilies. Served with BBQ sauce.",
            price: 4.50, // 695 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-tikka1.png",
            category: "BBQ",
            popular: true,
        },
        {
            id: "602",
            name: "Malai Tikka",
            description: "Barbecued Quarter chicken, marinated in a creamy based marination.",
            price: 4.80, // 745 PKR
            currency: "AZN",
            image: "https://assets.indolj.io/upload/1618471272-tikka2.png",
            category: "BBQ",
            popular: false,
        }
    ]
};
