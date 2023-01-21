export class MyClass {
  constructor() {
    this.checkFD;
  }

  checkFD() {
    if ("FaceDetector" in window) {
      alert("FaceDetector is supported");
      return true;
    } else {
      alert("FaceDetector is not supported");
      return false;
    }
  }
  detect(theImage) {
    try {
      let faceDetector = new FaceDetector({
        fastMode: false,
        maxDetectedFaces: 10,
      });

      let detectedFaces =  faceDetector.detect(theImage);
      return   detectedFaces
      
    } catch (err) {
      console.error("Face Detection failed, boo.", err);
    }
  }
}
