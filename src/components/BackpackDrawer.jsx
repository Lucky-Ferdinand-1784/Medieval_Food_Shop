import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Utensils, Coins, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function BackpackDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateCartQty,
  onClearCart,
  onCheckout,
  inventory,
  onEatItem,
  onSellItem,
  playerGold
}) {
  const [activeTab, setActiveTab] = useState('cart'); // 'cart' | 'inventory'

  if (!isOpen) return null;

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const inventoryCount = inventory.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      
      {/* Drawer Panel */}
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>🎒</span>
            <div>
              <h3 className="font-pixel" style={{ fontSize: '12px', color: '#fbbf24' }}>
                RANSEL LOGISTIK PETUALANG
              </h3>
              <p className="font-sub" style={{ fontSize: '10px', color: '#d6bfa8' }}>
                Kapasitas Barang & Bekal Makanan
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              sound.play('click');
              onClose();
            }}
            style={{ background: 'transparent', border: 'none', color: '#e5e7eb', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="drawer-tabs">
          <button
            onClick={() => {
              sound.play('click');
              setActiveTab('cart');
            }}
            className={`pixel-btn ${activeTab === 'cart' ? 'btn-active-tab' : 'btn-stone'}`}
            style={{ flex: 1, padding: '8px' }}
          >
            <ShoppingBag size={12} />
            <span>KERANJANG ({cartItemCount})</span>
          </button>

          <button
            onClick={() => {
              sound.play('click');
              setActiveTab('inventory');
            }}
            className={`pixel-btn ${activeTab === 'inventory' ? 'btn-active-tab' : 'btn-stone'}`}
            style={{ flex: 1, padding: '8px' }}
          >
            <Utensils size={12} />
            <span>BEKAL RANSEL ({inventoryCount})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="drawer-body">
          
          {/* TAB 1: CART */}
          {activeTab === 'cart' && (
            <div>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#573a24' }}>
                  <div style={{ fontSize: '48px', marginBottom: '8px', opacity: 0.7 }}>🧺</div>
                  <h4 className="font-pixel" style={{ fontSize: '12px', color: '#1a0a03', marginBottom: '4px' }}>
                    Keranjang Masih Kosong
                  </h4>
                  <p className="font-dialogue" style={{ fontSize: '18px' }}>
                    Pilih santapan lezat di Kedai untuk mengisi ranselmu!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cart.map(item => (
                    <div key={item.id} className="drawer-slot-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '28px' }}>{item.icon}</span>
                        <div>
                          <h5 className="font-pixel" style={{ fontSize: '10px', color: '#fef08a' }}>
                            {item.name}
                          </h5>
                          <div className="font-sub" style={{ fontSize: '10px', color: '#fbbf24', marginTop: '2px' }}>
                            {item.price} G <span style={{ color: '#9ca3af' }}>x {item.qty} = {item.price * item.qty} G</span>
                          </div>
                          <div className="font-pixel" style={{ fontSize: '8px', color: '#4ade80', marginTop: '2px' }}>
                            {item.stats}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => {
                            sound.play('click');
                            onUpdateCartQty(item.id, -1);
                          }}
                          className="pixel-btn btn-stone"
                          style={{ width: '24px', height: '24px', padding: 0 }}
                        >
                          -
                        </button>
                        <span className="font-pixel" style={{ fontSize: '11px', color: '#fef08a', width: '20px', textAlign: 'center' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => {
                            sound.play('click');
                            onUpdateCartQty(item.id, 1);
                          }}
                          className="pixel-btn btn-wood"
                          style={{ width: '24px', height: '24px', padding: 0 }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INVENTORY */}
          {activeTab === 'inventory' && (
            <div>
              {inventory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#573a24' }}>
                  <div style={{ fontSize: '48px', marginBottom: '8px', opacity: 0.7 }}>🎒</div>
                  <h4 className="font-pixel" style={{ fontSize: '12px', color: '#1a0a03', marginBottom: '4px' }}>
                    Ranselmu Kosong
                  </h4>
                  <p className="font-dialogue" style={{ fontSize: '18px' }}>
                    Kamu belum memiliki persediaan makanan. Beli santapan atau masak di perapian!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {inventory.map(item => (
                    <div key={item.id} className="drawer-slot-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '28px' }}>{item.icon}</span>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h5 className="font-pixel" style={{ fontSize: '10px', color: '#fef08a' }}>
                              {item.name}
                            </h5>
                            <span className="font-pixel" style={{ fontSize: '8px', background: '#78350f', color: '#fde68a', padding: '1px 4px' }}>
                              x{item.qty}
                            </span>
                          </div>
                          <div className="font-pixel" style={{ fontSize: '8px', color: '#4ade80', marginTop: '2px' }}>
                            {item.stats}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={(e) => onEatItem(item, e)}
                          title="Santap untuk pulihkan HP/Stamina"
                          className="pixel-btn btn-green"
                          style={{ fontSize: '9px', padding: '5px 8px' }}
                        >
                          <Utensils size={10} />
                          <span>MAKAN</span>
                        </button>

                        <button
                          onClick={() => onSellItem(item)}
                          title={`Jual kembali seharga ${Math.floor(item.price * 0.7)} G`}
                          className="pixel-btn btn-stone"
                          style={{ fontSize: '9px', padding: '5px 8px' }}
                        >
                          JUAL ({Math.floor(item.price * 0.7)}G)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer for Cart Checkout */}
        {activeTab === 'cart' && cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="font-pixel" style={{ fontSize: '11px', color: '#1a0a03' }}>TOTAL HARGA:</span>
              <span className="font-pixel" style={{ fontSize: '14px', color: '#78350f', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                <Coins size={15} style={{ color: '#d97706' }} />
                {cartTotal} G
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => {
                  sound.play('click');
                  onClearCart();
                }}
                className="pixel-btn btn-stone"
                style={{ padding: '10px', fontSize: '11px' }}
              >
                <Trash2 size={12} />
                <span>KOSONGKAN</span>
              </button>

              <button
                onClick={(e) => onCheckout(e)}
                disabled={playerGold < cartTotal}
                className={`pixel-btn ${playerGold >= cartTotal ? 'btn-gold' : 'btn-stone'}`}
                style={{
                  padding: '10px',
                  fontSize: '11px',
                  opacity: playerGold >= cartTotal ? 1 : 0.6,
                  cursor: playerGold >= cartTotal ? 'pointer' : 'not-allowed'
                }}
              >
                <span>{playerGold >= cartTotal ? 'BAYAR KOIN' : 'KOIN KURANG'}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
