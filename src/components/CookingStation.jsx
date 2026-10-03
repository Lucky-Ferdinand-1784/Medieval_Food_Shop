import React, { useState, useEffect } from 'react';
import { Flame, ShoppingCart } from 'lucide-react';
import { sound } from '../utils/audio';
import { RAW_INGREDIENTS } from '../data/gameData';

export default function CookingStation({
  recipes,
  playerIngredients,
  onBuyIngredient,
  playerGold,
  onCookSuccess,
  onTriggerSparkle
}) {
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);
  const [isCooking, setIsCooking] = useState(false);
  const [heatPosition, setHeatPosition] = useState(0);
  const [heatDirection, setHeatDirection] = useState(1);
  const [cookResult, setCookResult] = useState(null);

  // Moving needle animation
  useEffect(() => {
    if (!isCooking) return;

    const interval = setInterval(() => {
      setHeatPosition(pos => {
        let next = pos + heatDirection * 3.5;
        if (next >= 100) {
          next = 100;
          setHeatDirection(-1);
        } else if (next <= 0) {
          next = 0;
          setHeatDirection(1);
        }
        return next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isCooking, heatDirection]);

  // Check if player has all required ingredients
  const hasIngredients = selectedRecipe?.ingredients?.every(req => {
    const owned = playerIngredients[req.id] || 0;
    return owned >= req.count;
  });

  const handleStartCooking = () => {
    if (!hasIngredients) {
      sound.play('error');
      return;
    }
    sound.play('cook');
    setIsCooking(true);
    setCookResult(null);
    setHeatPosition(10);
    setHeatDirection(1);
  };

  const handleStopCooking = (e) => {
    if (!isCooking) return;
    setIsCooking(false);

    let rating = 1;
    let title = "Matang Cukup ⭐";
    let bonusExp = 15;

    // Sweet spot between 68% and 82%
    if (heatPosition >= 68 && heatPosition <= 82) {
      rating = 3;
      title = "LEZAT SEMPURNA BINTANG 3! ⭐⭐⭐";
      bonusExp = 50;
      sound.play('levelUp');
      onTriggerSparkle({ x: e.clientX, y: e.clientY, color: '#ffd700', count: 35 });
    } else if (heatPosition >= 50 && heatPosition <= 90) {
      rating = 2;
      title = "Matang Sangat Baik ⭐⭐";
      bonusExp = 30;
      sound.play('buy');
      onTriggerSparkle({ x: e.clientX, y: e.clientY, color: '#f59e0b', count: 20 });
    } else {
      rating = 1;
      title = "Matang Standar ⭐";
      bonusExp = 15;
      sound.play('buy');
    }

    setCookResult({ rating, title, bonusExp, item: selectedRecipe });
    onCookSuccess(selectedRecipe, rating, bonusExp);
  };

  return (
    <div className="cooking-grid-layout">
      
      {/* Left Column: Recipe Book */}
      <div className="panel-wood">
        <div className="panel-section-title">
          <span style={{ fontSize: '18px' }}>📖</span>
          <span>BUKU RESEP DAPUR</span>
        </div>

        <div className="recipe-scroll-list">
          {recipes.map(recipe => {
            const isSelected = selectedRecipe.id === recipe.id;
            const canCook = recipe.ingredients.every(
              req => (playerIngredients[req.id] || 0) >= req.count
            );

            return (
              <div
                key={recipe.id}
                onClick={() => {
                  sound.play('click');
                  setSelectedRecipe(recipe);
                  setCookResult(null);
                }}
                className={`recipe-row-card ${isSelected ? 'recipe-row-selected' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px' }}>{recipe.icon}</span>
                  <div>
                    <div className="font-pixel" style={{ fontSize: '10px', color: '#fef08a' }}>
                      {recipe.name}
                    </div>
                    <div className="font-sub" style={{ fontSize: '10px', color: '#9ca3af' }}>
                      {recipe.stats}
                    </div>
                  </div>
                </div>
                <span className="font-pixel" style={{
                  fontSize: '8px',
                  padding: '2px 5px',
                  borderRadius: '2px',
                  background: canCook ? '#064e3b' : '#292524',
                  color: canCook ? '#6ee7b7' : '#78716c'
                }}>
                  {canCook ? 'SIAP' : 'BAHAN -'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Column: Hearth Minigame Stage */}
      <div className="panel-parchment">
        <div>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #caa771', paddingBottom: '8px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} style={{ color: '#ea580c' }} />
              <h3 className="font-pixel" style={{ fontSize: '12px', color: '#1a0a03' }}>PERAPIAN KAYU EK</h3>
            </div>
            <span className="font-pixel" style={{ fontSize: '9px', background: '#78350f', color: '#fef3c7', padding: '3px 6px', borderRadius: '2px' }}>
              DAPUR ISTANA
            </span>
          </div>

          {/* Dish Showcase */}
          <div className="hearth-preview-box">
            <div className="hearth-dish-icon anim-bounce">
              {selectedRecipe.icon}
            </div>
            <h4 className="font-pixel" style={{ fontSize: '13px', color: '#1a0a03', marginTop: '10px' }}>
              {selectedRecipe.name}
            </h4>
            <p className="font-dialogue" style={{ fontSize: '17px', color: '#453120', maxWidth: '380px', margin: '4px auto 0' }}>
              {selectedRecipe.desc}
            </p>
          </div>

          {/* Required Ingredients */}
          <div style={{ background: '#eedbb1', border: '2px solid #c5aa78', padding: '10px', margin: '14px 0' }}>
            <div className="font-pixel" style={{ fontSize: '9px', color: '#1a0a03', marginBottom: '8px' }}>
              BAHAN YANG DIBUTUHKAN:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {selectedRecipe.ingredients.map(req => {
                const owned = playerIngredients[req.id] || 0;
                const ok = owned >= req.count;
                return (
                  <div
                    key={req.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '4px 8px',
                      border: '1px solid',
                      background: ok ? '#dcfce7' : '#fee2e2',
                      borderColor: ok ? '#22c55e' : '#f87171',
                      color: ok ? '#14532d' : '#7f1d1d'
                    }}
                  >
                    <span className="font-sub" style={{ fontSize: '10px' }}>{req.name}</span>
                    <span className="font-pixel" style={{ fontSize: '9px', fontWeight: 'bold' }}>
                      {owned}/{req.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooking Heat Minigame Bar */}
          {isCooking && (
            <div style={{ background: '#1c0c04', border: '2px solid #ea580c', padding: '12px', textAlign: 'center', margin: '12px 0' }}>
              <div className="font-pixel" style={{ fontSize: '10px', color: '#fbbf24', marginBottom: '4px' }}>
                🔥 ATUR SUHU PEMANGGANGAN! 🔥
              </div>
              <div className="font-dialogue" style={{ fontSize: '16px', color: '#d6d3d1', marginBottom: '8px' }}>
                Tekan "ANGKAT MASAKAN" saat jarum berada di zona EMAS (Bintang 3)!
              </div>

              {/* Timing Track */}
              <div className="hearth-timing-track">
                <div className="timing-zone-blue" title="Kurang Matang" />
                <div className="timing-zone-yellow" title="Matang Baik" />
                <div className="timing-zone-perfect" title="Sempurna!">PERFECT</div>
                <div className="timing-zone-red" title="Gosong" />

                {/* Moving Indicator Needle */}
                <div
                  className="timing-needle"
                  style={{ left: `${heatPosition}%` }}
                />
              </div>

              <button
                onClick={handleStopCooking}
                className="pixel-btn btn-red"
                style={{ width: '100%', padding: '10px', fontSize: '11px', marginTop: '10px' }}
              >
                🍳 ANGKAT MASAKAN SEKARANG!
              </button>
            </div>
          )}

          {/* Result Alert */}
          {cookResult && (
            <div style={{ background: '#dcfce7', border: '2px solid #16a34a', padding: '10px', textAlign: 'center', margin: '10px 0' }}>
              <div className="font-pixel" style={{ fontSize: '11px', color: '#14532d', fontWeight: 'bold', marginBottom: '4px' }}>
                {cookResult.title}
              </div>
              <p className="font-dialogue" style={{ fontSize: '17px', color: '#166534' }}>
                1 porsi <strong>{cookResult.item.name}</strong> berhasil dibuat dan dimasukkan ke ransel! (+{cookResult.bonusExp} Reputasi)
              </p>
            </div>
          )}

        </div>

        {/* Start Cooking Button */}
        {!isCooking && (
          <button
            onClick={handleStartCooking}
            disabled={!hasIngredients}
            className={`pixel-btn ${hasIngredients ? 'btn-gold' : 'btn-stone'}`}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '11px',
              opacity: hasIngredients ? 1 : 0.6,
              cursor: hasIngredients ? 'pointer' : 'not-allowed'
            }}
          >
            <Flame size={15} />
            <span>NYALAKAN PERAPIAN & PANGGANG</span>
          </button>
        )}
      </div>

      {/* Right Column: Ingredient Pantry Shop */}
      <div className="panel-wood">
        <div className="panel-section-title">
          <ShoppingCart size={15} style={{ color: '#fbbf24' }} />
          <span>GUDANG LOGISTIK BAHAN</span>
        </div>
        <p className="font-dialogue" style={{ fontSize: '16px', color: '#a8a29e', marginBottom: '10px' }}>
          Beli pasokan bahan mentah dari pedagang keliling kerajaan:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {RAW_INGREDIENTS.map(ing => {
            const owned = playerIngredients[ing.id] || 0;
            const canAfford = playerGold >= ing.price;

            return (
              <div
                key={ing.id}
                style={{
                  background: '#160903',
                  border: '2px solid #361a08',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '22px' }}>{ing.icon}</span>
                  <div>
                    <div className="font-pixel" style={{ fontSize: '9px', color: '#fde68a' }}>
                      {ing.name}
                    </div>
                    <div className="font-sub" style={{ fontSize: '10px', color: '#9ca3af' }}>
                      Miliki: <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{owned}</span> • {ing.price} G
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => onBuyIngredient(ing, e)}
                  disabled={!canAfford}
                  className={`pixel-btn ${canAfford ? 'btn-wood' : 'btn-stone'}`}
                  style={{
                    fontSize: '8px',
                    padding: '5px 8px',
                    opacity: canAfford ? 1 : 0.5,
                    cursor: canAfford ? 'pointer' : 'not-allowed'
                  }}
                >
                  BELI (+1)
                </button>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
