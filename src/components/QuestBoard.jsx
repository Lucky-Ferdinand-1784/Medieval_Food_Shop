import React from 'react';
import { CheckCircle2, Coins, Award } from 'lucide-react';
import { sound } from '../utils/audio';

export default function QuestBoard({
  quests,
  inventory,
  foodMenu,
  onCompleteQuest,
  onClaimDaily,
  dailyClaimed,
  playerReputation
}) {
  return (
    <div>
      
      {/* Notice Board Header */}
      <div className="quest-board-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            background: '#241005',
            border: '2px solid #783d16',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px'
          }}>
            📜
          </div>
          <div>
            <h3 className="font-pixel" style={{ fontSize: '13px', color: '#fbbf24', marginBottom: '4px' }}>
              PAPAN PESANAN KSATRIA & TAMU KEDAI
            </h3>
            <p className="font-dialogue" style={{ fontSize: '17px', color: '#d6bfa8' }}>
              Penuhi pesanan santapan para petualang di meja kedai untuk mendapatkan Koin Emas & Reputasi!
            </p>
          </div>
        </div>

        {/* Daily Bounty Widget */}
        <div style={{
          background: '#160902',
          border: '2px solid #542d13',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div>
            <div className="font-pixel" style={{ fontSize: '8px', color: '#fbbf24' }}>UPAH PATROLI BENTENG</div>
            <div className="font-sub" style={{ fontSize: '10px', color: '#9ca3af' }}>+100 Koin Emas Harian</div>
          </div>
          <button
            onClick={() => {
              if (!dailyClaimed) onClaimDaily();
              else sound.play('error');
            }}
            disabled={dailyClaimed}
            className={`pixel-btn ${dailyClaimed ? 'btn-stone' : 'btn-gold anim-pulse-gold'}`}
            style={{ fontSize: '9px', padding: '6px 10px' }}
          >
            {dailyClaimed ? 'SUDAH DIKLAIM' : 'KLAIM 100G'}
          </button>
        </div>
      </div>

      {/* Guest Orders Grid */}
      <div className="quests-cards-grid">
        {quests.map(guest => {
          const targetFood = foodMenu.find(f => f.id === guest.requestFoodId);
          const ownedCount = inventory.reduce((total, item) => {
            return item.id === guest.requestFoodId ? total + (item.qty || 1) : total;
          }, 0);

          const isReady = ownedCount >= guest.qty;

          return (
            <div key={guest.id} className="quest-card">
              <div>
                {/* Guest Character Header */}
                <div className="quest-guest-header">
                  <div className="guest-avatar-box">
                    {guest.avatar}
                  </div>
                  <div>
                    <h4 className="guest-name">{guest.name}</h4>
                    <span className="guest-title">{guest.title}</span>
                  </div>
                </div>

                {/* Speech Bubble */}
                <div className="guest-speech-bubble">
                  "{guest.dialogue}"
                </div>

                {/* Food Requirement Box */}
                <div className="quest-req-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '24px' }}>{targetFood?.icon || '🍲'}</span>
                    <div>
                      <div className="font-pixel" style={{ fontSize: '10px', color: '#1a0a03' }}>
                        {targetFood?.name}
                      </div>
                      <div className="font-sub" style={{ fontSize: '10px', color: '#573a24' }}>
                        Butuh: <strong>{guest.qty} porsi</strong>
                      </div>
                    </div>
                  </div>

                  <span className="font-pixel" style={{
                    fontSize: '9px',
                    padding: '3px 8px',
                    borderRadius: '2px',
                    background: isReady ? '#065f46' : '#a8a29e',
                    color: isReady ? '#ecfdf5' : '#292524'
                  }}>
                    {ownedCount}/{guest.qty}
                  </span>
                </div>

                {/* Rewards Breakdown */}
                <div className="quest-rewards-row">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#78350f', fontWeight: 'bold' }}>
                    <Coins size={13} style={{ color: '#d97706' }} /> +{guest.rewardGold} G
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#581c87', fontWeight: 'bold' }}>
                    <Award size={13} style={{ color: '#7e22ce' }} /> +{guest.rewardExp} Reputasi
                  </span>
                </div>
              </div>

              {/* Complete Button */}
              <button
                onClick={(e) => onCompleteQuest(guest, e)}
                disabled={!isReady}
                className={`pixel-btn ${isReady ? 'btn-green' : 'btn-stone'}`}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '11px',
                  opacity: isReady ? 1 : 0.6,
                  cursor: isReady ? 'pointer' : 'not-allowed'
                }}
              >
                <CheckCircle2 size={13} />
                <span>{isReady ? 'SERAHKAN PESANAN (+HADIAH)' : 'BEKAL BELUM CUKUP'}</span>
              </button>

            </div>
          );
        })}
      </div>

      {/* Kingdom Decrees & Lore Bulletin */}
      <div className="panel-wood">
        <div className="panel-section-title">
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <span>MAKLUMAT ALUN-ALUN BENTENG KERAJAAN</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#170802', border: '1px solid #3d1f0b', padding: '10px' }}>
            <span className="font-pixel" style={{ fontSize: '9px', color: '#fbbf24', display: 'block', marginBottom: '4px' }}>
              ⚔️ DISKON PATROLI MALAM
            </span>
            <p className="font-dialogue" style={{ fontSize: '16px', color: '#d6d3d1' }}>
              Ksatria benteng mendapatkan bonus ketahanan fisik dari santapan daging panggang saat ronda malam.
            </p>
          </div>
          <div style={{ background: '#170802', border: '1px solid #3d1f0b', padding: '10px' }}>
            <span className="font-pixel" style={{ fontSize: '9px', color: '#f87171', display: 'block', marginBottom: '4px' }}>
              🐉 KABAR LEMBAH NAGA
            </span>
            <p className="font-dialogue" style={{ fontSize: '16px', color: '#d6d3d1' }}>
              Monster kabut mulai aktif di jurang selatan. Konsumsi Sup Pedas Cabe Naga untuk menangkal hawa dingin!
            </p>
          </div>
          <div style={{ background: '#170802', border: '1px solid #3d1f0b', padding: '10px' }}>
            <span className="font-pixel" style={{ fontSize: '9px', color: '#4ade80', display: 'block', marginBottom: '4px' }}>
              ✨ RAHASIA KOKI BALTHAZAR
            </span>
            <p className="font-dialogue" style={{ fontSize: '16px', color: '#d6d3d1' }}>
              Memasak resep dengan api pas di perapian dapur meningkatkan reputasi kedai jauh lebih cepat!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
