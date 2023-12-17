import { playSuccess, playError } from "../../utils/media";
import { rodomMathTopic,verifyTopic } from "../../utils/mathTopic"
let timer = 0;
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
  onUnload(){
    clearInterval(timer)
  },
  timer(){
    timer * setInterval(()=>{
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
  }, onShareAppMessage() {
    return {
      title: '番茄小能手，四则运算训练',
      path: '/pages/numberTopic/index"',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  },onShareTimeline(){
    return {
      title: '番茄小能手，四则运算训练',
     // path: '/pages/numberTopic/index"',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }
});
