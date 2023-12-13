import {playSuccess,playError} from "../../utils/media";
import {rodomMathTopic} from "../../utils/mathTopic"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioChecked:true,
    symbolArray:["＋","-","×","÷"],
    topic:{ num1: "",
      num2: "",
      symbolStr:"",
      result:""}
  },

  onLoad() {
      const topic = rodomMathTopic()
      this.setData({topic})
  },

   
  audioSwitchChange(event){
    const detail = event.detail;
    this.setData({audioChecked:detail.value});
  },
  changeTopic(){
    const topic = rodomMathTopic()
    this.setData({topic})
  }
});
