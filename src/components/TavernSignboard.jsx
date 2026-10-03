import React, { useState } from 'react';
import { Sparkles, Shield, Flame, Crown, Award, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

export default function TavernSignboard({
  playerTitle,
  playerLevel,
  onSelectTitle
}) {
  const [showTitlePicker, setShowTitlePicker] = useState(false);

  const availableTitles = [
    { name: 'Pengelana Lapar', minLevel: 1, desc: 'Petualang yang baru pertama kali singgah mencari bekal.' },
    { name: 'Koki Magang Perapian', minLevel: 1, desc: 'Membantu Koki Balthazar memotong kayu bakar dan meracik bumbu.' },
    { name: 'Ksatria Benteng', minLevel: 2, desc: 'Penjaga pos patroli yang selalu membawa bekal daging asap.' },
    { name: 'Pahlawan Perjamuan', minLevel: 3, desc: 'Menghabiskan kalkun panggang raja dalam satu perayaan akbar.' },
    { name: 'Bangsawan Istana', minLevel: 4, desc: 'Tamu kehormatan yang menikmati hidangan nektar ambrosia.' },
    { name: 'Legenda Dapur Kerajaan', minLevel: 5, desc: 'Penguasa kuliner benteng utara yang melegenda seantero negeri.' }
  ];

  return (
    <div className="tavern-signboard-wrapper">
      
      {/* Hanging Iron Chains */}
      <div className="signboard-chains-row">
        <div className="hanging-chain left-chain">
          <div className="chain-link" />
          <div className="chain-link" />
          <div className="chain-link" />
          <div className="chain-ring" />
        </div>
        <div className="hanging-chain right-chain">
          <div className="chain-link" />
          <div className="chain-link" />
          <div className="chain-link" />
          <div className="chain-ring" />
        </div>
      </div>

      {/* Carved Wooden Signboard Panel */}
      <div className="signboard-wood-panel">
        
        {/* 4 Iron Corner Rivets */}
        <div className="iron-rivet rivet-tl" />
        <div className="iron-rivet rivet-tr" />
        <div className="iron-rivet rivet-bl" />
        <div className="iron-rivet rivet-br" />

        {/* Top Kingdom Crest Tag */}
        <div className="signboard-top-tag">
          <span>🏰 ALUN-ALUN BENTENG UTARA • KEDAI RESMI KERAJAAN</span>
        </div>

        {/* Main Grand Game Title */}
        <div className="signboard-title-row">
          <span className="signboard-flank-icon">⚔️</span>
          <h1 className="signboard-main-heading">
            DAPUR KERAJAAN
          </h1>
          <span className="signboard-flank-icon">🍗</span>
        </div>

        {/* Subtitle Lore */}
        <div className="signboard-sub-text">
          WARUNG MAKAN SANTAPAN PETUALANG & LOGISTIK RANSEL ISTANA
        </div>

        <p className="signboard-description">
          Dipanggang langsung di atas perapian kayu ek istana! Dapatkan santapan berkhasiat tinggi untuk memulihkan <strong style={{ color: '#f87171' }}>HP</strong>, mengisi <strong style={{ color: '#34d399' }}>Stamina</strong>, dan menambah kekuatan sebelum menjelajah rimba & dungeon luar benteng.
        </p>

        {/* Signboard Badges Row */}
        <div className="signboard-badges-container">
          <div className="sign-badge-item">
            <Flame size={12} style={{ color: '#f97316' }} />
            <span>Perapian Kayu Ek Asli</span>
          </div>

          <div className="sign-badge-item">
            <Shield size={12} style={{ color: '#60a5fa' }} />
            <span>Bebas Sihir Kutukan</span>
          </div>

          <div className="sign-badge-item">
            <Crown size={12} style={{ color: '#fbbf24' }} />
            <span>Pasokan Resmi Ksatria</span>
          </div>

          {/* Interactive Player Title Badge / Selector */}
          <div
            onClick={() => {
              sound.play('click');
              setShowTitlePicker(prev => !prev);
            }}
            className="sign-badge-item player-title-badge"
            title="Klik untuk melihat & memilih Gelar Petualang"
          >
            <Award size={12} style={{ color: '#e879f9' }} />
            <span>Gelar: <strong>{playerTitle}</strong></span>
            <ChevronDown size={11} style={{ marginLeft: '2px' }} />
          </div>
        </div>

        {/* Title Picker Dropdown Modal */}
        {showTitlePicker && (
          <div className="title-picker-dropdown">
            <div className="font-pixel" style={{ fontSize: '9px', color: '#fbbf24', marginBottom: '8px', borderBottom: '1px solid #4a2810', paddingBottom: '4px' }}>
              DAFTAR GELAR / TITLE PETUALANG:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {availableTitles.map((t, idx) => {
                const isUnlocked = playerLevel >= t.minLevel;
                const isSelected = playerTitle === t.name;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isUnlocked) {
                        sound.play('click');
                        onSelectTitle(t.name);
                        setShowTitlePicker(false);
                      } else {
                        sound.play('error');
                      }
                    }}
                    className={`title-option-item ${isSelected ? 'title-selected' : ''} ${!isUnlocked ? 'title-locked' : ''}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-pixel" style={{ fontSize: '10px', color: isSelected ? '#fbbf24' : isUnlocked ? '#fef3c7' : '#78716c' }}>
                        {t.name}
                      </span>
                      <span className="font-sub" style={{ fontSize: '9px', color: isUnlocked ? '#34d399' : '#ef4444' }}>
                        {isUnlocked ? (isSelected ? '✓ DIPILIH' : 'TERBUKA') : `KEDAI LV.${t.minLevel}`}
                      </span>
                    </div>
                    <div className="font-dialogue" style={{ fontSize: '14px', color: '#a8a29e', marginTop: '2px' }}>
                      {t.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
