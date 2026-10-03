import React, { useState, useMemo } from 'react';
import { Plus, Search, Utensils } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ShopCatalog({
  foodMenu,
  onAddToCart,
  onEatDirect,
  playerGold
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    { id: 'all', label: 'Semua Santapan', icon: '🍗' },
    { id: 'heavy', label: 'Daging Panggang', icon: '🍖' },
    { id: 'bakery', label: 'Roti & Oven', icon: '🍞' },
    { id: 'soup', label: 'Rebusan Kuali', icon: '🍲' },
    { id: 'drinks', label: 'Ramuan & Bir', icon: '🍺' },
    { id: 'special', label: 'Resep Istana', icon: '🏺' }
  ];

  const filteredItems = useMemo(() => {
    return foodMenu
      .filter(item => {
        const matchesCat = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'hp-desc') return (b.effects?.hp || 0) - (a.effects?.hp || 0);
        return a.id - b.id;
      });
  }, [foodMenu, activeCategory, searchQuery, sortBy]);

  const handleCategorySelect = (catId) => {
    sound.play('click');
    setActiveCategory(catId);
  };

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'badge-rarity rarity-legendary';
      case 'epic': return 'badge-rarity rarity-epic';
      case 'rare': return 'badge-rarity rarity-rare';
      default: return 'badge-rarity rarity-common';
    }
  };

  return (
    <section>
      
      {/* Controls & Filter Bar */}
      <div className="shop-controls-bar">
        
        {/* Category Tabs */}
        <div className="category-tabs-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`pixel-btn ${activeCategory === cat.id ? 'btn-active-tab' : 'btn-stone'}`}
              style={{ fontSize: '10px', padding: '6px 10px' }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search & Sort Inputs */}
        <div className="shop-filter-inputs">
          <div className="search-input-wrap">
            <Search size={14} style={{ position: 'absolute', left: '8px', top: '10px', color: '#9ca3af' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari santapan..."
              className="search-input"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => {
              sound.play('click');
              setSortBy(e.target.value);
            }}
            className="sort-select"
          >
            <option value="default">Urutkan</option>
            <option value="price-asc">Harga: Terendah</option>
            <option value="price-desc">Harga: Tertinggi</option>
            <option value="hp-desc">HP: Tertinggi</option>
          </select>
        </div>

      </div>

      {/* Food Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="panel-parchment" style={{ textAlign: 'center', padding: '40px 20px', margin: '20px 0' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>📜</div>
          <h3 className="font-pixel" style={{ fontSize: '14px', color: '#1a0a03', marginBottom: '4px' }}>
            Santapan Tidak Ditemukan!
          </h3>
          <p className="font-dialogue" style={{ fontSize: '18px', color: '#573a24' }}>
            Koki Balthazar belum meracik hidangan dengan kata kunci tersebut.
          </p>
        </div>
      ) : (
        <div className="food-grid-container">
          {filteredItems.map(item => {
            const canAfford = playerGold >= item.price;

            return (
              <div key={item.id} className="food-card">
                
                <div>
                  {/* Top Badge & Price Tag */}
                  <div className="food-card-header">
                    <span className={getRarityClass(item.rarity)}>
                      {item.badge}
                    </span>
                    <div className="price-pill">
                      <span>{item.price}</span>
                      <span style={{ color: '#b45309' }}>G</span>
                    </div>
                  </div>

                  {/* Food Sprite Icon */}
                  <div className="food-sprite-box">
                    <span>{item.icon}</span>
                  </div>

                  {/* Title & Lore */}
                  <h3 className="food-title">
                    {item.name}
                  </h3>
                  <p className="food-desc">
                    {item.desc}
                  </p>
                </div>

                <div>
                  {/* Stat Bonus Ribbon */}
                  <div className="food-stats-ribbon">
                    {item.stats}
                  </div>

                  {/* Action Buttons: Add to Cart vs Eat Now */}
                  <div className="food-card-buttons">
                    <button
                      onClick={(e) => onAddToCart(item, e)}
                      disabled={!canAfford}
                      title={canAfford ? "Beli & Simpan di Ransel" : "Koin Emas tidak mencukupi"}
                      className={`pixel-btn ${canAfford ? 'btn-gold' : 'btn-stone'}`}
                      style={{ opacity: canAfford ? 1 : 0.6, cursor: canAfford ? 'pointer' : 'not-allowed' }}
                    >
                      <Plus size={11} />
                      <span>RANSEL</span>
                    </button>

                    <button
                      onClick={(e) => onEatDirect(item, e)}
                      disabled={!canAfford}
                      title={canAfford ? "Beli & Santap Langsung (Pulihkan HP/Stamina)" : "Koin Emas tidak mencukupi"}
                      className={`pixel-btn ${canAfford ? 'btn-green' : 'btn-stone'}`}
                      style={{ opacity: canAfford ? 1 : 0.6, cursor: canAfford ? 'pointer' : 'not-allowed' }}
                    >
                      <Utensils size={11} />
                      <span>SANTAP</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
