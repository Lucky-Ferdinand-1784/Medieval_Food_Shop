// Game Data for Dapur Kerajaan - Pixel Medieval Food Shop & Tavern

export const FOOD_MENU = [
    {
        id: 1,
        name: "Ayam Panggang Madu Istana",
        category: "heavy",
        price: 45,
        icon: "🍗",
        badge: "Terlaris",
        rarity: "rare",
        stats: "+45 HP | +10 STR",
        effects: { hp: 45, stamina: 25, str: 10 },
        desc: "Ayam utuh dipanggang perlahan di perapian dengan olesan madu hutan lebah liar dan rempah kesturi kerajaan.",
        ingredients: [
            { id: 'meat', name: 'Daging Segar', count: 1 },
            { id: 'honey', name: 'Madu Liar', count: 1 }
        ]
    },
    {
        id: 2,
        name: "Kalkun Panggang Raja",
        category: "heavy",
        price: 80,
        icon: "🦃",
        badge: "Perjamuan Akbar",
        rarity: "epic",
        stats: "+85 HP | +15 DEF",
        effects: { hp: 85, stamina: 40, def: 15 },
        desc: "Kalkun gemuk dengan kulit keemasan renyah beraroma kayu apel, disajikan khusus untuk ksatria penjaga tahta.",
        ingredients: [
            { id: 'meat', name: 'Daging Segar', count: 2 },
            { id: 'spices', name: 'Rempah Api', count: 1 }
        ]
    },
    {
        id: 3,
        name: "Paha Daging Asap Rimba",
        category: "heavy",
        price: 55,
        icon: "🍖",
        badge: "Favorit Ksatria",
        rarity: "common",
        stats: "+60 HP | +8 ATK",
        effects: { hp: 60, stamina: 30, atk: 8 },
        desc: "Daging paha binatang buruan diasap di atas serpihan kayu ek berhari-hari. Awet untuk ekspedisi dungeon terdalam.",
        ingredients: [
            { id: 'meat', name: 'Daging Segar', count: 1 },
            { id: 'spices', name: 'Rempah Api', count: 1 }
        ]
    },
    {
        id: 4,
        name: "Steak Daging Rusa Purba",
        category: "heavy",
        price: 110,
        icon: "🥩",
        badge: "Legendaris",
        rarity: "legendary",
        stats: "+120 HP | +25 ATK | +20 DEF",
        effects: { hp: 120, stamina: 60, atk: 25, def: 20 },
        desc: "Irisan tebal daging rusa bertanduk emas dengan mentega rosemary istana yang meleleh di lidah.",
        ingredients: [
            { id: 'meat', name: 'Daging Segar', count: 2 },
            { id: 'spices', name: 'Rempah Api', count: 2 },
            { id: 'herbs', name: 'Herba Elven', count: 1 }
        ]
    },
    {
        id: 5,
        name: "Roti Gandum Oven Batu",
        category: "bakery",
        price: 15,
        icon: "🍞",
        badge: "Makanan Pokok",
        rarity: "common",
        stats: "+20 HP | +25 STAMINA",
        effects: { hp: 20, stamina: 25 },
        desc: "Roti gandum utuh tradisional berkerak garing dengan bagian dalam yang empuk lembut, dibakar di bata api.",
        ingredients: [
            { id: 'wheat', name: 'Tepung Gandum', count: 2 }
        ]
    },
    {
        id: 6,
        name: "Pai Daging Lembu & Sayuran",
        category: "bakery",
        price: 38,
        icon: "🥧",
        badge: "Paling Hangat",
        rarity: "rare",
        stats: "+40 HP | +15 DEF",
        effects: { hp: 40, stamina: 30, def: 15 },
        desc: "Kulit pai berlapis renyah dengan isian potongan dadu daging lembu lezat, wortel kebun, dan kuah kental gurih.",
        ingredients: [
            { id: 'wheat', name: 'Tepung Gandum', count: 1 },
            { id: 'meat', name: 'Daging Segar', count: 1 }
        ]
    },
    {
        id: 7,
        name: "Tart Berry Merah Ratu",
        category: "bakery",
        price: 32,
        icon: "🫐",
        badge: "Pencuci Mulut",
        rarity: "rare",
        stats: "+30 HP | +40 MANA",
        effects: { hp: 30, mana: 40, stamina: 20 },
        desc: "Kue tart manis mentega dengan selai buah berry liar pegunungan utara, favorit putri bangsawan kerajaan.",
        ingredients: [
            { id: 'wheat', name: 'Tepung Gandum', count: 1 },
            { id: 'berries', name: 'Berry Liar', count: 2 },
            { id: 'honey', name: 'Madu Liar', count: 1 }
        ]
    },
    {
        id: 8,
        name: "Croissant Keju Istana",
        category: "bakery",
        price: 25,
        icon: "🥐",
        badge: "Sarapan Cepat",
        rarity: "common",
        stats: "+25 HP | +20 AGI",
        effects: { hp: 25, stamina: 25, agi: 20 },
        desc: "Pastri renyah berlipat dengan mentega melimpah dan taburan parutan keju tua dari desa perbukitan.",
        ingredients: [
            { id: 'wheat', name: 'Tepung Gandum', count: 2 },
            { id: 'honey', name: 'Madu Liar', count: 1 }
        ]
    },
    {
        id: 9,
        name: "Rebusan Kuali Daging Tavern",
        category: "soup",
        price: 42,
        icon: "🍲",
        badge: "Resep Kuno",
        rarity: "rare",
        stats: "+55 HP | +25 REGEN",
        effects: { hp: 55, stamina: 35 },
        desc: "Rebusan mendidih kental di kuali besi tempa hitam dengan umbi-umbian tanah dan kuah rempah yang menenangkan.",
        ingredients: [
            { id: 'meat', name: 'Daging Segar', count: 1 },
            { id: 'wheat', name: 'Tepung Gandum', count: 1 },
            { id: 'herbs', name: 'Herba Elven', count: 1 }
        ]
    },
    {
        id: 10,
        name: "Sup Pedas Cabe Naga Rimba",
        category: "soup",
        price: 48,
        icon: "🥣",
        badge: "Penghangat Tubuh",
        rarity: "rare",
        stats: "+50 HP | +25 RESIS API",
        effects: { hp: 50, stamina: 40, atk: 12 },
        desc: "Kuah merah pekat yang menyengat lidah, seketika membakar rasa kantuk dan menangkal racun hawa dingin gua es.",
        ingredients: [
            { id: 'meat', name: 'Daging Segar', count: 1 },
            { id: 'spices', name: 'Rempah Api', count: 2 }
        ]
    },
    {
        id: 11,
        name: "Kaldu Jamur Berkilau Elven",
        category: "soup",
        price: 65,
        icon: "🍄",
        badge: "Sihir Suci",
        rarity: "epic",
        stats: "+70 HP | +60 MANA",
        effects: { hp: 70, mana: 60, stamina: 30 },
        desc: "Sup kaldu harum jernih dari jamur bercahaya hutan elf kuno, mengembalikan aliran sihir dalam seketika.",
        ingredients: [
            { id: 'herbs', name: 'Herba Elven', count: 2 },
            { id: 'berries', name: 'Berry Liar', count: 1 }
        ]
    },
    {
        id: 12,
        name: "Bir Gandum Madu (Mead Kedai)",
        category: "drinks",
        price: 22,
        icon: "🍺",
        badge: "Khas Kedai",
        rarity: "common",
        stats: "+35 STAMINA | Semangat +10",
        effects: { stamina: 35, hp: 15 },
        desc: "Minuman fermentasi madu murni dan gandum dalam cangkir kayu ek tebal. Menghangatkan dada dan memancing gelak tawa.",
        ingredients: [
            { id: 'honey', name: 'Madu Liar', count: 2 },
            { id: 'wheat', name: 'Tepung Gandum', count: 1 }
        ]
    },
    {
        id: 13,
        name: "Teh Seduh Bunga Elven",
        category: "drinks",
        price: 30,
        icon: "🍵",
        badge: "Penenteram Jiwa",
        rarity: "common",
        stats: "+35 HP | +50 MANA",
        effects: { hp: 35, mana: 50 },
        desc: "Pucuk daun bunga harum titipan karavan pedagang elf. Mengusir lelah dan menjernihkan konsentrasi mantra.",
        ingredients: [
            { id: 'herbs', name: 'Herba Elven', count: 2 }
        ]
    },
    {
        id: 14,
        name: "Elixir Stamina Merah Delima",
        category: "drinks",
        price: 65,
        icon: "🍷",
        badge: "Tonik Kerajaan",
        rarity: "epic",
        stats: "+100 STAMINA | +40 HP",
        effects: { stamina: 100, hp: 40 },
        desc: "Distilasi sari delima langka dan madu pegunungan yang sanggup mengembalikan tenaga lelah dalam satu tegukan.",
        ingredients: [
            { id: 'berries', name: 'Berry Liar', count: 2 },
            { id: 'honey', name: 'Madu Liar', count: 1 }
        ]
    },
    {
        id: 15,
        name: "Nektar Ambrosia Dewa Tahta",
        category: "special",
        price: 160,
        icon: "🏺",
        badge: "Mustika Kerajaan",
        rarity: "legendary",
        stats: "+150 HP | +150 MANA | +100 STAMINA",
        effects: { hp: 150, mana: 150, stamina: 100, atk: 30, def: 30 },
        desc: "Resep rahasia legendaris istana yang hanya dihidangkan kepada pahlawan penumpas naga hitam benteng.",
        ingredients: [
            { id: 'honey', name: 'Madu Liar', count: 2 },
            { id: 'berries', name: 'Berry Liar', count: 2 },
            { id: 'herbs', name: 'Herba Elven', count: 2 },
            { id: 'spices', name: 'Rempah Api', count: 1 }
        ]
    },
    {
        id: 16,
        name: "Keranjang Apel Merah Istana",
        category: "bakery",
        price: 14,
        icon: "🍎",
        badge: "Pemetikan Pagi",
        rarity: "common",
        stats: "+18 HP | +15 STAMINA",
        effects: { hp: 18, stamina: 15 },
        desc: "Apel merah segar berair yang baru dipetik dari kebun permaisuri kerajaan di lereng bukit barat.",
        ingredients: [
            { id: 'berries', name: 'Berry Liar', count: 1 }
        ]
    }
];

