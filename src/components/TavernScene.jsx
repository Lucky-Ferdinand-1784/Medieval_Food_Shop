import React from 'react';
import { Flame, Utensils, ScrollText, Award } from 'lucide-react';
import { sound } from '../utils/audio';

export default function TavernScene({
  currentView,
  setCurrentView,
  chefRumor,
  onPetCat,
  onClaimDaily,
  dailyClaimed,
  onChefTalk
}) {
  const handleSpotClick = (view, sfx = 'click') => {
    sound.play(sfx);
    if (view) setCurrentView(view);
  };

  return (
    <div className="tavern-scene-frame">
      
      {/* 16-Bit Pixel Art Wooden Tavern Viewport */}
      <div className="tavern-scene-viewport">
        
        {/* Top Location Bar inside scene */}
        <div className="scene-header-bar">
          <div className="scene-location-badge">
            <span className="pulse-dot" />
            <span>KEDAI KAYU RUSTIC • SUASANA HANGAT</span>
          </div>

          {/* Daily Patrol Bounty Button */}
          <button
            onClick={() => {
              if (!dailyClaimed) onClaimDaily();
              else sound.play('error');
            }}
            disabled={dailyClaimed}
            className={`pixel-btn ${dailyClaimed ? 'btn-stone' : 'btn-gold anim-bounce'}`}
            style={{ fontSize: '9px', padding: '6px 12px' }}
          >
            <Award size={13} />
            <span>{dailyClaimed ? '✓ PATROLI DIKLAIM' : '🎁 KLAIM PATROLI (100G)'}</span>
          </button>
        </div>

        {/* 4 Interactive Hotspot Cards across the Tavern */}
        <div className="scene-hotspots-grid">
          
          {/* Hotspot 1: Chef Balthazar */}
          <div
            onClick={() => {
              sound.play('click');
              onChefTalk();
            }}
            className="hotspot-card"
          >
            <div className="hotspot-avatar">
              👨‍🍳
            </div>
            <div>
              <div className="hotspot-name">KOKI BALTHAZAR</div>
              <div className="hotspot-desc">Bicara & Tips</div>
            </div>
          </div>

          {/* Hotspot 2: Cooking Hearth */}
          <div
            onClick={() => handleSpotClick('cooking', 'cook')}
            className="hotspot-card"
            style={{
              borderColor: currentView === 'cooking' ? '#fbbf24' : undefined,
              background: currentView === 'cooking' ? 'rgba(65, 30, 12, 0.98)' : undefined
            }}
          >
            <div className="hotspot-avatar" style={{ borderColor: '#f97316' }}>
              🔥
            </div>
            <div>
              <div className="hotspot-name" style={{ color: '#f97316' }}>PERAPIAN MASAK</div>
              <div className="hotspot-desc">Minigame Memasak</div>
            </div>
          </div>

          {/* Hotspot 3: Guest Orders & Quests */}
          <div
            onClick={() => handleSpotClick('quests', 'click')}
            className="hotspot-card"
            style={{
              borderColor: currentView === 'quests' ? '#fbbf24' : undefined,
              background: currentView === 'quests' ? 'rgba(65, 30, 12, 0.98)' : undefined
            }}
          >
            <div className="hotspot-avatar" style={{ borderColor: '#fbbf24' }}>
              📜
            </div>
            <div>
              <div className="hotspot-name">PESANAN TAMU</div>
              <div className="hotspot-desc">Misi & Hadiah</div>
            </div>
          </div>

          {/* Hotspot 4: Tavern Cat Miko */}
          <div
            onClick={() => {
              sound.play('cat');
              onPetCat();
            }}
            className="hotspot-card"
          >
            <div className="hotspot-avatar" style={{ borderColor: '#eab308' }}>
              🐱
            </div>
            <div>
              <div className="hotspot-name" style={{ color: '#fde047' }}>KUCING MIKO</div>
              <div className="hotspot-desc">Belai (+Buff)</div>
            </div>
          </div>

        </div>

        {/* Bottom Rumor Bubble */}
        <div className="scene-rumor-bar">
          <span style={{ fontSize: '24px', flexShrink: 0 }}>💬</span>
          <div style={{ overflow: 'hidden' }}>
            <div className="rumor-label">Kabar Burung Kedai:</div>
            <div className="rumor-text">"{chefRumor}"</div>
          </div>
        </div>

      </div>

      {/* Navigation View Switcher Tabs Bar */}
      <div className="scene-tabs-bar">
        <button
          onClick={() => handleSpotClick('shop')}
          className={`pixel-btn ${currentView === 'shop' ? 'btn-active-tab' : 'btn-wood'}`}
          style={{ padding: '8px 16px', fontSize: '11px' }}
        >
          <Utensils size={13} />
          <span>KEDAI MAKANAN</span>
        </button>

        <button
          onClick={() => handleSpotClick('cooking', 'cook')}
          className={`pixel-btn ${currentView === 'cooking' ? 'btn-active-tab' : 'btn-wood'}`}
          style={{ padding: '8px 16px', fontSize: '11px' }}
        >
          <Flame size={13} />
          <span>DAPUR & PERAPIAN</span>
        </button>

        <button
          onClick={() => handleSpotClick('quests')}
          className={`pixel-btn ${currentView === 'quests' ? 'btn-active-tab' : 'btn-wood'}`}
          style={{ padding: '8px 16px', fontSize: '11px' }}
        >
          <ScrollText size={13} />
          <span>PAPAN PESANAN TAMU</span>
        </button>
      </div>

    </div>
  );
}
