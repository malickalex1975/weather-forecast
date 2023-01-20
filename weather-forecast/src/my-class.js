export class MyClass {
    message = "hello bro";
  
    logMessage() {
      console.log(this.message);
    }
  }
  
  
  if('BarcodeDetector' in window){
    let bd= new BarcodeDetector();
  
  }else{
    alert("BarcodeDetector is not supported")
  }
  