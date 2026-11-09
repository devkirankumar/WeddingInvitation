/**
 * A tiny Web Audio "music box" waltz used when no audio file is configured.
 * Generated in the browser — no download, no licensing concerns.
 */

const BEAT = 60 / 76; // seconds per beat (3/4 time)
const LOOKAHEAD = 0.35;
const TICK_MS = 90;

// Chords (MIDI numbers) — F, Dm, B♭, C, F, Am, B♭, C
const CHORDS = [
  [53, 57, 60],
  [50, 53, 57],
  [46, 50, 53],
  [48, 52, 55],
  [53, 57, 60],
  [45, 48, 52],
  [46, 50, 53],
  [48, 52, 55],
];

// Melody — one entry per beat, null = hold.
const MELODY: (number | null)[][] = [
  [81, null, 79],
  [77, 74, 77],
  [74, null, 72],
  [72, 76, 79],
  [81, null, 84],
  [81, 76, 72],
  [77, 74, 70],
  [79, 76, 72],
];

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export class WaltzSynth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;
  private intent = 0;

  private ensure() {
    if (this.ctx) return this.ctx;
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0;

    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 3200;

    // Soft echo for a sense of space.
    const delay = ctx.createDelay(1);
    delay.delayTime.value = BEAT * 0.75;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;

    master.connect(tone);
    tone.connect(ctx.destination);
    tone.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(ctx.destination);

    this.ctx = ctx;
    this.master = master;
    return ctx;
  }

  private note(midi: number, time: number, gain: number, decay: number, bell = true) {
    const ctx = this.ctx!;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.exponentialRampToValueAtTime(gain, time + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    env.connect(this.master!);

    const fundamental = ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.value = hz(midi);
    fundamental.connect(env);
    fundamental.start(time);
    fundamental.stop(time + decay + 0.05);

    if (bell) {
      const shimmerGain = ctx.createGain();
      shimmerGain.gain.value = 0.18;
      shimmerGain.connect(env);
      const shimmer = ctx.createOscillator();
      shimmer.type = "sine";
      shimmer.frequency.value = hz(midi) * 3.01;
      shimmer.connect(shimmerGain);
      shimmer.start(time);
      shimmer.stop(time + decay + 0.05);
    }
  }

  private schedule = () => {
    const ctx = this.ctx;
    if (!ctx) return;
    while (this.nextTime < ctx.currentTime + LOOKAHEAD) {
      const bar = Math.floor(this.step / 3) % CHORDS.length;
      const beat = this.step % 3;
      const chord = CHORDS[bar];
      const t = this.nextTime;

      if (beat === 0) {
        this.note(chord[0] - 12, t, 0.22, BEAT * 3.2, false);
      } else {
        this.note(chord[1] + 12, t, 0.06, BEAT * 1.4, false);
        this.note(chord[2] + 12, t, 0.05, BEAT * 1.4, false);
      }

      const m = MELODY[bar][beat];
      if (m !== null) this.note(m, t, 0.12, BEAT * 2.6);

      this.nextTime += BEAT;
      this.step += 1;
    }
  };

  async play() {
    this.intent += 1;
    const ctx = this.ensure();
    await ctx.resume();
    if (this.timer === null) {
      this.nextTime = ctx.currentTime + 0.1;
      this.timer = window.setInterval(this.schedule, TICK_MS);
    }
    const g = this.master!.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setValueAtTime(g.value, ctx.currentTime);
    g.linearRampToValueAtTime(0.55, ctx.currentTime + 2.5);
  }

  async pause() {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    const token = ++this.intent;
    const g = this.master.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setValueAtTime(g.value, ctx.currentTime);
    g.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    await new Promise((r) => setTimeout(r, 550));
    if (token !== this.intent) return; // play() was called meanwhile
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    await ctx.suspend();
  }

  dispose() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    void this.ctx?.close();
    this.ctx = null;
  }
}
