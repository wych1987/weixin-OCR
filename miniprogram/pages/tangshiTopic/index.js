import {getTopic} from "../../utils/tangshiTopic"

Page({

  /**
   * 页面的初始数据
   */
  data: {
     topic:{
       title:"江南曲",
       author:"李益",
       paragraphs:[
        "嫁得瞿塘贾，朝朝误妾期。", 
        "早知潮有信，嫁与弄潮儿。"
      ]
     }
  },

  onReady(options) {
    this.setData({
      topic:getTopic()
    })
  },
  changeTopic(){
    this.setData({
      topic:getTopic()
    })
  }
});
