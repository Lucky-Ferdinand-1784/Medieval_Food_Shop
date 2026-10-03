import React from 'react';
import { Volume2, VolumeX, Music, Tv, Backpack, Sparkles, Heart, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export default function TavernHeader({
  player,
  cartCount,
  onOpenBackpack,
  soundEnabled,
  setSoundEnabled,
  musicEnabled,
  setMusicEnabled,
  crtEnabled,
  setCrtEnabled,
  activeBuffs
}) {
  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
    if (newState) sound.play('click');
  };

  const handleToggleMusic = () => {
    const newState = sound.toggleMusic();
    setMusicEnabled(newState);
    sound.play('click');
  };

  const handleToggleCrt = () => {
    sound.play('click');
    setCrtEnabled(prev => !prev);
  };

  return (
    <header className="tavern-header">
      <div className="header-inner">
        
        {/* Brand & Level */}
        <div className="header-brand">
          <div className="brand-icon-box">
            <span>👑</span>
          </div>
          <div>
            <div className="brand-title-wrap">
              <h1 className="brand-title">DAPUR KERAJAAN</h1>
              <span className="level-tag">KEDAI LV.{player.level}</span>
            </div>
            <div className="brand-subtitle">
              <span>{player.title}</span> • Reputasi: {player.reputation}/100
            </div>
          </div>
        </div>

        {/* Player Stats Bar (HP, Stamina, Gold) */}
        <div className="header-stats-panel">
          
          {/* HP Bar */}
          <div className="stat-item">
            <div className="stat-label-row" style={{ color: '#f87171' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Heart size={10} /> HP
              </span>
              <span>{player.hp}/{player.maxHp}</span>
            </div>
            <div className="stat-track-bar">
              <div
                className="stat-fill-bar hp-fill"
                style={{ width: `${Math.min(100, (player.hp / player.maxHp) * 100)}%` }}
              />
            </div>
          </div>

          {/* Stamina Bar */}
          <div className="stat-item">
            <div className="stat-label-row" style={{ color: '#34d399' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Zap size={10} /> STAM
              </span>
              <span>{player.stamina}/{player.maxStamina}</span>
            </div>
            <div className="stat-track-bar">
              <div
                className="stat-fill-bar stamina-fill"
                style={{ width: `${Math.min(100, (player.stamina / player.maxStamina) * 100)}%` }}
              />
            </div>
          </div>

          {/* Gold Coin Purse */}
          <div className="gold-balance-box">
            <div className="gold-coin-icon">
              🪙
            </div>
            <div className="gold-text-wrap">
              <span className="gold-sub-label">KOIN EMAS</span>
              <span className="gold-amount">
                {player.gold.toLocaleString()} <span style={{ color: '#f59e0b' }}>G</span>
              </span>
            </div>
          </div>

        </div>

        {/* Header Action Buttons */}
        <div className="header-actions">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundEnabled ? "Nonaktifkan Efek Suara" : "Aktifkan Efek Suara"}
            className={`pixel-btn ${soundEnabled ? 'btn-wood' : 'btn-stone'}`}
            style={{ padding: '8px 10px' }}
          >
            {soundEnabled ? <Volume2 size={15} style={{ color: '#fde68a' }} /> : <VolumeX size={15} style={{ color: '#9ca3af' }} />}
          </button>

          {/* 8-bit Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={musicEnabled ? "Hentikan Musik Lute Kedai" : "Putar Musik Lute Kedai 8-Bit"}
            className={`pixel-btn ${musicEnabled ? 'btn-gold anim-bounce' : 'btn-stone'}`}
            style={{ padding: '8px 10px' }}
          >
            <Music size={15} style={{ color: musicEnabled ? '#1a0a02' : '#9ca3af' }} />
          </button>

          {/* CRT Screen Toggle */}
          <button
            onClick={handleToggleCrt}
            title="Efek Layar Monitor Retro CRT"
            className={`pixel-btn ${crtEnabled ? 'btn-wood' : 'btn-stone'}`}
            style={{ padding: '8px 10px', borderColor: crtEnabled ? '#f59e0b' : '#000' }}
          >
            <Tv size={15} style={{ color: crtEnabled ? '#fde68a' : '#9ca3af' }} />
          </button>

          {/* Backpack (Ransel) Cart Button */}
          <button
            onClick={() => {
              sound.play('click');
              onOpenBackpack();
            }}
            className="pixel-btn btn-gold"
            style={{ padding: '8px 12px' }}
          >
            <Backpack size={14} />
            <span>RANSEL</span>
            <span style={{
              background: '#991b1b',
              color: '#fff',
              fontSize: '8px',
              padding: '2px 5px',
              borderRadius: '2px'
            }}>
              {cartCount}
            </span>
          </button>
        </div>

      </div>

      {/* Buff Ribbon Bar */}
      {activeBuffs && activeBuffs.length > 0 && (
        <div className="buff-ribbon-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
            <Sparkles size={12} /> BUFF AKTIF:
          </span>
          {activeBuffs.map((buff, idx) => (
            <span key={idx} className="buff-chip">
              {buff.icon} {buff.name} ({buff.duration}s)
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
