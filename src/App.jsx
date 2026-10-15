import React, { useEffect, useMemo, useRef, useState } from 'react';

const PRODUCTS = [
  { id: 'tempo-watch', name: 'Tempo Everyday Watch', category: 'Accessories', group: 'Fashion', price: 1899, original: 2499, rating: 4.8, reviews: 214, badge: 'BESTSELLER', image: 'photo-1523275335684-37898b6baf30', description: 'A clean, easy-to-wear watch with a soft neutral strap and a quietly polished face. Made for the days that turn into evenings.' },
  { id: 'cloud-headphones', name: 'Cloud Nine Wireless Headphones', category: 'Audio', group: 'Electronics', price: 2499, original: 3299, rating: 4.7, reviews: 186, badge: 'SALE', image: 'photo-1505740420928-5e560c06d30e', description: 'Sink into your favourite playlist with cushioned comfort, balanced sound, and a battery that keeps up with your day.' },
  { id: 'studio-bottle', name: 'Studio Ceramic Pour-over Set', category: 'Kitchen', group: 'Home', price: 1199, original: 1599, rating: 4.9, reviews: 98, badge: 'LOVED', image: 'photo-1495474472287-4d71bcdd2085', description: 'Slow mornings, better coffee. A thoughtfully made ceramic dripper and mug set for your favourite little ritual.' },
  { id: 'weekend-sneakers', name: 'Weekend Runner Sneakers', category: 'Footwear', group: 'Fashion', price: 2799, original: 3499, rating: 4.6, reviews: 321, badge: 'SALE', image: 'photo-1542291026-7eec264c27ff', description: 'A bright, lightweight everyday sneaker with cushioned support for city strolls, long errands, and spontaneous plans.' },
  { id: 'glow-serum', name: 'Morning Glow Face Serum', category: 'Skincare', group: 'Beauty', price: 799, original: 999, rating: 4.8, reviews: 142, badge: 'NEW', image: 'photo-1601049541289-9b1b7bbbfe19', description: 'A gentle, lightweight daily serum that leaves skin feeling hydrated and fresh. A simple step for a brighter start.' },
  { id: 'desk-lamp', name: 'Little Sun Desk Lamp', category: 'Lighting', group: 'Home', price: 1499, original: 1999, rating: 4.7, reviews: 76, badge: '', image: 'photo-1507473885765-e6ed057f782c', description: 'Warm, focused light in a small sculptural shape. A lovely companion for your desk, bedside table, or reading nook.' },
  { id: 'pocket-camera', name: 'Pocket Days Instant Camera', category: 'Photography', group: 'Electronics', price: 4999, original: 5999, rating: 4.6, reviews: 87, badge: 'NEW', image: 'photo-1516035069371-29a1b244cc32', description: 'Bring the good bits home. This compact camera makes it easy to capture weekends, little celebrations, and everyday stories.' },
  { id: 'canvas-tote', name: 'Market Day Canvas Tote', category: 'Bags', group: 'Fashion', price: 649, original: 899, rating: 4.9, reviews: 267, badge: 'LOVED', image: 'photo-1590874103328-eac38a683ce7', description: 'Your grab-and-go carryall, made with sturdy canvas and enough room for market finds, a book, and all the little extras.' },
  { id: 'soft-throw', name: 'Sunday Soft Knit Throw', category: 'Textiles', group: 'Home', price: 1799, original: 2299, rating: 4.8, reviews: 115, badge: '', image: 'photo-1600210492486-724fe5c67fb0', description: 'A soft textured throw for slow mornings and movie nights. Easy to layer over your sofa or favourite chair.' },
  { id: 'trail-bottle', name: 'Daytrip Steel Water Bottle', category: 'Outdoors', group: 'Sports', price: 899, original: 1199, rating: 4.7, reviews: 194, badge: 'SALE', image: 'photo-1602143407151-7111542de6e8', description: 'A dependable, double-wall bottle that keeps your drink just right while you commute, explore, or head to a class.' },
  { id: 'everyday-sunnies', name: 'Sunday Somewhere Sunglasses', category: 'Accessories', group: 'Fashion', price: 1099, original: 1499, rating: 4.5, reviews: 63, badge: '', image: 'photo-1511499767150-a48a237f0083', description: 'Easy-going frames with a flattering shape and UV-protective lenses. Your sunny-day plus one.' },
  { id: 'calm-candle', name: 'After Hours Soy Candle', category: 'Home fragrance', group: 'Home', price: 599, original: 799, rating: 4.8, reviews: 139, badge: 'LOVED', image: 'photo-1603006905003-be475563bc59', description: 'A slow-burning soy candle with soft wood and citrus notes. Light it when it is time to put the day down.' },
  { id: 'pocket-phone', name: 'Pocket Plus 5G Smartphone', category: 'Mobile', group: 'Electronics', price: 14999, original: 17999, rating: 4.7, reviews: 402, badge: 'SALE', image: 'photo-1511707171634-5f897ff02aa9', description: 'A bright edge-to-edge display, all-day battery, and a capable camera in a slim everyday phone. Ready for work, weekends, and everything between.' },
  { id: 'sound-pod', name: 'Sound Pod Portable Speaker', category: 'Audio', group: 'Electronics', price: 1699, original: 2199, rating: 4.6, reviews: 173, badge: 'LOVED', image: 'photo-1608043152269-423dbba4e7e1', description: 'Take the soundtrack with you. This compact Bluetooth speaker brings clear, room-filling sound to picnics, kitchens, and slow afternoons.' },
  { id: 'type-easy-keyboard', name: 'Type Easy Wireless Keyboard', category: 'Work essentials', group: 'Electronics', price: 2199, original: 2799, rating: 4.8, reviews: 118, badge: 'NEW', image: 'photo-1587829741301-dc798b83add3', description: 'A slim, quiet keyboard with a comfortable layout for long writing sessions and a tidy desk setup. Pairs easily with your everyday devices.' },
  { id: 'smart-band', name: 'Daylight Fitness Band', category: 'Wearables', group: 'Electronics', price: 3299, original: 3999, rating: 4.5, reviews: 206, badge: 'SALE', image: 'photo-1546868871-7041f2a55e12', description: 'Keep a gentle eye on movement, sleep, and daily goals with a lightweight band that feels comfortable from morning to bedtime.' },
  { id: 'olive-duvet', name: 'Olive Linen Duvet Cover', category: 'Bedding', group: 'Home', price: 2899, original: 3599, rating: 4.9, reviews: 91, badge: 'LOVED', image: 'photo-1616486338812-3dadae4b4ace', description: 'Soft, breathable linen with a relaxed texture that makes your bed feel like an invitation to slow down. Includes two matching pillow covers.' },
  { id: 'terra-vase', name: 'Terra Handmade Stoneware Vase', category: 'Decor', group: 'Home', price: 999, original: 1299, rating: 4.8, reviews: 74, badge: '', image: 'photo-1578749556568-bc2c40e68b61', description: 'A small-batch stoneware vase with a warm, tactile glaze. Lovely on its own or filled with a few stems from the garden.' },
  { id: 'pantry-jars', name: 'Sunday Pantry Glass Jar Set', category: 'Kitchen', group: 'Home', price: 1299, original: 1699, rating: 4.7, reviews: 132, badge: 'SALE', image: 'photo-1490645935967-10de6ba17061', description: 'A set of three clear pantry jars that make everyday ingredients easy to find and your kitchen shelves a little more considered.' },
  { id: 'city-backpack', name: 'City Days Everyday Backpack', category: 'Bags', group: 'Fashion', price: 2199, original: 2799, rating: 4.7, reviews: 155, badge: 'BESTSELLER', image: 'photo-1553062407-98eeb64c6a62', description: 'A clean, roomy backpack with handy pockets for your laptop, water bottle, and the small things you reach for all day.' },
  { id: 'crisp-linen-shirt', name: 'Crisp Morning Linen Shirt', category: 'Clothing', group: 'Fashion', price: 1599, original: 1999, rating: 4.6, reviews: 109, badge: 'NEW', image: 'photo-1598033129183-c4f50c736f10', description: 'An easy, breathable linen shirt with a relaxed fit. Wear it buttoned up, open over a tee, or tucked into your favourite pair of trousers.' },
  { id: 'daily-sunscreen', name: 'Everyday Sun Shield SPF 50', category: 'Skincare', group: 'Beauty', price: 699, original: 899, rating: 4.8, reviews: 248, badge: 'LOVED', image: 'photo-1608248543803-ba4f8c70ae0b', description: 'A lightweight daily sunscreen that layers comfortably under makeup and leaves skin feeling fresh. A simple essential for sunny days.' },
  { id: 'flow-yoga-mat', name: 'Flow Cork Yoga Mat', category: 'Fitness', group: 'Sports', price: 1899, original: 2399, rating: 4.8, reviews: 97, badge: 'NEW', image: 'photo-1599447292180-45fd84092ef4', description: 'A naturally grippy cork surface and cushioned base make this mat a comfortable place to stretch, reset, and find your flow.' },
  { id: 'trail-bands', name: 'Trail Ready Resistance Bands', category: 'Fitness', group: 'Sports', price: 549, original: 749, rating: 4.6, reviews: 183, badge: 'SALE', image: 'photo-1517836357463-d25dfeac3438', description: 'A set of three resistance levels for home workouts, warm-ups, and travel days. Packs small, so a little movement is always within reach.' },
  { id: 'airbeat-earbuds', name: 'Airbeat Wireless Earbuds', category: 'Audio', group: 'Electronics', price: 1899, original: 2499, rating: 4.7, reviews: 291, badge: 'BESTSELLER', image: 'photo-1590658268037-6bf12165a8df', description: 'Lightweight earbuds with a pocket-sized charging case and clear, balanced sound for your commute, calls, and favourite playlists.' },
  { id: 'canvas-tablet', name: 'Canvas 11 Everyday Tablet', category: 'Mobile', group: 'Electronics', price: 12999, original: 15999, rating: 4.6, reviews: 138, badge: 'SALE', image: 'photo-1544244015-0df4b3ffc6b0', description: 'A bright, roomy screen for reading, video calls, and unwinding with a show. Slim enough to take along wherever the day goes.' },
  { id: 'desk-charger', name: 'Pebble 3-in-1 Wireless Charger', category: 'Accessories', group: 'Electronics', price: 1499, original: 1999, rating: 4.5, reviews: 82, badge: 'NEW', image: 'photo-1591290619762-c588a2ec2f30', description: 'Keep your everyday devices together on one neat charging stand. A tidy bedside or desk companion with a soft-touch finish.' },
  { id: 'focus-webcam', name: 'Focus HD Video Call Webcam', category: 'Work essentials', group: 'Electronics', price: 2299, original: 2899, rating: 4.7, reviews: 105, badge: '', image: 'photo-1527814050087-3793815479db', description: 'Clear video and a simple plug-in setup make this a reliable little upgrade for remote work, classes, and catching up with family.' },
  { id: 'woven-floor-cushion', name: 'Mellow Woven Floor Cushion', category: 'Textiles', group: 'Home', price: 1299, original: 1699, rating: 4.8, reviews: 84, badge: 'LOVED', image: 'photo-1600210492486-724fe5c67fb0', description: 'A generously soft floor cushion with a warm woven texture. Pull it out for a quiet reading corner or an extra seat when friends visit.' },
  { id: 'sunrise-wall-mirror', name: 'Sunrise Rattan Wall Mirror', category: 'Decor', group: 'Home', price: 1799, original: 2299, rating: 4.7, reviews: 62, badge: 'NEW', image: 'photo-1618221195710-dd6b41faaea6', description: 'A round mirror framed with a light natural weave. Adds a little brightness and an easy, relaxed touch to an entryway or bedroom.' },
  { id: 'market-basket', name: 'Market Basket Storage Duo', category: 'Storage', group: 'Home', price: 999, original: 1399, rating: 4.6, reviews: 111, badge: 'SALE', image: 'photo-1595428774223-ef52624120d2', description: 'Two woven baskets for keeping blankets, toys, or everyday bits close at hand and out of the way. Each one has built-in carry handles.' },
  { id: 'morning-kettle', name: 'Morning Glass Electric Kettle', category: 'Kitchen', group: 'Home', price: 1999, original: 2599, rating: 4.8, reviews: 176, badge: 'BESTSELLER', image: 'photo-1607472586893-edb57bdc0e39', description: 'A clear glass kettle with a comfortable handle and quick-boil design. Makes tea breaks and slow coffee mornings feel a little more special.' },
  { id: 'crossbody-bag', name: 'Around Town Crossbody Bag', category: 'Bags', group: 'Fashion', price: 1499, original: 1999, rating: 4.8, reviews: 193, badge: 'LOVED', image: 'photo-1584917865442-de89df76afd3', description: 'A hands-free everyday bag with a roomy main pocket and an adjustable strap. Just right for your phone, keys, wallet, and little extras.' },
  { id: 'soft-knit-cardigan', name: 'Cloud Soft Knit Cardigan', category: 'Clothing', group: 'Fashion', price: 2199, original: 2799, rating: 4.7, reviews: 128, badge: 'NEW', image: 'photo-1576566588028-4147f3842f27', description: 'An easy layer in a soft, cosy knit with a relaxed shape. Throw it over a tee on cool mornings or keep it by your desk.' },
  { id: 'easy-day-loafers', name: 'Easy Day Leather Loafers', category: 'Footwear', group: 'Fashion', price: 2499, original: 3199, rating: 4.6, reviews: 92, badge: 'SALE', image: 'photo-1531310197839-ccf54634509e', description: 'A versatile slip-on with a cushioned footbed and a clean shape that pairs with work trousers, jeans, or a weekend dress.' },
  { id: 'everyday-belt', name: 'Everyday Leather Belt', category: 'Accessories', group: 'Fashion', price: 799, original: 1099, rating: 4.5, reviews: 67, badge: '', image: 'photo-1624222247344-550fb8b6908f', description: 'A well-made wardrobe staple with a simple brushed buckle. An easy finishing touch for the outfits you reach for most.' },
  { id: 'cloud-cream', name: 'Cloud Nine Daily Moisturiser', category: 'Skincare', group: 'Beauty', price: 849, original: 1099, rating: 4.8, reviews: 213, badge: 'BESTSELLER', image: 'photo-1556229010-6c3f2c9ca5f8', description: 'A gentle daily moisturiser with a light, comfortable finish. Leaves skin feeling soft and hydrated without adding a heavy step to your routine.' },
  { id: 'soft-tint', name: 'Soft Petal Tinted Lip Balm', category: 'Makeup', group: 'Beauty', price: 399, original: 549, rating: 4.7, reviews: 156, badge: 'LOVED', image: 'photo-1586495777744-4413f21062fa', description: 'A pocket-friendly balm with a hint of rosy colour and a smooth, nourishing feel. An easy little pick-me-up for any day.' },
  { id: 'silk-hair-serum', name: 'Silk & Shine Hair Serum', category: 'Haircare', group: 'Beauty', price: 599, original: 799, rating: 4.6, reviews: 103, badge: 'NEW', image: 'photo-1601049541289-9b1b7bbbfe19', description: 'A lightweight finishing serum to smooth flyaways and add a soft shine. Use a little on damp or dry hair for an easy polished finish.' },
  { id: 'citrus-hand-cream', name: 'Little Citrus Hand Cream', category: 'Body care', group: 'Beauty', price: 299, original: 399, rating: 4.8, reviews: 189, badge: 'SALE', image: 'photo-1571781926291-c477ebfd024b', description: 'A quick-absorbing hand cream with a fresh citrus scent. Keep one in your bag or by the sink for a small moment of care.' },
  { id: 'city-runner-shoes', name: 'City Loop Running Shoes', category: 'Footwear', group: 'Sports', price: 3299, original: 4199, rating: 4.7, reviews: 167, badge: 'SALE', image: 'photo-1538805060514-97d9cc17730c', description: 'Light cushioning and a breathable upper make these runners a comfortable pick for morning laps, long walks, and active weekends.' },
  { id: 'cork-yoga-blocks', name: 'Grounded Cork Yoga Blocks', category: 'Fitness', group: 'Sports', price: 899, original: 1199, rating: 4.8, reviews: 73, badge: '', image: 'photo-1599447292180-45fd84092ef4', description: 'A pair of sturdy cork blocks that bring support and stability to stretches, balance work, and home practice.' },
  { id: 'skipping-rope', name: 'Quick Step Adjustable Skipping Rope', category: 'Fitness', group: 'Sports', price: 449, original: 599, rating: 4.6, reviews: 114, badge: 'NEW', image: 'photo-1517836357463-d25dfeac3438', description: 'A lightweight adjustable rope for a quick warm-up or a short workout wherever you have a little room to move.' },
  { id: 'weekend-gym-duffel', name: 'Weekend Move Gym Duffel', category: 'Bags', group: 'Sports', price: 1799, original: 2299, rating: 4.7, reviews: 88, badge: 'LOVED', image: 'photo-1553062407-98eeb64c6a62', description: 'A roomy duffel with separate pockets for shoes and small essentials. Ready for the gym, a day trip, or an overnight away.' },
];

