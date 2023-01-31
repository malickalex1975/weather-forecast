import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
const { MyClass } = require('src/app/my-class.js');

@Component({
  selector: 'app-camera-game',
  templateUrl: './camera-game.component.html',
  styleUrls: ['./camera-game.component.scss'],
})
export class CameraGameComponent implements OnInit {
  maxError1=0;
  maxError2=0;
  timerStart=0;
  timerStop=0;
  scanX = 0;
  scanY = 0;
  scanElement?: HTMLDivElement;
  matching = 0;
  sameArr: any[] = [];
  contrastLevel = 122;
  contrastDelta = 0;
  pointTitleColor = '#eee';
  averageTitleColor = '#eee';
  inputColor: string = '';
  inputDelta: number = 10;
  isBigCanvas = false;
  dataArray: number[] = [];
  isResetHidden = true;
  accuracy = 100;
  errorsQuantity = 10;
  timeStart = 0;
  timeStop = 0;
  averageR = 0;
  averageG = 0;
  averageB = 0;
  averageA = 1;
  monoAverage = 0;
  colR = 0;
  colB = 0;
  colG = 0;
  filterR = 0;
  filterG = 0;
  filterB = 0;
  progress = new BehaviorSubject(0);
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
  isContrast = false;
  canvasWidth = 640;
  canvasHeight = 480;
  theme$$ = this.themeService.getTheme();
  myclass = new MyClass();
  userRectX = 0;
  userRectY = 0;
  userRectWidth = 50;
  userRectHeight = 50;
  deltaPointX = 0;
  deltaPointY = 0;
  deltaWidth = 0;
  deltaHeight = 0;
  ctx2: CanvasRenderingContext2D | null = null;
  ctx3: CanvasRenderingContext2D | null = null;
  doScreenshot: any = () => {};
  z?: ImageData;
  w?: ImageData;
  copy?: ImageData;
  contrastImage?: ImageData;
  isStopFind = false;
  frameWidth = 3;
  isLoading = false;
  streamStarted = false;

  constructor(private themeService: ThemeService) {}

 

