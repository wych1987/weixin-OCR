import { drawImage ,drawRectByOCR} from "../../utils/index"
import {mockData} from "../../utils/mock"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: '',
    imageSrc:"https://noway-img.oss-rg-china-mainland.aliyuncs.com/fa2ec2875d501ab2d60862bec74427d1.JPG"
  },

  onLoad(options) {
    wx.hideLoading()
  },
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec(async(res) => {
      //  const dpr = wx.getSystemInfoSync().pixelRatio
      const canvas = res[0].node
      const ctx = canvas.getContext('2d');
     
        const img = 'https://noway-img.oss-rg-china-mainland.aliyuncs.com/fa2ec2875d501ab2d60862bec74427d1.JPG'
        drawImage(canvas, img).then(res => {
           drawRectByOCR(ctx,mockData.TextDetections)
        })
        
      })
  },
});
