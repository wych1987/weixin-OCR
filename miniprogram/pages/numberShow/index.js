import {playSuccess,playError} from "../../utils/media";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: ''
  },

  onLoad(options) {
    playSuccess();
    setTimeout(()=>{
      playError()
    },3000)
  },

  goBack() {
   wx.navigateBack();
  },

});
