import { playSuccess, playError } from "../../utils/media";
import { randomMathTopic, verifyTopic, keyCodeMap } from "../../utils/mathTopic"
let timer = 0;
let topicLevel = 2;
function initInputArray(length) {
  const res = [];
  while (length > 0) {
    res.push({ value: "" });
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
  inputIndex: -1,
  isNewTopic: true,
  onLoad() {

  },
  onReady() {
    this.changeTopic();
    this.timer();
    this.isNewTopic = true;
    topicLevel = 2;
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
    const topic = randomMathTopic(Number(topicLevel));
    const inputArray = initInputArray(topic.resultStrArray.length);
    console.log("====topic==", topic)
    this.isNewTopic = true;
    this.setData({ topic, inputArray, inputIndex: -1, inputValue: "" })
  },
  submit(event) {
    let { topicError, topicRight, inputArray } = this.data;
    const { resultStrArray } = this.data.topic;
    let res = "";
    inputArray.map(item => {
      res = `${res}${item.value}`;
    })
    const isRight = resultStrArray.join("") === res;
    this.showToast(isRight);
    this.playVoice(isRight);
    if (isRight) {
      this.changeTopic();
      topicRight++;
    } else {
      if (this.isNewTopic) {
        topicError++;
        this.isNewTopic = false;
      }
    }
    this.setData({
      topicError,
      topicRight
    })
  },
  showToast(success){
    wx.showToast({
      title: success?'正确':"错误",
      icon: success?'success':"error",
      duration: 1000
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
  topicLevelChange(event) {
    const { value } = event.detail;
    topicLevel = Number(value)
    this.changeTopic();
  },
  textClick(event) {
    const index = Number(event.currentTarget.dataset.index);
    this.inputIndex = index;
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
    if (keyCodeMap.get(keyCode) === 'del') {
      // 删除前值
      inputArray[inputIndex].value = "";
      this.inputIndex = this.inputIndex ? this.inputIndex - 1 : this.inputIndex;
      this.setData({
        inputValue: value,
        inputArray,
        inputIndex: this.inputIndex
      })
      return value;
    };
    this.fillTextByValue(value, keyCode)
  },
  fillTextByValue(value, keyCode) {
    const { inputArray } = this.data;
    if (keyCodeMap.has(keyCode)) {
      console.log("=====", keyCodeMap.get(keyCode));
      if (this.inputIndex < inputArray.length) {
        inputArray[this.inputIndex].value = keyCodeMap.get(keyCode);
      }
      this.inputIndex = this.inputIndex < inputArray.length - 1 ? this.inputIndex + 1 : this.inputIndex;
    }


    this.setData({
      inputValue: value,
      inputArray,
      inputIndex: this.inputIndex
    })
  },

  onShareAppMessage() {
    return {
      title: '番茄小能手，四则运算训练',
      path: '/pages/numberTopic/index',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }, onShareTimeline() {
    return {
      title: '番茄小能手，四则运算训练',
      // path: '/pages/numberTopic/index',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }
});
