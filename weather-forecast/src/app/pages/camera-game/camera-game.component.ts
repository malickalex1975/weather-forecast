import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-camera-game',
  templateUrl: './camera-game.component.html',
  styleUrls: ['./camera-game.component.scss'],
})
export class CameraGameComponent implements OnInit {
  pointTitleColor = '#eee';
  averageTitleColor = '#eee';
  inputColor: string = '';
  inputDelta: number = 10;
  isBigCanvas = false;
  dataArray: number[] = [];
  isResetHidden=true;
  averageR = 0;
  averageG = 0;
  averageB = 0;
  averageA = 1;
  colR = 0;
  colB = 0;
  colG = 0;
  filterR = 0;
  filterG = 0;
  filterB = 0;
  pointR: number | '-' = '-';
  pointG: number | '-' = '-';
  pointB: number | '-' = '-';
  pointA: number | '-' = '-';
  averageColor$$?: BehaviorSubject<string>;
  pointColor = 'rgba(0,0,0,1)';
  isSaveButton = false;
  dataUrl = '';
  x: number | '-' = '-';
  y: number | '-' = '-';
  isMouseDown = false;
  canvasWidth = 640;
  canvasHeight = 480;
  theme$$ = this.themeService.getTheme();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.averageColor$$ = new BehaviorSubject(`rgba(0,0,0,1)`);

    const controls = document.querySelector('.controls');
    const cameraOptions = document.querySelector(
      '.video-options>select'
    ) as HTMLOptionElement;
    const video = document.querySelector('video');
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    this.toggleFullscreen(canvas);
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    document.addEventListener('mousedown', () => (this.isMouseDown = true));
    document.addEventListener('mouseup', () => (this.isMouseDown = false));
    canvas2.addEventListener('mouseleave', () => {
      this.x = '-';
      this.y = '-';
      this.pointR = '-';
      this.pointG = '-';
      this.pointB = '-';
      this.pointA = '-';
      this.pointColor = 'rgba(0,0,0,1)';
      this.pointTitleColor = '#eee';
    });
    canvas2.addEventListener('mousemove', (e) => {
      console.log(this.canvasWidth, this.canvasHeight);
      this.isSaveButton = true;
      let elX = canvas2.getBoundingClientRect().x;
      let elY = canvas2.getBoundingClientRect().y;
      this.x = Math.floor(e.clientX - elX);
      this.y = Math.floor(e.clientY - elY);
      if (this.isMouseDown) {
        this.drawCanvas(this.x, this.y);
      } else if (!this.isMouseDown) {
        this.definePoint(this.x, this.y);
      }
    });
    const screenshotImage = document.querySelector('img');
    const buttons = document.querySelectorAll(
      '.btn'
    ) as unknown as Array<HTMLButtonElement>;
    let streamStarted = false;
    const [play, pause, screenshot] = [...buttons];
    const constraints = {
      video: true,
    };

