✨ Features:
📌 Persistent Storage – Saves product data in localStorage
🔄 No Duplicates – Avoids showing the same product twice
⏳ Latest First – Displays most recent views at the start
💻 Easy Integration – Minimal setup, plug-and-play
🎨 Customizable Design – Style it to match your brand

📂 Installation
Clone the repository:
git clone https://github.com/yourusername/recently-viewed-carousel.git

Usage:
HTML:
<div id="recently-viewed-carousel"></div>

JS & CSS:
<link rel="stylesheet" href="carousel.css">
<script src="carousel.js"></script>

Add a Product to Recently Viewed:
addToRecentlyViewed({
    id: "P12345",
    name: "Premium Leather Wallet",
    image: "images/wallet.jpg",
    price: "₹1,499",
    url: "/product/wallet"
});

Render Carousel:
renderRecentlyViewed("recently-viewed-carousel");

// On homepage or product listing
renderRecentlyViewed("recently-viewed-carousel");
