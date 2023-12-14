import { playSuccess, playError } from "../../utils/media";
import { rodomMathTopic,verifyTopic } from "../../utils/mathTopic"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioChecked: true,
    focusIndex: 0,
    inputArray:{},
    topicRight:0,
    topicTime:0,
    topicError:0,
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

  },
  timer(){
    setInterval(()=>{
      const topicTime = this.data.topicTime;
      this.setData({
        topicTime:topicTime+1
      })
    },1000*60)
  },

  audioSwitchChange(event) {
    const detail = event.detail;
    this.setData({ audioChecked: detail.value });
  },
  changeTopic() {
    const topic = rodomMathTopic()
    this.setData({ topic,inputArray:{} })
  },
  submit(event){
    let {topicError,topicRight} = this.data;
    const values = event.detail.value;
    const resultStrArray = this.data.topic.resultStrArray;
    const isRight=verifyTopic(resultStrArray,values);
    this.playVoice(isRight);
    if(isRight){
      this.changeTopic();
      topicRight++;
    }else{
      topicError++;
    }
    this.setData({
      topicError,
      topicRight
    })
  },
  playVoice(success){
    if(this.data.audioChecked===false) return ;
    if(success){
      playSuccess();
    }else{
      playError();
    }
  },
  bindNumberInput(event) {
    const val = event.detail.value;
    const index = Number(event.currentTarget.dataset.index);
    const inputArray = this.data.inputArray;
    inputArray[index] = val;
    this.setData({
      inputArray
    });
    if (val) {
      if (this.data.topic.symbolNum === 0||this.data.topic.symbolNum === 2) {// 加法 乘法 由低向高
        if (index > 0) {
          this.setData({
            focusIndex: index - 1
          })
        }
      } else  if (this.data.topic.symbolNum === 1||this.data.topic.symbolNum === 3) {// 减法 除法由高向低
        if (index < this.data.topic.resultStrArray.length - 1) {
          this.setData({
            focusIndex: Number(index) + 1
          })
        }
      }
    }
  }
});
