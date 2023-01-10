import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-camera-game',
  templateUrl: './camera-game.component.html',
  styleUrls: ['./camera-game.component.scss'],
})
export class CameraGameComponent implements OnInit {
  isBigCanvas = false;
  dataArray: number[] = [];
  averageR = 0;
  averageG = 0;
  averageB = 0;
  averageA = 1;
  pointR: number | '-' = '-';
  pointG: number | '-' = '-';
  pointB : number | '-' = '-';
  pointA: number | '-' = '-';
  averageColor$$?: BehaviorSubject<string>;
  pointColor = 'rgba(0,0,0,1)';
  isSaveButton = false;
  dataUrl = '';
  x: number | '-' = '-';
  y: number | '-' = '-';
  isMouseDown = false;

  ngOnInit(): void {
    this.averageColor$$ = new BehaviorSubject(`rgba(0,0,0,1)`);

    const controls = document.querySelector('.controls');
    const cameraOptions = document.querySelector(
      '.video-options>select'
    ) as HTMLOptionElement;
    const video = document.querySelector('video');
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    canvas2.width = 300;
    canvas2.height = 300;
    document.addEventListener('mousedown', () => (this.isMouseDown = true));
    document.addEventListener('mouseup', () => (this.isMouseDown = false));
    canvas2.addEventListener('mouseleave', () => {
      this.x = '-';
      this.y = '-';
      this.pointR='-';
      this.pointG='-';
      this.pointB='-';
      this.pointA='-';
    });
    canvas2.addEventListener('mousemove', (e) => {
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
      canvas!.getContext('2d')!.drawImage(video!, 0, 0);
      screenshotImage!.src = canvas!.toDataURL('image/webp');

      let ctx = canvas!.getContext('2d');
      let y = ctx?.getImageData(0, 0, video!.videoWidth, video!.videoHeight);

      

      let z = new ImageData(
        this.createMonoImage(y!.data),
        video!.videoWidth,
        video!.videoHeight,
        { colorSpace: 'srgb' }
      );

      // canvas2.width = video!.videoWidth;
      //canvas2.height = video!.videoHeight;

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
  drawCanvas(x: number, y: number) {
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas2.getContext('2d')!;
    if (!this.isMouseDown) {
      ctx.beginPath();
      return;
    }

    ctx.strokeStyle = 'red';

    ctx.lineTo(x, y);

    ctx.stroke();
    let img = ctx.getImageData(0, 0, 300, 300);
    setTimeout(() => this.createAverageColor(img), 0);

    
  }
  clearCanvas() {
    this.isSaveButton = false;
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    canvas2.width = 300;
    canvas2.height = 300;
    let ctx = canvas2.getContext('2d')!;
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas2.width, canvas2.height);
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
    let ctx = canvas2.getContext('2d')!;
    ctx.beginPath()
    let img = ctx.getImageData(x, y, 1, 1);
    this.pointR = img.data[0];
    this.pointG = img.data[1];
    this.pointB = img.data[2];
    this.pointA = Math.round(img.data[3]/255);
    this.pointColor = `rgba(${this.pointR},${this.pointG},${this.pointB},${this.pointA})`;
  }
}
