
export class MyClass {
  message = "hello bro";

  logMessage() {
    console.log(this.message);
  }
}
let mc= new MyClass()
mc.logMessage()

if('BarcodeDetector' in window){
  let bd= new BarcodeDetector();

}else{
  alert("BarcodeDetector is not supported")
}