const CATEGORIES = [
  { key: 'Electronics', title: 'Tech & gadgets', subtitle: 'Smart little upgrades', symbol: '⌁', className: 'category-electronics' },
  { key: 'Home', title: 'Home & living', subtitle: 'Make room for cosy', symbol: '⌂', className: 'category-home' },
  { key: 'Fashion', title: 'Wear your mood', subtitle: 'Everyday, elevated', symbol: '✳', className: 'category-fashion' },
  { key: 'Beauty', title: 'Feel-good beauty', subtitle: 'A little time for you', symbol: '❋', className: 'category-beauty' },
];
const FILTERS = [ ['All', 'All products'], ['Electronics', 'Tech & gadgets'], ['Home', 'Home & living'], ['Fashion', 'Style'], ['Beauty', 'Beauty'], ['Sports', 'Outdoors'] ];
const money = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;
const photo = (image, width = 700) => `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=85`;
const safeRead = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'footer-brand' : ''}`} href="#top" aria-label="Mosaic Market home"><span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span><span className="brand-name">mosaic<span>.</span></span></a>;
}

function Announcement() {
  return <div className="announcement"><span className="announcement-dot" /><span>THE LITTLE THINGS SALE</span><span className="announcement-copy">Up to 40% off your everyday favourites</span><a href="#products" className="announcement-link">Explore deals <span aria-hidden="true">↗</span></a></div>;
}

function Header({ category, onCategory, search, setSearch, cartCount, favoriteCount, onCart, onFavorites, toast }) {
  const searchRef = useRef(null);
  useEffect(() => {
    const shortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);
  return <>
    <Announcement />
    <header className="site-header">
      <div className="header-main page-width">
        <Brand />
        <button className="delivery-pill" type="button" onClick={() => toast('Delivery is available across Bengaluru in this demo.')} aria-label="Delivery location: Bengaluru"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></svg><span className="delivery-text"><small>Delivering to</small><strong>Bengaluru 560001</strong></span><span className="chevron" aria-hidden="true">⌄</span></button>
        <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search for anything lovely..." autoComplete="off" aria-label="Search products" /><kbd>⌘ K</kbd></form>
        <div className="header-actions">
          <button className="icon-action account-action" type="button" onClick={() => toast('Account sign-in is not connected in this front-end demo.')} aria-label="Your account"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.7-3.3 3.1-5 7-5s6.3 1.7 7 5"/></svg><span>Account</span></button>
          <button className="icon-action favorites-action" type="button" onClick={onFavorites} aria-label="Show saved favorites"><span className="action-icon-wrap"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>{favoriteCount > 0 && <b className="count-dot">{favoriteCount}</b>}</span><span>Saved</span></button>
          <button className="icon-action cart-action" type="button" onClick={onCart} aria-label="Open shopping bag"><span className="action-icon-wrap"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><b className="cart-count">{cartCount}</b></span><span>Bag</span></button>
        </div>
      </div>
      <nav className="category-nav" aria-label="Shop categories"><div className="page-width nav-inner">
        {['All', 'Electronics', 'Home', 'Fashion', 'Beauty', 'Sports'].map((key, index) => <button key={key} className={`nav-category ${category === key ? 'active' : ''}`} onClick={() => onCategory(key)}>{['All finds', 'Electronics', 'Home & living', 'Style', 'Beauty', 'Outdoors'][index]}</button>)}
        <span className="nav-spacer" /><a className="nav-promo" href="#products"><span className="promo-sparkle">✳</span> Made for your Monday</a>
      </div></nav>
    </header>
  </>;
}

function Hero() {
  return <section className="hero page-width" aria-labelledby="hero-heading">
    <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> A MARKETPLACE WITH A LITTLE MORE HEART</div><h1 id="hero-heading">Good finds.<br /><em>Great little</em> moments.</h1><p>From everyday essentials to the things you didn’t know you needed. Find your next favourite, all in one happy place.</p><div className="hero-buttons"><a className="button button-dark" href="#products">Shop the collection <span aria-hidden="true">↗</span></a><span className="hero-note"><span className="note-star">✳</span> Thoughtful picks, happy prices</span></div><div className="hero-social-proof"><div className="avatar-stack" aria-hidden="true"><span>R</span><span>A</span><span>M</span><span>K</span></div><span><strong>2,400+</strong> happy little shoppers</span></div></div>
    <div className="hero-art" aria-label="A curated selection of lifestyle finds"><div className="hero-blob" /><div className="hero-photo hero-photo-main"><img src={photo('photo-1523275335684-37898b6baf30', 900)} alt="Minimal wristwatch on a warm background" /></div><div className="hero-photo hero-photo-small"><img src={photo('photo-1542291026-7eec264c27ff', 500)} alt="Bright red sneaker" /></div><div className="hero-sticker"><span>little</span><strong>joys</strong><i>✳</i></div><div className="floating-note"><span className="floating-note-icon">✦</span><span><strong>Picked with care</strong><small>Good things, good people</small></span></div><span className="art-spark art-spark-one">✳</span><span className="art-spark art-spark-two">✦</span></div>
  </section>;
}

function Benefits() {
  return <section className="benefit-strip page-width" aria-label="Shopping benefits"><div className="benefit"><span className="benefit-icon">↗</span><span><strong>Free delivery</strong><small>On orders over ₹999</small></span></div><span className="benefit-divider" /><div className="benefit"><span className="benefit-icon benefit-icon-soft">↺</span><span><strong>Easy returns</strong><small>30-day happy returns</small></span></div><span className="benefit-divider" /><div className="benefit"><span className="benefit-icon benefit-icon-yellow">♡</span><span><strong>Good finds only</strong><small>Thoughtfully picked for you</small></span></div><span className="benefit-divider" /><div className="benefit"><span className="benefit-icon benefit-icon-green">⌑</span><span><strong>Safe & sound</strong><small>Secure checkout, always</small></span></div></section>;
}

function CategorySection({ onCategory, onAll }) {
  return <section className="category-section page-width" aria-labelledby="category-heading"><div className="section-heading category-heading-row"><div><div className="eyebrow"><span className="eyebrow-line" /> FIND YOUR KIND OF GOOD</div><h2 id="category-heading">A little something for <em>every you.</em></h2></div><button className="text-link" type="button" onClick={onAll}>See all categories <span aria-hidden="true">→</span></button></div><div className="category-cards">{CATEGORIES.map((item) => <button key={item.key} className={`category-card ${item.className}`} onClick={() => onCategory(item.key)}><span className="category-symbol">{item.symbol}</span><span className="category-card-copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span><span className="category-arrow">↗</span></button>)}</div></section>;
}

function ProductCard({ product, favorite, onFavorite, onAdd, onDetails }) {
  const discount = Math.round((1 - product.price / product.original) * 100);
  return <article className="product-card">
    <div className="product-image-wrap">
      <button className="product-image-trigger" type="button" onClick={() => onDetails(product)} aria-label={`View details for ${product.name}`}><img src={photo(product.image)} alt={product.name} loading="lazy" /></button>
      {product.badge && <span className={`product-badge ${product.badge === 'SALE' ? 'sale' : product.badge === 'NEW' ? 'new' : ''}`}>{product.badge === 'SALE' ? `${discount}% OFF` : product.badge}</span>}
      <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} onClick={(event) => { event.stopPropagation(); onFavorite(product); }} aria-label={favorite ? `Remove ${product.name} from saved items` : `Save ${product.name}`} aria-pressed={favorite}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.6Z" /></svg></button>
      <button className="quick-view" onClick={(event) => { event.stopPropagation(); onDetails(product); }}>A closer look</button>
    </div>
    <div className="product-info"><div className="product-category">{product.category}</div><div className="product-name-row"><h3 className="product-name" title={product.name} onClick={() => onDetails(product)}>{product.name}</h3><span className="rating">★ <span>{product.rating}</span></span></div><div className="product-meta"><div className="product-price"><strong>{money(product.price)}</strong><del>{money(product.original)}</del><span className="discount">{discount}% off</span></div><button className="add-button" onClick={() => onAdd(product)}>Add to bag +</button></div></div>
  </article>;
}

function ProductSection({ products, category, onCategory, sort, setSort, favoritesOnly, favorites, onFavorite, onAdd, onDetails, onReset }) {
  const title = favoritesOnly ? <>Your <em>saved finds.</em></> : category === 'All' ? <>Today’s <em>happy finds.</em></> : <>{category === 'Electronics' ? 'Tech & gadgets' : category === 'Home' ? 'Home & living' : category === 'Fashion' ? 'Style' : category === 'Sports' ? 'Outdoors' : category} <em>for you.</em></>;
  return <section className="products-section page-width" id="products" aria-labelledby="products-heading"><div className="section-heading products-title-row"><div><div className="eyebrow"><span className="eyebrow-line" /> {favoritesOnly ? 'YOUR PERSONAL LITTLE COLLECTION' : 'THE GOOD STUFF'}</div><h2 id="products-heading">{title}</h2></div><div className="product-controls"><label className="sort-label" htmlFor="sort-select">Sort by</label><select id="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></div></div>
    <div className="filter-row"><div className="filter-chips" aria-label="Filter products by category">{FILTERS.map(([key, label]) => <button key={key} className={`filter-chip ${category === key && !favoritesOnly ? 'active' : ''}`} onClick={() => onCategory(key)}>{label}{key === 'All' && <span>{PRODUCTS.length}</span>}</button>)}</div><span className="result-count">Showing {products.length} {products.length === 1 ? 'lovely find' : 'lovely finds'}</span></div>
    {products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={onFavorite} onAdd={onAdd} onDetails={onDetails} />)}</div> : <div className="empty-state"><span>✳</span><h3>{favoritesOnly ? 'Save a few things you love.' : 'No finds just yet.'}</h3><p>{favoritesOnly ? 'Tap the little heart on any product to keep it close.' : 'Try another search or browse all the good stuff.'}</p><button className="button button-dark" onClick={onReset}>{favoritesOnly ? 'Browse all products' : 'Show all products'}</button></div>}
    <div className="load-more-wrap"><span>That’s the good stuff — for now.</span><span className="load-more-spark">✳</span></div>
  </section>;
}

function Newsletter({ toast }) {
  return <section className="newsletter page-width"><div className="newsletter-mark" aria-hidden="true">✳</div><div className="newsletter-copy"><span className="eyebrow">A NOTE FROM US TO YOU</span><h2>A little more joy<br />in your <em>inbox.</em></h2><p>Fresh finds, thoughtful tips, and the occasional little treat. No noise, promise.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); const email = event.currentTarget.elements.email.value; toast(`You’re on the list, ${email}. Look out for a little joy!`); event.currentTarget.reset(); }}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input-wrap"><input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required /><button type="submit">Count me in <span aria-hidden="true">→</span></button></div><small>By subscribing, you agree to receive the occasional happy note. Unsubscribe anytime.</small></form><span className="newsletter-scribble" aria-hidden="true">good things<br />are coming</span></section>;
}

function Footer() {
  return <footer id="footer" className="site-footer"><div className="page-width footer-main"><div className="footer-brand-col"><Brand footer /><p>A little marketplace for all the good things. Curated with care, delivered with a smile.</p><div className="social-links"><a href="#footer" aria-label="Instagram">ig</a><a href="#footer" aria-label="Pinterest">p</a><a href="#footer" aria-label="YouTube">▶</a></div></div><div className="footer-links"><strong>Explore</strong><a href="#products">All finds</a><a href="#products">New arrivals</a><a href="#products">Best sellers</a><a href="#products">Little things sale</a></div><div className="footer-links"><strong>Here to help</strong><a href="#footer">Contact us</a><a href="#footer">Delivery & returns</a><a href="#footer">FAQs</a><a href="#footer">Track your order</a></div><div className="footer-help"><span className="help-dot" /><span><strong>Need a hand?</strong><small>We’re here Mon–Sat, 9am–6pm</small><a href="mailto:hello@mosaic.market">hello@mosaic.market</a></span></div></div><div className="footer-bottom page-width"><span>© 2026 Mosaic Market. Made with a little extra care.</span><div><a href="#footer">Privacy</a><a href="#footer">Terms</a><a href="#footer">Accessibility</a></div><span className="made-in">Made for good days <b>✳</b></span></div></footer>;
}

function CartDrawer({ open, onClose, cart, onQuantity, onRemove, onCheckout, checkout, setCheckout, onSubmitOrder, orderDone, onBrowse }) {
  const cartProducts = Object.entries(cart).map(([id, quantity]) => ({ product: PRODUCTS.find((item) => item.id === id), quantity })).filter((item) => item.product);
  const count = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeDeliveryRemaining = Math.max(0, 999 - subtotal);
  return <>
    <div className={`overlay ${open ? 'visible' : ''}`} onClick={onClose} aria-hidden="true" />
    <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!open}>
      <div className="drawer-header"><div><span className="eyebrow">{checkout ? 'A FEW DETAILS' : 'YOUR GOOD FINDS'}</span><h2>{checkout ? 'Checkout' : <>Your bag <span>({count})</span></>}</h2></div><button className="close-button" onClick={onClose} aria-label="Close shopping bag">×</button></div>
      {orderDone ? <div className="cart-empty order-success"><span>✳</span><h3>Your order is in!</h3><p>This demo order has been placed. Thanks for shopping Mosaic.</p><button className="button button-dark" onClick={onClose}>Back to the market</button></div> : checkout ? <form className="checkout-form" onSubmit={onSubmitOrder}><p className="checkout-intro">Where should we send your good finds?</p><label>Full name<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Delivery address<textarea name="address" autoComplete="street-address" required rows="3" placeholder="House, street, area, city, PIN code" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" pattern="[0-9+() -]{8,}" required placeholder="Your contact number" /></label><div className="checkout-payment"><span>Payment method</span><label className="payment-option"><input type="radio" name="payment" defaultChecked /> Cash on delivery <small>Demo checkout</small></label></div><div className="checkout-total"><span>Order total</span><strong>{money(subtotal)}</strong></div><button className="button button-dark checkout-button" type="submit">Place demo order <span>→</span></button><button className="back-to-bag" type="button" onClick={() => setCheckout(false)}>← Back to your bag</button><p className="demo-note">Checkout is a front-end demo. No payment is collected.</p></form> : <>
        <div className="cart-items">{cartProducts.map(({ product, quantity }) => <div className="cart-row" key={product.id}><img src={photo(product.image, 180)} alt="" /><div className="cart-row-info"><strong>{product.name}</strong><small>{product.category}</small><div className="quantity-control"><button onClick={() => onQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}>−</button><span>{quantity}</span><button onClick={() => onQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name} quantity`}>+</button></div></div><div className="cart-row-price"><strong>{money(product.price * quantity)}</strong><button className="remove-item" onClick={() => onRemove(product.id)}>Remove</button></div></div>)}</div>
        {count === 0 ? <div className="cart-empty"><span>♡</span><h3>Your bag feels a little light.</h3><p>Let’s find something you’ll love.</p><button className="button button-dark" onClick={onBrowse}>Browse good finds</button></div> : <div className="drawer-footer"><div className="shipping-progress"><span className="shipping-icon">↗</span><span>{freeDeliveryRemaining === 0 ? 'Lovely! Your delivery is on us.' : `Add ${money(freeDeliveryRemaining)} for free delivery`}</span></div><div className="subtotal-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p className="tax-note">Taxes included. Delivery calculated at checkout.</p><button className="button button-dark checkout-button" onClick={onCheckout}>Continue to checkout <span>→</span></button><div className="secure-note">⌑ &nbsp; Secure checkout · easy 30-day returns</div></div>}
      </>}
    </aside>
  </>;
}

