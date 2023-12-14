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


  audioSwitchChange(event) {
    const detail = event.detail;
    this.setData({ audioChecked: detail.value });
  },
  changeTopic() {
    const topic = rodomMathTopic()
    this.setData({ topic,inputArray:{} })
  },
  submit(event){
    const values = event.detail.value;
    const resultStrArray = this.data.topic.resultStrArray;
    const isRight=verifyTopic(resultStrArray,values);
    if(isRight){
      playSuccess();
      this.changeTopic();
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
      if (this.data.topic.symbolNum <= 1) {// 加减法
        if (index > 0) {
          this.setData({
            focusIndex: index - 1
          })
        }
      } else {
        if (index < this.data.topic.resultStrArray.length - 1) {
          this.setData({
            focusIndex: Number(index) + 1
          })
        }
      }
    }
  }
});
