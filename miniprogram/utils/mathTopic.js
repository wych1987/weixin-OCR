export const symbolArray = ["+", "-", "×", "÷"]
export const randomMathTopic = (level) => {
  const num = (Math.random() * 100).toFixed() % 4;

  let res = {}
  switch (num) {
    case 0://+
      res = sumTopic(level)
      break;
    case 1://-
      res = subTopic(level)
      break;
    case 2://*
      res = mulTopic(level)
      break;
    case 3:// 除
      res = divTopic(level)
      break;
  }
  res.symbolStr = symbolArray[num]
  res.resultStrArray = res.result.toString().split("")
  res.symbolNum = num;
  return res
}
// 加法
function sumTopic(level) {

  const num1 = Number((Math.random() * Math.pow(10, level)).toFixed());
  const num2 = Number((Math.random() * Math.pow(10, level)).toFixed());
  debugger;
  return {
    num1,
    num2,
    result: num1 + num2
  }
}
// 减法
function subTopic(level) {
  const res = sumTopic(level);
  return {
    num1: res.result,
    num2: res.num2,
    result: res.num1
  }
}
// 乘法
function mulTopic(level) {
  let res = mul(level);
  while (res.result > Math.pow(10, level + 1) || res.result < Math.pow(10, level - 1)) {
    res = mul(level)
  }
  return res;
}
function mul(level) {
  const num1 = Number((Math.random() * Math.pow(10, level)).toFixed());
  const num2 = Number((Math.random() * Math.pow(10, level)).toFixed());

  const result = num1 * num2;
  return {
    num1, num2, result
  }
}

// 除法
function divTopic(level) {
  const res = mulTopic(level);
  return {
    num1: res.result,
    num2: res.num2,
    result: res.num1
  }
}
export function verifyTopic(result, input) {
  const inputStr = input.split("");
  for (let index = 0; index < result.length; index++) {
    if (result[index] !== inputStr[index]) {
      return false;
    }
  }
  return true;
}
export const keyCodeMap = new Map(
  [[8, "del"],
  [46, "del"],
  [48, 0],
  [49, 1],
  [50, 2],
  [51, 3],
  [52, 4],
  [53, 5],
  [54, 6],
  [55, 7],
  [56, 8],
  [57, 9]]
)

export const emptyTopic = (level)=>{
  const res = randomMathTopic(level+1);
  // 开始挖坑
  debugger;
  console.log(res);
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