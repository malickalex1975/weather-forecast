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
  averageA = 255;
  averageColor$$?: BehaviorSubject<string>;
  isSaveButton = false;
  dataUrl = '';
  x = 0;
  y = 0;

  ngOnInit(): void {
    this.averageColor$$ = new BehaviorSubject(
      `rgba(${this.averageR},${this.averageG},${this.averageB},${this.averageA}`
    );

    const controls = document.querySelector('.controls');
    const cameraOptions = document.querySelector(
      '.video-options>select'
    ) as HTMLOptionElement;
    const video = document.querySelector('video');
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    canvas2.addEventListener('mousemove', (e) => {
      let elX = canvas2.getBoundingClientRect().x;
      let elY = canvas2.getBoundingClientRect().y;
      this.x = e.clientX - elX;
      this.y = e.clientY -elY;
      this.drawCanvas(this.x,this.y)
    });
    const screenshotImage = document.querySelector('img');
    const buttons = document.querySelectorAll(
      '.btn'
    ) as unknown as Array<HTMLButtonElement>;
    const saveButton = document.querySelector(
      '.save-button'
    ) as HTMLAnchorElement;
    let streamStarted = false;

    const [play, pause, screenshot] = [...buttons];

    const constraints = {
      video: true,
    };

    const getCameraSelection = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      );
      const options = videoDevices.map((videoDevice) => {
        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
      });
      cameraOptions!.innerHTML = options.join('');
    };

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

      let y = canvas!
        .getContext('2d')
        ?.getImageData(0, 0, video!.videoWidth, video!.videoHeight);

      this.dataArray = Array.from(y!.data);
      this.createAverageColor(this.dataArray);

      let z = new ImageData(
        this.createInverseImage(y!.data),
        video!.videoWidth,
        video!.videoHeight,
        { colorSpace: 'srgb' }
      );

      canvas2.width = video!.videoWidth;
      canvas2.height = video!.videoHeight;

      let ctx2 = canvas2.getContext('2d');
      ctx2?.putImageData(z, 0, 0);
      this.dataUrl = canvas2.toDataURL('image/webp');
      if (this.dataUrl) {
        this.isSaveButton = true;

        saveButton.href = this.dataUrl;
      }
    };

    pause.onclick = pauseStream;
    screenshot.onclick = doScreenshot;

    getCameraSelection();
  }

  createAverageColor(arr: Array<number>) {
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
    this.averageA = Math.round(A.reduce((a, b) => a + b, 0) / quant);
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
  drawCanvas(x:number,y:number) {
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas2.getContext('2d')!;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 1;
    //ctx.lineCap = 'round';
    ctx.lineTo(150, 100);
    ctx.lineTo(0,20)
    ctx.stroke();
  }
  clearCanvas(){
    const canvas2 = document.querySelector('.canvas-2') as HTMLCanvasElement;
    let ctx = canvas2.getContext('2d')!;
    ctx.clearRect(0,0,canvas2.width,canvas2.height)
  }
}
