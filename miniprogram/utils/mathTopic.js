export const rodomMathTopic = () => {
  const num = (Math.random() * 100).toFixed() % 4;
  const symbolArray = ["+", "-", "×", "÷"]
  let res = {}
  switch (num) {
    case 0://+
      res = sumTopic()
      break;
    case 1://-
      res = subTopic()
      break;
    case 2://*
      res = mulTopic()
      break;
    case 3:// 除
      res = divTopic()
      break;
  }
  res.symbolStr = symbolArray[num]
  res.resultStrArray = res.result.toString().split("")
  res.symbolNum = num;
  return res
}

function sumTopic() {
  const num1 = Number((Math.random() * 100).toFixed());
  const num2 = Number((Math.random() * 100).toFixed());
  return {
    num1,
    num2,
    result: num1 + num2
  }
}
function subTopic() {
  const res = sumTopic();
  return {
    num1: res.result,
    num2: res.num2,
    result: res.num1
  }
}
function mulTopic() {
  const num1 = Number((Math.random() * 100).toFixed());
  const num2 = Number((Math.random() * 100).toFixed());
  return {
    num1,
    num2,
    result: num1 * num2
  }
}
function divTopic() {
  const res = mulTopic();
  return {
    num1: res.result,
    num2: res.num2,
    result: res.num1
  }
}
export function verifyTopic(result,input){
  for(let index = 0;index<result.length;index++){
    if(result[index]!==input[index]){
      return false;
    }
  }
  return true;
}