import React, { useState, useEffect } from 'react';
import './App.css';
import { sound } from './utils/audio';
import { FOOD_MENU, RAW_INGREDIENTS, TAVERN_GUESTS, CHEF_RUMORS } from './data/gameData';

import ParticleCanvas from './components/ParticleCanvas';
import TavernHeader from './components/TavernHeader';
import TavernScene from './components/TavernScene';
import ShopCatalog from './components/ShopCatalog';
import CookingStation from './components/CookingStation';
import QuestBoard from './components/QuestBoard';
import BackpackDrawer from './components/BackpackDrawer';
import DialogModal from './components/DialogModal';
import TavernSignboard from './components/TavernSignboard';

export default function App() {
  // Player RPG State
  const [player, setPlayer] = useState({
    level: 1,
    reputation: 25,
    title: 'Pengelana Lapar',
    gold: 500,
    hp: 80,
    maxHp: 100,
    stamina: 75,
    maxStamina: 100,
    mana: 60,
    maxMana: 100
  });

  // Food Inventory & Cart
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([
    { ...FOOD_MENU[4], qty: 2 }, // 2x Roti Gandum
    { ...FOOD_MENU[11], qty: 1 } // 1x Bir Mead
  ]);

  // Ingredients owned for cooking
  const [playerIngredients, setPlayerIngredients] = useState({
    meat: 3,
    wheat: 4,
    honey: 2,
    spices: 1,
    herbs: 1,
    berries: 2
  });

  // Quests / Patron Orders
  const [quests, setQuests] = useState(TAVERN_GUESTS);
  const [dailyClaimed, setDailyClaimed] = useState(false);

  // Active view: 'shop' | 'cooking' | 'quests'
  const [currentView, setCurrentView] = useState('shop');
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);

  // Audio & Display settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);

  // Active Buffs
  const [activeBuffs, setActiveBuffs] = useState([
    { name: 'Aroma Kayu Ek', icon: '🌲', duration: 180 }
  ]);

  // Rumor of the tavern
  const [currentRumor, setCurrentRumor] = useState(CHEF_RUMORS[0]);

  // Visual FX & Floating Popups
  const [sparkleTrigger, setSparkleTrigger] = useState(null);
  const [floatingPopups, setFloatingPopups] = useState([]);

  // RPG Dialogue Modal State
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    avatar: '👨‍🍳',
    speakerName: 'Koki Balthazar'
  });

  // Periodic Tavern Rumor Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRumor(prev => {
        const nextIdx = (CHEF_RUMORS.indexOf(prev) + 1) % CHEF_RUMORS.length;
        return CHEF_RUMORS[nextIdx];
      });
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Buff Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBuffs(prev =>
        prev
          .map(b => ({ ...b, duration: b.duration - 1 }))
          .filter(b => b.duration > 0)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Spawn visual floating text
  const spawnFloatingText = (text, x, y, color = '#ffd700') => {
    const id = Date.now() + Math.random();
    setFloatingPopups(prev => [
      ...prev,
      { id, text, x: x || window.innerWidth / 2, y: y || window.innerHeight / 2, color }
    ]);

    setTimeout(() => {
      setFloatingPopups(prev => prev.filter(p => p.id !== id));
    }, 1600);
  };

  // Add Reputation and check Level Up
  const addReputation = (amount) => {
    setPlayer(prev => {
      const newRep = prev.reputation + amount;
      if (newRep >= 100) {
        // Level up!
        sound.play('levelUp');
        const newLevel = prev.level + 1;
        const titles = [
          'Pengelana Lapar',
          'Ksatria Benteng',
          'Pahlawan Perjamuan',
          'Bangsawan Istana',
          'Legenda Kedai Kerajaan'
        ];
        const nextTitle = titles[Math.min(newLevel - 1, titles.length - 1)];

        setDialog({
          isOpen: true,
          title: 'LEVEL UP KEDAI!',
          message: `Selamat Pengelana! Kedaimu kini naik ke Level ${newLevel}! Gelarmu sekarang adalah "${nextTitle}"! Max HP & Stamina meningkat!`,
          avatar: '👑',
          speakerName: 'Maklumat Kerajaan'
        });

        return {
          ...prev,
          level: newLevel,
          reputation: newRep - 100,
          title: nextTitle,
          maxHp: prev.maxHp + 25,
          hp: prev.maxHp + 25,
          maxStamina: prev.maxStamina + 20,
          stamina: prev.maxStamina + 20
        };
      }
      return { ...prev, reputation: newRep };
    });
  };

  // Cart operations
  const handleAddToCart = (item, ev) => {
    if (player.gold < item.price) {
      sound.play('error');
      spawnFloatingText('Koin Tidak Cukup!', ev?.clientX, ev?.clientY, '#ef4444');
      return;
    }

    sound.play('coin');
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });

    setSparkleTrigger({
      x: ev?.clientX || window.innerWidth / 2,
      y: ev?.clientY || window.innerHeight / 2,
      color: '#ffd700',
      count: 18
    });
    spawnFloatingText(`+1 ${item.name}`, ev?.clientX, ev?.clientY, '#f59e0b');
  };

  // Direct Eat from Shop (Instantly restores HP / Stamina)
  const handleEatDirect = (item, ev) => {
    if (player.gold < item.price) {
      sound.play('error');
      spawnFloatingText('Koin Kurang!', ev?.clientX, ev?.clientY, '#ef4444');
      return;
    }

    sound.play('eat');
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold - item.price,
      hp: Math.min(prev.maxHp, prev.hp + (item.effects?.hp || 20)),
      stamina: Math.min(prev.maxStamina, prev.stamina + (item.effects?.stamina || 25))
    }));

    // Add temporary buff if has stats
    if (item.effects?.str) {
      setActiveBuffs(prev => [
        ...prev.filter(b => b.name !== 'Kekuatan Berkah'),
        { name: 'Kekuatan Berkah (+STR)', icon: '⚔️', duration: 90 }
      ]);
    }

    setSparkleTrigger({
      x: ev?.clientX || window.innerWidth / 2,
      y: ev?.clientY || window.innerHeight / 2,
      color: '#10b981',
      count: 22
    });

    spawnFloatingText(`+${item.effects?.hp || 20} HP (Kenyang!)`, ev?.clientX, ev?.clientY, '#34d399');
    addReputation(5);
  };

  // Checkout Cart
  const handleCheckout = (ev) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (player.gold < total) {
      sound.play('error');
      setDialog({
        isOpen: true,
        title: 'Koin Emas Tidak Mencukupi!',
        message: `Total belanjaan adalah ${total} G, namun kantongmu hanya berisi ${player.gold} G. Selesaikan pesanan ksatria atau klaim hadiah harian!`,
        avatar: '🪙',
        speakerName: 'Kasir Kedai'
      });
      return;
    }

    sound.play('buy');
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold - total,
      stamina: prev.maxStamina
    }));

    // Move cart items to inventory
    setInventory(prev => {
      const nextInv = [...prev];
      cart.forEach(cartItem => {
        const found = nextInv.find(i => i.id === cartItem.id);
        if (found) {
          found.qty += cartItem.qty;
        } else {
          nextInv.push({ ...cartItem });
        }
      });
      return nextInv;
    });

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    setCart([]);
    setIsBackpackOpen(false);

    setSparkleTrigger({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      color: '#ffd700',
      count: 45
    });

    addReputation(totalQty * 4);

    setDialog({
      isOpen: true,
      title: 'Pembelian Berhasil!',
      message: `Sebanyak ${totalQty} porsi hidangan telah tersimpan rapi di dalam ranselmu. Stamina perjalananmu pulih penuh! Semoga petualanganmu lancar!`,
      avatar: '👨‍🍳',
      speakerName: 'Koki Balthazar'
    });
  };

  // Eat item from inventory
  const handleEatInventoryItem = (item, ev) => {
    sound.play('eat');
    setPlayer(prev => ({
      ...prev,
      hp: Math.min(prev.maxHp, prev.hp + (item.effects?.hp || 20)),
      stamina: Math.min(prev.maxStamina, prev.stamina + (item.effects?.stamina || 25))
    }));

    setInventory(prev => {
      return prev
        .map(i => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0);
    });

    spawnFloatingText(`+${item.effects?.hp || 20} HP`, ev?.clientX, ev?.clientY, '#34d399');
  };

  // Sell item from inventory
  const handleSellInventoryItem = (item) => {
    const sellPrice = Math.floor(item.price * 0.7);
    sound.play('coin');

    setPlayer(prev => ({ ...prev, gold: prev.gold + sellPrice }));
    setInventory(prev => {
      return prev
        .map(i => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0);
    });

    spawnFloatingText(`+${sellPrice} G`, window.innerWidth / 2, window.innerHeight / 2, '#fbbf24');
  };

  // Buy raw ingredients for cooking
  const handleBuyIngredient = (ing, ev) => {
    if (player.gold < ing.price) {
      sound.play('error');
      spawnFloatingText('Koin Kurang!', ev?.clientX, ev?.clientY, '#ef4444');
      return;
    }

    sound.play('coin');
    setPlayer(prev => ({ ...prev, gold: prev.gold - ing.price }));
    setPlayerIngredients(prev => ({
      ...prev,
      [ing.id]: (prev[ing.id] || 0) + 1
    }));

    spawnFloatingText(`+1 ${ing.name}`, ev?.clientX, ev?.clientY, '#fbbf24');
  };

  // Cooking minigame finished
  const handleCookSuccess = (recipe, rating, bonusExp) => {
    // Deduct ingredients
    setPlayerIngredients(prev => {
      const updated = { ...prev };
      recipe.ingredients.forEach(req => {
        updated[req.id] = Math.max(0, (updated[req.id] || 0) - req.count);
      });
      return updated;
    });

    // Add cooked dish to inventory
    setInventory(prev => {
      const found = prev.find(i => i.id === recipe.id);
      if (found) {
        return prev.map(i => (i.id === recipe.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...recipe, qty: 1 }];
    });

    addReputation(bonusExp);
  };

  // Complete Patron Quest / Order
  const handleCompleteQuest = (guest, ev) => {
    // Deduct required items from inventory
    let remainingToDeduct = guest.qty;
    setInventory(prev => {
      return prev
        .map(item => {
          if (item.id === guest.requestFoodId) {
            const deduct = Math.min(item.qty, remainingToDeduct);
            remainingToDeduct -= deduct;
            return { ...item, qty: item.qty - deduct };
          }
          return item;
        })
        .filter(item => item.qty > 0);
    });

    sound.play('buy');
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold + guest.rewardGold
    }));

    addReputation(guest.rewardExp);

    setSparkleTrigger({
      x: ev?.clientX || window.innerWidth / 2,
      y: ev?.clientY || window.innerHeight / 2,
      color: '#ffd700',
      count: 35
    });

    spawnFloatingText(`+${guest.rewardGold} G!`, ev?.clientX, ev?.clientY, '#ffd700');

    // Remove or refresh guest order
    setQuests(prev => prev.filter(q => q.id !== guest.id));

    setDialog({
      isOpen: true,
      title: 'Pesanan Terselesaikan!',
      message: `Terima kasih banyak pemilik kedai! Hidangan ini sungguh lezat dan membakar kembali semangat juangku! Ini imbalan ${guest.rewardGold} Koin Emas dan reputasi istana!`,
      avatar: guest.avatar,
      speakerName: guest.name
    });
  };

  // Claim Daily Patrol Reward
  const handleClaimDaily = () => {
    if (dailyClaimed) return;
    sound.play('coin');
    setDailyClaimed(true);
    setPlayer(prev => ({ ...prev, gold: prev.gold + 100 }));
    addReputation(20);

    setSparkleTrigger({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      color: '#ffd700',
      count: 30
    });

    setDialog({
      isOpen: true,
      title: 'Upah Patroli Diterima!',
      message: 'Komandan Benteng menyerahkan 100 Koin Emas & 20 Reputasi sebagai tanda terima kasih telah menjaga pasokan logistik ksatria kerajaan!',
      avatar: '🛡️',
      speakerName: 'Komandan Benteng'
    });
  };

  // Pet the tavern cat Miko
  const handlePetCat = () => {
    sound.play('cat');
    setPlayer(prev => ({
      ...prev,
      stamina: Math.min(prev.maxStamina, prev.stamina + 15)
    }));

    setActiveBuffs(prev => [
      ...prev.filter(b => b.name !== 'Dibelai Miko (+Keberuntungan)'),
      { name: 'Dibelai Miko (+Keberuntungan)', icon: '🐾', duration: 120 }
    ]);

    setSparkleTrigger({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      color: '#facc15',
      count: 20
    });

    setDialog({
      isOpen: true,
      title: 'Miko Mendengkur Nyaman!',
      message: 'Purrrr... Meooow! Si Miko berputar senang di dekat perapian kayu. Kamu merasakan kehangatan yang memulihkan +15 Stamina & Berkah Keberuntungan!',
      avatar: '🐱',
      speakerName: 'Miko si Kucing Kedai'
    });
  };

  // Talk to Chef Balthazar
  const handleChefTalk = () => {
    sound.play('click');
    setDialog({
      isOpen: true,
      title: 'Pesan dari Dapur',
      message: currentRumor,
      avatar: '👨‍🍳',
      speakerName: 'Koki Balthazar'
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className={`app-root ${crtEnabled ? 'crt-overlay' : ''}`}>
      
      {/* Canvas Sparkles & Ambient Floating Embers */}
      <ParticleCanvas burstTrigger={sparkleTrigger} />

      {/* Floating Popups Layer (Heals, Gold, Messages) */}
      <div className="floating-popups-layer">
        {floatingPopups.map(p => (
          <div
            key={p.id}
            className="floating-popup-item float-popup"
            style={{ left: `${p.x}px`, top: `${p.y}px`, color: p.color }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Retro Medieval Header with RPG status */}
      <TavernHeader
        player={player}
        cartCount={totalCartCount}
        onOpenBackpack={() => setIsBackpackOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        musicEnabled={musicEnabled}
        setMusicEnabled={setMusicEnabled}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        activeBuffs={activeBuffs}
      />

      {/* Main Game Content Area */}
      <main className="main-content">
        
        {/* Grand Medieval Wooden Tavern Hanging Signboard */}
        <TavernSignboard
          playerTitle={player.title}
          playerLevel={player.level}
          onSelectTitle={(newTitle) => setPlayer(prev => ({ ...prev, title: newTitle }))}
        />

        {/* Interactive Wooden Tavern Background Stage */}
        <TavernScene
          currentView={currentView}
          setCurrentView={setCurrentView}
          chefRumor={currentRumor}
          onPetCat={handlePetCat}
          onClaimDaily={handleClaimDaily}
          dailyClaimed={dailyClaimed}
          onChefTalk={handleChefTalk}
        />

        {/* View 1: Shop Catalog (Pasar Santapan Kerajaan) */}
        {currentView === 'shop' && (
          <ShopCatalog
            foodMenu={FOOD_MENU}
            onAddToCart={handleAddToCart}
            onEatDirect={handleEatDirect}
            playerGold={player.gold}
          />
        )}

        {/* View 2: Cooking Hearth Minigame (Dapur & Perapian) */}
        {currentView === 'cooking' && (
          <CookingStation
            recipes={FOOD_MENU}
            playerIngredients={playerIngredients}
            onBuyIngredient={handleBuyIngredient}
            playerGold={player.gold}
            onCookSuccess={handleCookSuccess}
            onTriggerSparkle={setSparkleTrigger}
          />
        )}

        {/* View 3: Quests & Patron Orders (Papan Pesanan Tamu) */}
        {currentView === 'quests' && (
          <QuestBoard
            quests={quests}
            inventory={inventory}
            foodMenu={FOOD_MENU}
            onCompleteQuest={handleCompleteQuest}
            onClaimDaily={handleClaimDaily}
            dailyClaimed={dailyClaimed}
            playerReputation={player.reputation}
          />
        )}

      </main>

      {/* Backpack Drawer (Shopping Cart & Owned Inventory) */}
      <BackpackDrawer
        isOpen={isBackpackOpen}
        onClose={() => setIsBackpackOpen(false)}
        cart={cart}
        onUpdateCartQty={(id, delta) => {
          setCart(prev =>
            prev
              .map(i => (i.id === id ? { ...i, qty: i.qty + delta } : i))
              .filter(i => i.qty > 0)
          );
        }}
        onClearCart={() => setCart([])}
        onCheckout={handleCheckout}
        inventory={inventory}
        onEatItem={handleEatInventoryItem}
        onSellItem={handleSellInventoryItem}
        playerGold={player.gold}
      />

      {/* Retro RPG Dialogue Modal */}
      <DialogModal
        isOpen={dialog.isOpen}
        onClose={() => setDialog(prev => ({ ...prev, isOpen: false }))}
        title={dialog.title}
        message={dialog.message}
        avatar={dialog.avatar}
        speakerName={dialog.speakerName}
      />

      {/* Footer */}
      <footer className="tavern-footer">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-pixel" style={{ fontSize: '11px', color: '#fbbf24' }}>DAPUR KERAJAAN</span>
            <span className="font-sub" style={{ fontSize: '11px', color: '#a8a29e' }}>• Edisi Pixel Art RPG React</span>
          </div>
          <div className="font-dialogue" style={{ fontSize: '17px', color: '#a8a29e' }}>
            Dibuat dengan kayu ek istana & rempah suci • Bebas sihir kutukan gelap
          </div>
          <div className="font-pixel" style={{ fontSize: '10px', color: '#78716c' }}>
            © Benteng Kerajaan • 2026
          </div>
        </div>
      </footer>

    </div>
  );
}