  ngOnInit(): void {
    const wrapper= document.querySelector(".display-cover")
    this.averageColor$$ = new BehaviorSubject(`rgba(0,0,0,1)`);
    const controls = document.querySelector('.controls');
    const cameraOptions = document.querySelector(
      '.video-options>select'
    ) as HTMLOptionElement;
    const video = document.querySelector('video');
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    this.toggleFullscreen(canvas);
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    canvas2.width = 640;
    canvas2.height = 480;
    this.scanX = canvas2.getBoundingClientRect().x;
    this.scanY = canvas2.getBoundingClientRect().y;
    this.scanElement = document.createElement('div');
    this.scanElement.className ='scan-element'
    wrapper!.appendChild(this.scanElement)
    this.ctx2 = canvas2.getContext('2d', { willReadFrequently: true });
    const canvas3 = document.querySelector('.canvas-3') as HTMLCanvasElement;
    canvas3.width = this.userRectWidth - 2 * this.frameWidth;
    canvas3.height = this.userRectHeight - 2 * this.frameWidth;
    this.ctx3 = canvas3.getContext('2d', { willReadFrequently: true });
    canvas2.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      let elX = canvas2.getBoundingClientRect().x;
      let elY = canvas2.getBoundingClientRect().y;
      let x = Math.floor(e.clientX - elX);
      let y = Math.floor(e.clientY - elY);
      this.userRectX = x - this.userRectWidth / 2;
      this.userRectY = y - this.userRectHeight / 2;
      if (this.z) {
        this.drawUserRect(
          this.userRectX,
          this.userRectY,
          this.userRectWidth,
          this.userRectHeight
        );
      }
      this.deltaPointX = x - this.userRectX;
      this.deltaPointY = y - this.userRectY;
    });
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
      if (this.checkUserPointInRect(this.x, this.y)) {
        canvas2.setAttribute('style', 'cursor:grab');
      } else {
        canvas2.setAttribute('style', 'cursor:auto');
      }
    });
    canvas2.addEventListener('mousemove', (e) => {
      this.isSaveButton = true;
      let elX = canvas2.getBoundingClientRect().x;
      let elY = canvas2.getBoundingClientRect().y;
      this.x = Math.floor(e.clientX - elX);
      this.y = Math.floor(e.clientY - elY);

      if (this.isMouseDown) {
        if (this.checkUserPointInRect(this.x, this.y)) {
          this.userRectX = this.x - this.deltaPointX;
          this.userRectY = this.y - this.deltaPointY;
          this.drawUserRect(
            this.userRectX,
            this.userRectY,
            this.userRectWidth,
            this.userRectHeight
          );
        } else {
          this.drawCanvas(this.x, this.y);
        }
      } else if (!this.isMouseDown) {
        this.definePoint(this.x, this.y);
      }
    });
    const buttons = document.querySelectorAll(
      '.btn'
    ) as unknown as Array<HTMLButtonElement>;
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
      if (this.streamStarted) {
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
      this.streamStarted = true;
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

    this.doScreenshot = () => {
      this.clearCanvas();
      if (this.streamStarted) {
        canvas!.width = video!.videoWidth;
        canvas!.height = video!.videoHeight;
        this.canvasWidth = video!.videoWidth;
        this.canvasHeight = video!.videoHeight;
        canvas!.getContext('2d')!.drawImage(video!, 0, 0);

        let ctx = canvas!.getContext('2d');
        let y = ctx?.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
        this.createAverageColor(y!);

        this.z = new ImageData(
          this.applyFilter(y!.data),
          this.canvasWidth,
          this.canvasHeight,
          { colorSpace: 'srgb' }
        );
        canvas2!.width = this.canvasWidth;
        canvas2!.height = this.canvasHeight;
        this.ctx2?.putImageData(this.z, 0, 0);
        this.drawUserRect(
          this.userRectX,
          this.userRectY,
          this.userRectWidth,
          this.userRectHeight
        );
      }
    };
    pause.onclick = pauseStream;
    screenshot.onclick = this.doScreenshot;

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
    let acc = 0;
    let len = arr.length;
    let quant = len / 4;
    let out = new Uint8ClampedArray(len);
    for (let i = 0; i < quant; i++) {
      let r = arr[4 * i + 0];
      let g = arr[4 * i + 1];
      let b = arr[4 * i + 2];
      let avr = Math.round((r + g + b) / 3);
      acc += avr;
      out[4 * i + 0] = avr;
      out[4 * i + 1] = avr;
      out[4 * i + 2] = avr;
      out[4 * i + 3] = arr[4 * i + 3];
    }
    this.monoAverage = Math.round(acc / len);
    return out;
  }
  createContrastImage(arr: Uint8ClampedArray): Uint8ClampedArray {
    let len = arr.length;
    let out = new Uint8ClampedArray(len);
    for (let i = 0; i < len; i += 4) {
      let r = arr[i + 0];
      let g = arr[i + 1];
      let b = arr[i + 2];
      out[i + 0] =
        r < this.contrastLevel
          ? 0 + this.contrastDelta
          : 255 - this.contrastDelta;
      out[i + 1] =
        g < this.contrastLevel
          ? 0 + this.contrastDelta
          : 255 - this.contrastDelta;
      out[i + 2] =
        b < this.contrastLevel
          ? 0 + this.contrastDelta
          : 255 - this.contrastDelta;
      out[i + 3] = arr[i + 3];
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
    if (this.colB === 0 && this.colG === 0 && this.colR === 0) {
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
    if (!this.isMouseDown) {
      this.ctx2?.beginPath();
      return;
    }

    this.ctx2!.strokeStyle = 'red';

    this.ctx2!.lineTo(x, y);

    this.ctx2!.stroke();

    let img = this.ctx2!.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    setTimeout(() => this.createAverageColor(img), 0);
  }
  clearCanvas() {
    this.isSaveButton = false;
    this.ctx2!.beginPath();
    this.ctx2!.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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
    this.ctx2!.beginPath();
    let img = this.ctx2!.getImageData(x, y, 1, 1);
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
    this.ctx2!.putImageData(z, 0, 0);
    this.createAverageColor(z);
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
    this.accuracy = 100;
    this.errorsQuantity = 10;
    this.useFilter(this.applyFilter);
    this.isResetHidden = true;
    this.drawUserRect(
      this.userRectX,
      this.userRectY,
      this.userRectWidth,
      this.userRectHeight
    );
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
  detectFace() {
    const canvas2 = document.querySelector('.canvas-2');
    if (canvas2) {
      if (this.myclass.checkFD()) {
        this.myclass
          .detect(canvas2)
          .then((detectedFaces: any) => this.drawRects(detectedFaces));
      }
    } else console.log('no image to detect');
  }
  drawRects(detectedFaces: Array<any>) {
    for (const face of detectedFaces) {
      const x = face.boundingBox.x;
      const y = face.boundingBox.y;
      const width = face.boundingBox.width;
      const height = face.boundingBox.height;
      this.ctx2!.beginPath();
      this.ctx2!.strokeStyle = '#0ff';
      this.ctx2!.strokeRect(x, y, width, height);
    }
  }
  drawUserRect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string = 'red',
    isSave: boolean = false,
    num: number = 0
  ) {
    let img: ImageData;
    if (this.isContrast) {
      img = this.contrastImage!;
    } else {
      img = this.z!;
    }
    if (!isSave) {
      this.ctx2?.putImageData(img!, 0, 0);
      this.matching = 0;
    }
    this.ctx2!.lineWidth = this.frameWidth;
    this.ctx2!.strokeStyle = color;
    this.ctx2!.strokeRect(x, y, w, h);

    if (num !== 0) {
      this.ctx2!.font = `${this.userRectWidth * 0.66}px serif `;
      this.ctx2!.fillStyle = 'red';
      this.ctx2?.fillText(
        num.toString(),
        x + this.userRectWidth / 10,
        y + this.userRectWidth * 0.6
      );
    }
    this.copyUserRect();
  }

  checkUserPointInRect(x: number | '-', y: number | '-'): boolean {
    if (x === '-' || y === '-') {
      return false;
    }
    return (
      x >= this.userRectX &&
      y >= this.userRectY &&
      x <= this.userRectX + this.userRectWidth &&
      y <= this.userRectY + this.userRectHeight
    );
  }

  copyUserRect() {
    const canvas3 = document.querySelector('.canvas-3') as HTMLCanvasElement;
    canvas3.width = this.userRectWidth - 2 * this.frameWidth;
    canvas3.height = this.userRectHeight - 2 * this.frameWidth;
    this.copy = this.ctx2?.getImageData(
      this.userRectX + this.frameWidth,
      this.userRectY + this.frameWidth,
      this.userRectWidth - 2 * this.frameWidth,
      this.userRectHeight - 2 * this.frameWidth
    );
    this.ctx3?.putImageData(this.copy!, 0, 0);
  }
  find() {
    this.timeStart = Date.now();
    let findFragment = new Promise((resolve, reject) => {
      for (let y = 0; y < this.canvasHeight; y++) {
        for (let x = 0; x < this.canvasWidth; x++) {
          let fragment = this.ctx2?.getImageData(
            x - this.frameWidth,
            y - this.frameWidth,
            this.userRectWidth - 2 * this.frameWidth,
            this.userRectHeight - 2 * this.frameWidth
          );

          if (fragment && this.compareFragment(fragment)) {
            return resolve({ x: x, y: y });
          }
        }
      }
      return reject('not found');
    });

    findFragment
      .then((data: any) => {
        this.drawUserRect(
          data.x - 2 * this.frameWidth,
          data.y - 2 * this.frameWidth,
          this.userRectWidth,
          this.userRectHeight,
          'green'
        );
        this.timeStop = Date.now();
        console.log(
          ((this.timeStop - this.timeStart) / 1000).toFixed(2),
          'sec.'
        );
      })
      .catch((e) => console.log('something wrong in promise', e));
  }
  compareFragment(fragment: ImageData) {
    let len = fragment.data.length;
    for (let i = 0; i < len; i++) {
      if (fragment.data[i] !== this.copy!.data[i]) {
        return false;
      }
    }
    return true;
  }
  compareTheSame(fragment: ImageData) {
    let len = fragment.data.length;
    let error1 = 0;
    let error2 = 0;
    for (let i = 0; i < len; i++) {
      error1 += Math.abs(fragment.data[i] - this.copy!.data[i]);
      if (fragment.data[i] !== this.copy!.data[i]) {
        error2++;
      }
      if (error1 > this.maxError1 || error2 > this.maxError2) {
        return false;
      }
    }

    return true;
  }

  findTheSame(y = 0) {
    let success=false;
    if (y === 0) {
      this.maxError1 =
      4 *
      (this.userRectHeight - this.frameWidth * 2) *
      (this.userRectWidth - this.frameWidth * 2) *
      this.errorsQuantity;
    this.maxError2 =
      4 *
      (this.userRectHeight - this.frameWidth * 2) *
      (this.userRectWidth - this.frameWidth * 2) *
      (1 - this.accuracy / 100);
this.timeStart=Date.now()
      this.isLoading = true;
      if (this.isContrast) {
        this.w = this.contrastImage!;
      } else {
        this.w = this.z!;
      }
      if (this.w) {
        this.sameArr.push({ x: this.userRectX, y: this.userRectY });
      }
    }
    for (let x = 0; x < this.canvasWidth; x++) {
      let fragment = this.ctx2?.getImageData(
        x + this.frameWidth,
        y + this.frameWidth,
        this.userRectWidth - 2 * this.frameWidth,
        this.userRectHeight - 2 * this.frameWidth
      );

      if (this.compareTheSame(fragment!)) {
        if (
          !this.sameArr.some(
            (i) =>
              Math.abs(x - i.x) < this.userRectWidth &&
              Math.abs(y - i.y) < this.userRectHeight
          )
        ) {
          success=true
          this.matching++;
          this.drawUserRect(
            x,
            y,
            this.userRectWidth,
            this.userRectHeight,
            'green',
            true,
            this.matching
          );
          this.sameArr.push({ x: x, y: y });
        }
      }
    }
   
    if (y < this.canvasHeight) {
      y++;
      this.drawScanLine(y,success);
      setTimeout(() => this.findTheSame(y), 0);
    } else {
      this.timeStop=Date.now()
      console.log(((this.timeStop-this.timeStart)/1000).toFixed(1),"sec.")
      this.isLoading = false;
      setTimeout(()=>{
      if (this.matching === 0) {
        alert('Nothing found');
      } else alert(`${this.matching} matches found`);
    },1000)
    }
  }

  loadFile() {
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    let file = fileInput?.files?.[0];
    let img = new Image(640,480);
    if (file) {
      img.src = URL.createObjectURL(file);
    }
    img.onload = () => {
      this.clearCanvas();
      this.ctx2?.drawImage(img, 0, 0,img.width,img.height);
      this.z = this.ctx2?.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      this.resetAll();
    };
  }

  decreaseFragment() {
    if (this.userRectWidth > 20) {
      this.userRectWidth--;
    }
    if (this.userRectHeight > 20) {
      this.userRectHeight--;
    }
    this.drawUserRect(
      this.userRectX,
      this.userRectY,
      this.userRectWidth,
      this.userRectHeight
    );
  }

  increaseFragment() {
    if (this.userRectWidth < 100) {
      this.userRectWidth++;
    }
    if (this.userRectHeight < 100) {
      this.userRectHeight++;
    }
    this.drawUserRect(
      this.userRectX,
      this.userRectY,
      this.userRectWidth,
      this.userRectHeight
    );
  }
  applyContrast() {
    if (this.isContrast) {
      let data = this.z?.data;
      if (data) {
        let newData = this.createContrastImage(this.createMonoImage(data!));
        this.contrastImage = new ImageData(
          newData,
          this.canvasWidth,
          this.canvasHeight,
          {
            colorSpace: 'srgb',
          }
        );

        this.ctx2?.putImageData(this.contrastImage, 0, 0);
        this.drawUserRect(
          this.userRectX,
          this.userRectY,
          this.userRectWidth,
          this.userRectHeight
        );
      }
    } else {
      this.ctx2?.putImageData(this.z!, 0, 0);
      this.drawUserRect(
        this.userRectX,
        this.userRectY,
        this.userRectWidth,
        this.userRectHeight
      );
    }
  }
  drawScanLine(y: number,success:boolean=false) {
    let color=success?"green":"yellow"
    if(y===this.canvasHeight){
      this.scanElement?.setAttribute('style',`width:${
        this.canvasWidth
      }px;height:3px;background-color:green;position:fixed;top:${
        this.scanY
      }px;left:${this.scanX}px;transform:translateY(0px);transition:2s;`)
    }else{
    this.scanElement?.setAttribute('style',`width:${
      this.canvasWidth
    }px;height:3px;background-color:${color};position:fixed;top:${
      this.scanY
    }px;left:${this.scanX}px;transform:translateY(${y}px)`)
  }
}
}
