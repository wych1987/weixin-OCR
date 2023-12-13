export const rodomMathTopic = () => {
  const num = (Math.random() * 100).toFixed() % 4;
  const symbolArray = ["＋", "-", "×", "÷"]
  let result = {}
  switch (num) {
    case 0://+
      result = sumTopic()
      break;

    case 1://-
      result = subTopic()
      break;
    case 2://*
      result = mulTopic()
      break;
    case 3:// 除
      result = divTopic()
      break;
  }
  result.symbolStr = symbolArray[num]
  return result
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