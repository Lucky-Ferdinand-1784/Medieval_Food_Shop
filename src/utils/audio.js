// Web Audio API 8-Bit Synthesizer for Retro Pixel Medieval Sound Effects & Tavern BGM

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.isSoundEnabled = true;
        this.isMusicEnabled = false;
        this.bgmOscs = [];
        this.bgmTimer = null;
        this.currentNoteIndex = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound(val) {
        this.isSoundEnabled = typeof val === 'boolean' ? val : !this.isSoundEnabled;
        return this.isSoundEnabled;
    }

    toggleMusic() {
        this.isMusicEnabled = !this.isMusicEnabled;
        if (this.isMusicEnabled) {
            this.init();
            this.startBGM();
        } else {
            this.stopBGM();
        }
        return this.isMusicEnabled;
    }

    // Play 8-bit procedural sound effects
    play(type) {
        if (!this.isSoundEnabled) return;
        try {
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            switch (type) {
                case 'coin': {
                    // Quick high coin chime (Square wave)
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(987.77, now); // B5
                    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
                    gain.gain.setValueAtTime(0.18, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                    break;
                }
                case 'buy': {
                    // Triumph arpeggio fanfare
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(523.25, now); // C5
                    osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
                    osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
                    osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
                    gain.gain.setValueAtTime(0.22, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                    osc.start(now);
                    osc.stop(now + 0.45);
                    break;
                }
                case 'eat': {
                    // Cheerful munch / powerup sound
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300, now);
                    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
                    osc.frequency.exponentialRampToValueAtTime(800, now + 0.24);
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                    osc.start(now);
                    osc.stop(now + 0.3);
                    break;
                }
                case 'cook': {
                    // Sizzling noise-like frequency modulation
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(220, now);
                    osc.frequency.linearRampToValueAtTime(440, now + 0.1);
                    osc.frequency.linearRampToValueAtTime(330, now + 0.2);
                    osc.frequency.linearRampToValueAtTime(550, now + 0.3);
                    gain.gain.setValueAtTime(0.15, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                    osc.start(now);
                    osc.stop(now + 0.4);
                    break;
                }
                case 'levelUp': {
                    // Royal fanfare
                    osc.type = 'square';
                    const notes = [440, 554.37, 659.25, 880, 1108.73];
                    notes.forEach((freq, idx) => {
                        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                    });
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
                    osc.start(now);
                    osc.stop(now + 0.55);
                    break;
                }
                case 'cat': {
                    // Cute meow pitch bend
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(600, now);
                    osc.frequency.exponentialRampToValueAtTime(850, now + 0.12);
                    osc.frequency.exponentialRampToValueAtTime(500, now + 0.3);
                    gain.gain.setValueAtTime(0.18, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                    break;
                }
                case 'error': {
                    // Low buzz
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(140, now);
                    osc.frequency.setValueAtTime(100, now + 0.1);
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    osc.start(now);
                    osc.stop(now + 0.25);
                    break;
                }
                case 'click':
                default: {
                    // Subtle retro blip
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(520, now);
                    gain.gain.setValueAtTime(0.12, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                    osc.start(now);
                    osc.stop(now + 0.06);
                    break;
                }
            }
        } catch (e) {
            console.warn("Sound error:", e);
        }
    }

    // Procedural 8-bit Medieval Tavern Lute BGM
    startBGM() {
        this.stopBGM();
        if (!this.ctx) this.init();
        if (!this.ctx) return;

        // Medieval Dorian tavern tune melody notes (frequencies in Hz)
        // D4, F4, G4, A4, C5, A4, G4, F4, E4, D4...
        const melody = [
            { note: 293.66, dur: 0.28 }, // D4
            { note: 349.23, dur: 0.28 }, // F4
            { note: 392.00, dur: 0.28 }, // G4
            { note: 440.00, dur: 0.56 }, // A4
            { note: 523.25, dur: 0.28 }, // C5
            { note: 440.00, dur: 0.28 }, // A4
            { note: 392.00, dur: 0.42 }, // G4
            { note: 349.23, dur: 0.28 }, // F4
            { note: 329.63, dur: 0.28 }, // E4
            { note: 293.66, dur: 0.56 }, // D4
            { note: 261.63, dur: 0.28 }, // C4
            { note: 293.66, dur: 0.56 }, // D4
            { note: 440.00, dur: 0.28 }, // A4
            { note: 392.00, dur: 0.28 }, // G4
            { note: 349.23, dur: 0.28 }, // F4
            { note: 329.63, dur: 0.42 }, // E4
            { note: 293.66, dur: 0.70 }, // D4
        ];

        let index = 0;
        const playNextStep = () => {
            if (!this.isMusicEnabled || !this.ctx) return;
            const item = melody[index];
            index = (index + 1) % melody.length;

            try {
                const now = this.ctx.currentTime;
                // Lead Lute (Triangle wave)
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(item.note, now);

                // Gentle plucked envelope
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 0.95);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + item.dur);

                // Soft bass note on root beats
                if (index % 4 === 0) {
                    const bass = this.ctx.createOscillator();
                    const bassGain = this.ctx.createGain();
                    bass.type = 'sine';
                    bass.frequency.setValueAtTime(146.83, now); // D3
                    bassGain.gain.setValueAtTime(0.06, now);
                    bassGain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 1.5);
                    bass.connect(bassGain);
                    bassGain.connect(this.ctx.destination);
                    bass.start(now);
                    bass.stop(now + item.dur * 1.5);
                }
            } catch (err) {
                console.warn(err);
            }

            this.bgmTimer = setTimeout(playNextStep, item.dur * 1000);
        };

        playNextStep();
    }

    stopBGM() {
        if (this.bgmTimer) {
            clearTimeout(this.bgmTimer);
            this.bgmTimer = null;
        }
    }
}

export const sound = new SoundEngine();
