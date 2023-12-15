import { _image_MaxSize, _image_Type, _image_base64_head } from "../../utils/index"
import { fetchImageEnhancement, fetchBase64File, fetchImageClearHandwriteing } from "../../api/index"

import { initQueue } from "../../utils/actionQueue"

let actionQueue = {};
function errorCatch() {
  wx.hideLoading();
  wx.showToast({
    title: '啊哦,出了点差错',
  })
}
Page({
  //https://cloud.tencent.com/document/product/866/80801
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    ocrImgs: [],
    isBig:false,
    actionList: [{
      text: "切边",// + 弯曲矫正
      tasktype: [1, 2]
    },
    {
      text: "去阴影",
      tasktype: [301, 302]//去除模糊,去摩尔纹301：302：去除阴影
    },
    {
      text: "灰度",
      tasktype: [205]
    },
    {
      text: "黑白",
      tasktype: [202]
    },
    {
      text: "省墨",
      tasktype: [207]
    },
    {
      text: "锐化",
      tasktype: [208]
    },
    ]
  },
  onLoad(options) {
    actionQueue = initQueue()

  },
  onUnload() {
    actionQueue.destory()
  },
  onReady() {

  },

  async uploadImg() {
    // 让用户选择图片
    try {
      const chooseResult = await wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        sizeType: ['compressed'],
        camera: 'back',
      });
      this.setData({
        imgUrls: chooseResult.tempFiles
      });
      let isBig = false;
      chooseResult.tempFiles.map(item=>{
        if(item.size>_image_MaxSize){
          isBig=true;
        }
      });
      if(isBig){
        wx.showModal({
          title: '图片太大了',
          content: '图片太大了，处理不了呃',
        })
      }
      this.setData({
        isBig
      })
    } catch (e) {
      console.error("chooseMedia===", e)
    }
  },

  clearImgSrc() {
    this.setData({
      imgUrls: [],
      ocrImgs: []
    });
  },
  async actionClick(e) {
    const tasktype = e.currentTarget.dataset.tasktype;
    wx.showLoading({
      title: '处理图片',
    })
    try {
      if (actionQueue.index < 0) {
        await actionQueue.init(this.data.imgUrls)
      }
      await this.processActions(tasktype)
    } catch (e) {
      errorCatch()
    }
  },
  async processActions(tasktype) {
    try {
      for (let index = 0; index < tasktype.length; index++) {
        const action = tasktype[index];
        const imageCache = actionQueue.get();
        const res = await fetchImageEnhancement(imageCache, action);
        const step = {
          url: res.data,
          urlType: "file",
          fileName: imageCache.fileName,
          action
        }
        actionQueue.add(step);
      }
      const imageInfo = actionQueue.get();
      await this.showActionResult(imageInfo)

    } catch (e) {
      errorCatch()
    }
  },
  async showActionResult(imageInfo) {
    const base64Str = await fetchBase64File(imageInfo.url);
    this.setData({
      imgUrls: [{
        url: `${_image_base64_head}${base64Str}`
      }]
    })
    wx.hideLoading();
  },
  async clearHandwritingClick() {
    try {
      wx.showLoading({
        title: '处理图片',
      })
      // 把base64 扔给OCR处理
      const imageInfo = actionQueue.get()
      const res = await fetchImageClearHandwriteing(imageInfo)
      const step = {
        url: res.data,
        urlType: "file",
        fileName: imageCache.fileName,
        action: "clearHandwriteing"
      }
      actionQueue.add(step);
      const base64Str = await fetchBase64File(res);
      this.setData({
        imgUrls: [{
          url: `${_image_base64_head}${base64Str}`
        }]
      })
    } catch (e) {
      errorCatch()
    }
  }
});
