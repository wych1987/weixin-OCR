import { playSuccess, playError } from "../../utils/media";
import { rodomMathTopic, verifyTopic, keyCodeMap } from "../../utils/mathTopic"
let timer = 0;
let inputTimer = 0;
const timeDelay = 200;
function initInputArray(length) {
  const res = [];
  while (length > 0) {
    res.push({ value: " ", keyCode: "" });
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
    inputValue:"",
    topicRight: 0,
    topicTime: 0,
    topicError: 0,
    inputIndex:-1,
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
    this.setData({ topic, inputArray, focusIndex: false,inputValue:"",maxLength:inputArray.length })
  },
  submit(event) {
    let { topicError, topicRight } = this.data;
    const values = event.detail.value;
    const resultStrArray = this.data.topic.resultStrArray;
    const isRight = verifyTopic(resultStrArray, values);
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
  textClick(event){
    const index = Number(event.currentTarget.dataset.index);
    //this.inputIndex = index;
    this.setData({focusIndex:true,inputIndex:index})
  },
  bindNumberInput(event){
    const { value, keyCode } = event.detail;
    console.log("event.detail===", event.detail);
    const {inputArray,inputIndex} = this.data;
    if(keyCodeMap[keyCode]==='del'){
       return 
    };

   this.fillTextByValue(value)
  },
  fillTextByValue(value){
    const val = value.split("");
    let {inputArray,inputIndex} = this.data;
   
    // 根据选择的位置控制输入的值
    const maxIndex = inputArray.length-inputIndex;
    let valResult = "";
     for(let index = 0; index<val.length&&index<maxIndex;index++){
      inputArray[inputIndex+index] = {value:val[index]};
      valResult = `${valResult}${val[index]}`;
     }
      this.setData({
        inputArray,
        inputValue:valResult,
       // inputIndex:valResult.length
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
