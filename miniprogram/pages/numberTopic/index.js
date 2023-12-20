import { playSuccess, playError } from "../../utils/media";
import { rodomMathTopic, verifyTopic, keyCodeMap } from "../../utils/mathTopic"
let timer = 0;
function initInputArray(length) {
  const res = [];
  while (length > 0) {
    res.push({ value: ""});
    length--;
  }
  return res;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioChecked: true,
    focusIndex: false,
    inputArray: [],
    inputValue: "",
    topicRight: 0,
    topicTime: 0,
    topicError: 0,
    inputIndex: -1,
    topic: {
      num1: "",
      num2: "",
      symbolStr: "",
      result: "",
      symbolNum: "",
      resultStrArray: []
    }
  },
  onLoad() {
    this.changeTopic();
    this.timer();
  },
  onUnload() {
    clearInterval(timer)
  },
  timer() {
    timer * setInterval(() => {
      const topicTime = this.data.topicTime;
      this.setData({
        topicTime: topicTime + 1
      })
    }, 1000 * 60)
  },

  audioSwitchChange(event) {
    const detail = event.detail;
    this.setData({ audioChecked: detail.value });
  },
  changeTopic() {
    const topic = rodomMathTopic();
    const inputArray = initInputArray(topic.resultStrArray.length);
    console.log("====topic==",topic)
    this.setData({ topic, inputArray, focusIndex: false, inputValue: ""})
  },
  submit(event) {
    let { topicError, topicRight } = this.data;
    const {topicInputValue} = event.detail.value;
    const {resultStrArray} = this.data.topic;
    const isRight = resultStrArray.join("")===topicInputValue;
    this.playVoice(isRight);
    if (isRight) {
      this.changeTopic();
      topicRight++;
    } else {
      topicError++;
    }
    this.setData({
      topicError,
      topicRight
    })
  },
  playVoice(success) {
    if (this.data.audioChecked === false) return;
    if (success) {
      playSuccess();
    } else {
      playError();
    }
  },
  textClick(event) {
    const index = Number(event.currentTarget.dataset.index);
    //this.inputIndex = index;
    // 判断点击位置，前置的数据填充
    const inputValue = this.fillInputValueByIndex(index);
    this.setData({ focusIndex: true, inputIndex: index, inputValue })
  },
  fillInputValueByIndex(index) {
    const { inputArray } = this.data;
    let v = "";
    let m = index;
    while (m > -1) {
      let val = inputArray[m].value;
      const t = val !== undefined || val !== "" ? val : " ";
      v = `${t}${v}`;
      m--;
    };
    m = index + 1;
    while (m < inputArray.length) {
      v = `${v}${inputArray[m].value}`;
      m++;
    }
    return v;
  },
  bindNumberInput(event) {
    const { value, keyCode } = event.detail;
    console.log("event.detail===", event.detail);
    const { inputArray, inputIndex } = this.data;
    if (keyCodeMap[keyCode] === 'del') {
      // 删除前值
      inputArray[inputIndex].value = "";
      this.setData({
        inputValue: value,
        inputArray,
        inputIndex: inputIndex ? inputIndex - 1 : inputIndex
      })
      return value;
    };
    this.fillTextByValue(value)
  },
  fillTextByValue(value) {
    const val = value.split("");
    let { inputArray, inputIndex } = this.data;
    val.length = inputArray.length;
    let m = inputIndex;
    while (m < val.length) {
      inputArray[m].value = val[m];
      m++;
    }
    this.setData({
      inputValue: val.join(""),
      inputArray,
      inputIndex: inputIndex < inputArray.length - 1 ? inputIndex + 1 : inputIndex
    })

  },

  onShareAppMessage() {
    return {
      title: '番茄小能手，四则运算训练',
      path: '/pages/numberTopic/index"',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }, onShareTimeline() {
    return {
      title: '番茄小能手，四则运算训练',
      // path: '/pages/numberTopic/index"',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }
});