function ProductModal({ product, onClose, onAdd }) {
  const dialogRef = useRef(null);
  useEffect(() => { if (product && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal(); }, [product]);
  if (!product) return null;
  const discount = Math.round((1 - product.price / product.original) * 100);
  return <dialog className="product-modal" ref={dialogRef} onClose={onClose} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }} aria-label={`${product.name} details`}><button className="close-button modal-close" onClick={() => dialogRef.current?.close()} aria-label="Close product details">×</button><div className="modal-product"><img src={photo(product.image, 850)} alt={product.name} /><div className="modal-product-info"><span className="product-category">{product.category}</span><h2>{product.name}</h2><div className="modal-rating">★ {product.rating} <span>({product.reviews} happy reviews)</span></div><p>{product.description}</p><div className="modal-price"><strong>{money(product.price)}</strong><del>{money(product.original)}</del><span>{discount}% off</span></div><button className="button button-dark modal-add" onClick={() => { onAdd(product); dialogRef.current?.close(); }}>Add to bag <span>→</span></button></div></div></dialog>;
}

function App() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState(() => safeRead('mosaic-cart', {}));
  const [favorites, setFavorites] = useState(() => safeRead('mosaic-favorites', []));
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [toastText, setToastText] = useState('');
  const toastTimer = useRef(null);
  const toast = (message) => { setToastText(message); window.clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setToastText(''), 2700); };

  useEffect(() => { localStorage.setItem('mosaic-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('mosaic-favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { document.body.style.overflow = (cartOpen || activeProduct) ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [cartOpen, activeProduct]);
  useEffect(() => { const escape = (event) => { if (event.key === 'Escape') { setCartOpen(false); setCheckout(false); } }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, []);

  const visibleProducts = useMemo(() => {
    let next = PRODUCTS.filter((product) => {
      const matchesCategory = category === 'All' || product.group === category;
      const matchesSearch = `${product.name} ${product.category} ${product.group} ${product.description}`.toLowerCase().includes(search.trim().toLowerCase());
      const matchesFavorites = !favoritesOnly || favorites.includes(product.id);
      return matchesCategory && matchesSearch && matchesFavorites;
    });
    if (sort === 'price-low') next = [...next].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') next = [...next].sort((a, b) => b.price - a.price);
    if (sort === 'rating') next = [...next].sort((a, b) => b.rating - a.rating);
    return next;
  }, [category, search, sort, favorites, favoritesOnly]);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const addToCart = (product) => { setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 })); toast(`${product.name} added to your bag.`); };
  const toggleFavorite = (product) => { const saved = favorites.includes(product.id); setFavorites((current) => saved ? current.filter((id) => id !== product.id) : [...current, product.id]); toast(saved ? 'Removed from your saved finds.' : 'Saved for a little later.'); };
  const chooseCategory = (next) => { setCategory(next); setFavoritesOnly(false); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const openFavorites = () => { setFavoritesOnly((current) => !current); setCategory('All'); setSearch(''); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const changeQuantity = (id, quantity) => setCart((current) => { if (quantity <= 0) { const next = { ...current }; delete next[id]; return next; } return { ...current, [id]: quantity }; });
  const submitOrder = (event) => { event.preventDefault(); if (!cartCount) return; setOrderDone(true); setCheckout(false); setCart({}); };
  const resetFilters = () => { setCategory('All'); setSearch(''); setFavoritesOnly(false); };

  return <>
    <Header category={category} onCategory={chooseCategory} search={search} setSearch={(value) => { setSearch(value); setFavoritesOnly(false); }} cartCount={cartCount} favoriteCount={favorites.length} onCart={() => { setOrderDone(false); setCheckout(false); setCartOpen(true); }} onFavorites={openFavorites} toast={toast} />
    <main id="top"><Hero /><Benefits /><CategorySection onCategory={chooseCategory} onAll={() => { resetFilters(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }} /><ProductSection products={visibleProducts} category={category} onCategory={chooseCategory} sort={sort} setSort={setSort} favoritesOnly={favoritesOnly} favorites={favorites} onFavorite={toggleFavorite} onAdd={addToCart} onDetails={setActiveProduct} onReset={resetFilters} /><Newsletter toast={toast} /></main>
    <Footer />
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onQuantity={changeQuantity} onRemove={(id) => changeQuantity(id, 0)} onCheckout={() => setCheckout(true)} checkout={checkout} setCheckout={setCheckout} onSubmitOrder={submitOrder} orderDone={orderDone} onBrowse={() => { setCartOpen(false); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }} />
    <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} onAdd={addToCart} />
    <div className={`toast ${toastText ? 'show' : ''}`} role="status" aria-live="polite">{toastText}</div>
  </>;
}

export default App;