    async function getCameraSelection() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      const options = videoDevices.map((videoDevice) => {
        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
      });
      cameraOptions!.innerHTML = options.join('');
    }

    play.onclick = async () => {
      if (streamStarted) {
        video!.play();
        return;
      }
      if ('mediaDevices' in navigator) {
        const updatedConstraints = {
          ...constraints,
          deviceId: {
            exact: cameraOptions.value,
          },
        };
        startStream(updatedConstraints);
      }
    };

    const startStream = async (constraints: any) => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleStream(stream);
    };

    const handleStream = (stream: MediaStream) => {
      video!.srcObject = stream;
      streamStarted = true;
      this.isSaveButton = false;
    };

    cameraOptions.onchange = () => {
      const updatedConstraints = {
        ...constraints,
        deviceId: {
          exact: cameraOptions.value,
        },
      };
      startStream(updatedConstraints);
    };

    const pauseStream = () => {
      video!.pause();
    };

    const doScreenshot = () => {
      canvas!.width = video!.videoWidth;
      canvas!.height = video!.videoHeight;
      this.canvasWidth = video!.videoWidth;
      this.canvasHeight = video!.videoHeight;
      canvas!.getContext('2d')!.drawImage(video!, 0, 0);
      screenshotImage!.src = canvas!.toDataURL('image/webp');

      let ctx = canvas!.getContext('2d');
      let y = ctx?.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
      this.createAverageColor(y!);

      let z = new ImageData(
        this.applyFilter(y!.data),
        this.canvasWidth,
        this.canvasHeight,
        { colorSpace: 'srgb' }
      );
      canvas2!.width = this.canvasWidth;
      canvas2!.height = this.canvasHeight;
      let ctx2 = canvas2.getContext('2d');
      ctx2?.putImageData(z, 0, 0);
    };

    pause.onclick = pauseStream;
    screenshot.onclick = doScreenshot;

    getCameraSelection();
  }

  createAverageColor(img: ImageData) {
    let arr = Array.from(img.data);
    let len = arr.length;
    let quant = len / 4;
    let R = [];
    let G = [];
    let B = [];
    let A = [];
    for (let i = 0; i < quant; i++) {
      R.push(arr[i * 4 + 0]);
      G.push(arr[i * 4 + 1]);
      B.push(arr[i * 4 + 2]);
      A.push(arr[i * 4 + 3]);
    }
    this.averageR = Math.round(R.reduce((a, b) => a + b, 0) / quant);
    this.averageG = Math.round(G.reduce((a, b) => a + b, 0) / quant);
    this.averageB = Math.round(B.reduce((a, b) => a + b, 0) / quant);
    this.averageA = Number(
      (Math.round(A.reduce((a, b) => a + b, 0) / quant) / 255).toFixed(2)
    );
    this.averageColor$$?.next(
      `rgba(${this.averageR},${this.averageG},${this.averageB},${this.averageA}`
    );
    let avr = (this.averageB + this.averageG + this.averageR) / 3;
    this.averageTitleColor = avr > 150 ? '#000' : '#eee';
    if (this.averageA === 0) {
      this.pointTitleColor = '#f00';
    }
  }
  createMonoImage(arr: Uint8ClampedArray): Uint8ClampedArray {
    let len = arr.length;
    let quant = len / 4;
    let out = new Uint8ClampedArray(len);
    for (let i = 0; i < quant; i++) {
      let r = arr[4 * i + 0];
      let g = arr[4 * i + 1];
      let b = arr[4 * i + 2];
      let avr = Math.round((r + g + b) / 3);
      out[4 * i + 0] = avr;
      out[4 * i + 1] = avr;
      out[4 * i + 2] = avr;
      out[4 * i + 3] = arr[4 * i + 3];
    }
    return out;
  }
  createInverseImage(arr: Uint8ClampedArray): Uint8ClampedArray {
    let len = arr.length;
    let quant = len / 4;
    let out = new Uint8ClampedArray(len);
    for (let i = 0; i < quant; i++) {
      let r = arr[4 * i + 0];
      let g = arr[4 * i + 1];
      let b = arr[4 * i + 2];

      out[4 * i + 0] = Math.abs(arr[4 * i + 0] - 255);
      out[4 * i + 1] = Math.abs(arr[4 * i + 1] - 255);
      out[4 * i + 2] = Math.abs(arr[4 * i + 2] - 255);
      out[4 * i + 3] = arr[4 * i + 3];
    }
    return out;
  }
  applyFilter(arr: Uint8ClampedArray): Uint8ClampedArray {
    if (
      (this.colB === 0 && this.colG === 0 && this.colR === 0) ||
      (this.colB === 255 && this.colG === 255 && this.colR === 255)
    ) {
      return arr;
    }
    let len = arr.length;
    let out = new Uint8ClampedArray(len);
    for (let i = 0; i < len; i = i + 4) {
      let r = arr[i + 0];
      let g = arr[i + 1];
      let b = arr[i + 2];
      if (
        r >= this.colR - this.inputDelta &&
        r <= this.colR + this.inputDelta &&
        g >= this.colG - this.inputDelta &&
        g <= this.colG + this.inputDelta &&
        b >= this.colB - this.inputDelta &&
        b <= this.colB + this.inputDelta
      ) {
        out[i + 0] = r;
        out[i + 1] = g;
        out[i + 2] = b;
      } else {
        out[i + 0] = 0;
        out[i + 1] = 0;
        out[i + 2] = 0;
      }

      out[i + 3] = arr[i + 3];
    }
    return out;
  }
  applyMultyFilter(arr: Uint8ClampedArray): Uint8ClampedArray {
    if (this.filterB === 0 && this.filterG === 0 && this.filterR === 0) {
      return arr;
    }
    let len = arr.length;
    let out = new Uint8ClampedArray(len);
    for (let i = 0; i < len; i = i + 4) {
      let r = arr[i + 0];
      let g = arr[i + 1];
      let b = arr[i + 2];

      out[i + 0] = r + this.filterR;
      out[i + 1] = g + this.filterG;
      out[i + 2] = b + this.filterB;

      out[i + 3] = arr[i + 3];
    }
    return out;
  }

  drawCanvas(x: number, y: number) {
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas2.getContext('2d', { willReadFrequently: true })!;
    if (!this.isMouseDown) {
      ctx.beginPath();
      return;
    }

    ctx.strokeStyle = 'red';

    ctx.lineTo(x, y);

    ctx.stroke();

    let img = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    setTimeout(() => this.createAverageColor(img), 0);
  }
  clearCanvas() {
    this.isSaveButton = false;
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas2.getContext('2d', { willReadFrequently: true })!;
    ctx.beginPath();
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawCanvas(0, 0);
  }
  getHref() {
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    const saveButton = document.querySelector(
      '.save-button'
    ) as HTMLAnchorElement;
    this.dataUrl = canvas2.toDataURL('image/webp');
    if (this.dataUrl) {
      this.isSaveButton = true;
      saveButton.href = this.dataUrl;
    }
  }
  definePoint(x: number, y: number) {
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas2.getContext('2d', { willReadFrequently: true })!;
    ctx.beginPath();
    let img = ctx.getImageData(x, y, 1, 1);
    this.pointR = img.data[0];
    this.pointG = img.data[1];
    this.pointB = img.data[2];
    this.pointA = Math.round(img.data[3] / 255);
    this.pointColor = `rgba(${this.pointR},${this.pointG},${this.pointB},${this.pointA})`;
    let avr = (this.pointR + this.pointB + this.pointG) / 3;
    this.pointTitleColor = avr > 150 ? '#000' : '#eee';
    if (this.pointA === 0) {
      this.pointTitleColor = '#f00';
    }
  }

  toggleFullscreen(el: HTMLElement) {
    el.addEventListener('dblclick', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen().catch((err) => console.log(err));
      }
    });
  }
  convertToRGB(color: string) {
    this.colR = parseInt(color.slice(1, 3), 16);
    this.colG = parseInt(color.slice(3, 5), 16);
    this.colB = parseInt(color.slice(5), 16);
  }
  useFilter(f: Function) {
    let func: Function = function () {};
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas!.getContext('2d');
    let y = ctx?.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

    let z = new ImageData(
      f.call(this, y!.data),
      this.canvasWidth,
      this.canvasHeight,
      { colorSpace: 'srgb' }
    );
    canvas2!.width = this.canvasWidth;
    canvas2!.height = this.canvasHeight;
    let ctx2 = canvas2.getContext('2d');
    ctx2?.putImageData(z, 0, 0);
    let w = ctx2?.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    this.createAverageColor(w!);
  }

  resetAll = () => {
    this.colR = 0;
    this.colB = 0;
    this.colG = 0;
    this.filterR = 0;
    this.filterG = 0;
    this.filterB = 0;
    this.inputDelta = 10;
    this.inputColor = '';
    this.useFilter(this.applyFilter);
    this.isResetHidden=true;
  };
  checkFilters() {
    return (
      this.colR === 0 &&
      this.colB === 0 &&
      this.colG === 0 &&
      this.filterR === 0 &&
      this.filterG === 0 &&
      this.filterB === 0 &&
      this.inputDelta === 10 &&
      this.inputColor === ''
    );
  }
}
