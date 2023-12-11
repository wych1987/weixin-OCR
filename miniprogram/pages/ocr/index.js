import { drawImage ,drawRectByOCR} from "../../utils/index"
import {mockData} from "../../utils/mock"
Page({
//https://cloud.tencent.com/document/product/866/80801
  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    actionList:[{
      text:"切边",// + 弯曲矫正
      tasktype:[1,2]
    },
    {
      text:"去噪",
      tasktype:[301,302,303]//去除模糊,去摩尔纹
    },
    {
      text:"高亮",
      tasktype:[204]
    },
    {
      text:"灰度",
      tasktype:[205]
    },
    {
      text:"黑白",
      tasktype:[202]
    },
    {
      text:"省墨",
      tasktype:[207]
    },
    {
      text:"锐化",
      tasktype:[208]
    }
  ]
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
     
        // const img = 'https://noway-img.oss-rg-china-mainland.aliyuncs.com/fa2ec2875d501ab2d60862bec74427d1.JPG'
        const imgTX = "https://img-1320809449.cos.ap-shanghai.myqcloud.com/fa2ec2875d501ab2d60862bec74427d1.JPG"
        drawImage(canvas, imgTX).then(res => {
           drawRectByOCR(ctx,mockData.TextDetections)
        })
      })
  },
  actionClick(e){
    const tasktype = e.currentTarget.dataset.tasktype;
    console.log("===TaskType===",tasktype);
  }
});
