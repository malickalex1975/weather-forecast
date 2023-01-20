import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OscillatorService {
  audioCtx?:AudioContext;
  oscillator?:OscillatorNode;
  freq = 0;
  type: OscillatorType = 'sine';

  constructor() {
    this.createOscillator()
  }

  changeType(type: OscillatorType) {
    this.type = type;
    this.oscillator!.type = this.type;
  }
  changeFreq(freq: number) {
    this.freq = freq;
    this.oscillator!.frequency.setValueAtTime(
      this.freq,
      this.audioCtx!.currentTime
    );
  }
  getFreq() {
    return this.freq;
  }
  getType() {
    return this.type;
  }
  stop() {
    this.oscillator!.stop();
    this.oscillator!.disconnect()
  }
  createOscillator(){
    this.audioCtx = new window.AudioContext();
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = this.type;
    this.oscillator.frequency.setValueAtTime(
      this.freq,
      this.audioCtx.currentTime
    );
    this.oscillator.connect(this.audioCtx.destination);
    this.oscillator.start();
  }
  play(){
    this.createOscillator()
  }
}
