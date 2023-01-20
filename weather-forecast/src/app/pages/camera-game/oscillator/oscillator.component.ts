import { Component, OnChanges, OnInit } from '@angular/core';
import { OscillatorService } from 'src/app/core/services/oscillator.service';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss'],
})
export class OscillatorComponent implements OnInit {
  color: string = '';
  file:any;
  range=0;
  width = 0;
  x = 0;
  y = 0;
  thumbLeft = 0;
  freq = 0;
  type: OscillatorType = 'sine';
  scale!: HTMLDivElement | null;
  thumb!: HTMLDivElement | null;
  isStopped = false;
  constructor(private oscillatorService: OscillatorService) {}
  ngOnInit(): void {
    this.scale = document.querySelector('.scale');
    this.thumb = document.querySelector('.thumb');
    this.thumb?.addEventListener('mousemove', (e) => {
      let elX = this.scale!.getBoundingClientRect().x;
      let elY = this.scale!.getBoundingClientRect().y;
      this.width = Math.floor(this.scale!.getBoundingClientRect().width);
      this.x = Math.floor(e.clientX - elX);
      this.y = Math.floor(e.clientY - elY);
    });
    this.thumb?.addEventListener('mousemove', () => {
      this.thumbLeft =
        this.x < 25
          ? 0
          : this.x < this.width - 25
          ? this.x - 25
          : this.width - 53;
      this.changeFreq();
    });
    document.addEventListener('keydown', (e) => {
      let code = e.code;
      this.width = Math.floor(this.scale!.getBoundingClientRect().width);
      if (code === 'ArrowLeft' || code === 'ArrowRight') {
        e.preventDefault();
      }
      if (code === 'ArrowLeft') {
        if (this.thumbLeft >= 1) {
          this.thumbLeft -= 1;
          this.changeFreq();
        }
      }
      if (code === 'ArrowRight') {
        if (this.thumbLeft <= this.width - 53) {
          this.thumbLeft += 1;
          this.changeFreq();
        }
      }
    });
  }
  changeFreq() {
    this.thumb?.setAttribute('style', `left:${this.thumbLeft}px`);
    this.freq = Math.round((20000 * this.thumbLeft) / (this.width - 53));
    this.oscillatorService.changeFreq(this.freq);
  }

  changeType() {
    this.oscillatorService.changeType(this.type);
  }
  stop() {
    this.oscillatorService.stop();
  }
  play() {
    this.oscillatorService.play();
  }

  logColor() {
    let color=this.convertToRGB(this.color)
    console.log(color.R, color.G, color.B);
  }
logRange(){
  //console.log(this.range)
}
logFile(){
  let input= document.querySelector(".input-file") as HTMLInputElement
  let file= input?.files?.[0]
  let reader= new FileReader()
  reader.readAsArrayBuffer(file!)
  reader.onprogress=(ev)=>console.log(ev)
  
}

  convertToRGB(color: string) {
    let colR = parseInt(color.slice(1, 3), 16);
    let colG = parseInt(color.slice(3, 5), 16);
    let colB = parseInt(color.slice(5), 16);
    return { R: colR, G: colG, B: colB };
  }
}
