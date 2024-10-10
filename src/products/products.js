const product = {
    1001:{
        id:1001,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz0Sds1LwjVmAC8qgXOb2-NQipIjkWWXyVSg&s',
        name:'Blue Sapphire Pendant',
        price:54799,
        discountPrice:"₹59999",
        specifications:'A timeless and elegant Blue Sapphire Pendant that exudes sophistication and luxury. Perfect for special occasions or as a statement piece for everyday wear.',
        brand:'Blue Stone',
        category:'Jewelry',
    },
    1002:{
        id:1002,
        image:'https://kinclimg3.bluestone.com/f_jpg,c_scale,w_828,q_80,b_rgb:f0f0f0/giproduct/BIDG0319R180_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66194.png',
        name:'The Gianna Ring',
        price:54790,
        discountPrice:"₹56364",
        specifications:'An exquisite Diamond Ring crafted in 18Kt Yellow Gold, featuring brilliant diamonds that add a touch of elegance and sophistication. Perfect for engagements, anniversaries, or as a luxurious gift.',
        brand:'Blue Stone',
        category:'Jewelry'
    },
    1003:{
        id:1003,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqaVlTzAjkWzG8_QJFqQRevGRCBcOefiPLw&s',
        name:'TISSOT Sport Analog Watch',
        price:43499,
        discountPrice:"₹49999",
        specifications:"Amaze everyone around you by wearing this men's analog watch from TISSOT. The blue round dial is protected by a sapphire glass. It features plain 3-hand and a crown for time adjustment. The stainless steel strap comes in a silver hue that further elevates the look of the timekeeper. Besides, it is completed with a fold-over push button clasp with safety clasp to ensure a secure fit on the wrist.",
        brand:'TISSOT',
        category:'watch'
    },
    1004:{
        id:1004,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgW8FHvRuH6AlUkCe481pnxZeQq4DAWHMdmA&s',
        name:'Air Tube Earphones Headset',
        price:1499,
        discountPrice:"₹1999",
        specifications:'The Air Tube Earphones Headset is a high-quality earphone that offers superior sound',
        brand:'Air Tube',
        category:'Earphone'
    },
    1005:{
        id:1005,
        image:'https://cdn.thewirecutter.com/wp-content/media/2023/10/smartphone-2048px-4861.jpg?auto=webp&quality=30&width=1024',
        name:'Samsung Galaxy S21 FE 5G (Graphite, 8GB, 128GB Storage)',
        price:29800,
        discountPrice:"₹69999",
        specifications:'The Samsung Galaxy S21 FE 5G is a high-end Smartphone that offers a powerful processor, a large display, and a long-lasting battery. It also has a triple rear camera setup that allows you to take stunning photos and videos.',
        brand:'Samsung',
        category:'Smartphone'
    },
    1006:{
        id:1006,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2yscgkxDOnZgwVJQt6Pa8VGrfBfJe5D5pA&s',
        name:'LG Inverter AC, 2 Ton',
        price: 49599,
        discountPrice: "₹55999",
        specifications:'The LG Inverter AC is a high-efficiency air conditioner that uses an inverter technology to maintain a consistent temperature in your room. It also has a self-diagnosis feature that helps you to identify and fix any issues with the AC.',
        brand:'LG',
        category:'AC'
    },
    1007:{
        id:1007,
        image:'https://kinclimg6.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BISS0316R31_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-14636.png',
        name:'The Kael Ring',
        price:60064,
        discountPrice: "₹64999",
        specifications:'A stunning Diamond Ring crafted in 18Kt White Gold, featuring a dazzling center diamond that adds a touch of elegance and sophistication. Perfect for engagements, anniversaries, or as a luxurious gift.',
        brand:'Blue Stone',
        category:'Jewelry'
    },
    1008:{
        id:1008,
        image:'https://dajdiamond.com/wp-content/uploads/2022/04/DOC-ST-27-FY.jpg',
        name:'The Daj Diamond Earring',
        price: 53499,
        discountPrice: 59999,
        specifications:'A stunning Diamond Earring crafted in 18Kt White Gold, featuring a dazzling center diamond that adds a touch of elegance and sophistication. Perfect for engagements, anniversaries, or as a luxurious gift.',
        brand:'Daj Diamond',
        category:'Jewelry'
    },
    1009:{
        id:1009,
        image:'https://m.media-amazon.com/images/I/71aiqeP-APL._SL1500_.jpg',
        name:'Redmi Note 13 Pro (Coral Purple, 8GB RAM, 128GB Storage) | 1.5K AMOLED | 200MP Hi-Res Camera | Flagship 4nm SD 7s Gen 2 | 67W TurboCharge',
        price: 24999,
        discountPrice: 28999,
        specifications:'The Redmi Note 13 Pro is a high-end Smartphone that offers a powerful processor and a large display. It also has a triple rear camera setup that allows you to take stunning photos and videos.',
        brand:'Redmi',
        category:'Smartphone'
    },
    1010:{
        id:1010,
        image:'https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg',
        name:'Apple iPhone 15(256 GB) - Blue',
        price: 81999,
        discountPrice: 89900,
        specifications:'The Apple iPhone 15 is a high-end Smartphone that offers a powerful processor, a large display, and a long-lasting battery. It also has a triple rear camera setup that allows you to take stunning photos and videos.',
        brand:'Apple',
        category:'Smartphone'
    },
    1011:{
        id:1011,
        image:'https://m.media-amazon.com/images/I/81vxWpPpgNL._SL1500_.jpg',
        name:'Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 1TB Storage)',
        price: 159999,
        discountPrice:164999,
        specifications:'The Samsung Galaxy S24 Ultra 5G is a high-end Smartphone that offers a powerful processor, a large display, and a long-lasting battery. It also has a triple rear camera setup that allows you to take stunning photos and videos.',
        brand:'Samsung',
        category:'Smartphone'
    },
    1012:{
        id:1012,
        image:"https://m.media-amazon.com/images/I/81zU65mJmJL._SL1500_.jpg",
        name:'Xiaomi 14 Ultra (White, 16GB RAM, 512GB Storage) | 50 MP Leica Quad Camera | 2K 120 Hz LTPO AMOLED | Flagship Snapdragon 8 Gen 3 | 90 W Hypercharge',
        price: 99998,
        discountPrice: 119999,
        specifications:'The Xiaomi 14 Ultra is a high-end Smartphone that offers a powerful processor, a large display, and a long-lasting battery. It also has a quad rear camera setup that allows you to take stunning photos and videos.',
        brand:'Xiaomi',
        category:'Smartphone'
    },
    1013:{
        id:1013,
        image:'https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg',
        name:'OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB Storage)',
        price: 64999,
        discountPrice:75999,
        specifications:'The OnePlus 12 is a high-end Smartphone that offers a powerful processor, a large display, and a long-lasting battery. It also has a triple rear camera setup that allows you to take stunning photos and videos.',
        brand:'OnePlus',
        category:'Smartphone'
    },
    1014:{
        id:1014,
        image:"https://m.media-amazon.com/images/I/610IIi6wHuL._SY879_.jpg",
        name:'Lymio Track Pant for Men || Track Pants || Plain Track Pant',
        price: 999,
        discountPrice:1599,
        specifications:'The Lymio Track Pant is a comfortable and stylish track pant that is perfect for working out or lounging around. It is made from a soft and stretchy fabric that allows for a comfortable fit and movement. The track pant also has a drawstring waistband that allows you to adjust the fit to your liking.',
        brand:'Lymio',
        category:'Clothes'
    },
    1015:{
        id:1015,
        image:'https://m.media-amazon.com/images/I/612JvadSUzL._SY879_.jpg',
        name:'Women Floral Print Anarkali Kurta With Pant and Dupatta',
        price: 999,
        discountPrice: 1499,
        specifications:'The Women Floral Print Anarkali Kurta With Pant and Dupatta is a beautiful kurta set that is perfect for any occasion. The kurta is made from a soft and comfortable fabric that is perfect for wearing all day long. The kurta also has a floral print that adds a touch of elegance to the outfit.',
        brand:'Wedani',
        category:'Clothes'
    },
    1016:{
        id:1016,
        image:'https://m.media-amazon.com/images/I/61493z-oqKL._SY879_.jpg',
        name:"Avantika Fashion Women's Kanjivaram Soft Pure Silk Banarasi Sarees With Blouse Piece",
        price: 899,
        discountPrice: 1199,
        specifications:"The Avantika Fashion Women's Kanjivaram Soft Pure Silk Banarasi Sarees With Blouse Piece is a beautiful saree that is perfect for any occasion. The saree is made from a soft and comfortable fabric that is perfect for wearing all day long. The saree also has a beautiful design that adds a touch of elegance to the outfit.",
        brand:'Avantika Fashion',
        category:'Clothes'
    },
    1017:{
        id:1017,
        image:'https://m.media-amazon.com/images/I/518n4wn7k6L.jpg',
        name:'FUNKY RICH Funkyrich® Textured Popcorn Shirts for Men || Casual Shirt for Men ',
        price: 699,
        discountPrice: 1099,
        specifications:'The FUNKY RICH Funkyrich® Textured Popcorn Shirts for Men is a stylish and comfortable shirt that is perfect for any occasion. The shirt is made from a soft and comfortable fabric that is perfect for wearing all day long. The shirt also has a textured popcorn design that adds a touch of style to the outfit.',
        brand:'FUNKY RICH',
        category:'Clothes'
    },
    1018:{
        id:1018,
        image:'https://m.media-amazon.com/images/I/61mfMh+cEkL._SL1500_.jpg',
        name:'Apple 2023 MacBook Pro (16-inch, M3 Max chip with 16‑core CPU and 40‑core GPU, 48GB Unified Memory, 1TB) - Space Black',
        price: 379990,
        discountPrice:399900,
        specifications:'The Apple 2023 MacBook Pro is a high-end Laptop that offers a powerful processor and a large display. It also has a long-lasting battery and a sleek design that makes it perfect for working on the go.',
        brand:'Apple',
        category:'Laptop'
    },
    1019:{
        id:1019,
        image:'https://m.media-amazon.com/images/I/71tcUliY1hL._SL1500_.jpg',
        name:'HP Laptop 15s, 12th Gen Intel Core i5-1235U, 15.6-inch, FHD, 16GB DDR4, 512GB SSD, Intel Iris Xe graphics, Backlit KB',
        price: 52025,
        discountPrice: 68223,
        specifications:'The HP Laptop 15s is a high-end Laptop that offers a powerful processor and a large display. It also has a long-lasting battery and a sleek design that makes it perfect for working on the go.',
        brand:'HP',
        category:'Laptop'
    },
    1020:{
        id:1020,
        image:'https://m.media-amazon.com/images/I/71iWEMpnwCL._SL1500_.jpg',
        name:'MSI Crosshair 16 HX, Intel 14th Gen. i7-14700HX,240Hz Gaming Laptop(1TB SSD NVIDIA GeForce RTX 4060)',
        price:148046,
        discountPrice: 162990,
        specifications:'The MSI Crosshair 16 HX is a high-end gaming Laptop that offers a       powerful processor and a large display. It also has a long-lasting battery and a sleek design that makes it perfect for gaming on the go.',
        brand:'MSI',
        category:'Laptop'
    },
    1021:{
        id:1021,
        image:'https://m.media-amazon.com/images/I/81fPDLbiWfL._SL1500_.jpg',
        name:'Mi Ultra 3K Resolution Display Intel Core I5-11300H Light Laptop (8Gb/512Gb Ssd/Backlit Kb/Fingerprint Sensor)',
        price: 47999,
        discountPrice: 55999,
        specifications:'The Mi Ultra 3K Resolution Display Intel Core I5-11300H Light Laptop is a high-end Laptop that offers a powerful processor and a large display. It also has a long-lasting battery and a sleek design that makes it perfect for working on the go.',
        brand:'Xiaomi',
        category:'Laptop'
    },
    1022:{
        id:1022,
        image:'https://m.media-amazon.com/images/I/61xkKiYZVZL._SL1500_.jpg',
        name:'ASUS Vivobook 16X Thin and Light Laptop,AMD Ryzen 5 5600H, 16 inch(8GB RAM/512GB SSD/Silver)',
        price: 49999,
        discountPrice: 57990,
        specifications:'The ASUS Vivobook 16X Thin and Light Laptop is a high-end Laptop that offers a powerful processor and a large display. It also has a long-lasting battery and a sleek design that makes it perfect for working on the go.',
        brand:'ASUS',
        category:'Laptop'
    },
    1023:{
        id:1023,
        image:'https://m.media-amazon.com/images/I/81cPy3CpDxL._SX695_.jpg',
        name:'SPARX mens Sx0678g Sneaker',
        price: 1259,
        discountPrice: 2049,
        specifications:'The SPARX mens Sx0678g Sneaker is a high-end sneaker that offers a comfortable fit and a stylish design. It also has a durable construction that makes it perfect for everyday wear.',
        brand:'SPARX',
        category:'Shoes'
    },
    1024:{
        id:1024,
        image:'https://m.media-amazon.com/images/I/61BzpN826fL._SY695_.jpg',
        name:"Campus Men's AGR-004 Walking Shoes",
        price: 699,
        discountPrice: 1399,
        specifications:'The Campus Men\'s AGR-004 Walking Shoes is a high-end sneaker that offers a comfortable fit and a stylish design. It also has a durable construction that makes it perfect for everyday wear.',
        brand:'Campus',
        category:'Shoes'
    },
    1025:{
        id:1025,
        image:'https://m.media-amazon.com/images/I/61JEvj1nj5L._SY695_.jpg',
        name:'Nike Men\'s Air Jordan 1 MID SE Black/White/Gold 852542-007',
        price: 23757,
        discountPrice: 27999,
        specifications:'The Nike Men\'s Air Jordan 1 MID SE Black/White/Gold is a high-end sneaker that offers a comfortable fit and a stylish design. It also has a durable construction that makes it perfect for everyday wear.',
        brand:'Nike',
        category:'Shoes'
    },
    1026:{
        id:1026,
        image:'https://m.media-amazon.com/images/I/71V798w4qhL._SL1500_.jpg',
        name:'Xiaomi 138 cm (55 inches) X 4K Dolby Vision Series Smart Google TV L55M8-A2IN (Black)',
        price:37999,
        discountPrice: 54999,
        specifications:'The Xiaomi 138 cm (55 inches) X 4K Dolby Vision Series Smart Google TV L55M8-A2IN is a high-end TV that offers a large display and a powerful processor. It also has a sleek design that makes it perfect for watching movies and TV shows.',
        brand:'Xiaomi',
        category:'TV'
    },
    1027:{
        id:1027,
        image:'https://m.media-amazon.com/images/I/81Tfy967TKL._SL1500_.jpg',
        name:'LG 80 cm (32 inches) HD Ready Smart LED TV 32LM563BPTC (Dark Iron Gray)',
        price: 13990,
        discountPrice: 21990,
        specifications:'The LG 80 cm (32 inches) HD Ready Smart LED TV 32LM 563BPTC is a high-end TV that offers a large display and a powerful processor. It also has a sleek design that makes it perfect for watching movies and TV shows.',
        brand:'LG',
        category:'TV'
    },
    1028:{
        id:1028,
        image:'https://m.media-amazon.com/images/I/91mRUNnqqnL._SL1500_.jpg',
        name:'Samsung 108 cm (43 inches) Full HD Smart LED TV UA43T5450AKXXL (Black)',
        price: 26990,
        discountPrice: 34990,
        specifications:'The Samsung 108 cm (43 inches) Full HD Smart LED TV UA43T5450AKXXL is a high-end TV that offers a large display and a powerful processor.It also has a sleek design that makes it perfect for watching movies and TV shows.',
        brand:'Samsung',
        category:'TV'
    },
    1029:{
        id:1029,
        image:'https://m.media-amazon.com/images/I/5126gXnEjFL._SL1087_.jpg',
        name:'Acer 100 cm (40 inches) Advanced I Series Full HD Smart LED Google TV AR40GR2841FDFL (Black)',
        price: 17990,
        discountPrice: 24990,
        specifications:'The Acer 100 cm (40 inches) Advanced I Series Full HD Smart LED Google TV AR40GR2841FDFL is a high-end TV that offers a large display and a powerful processor. It also has a sleek design that makes it perfect for watching movies and TV shows.',
        brand:'Acer',
        category:'TV'
    },
    1030:{
        id:1030,
        image:'https://m.media-amazon.com/images/I/81MRU+3RJLL._SL1500_.jpg',
        name:'Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV KD-55X74L (Black)',
        price: 57990,
        discountPrice: 69990,
        specifications:'The Sony Bravia 139 cm (55 inches) 4K Ultra HD Smart LED Google TV KD-55X74L is a high-end TV that offers a large display and a powerful processor. It also has a sleek design that makes it perfect for watching movies and TV shows.',
        brand:'Sony',
        category:'TV'
    },
    1031:{
        id:1031,
        image:'https://m.media-amazon.com/images/I/71GVek0jwfS._SX679_.jpg',
        name:'SHOPPING QUEEN Women Cotton A-Line Kurta | 100% Cotton | 3/4 Sleeve',
        price:789,
        discountPrice:2299,
        specifications:'This fabric keeps you cool during summers and warm during winters. The kurta is made from pure cotton, with a plain silhouette, which gives it that look. It\'s best for office wear, casual or night wear. This is a beautiful cotton kurta with a traditional print on it. This can be worn casually or as a party wear. The fabric is soft and comfortable to wear with all the new trends.',
        brand:'Shopping Queen',
        category:"clothes"
    },
    1032:{
        id:1032,
        image:'https://m.media-amazon.com/images/I/81oS2scJ5GL._SL1500_.jpg',
        name:'Noise Twist Go round dial Smartwatch with BT calling, 1.39" Display, Metal Build',
        price:1599,
        discountPrice:4999,
        specifications:'The NoiseFit Twist Go is a budget-friendly smartwatch that offers a robust set of features for its price point.The smartwatch boasts a 1.39-inch HD TFT LCD screen with a 2.5D curved glass display. It has a metal build and includes a rotating crown for easy navigation. The design is stylish and versatile, available in multiple colors and strap options, including both silicone and metallic variants.',
        brand:'Noise',
        category:'Watch'
    },
    1033:{
        id:1033,
        image:'https://m.media-amazon.com/images/I/51l36TeIjfL._SY879_.jpg',
        name:'Titan Karishma Analog Champagne Dial Women\'s Watch ',
        price:1789,
        discountPrice:1995,
        specifications:'Elevate your elegance with the Titan Karishma Analog Women\'s Watch, a perfect blend of style and sophistication. This exquisite timepiece features a stunning champagne dial that adds a touch of luxury to your everyday look. The sleek and slim design, paired with the gleaming gold-tone stainless steel strap, makes it an ideal accessory for any occasion.',
        brand:'Titan',
        category:'Watch'

    },
    1034:{
        id:1034,
        image:'https://m.media-amazon.com/images/I/51CWi-GVY4L._SL1500_.jpg',
        name:'Voltas 1 ton 3 Star Inverter Split AC (Copper, 4-in-1 Adjustable Mode, Anti-dust Filter, 2024 Model, 123V CAE, White)',
        price:30990,
        discountPrice:79000,
        specifications:"Split AC with inverter compressor: Variable speed compressor which adjusts power depending on heat load. The adjustable feature with 4 cooling modes allows for flexible temperature control by operating in 4 different tonnages by adjusting cooling capacity (20% to 120%) to match different needs basis room size or occupancy, enhancing energy efficiency and providing personalized comfort with minimal effort.Capacity 1 ton: Suitable for small sized rooms ( up to 110 sq.ft); Cooling Capacity: 1650 - 3750 W; Ambient Temperature: 52 degree Celsius Energy Rating: 3 Star | Energy efficiency | Annual Energy Consumption (as per energy label): 672.93 kwh | ISEER Value: 3 Warranty: 1 Years on Product, 5 Years on PCB, 10 Years on Compressor with gas charging",
        brand:'Voltas',
        category:'AC'
    }
}

export default product;