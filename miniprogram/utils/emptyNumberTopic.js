import { randomMathTopic,symbolArray } from "./mathTopic";
export const emptyTopic = (level)=>{
    const res = randomMathTopic(level+1);
    // 开始挖坑
    debugger;
    console.log(res);
    const topic = {
        num1:{
            number: res.num1,
            strArray:String(res.num1).split("")
        },
        num2:{
            number: res.num2,
            strArray:String(res.num2).split("")
        }
    }
  
    switch(level){
      case 1:
      // 1则挖两个坑  
      // 
      break;
      case 2:
       // 2则挖3个坑    
      break;
      case 3:
      // 3级则挖4个坑  
      break;
      default:break
    }
    return res
  
  }

  function empty2(topic){
    const random = Math.random()>0.5;
    if(random){
        // 在num1上挖坑

    }else{
        // 在num2 上挖坑
    }
     
  }