export const RAW_INGREDIENTS = [
    { id: 'meat', name: 'Daging Segar', icon: '🥩', price: 18, desc: 'Daging buruan hutan lebat' },
    { id: 'wheat', name: 'Tepung Gandum', icon: '🌾', price: 8, desc: 'Gandum panen musim gugur' },
    { id: 'honey', name: 'Madu Liar', icon: '🍯', price: 14, desc: 'Madu lebah pohon cedar' },
    { id: 'spices', name: 'Rempah Api', icon: '🌶️', price: 20, desc: 'Biji cabe liar pegunungan naga' },
    { id: 'herbs', name: 'Herba Elven', icon: '🌿', price: 22, desc: 'Tanaman aromatik suci' },
    { id: 'berries', name: 'Berry Liar', icon: '🫐', price: 12, desc: 'Buah berry asam manis lereng' }
];

export const TAVERN_GUESTS = [
    {
        id: 'galahad',
        name: 'Ksatria Galahad',
        title: 'Komandan Pasukan Tameng',
        avatar: '🛡️',
        dialogue: 'Hari yang berat di perbatasan barat! Cepat bawakan aku hidangan daging hangat sebelum patroli berlanjut!',
        requestFoodId: 1, // Ayam Panggang
        qty: 2,
        rewardGold: 130,
        rewardExp: 60
    },
    {
        id: 'lunaria',
        name: 'Penyihir Lunaria',
        title: 'Akademia Sihir Bintang',
        avatar: '🧙‍♀️',
        dialogue: 'Energi mana-ku terkuras habis merapal segel pertahanan benteng. Aku butuh tonik pemulih dan kue tart manis.',
        requestFoodId: 7, // Tart Berry
        qty: 2,
        rewardGold: 100,
        rewardExp: 50
    },
    {
        id: 'thord',
        name: 'Kurcaci Borin Thord',
        title: 'Penempa Besi Gunung Karang',
        avatar: '🧔',
        dialogue: 'Panasnya perapian bengkel membuat tenggorokanku kering kerontang! Segelas bir mead dingin akan menyelamatkanku!',
        requestFoodId: 12, // Mead Kedai
        qty: 3,
        rewardGold: 95,
        rewardExp: 45
    },
    {
        id: 'robin',
        name: 'Robin si Pemanah Rimba',
        title: 'Penjaga Batas Pohon Suci',
        avatar: '🏹',
        dialogue: 'Bekal perjalananku habis diintai kawanan serigala. Paha daging asap tebal ini sangat kuperlukan!',
        requestFoodId: 3, // Paha Daging Asap
        qty: 2,
        rewardGold: 140,
        rewardExp: 70
    },
    {
        id: 'eleanor',
        name: 'Utusan Permaisuri Eleanor',
        title: 'Bangsawan Istana Tengah',
        avatar: '👑',
        dialogue: 'Yang Mulia Permaisuri mengutusku mencari jamuan santapan istimewa untuk tamu agung kerajaan malam ini!',
        requestFoodId: 2, // Kalkun Panggang Raja
        qty: 1,
        rewardGold: 150,
        rewardExp: 90
    }
];

export const CHEF_RUMORS = [
    "Ayam panggang madu kami dipanggang dengan kayu apel pilihan! Aromanya memikat seisi benteng!",
    "Ksatria berkuda dari perbatasan selalu memborong Roti Gandum dan Paha Asap sebelum patroli malam.",
    "Jangan lupa membelai si Miko, kucing oranye kedai yang tidur dekat perapian kayu! Ia membawa keberuntungan!",
    "Bila kamu memasak di perapian dengan waktu tepat, kualitas masakanmu akan mencapai Bintang Tiga!",
    "Penyihir istana sering membeli Teh Bunga Elven untuk menjernihkan pikiran merapal mantra purba.",
    "Papan pesanan tamu selalu memberi bayaran koin emas dan reputasi kedai yang sangat berlimpah!"
];
