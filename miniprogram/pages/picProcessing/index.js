import { _image_MaxSize, _image_Type, _image_base64_head, getQualityStr } from "../../utils/index"
import { fetchImageEnhancement, fetchBase64File, fetchImageClearHandwriteing } from "../../api/index"

import { initQueue } from "../../utils/actionQueue"


function errorCatch(e) {
  console.error(e);
  wx.hideLoading();
  wx.showToast({
    title: '啊哦,出了点差错',
  })
}
function showLoading() {
  wx.showLoading({
    title: '处理图片',
  })
}
Page({
  //https://cloud.tencent.com/document/product/866/80801
  /**
   * 页面的初始数据
   */
  isClearHandwriting: false,
  actionClickCount: 0,
  actionQueue: initQueue(),
  data: {
    imgUrls: [],
    ocrImgs: [],
    isBig: false,
    isShowStep: false,
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
      text: "锐化",
      tasktype: [208]
    },
    ]
  },
  onLoad(options) {
    this.actionClickCount = 0
  },
  onUnload() {

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
      chooseResult.tempFiles.map(item => {
        if (item.size > _image_MaxSize) {
          isBig = true;
        }
      });
      if (isBig) {
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
    if (this.actionClickCount > this.data.actionList.length) {
      wx.showToast({
        title: '点太多次啦，服务器资源消耗过多(⊙o⊙)…',
      });
      return false;
    }
    const tasktype = e.currentTarget.dataset.tasktype;
    showLoading()
    try {
      if (this.actionQueue.index < 0) {
        debugger;
        await this.actionQueue.init(this.data.imgUrls)
      }
      await this.processActions(tasktype);
      this.actionClickCount++;
    } catch (e) {
      errorCatch(e)
    }
  },
  async processActions(tasktype) {
    try {
      for (let index = 0; index < tasktype.length; index++) {
        const action = tasktype[index];
        const imageCache = this.actionQueue.get();
        const res = await fetchImageEnhancement(imageCache, action);
        const step = {
          url: res.fileUrl,
          urlType: "file",
          fileName: res.fileName,
          action
        }
        this.actionQueue.add(step);
      }
      const imageInfo = this.actionQueue.get();
      await this.showActionResult(imageInfo)
    } catch (e) {
      errorCatch(e)
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
    if (this.actionQueue.queue.length > 1) {
      this.setData({ isShowStep: true })
    }
    this.setShowClearHandwriting()
  },
  async clearHandwritingClick() {
    if (this.isClearHandwriting) {
      wx.showToast({
        title: '已经擦除了手写体，只能这样了(⊙﹏⊙)',
      })
      return false;
    }
    try {
      showLoading()
      const imageInfo = this.actionQueue.get()
      const res = await fetchImageClearHandwriteing(imageInfo)
      if (!res) {
        throw Error("fetchImageClearHandwriteing --error")
      }
      const step = {
        url: res.fileUrl,
        urlType: "file",
        fileName: res.fileName,
        action: "clearHandwriteing"
      }
      this.actionQueue.add(step);
      this.showActionResult(step)
      this.isClearHandwriting = true
    } catch (e) {
      errorCatch(e)
    }
  },
  async prevClick() {
    try {
      showLoading()
      const imageInfo = this.actionQueue.prev();
      await this.showActionResult(imageInfo)
      this.setShowClearHandwriting()
      wx.hideLoading();
    } catch (e) {
      errorCatch(e)
    }
  },
  async nextClick() {
    try {
      showLoading()
      const imageInfo = this.actionQueue.next();
      await this.showActionResult(imageInfo)
      this.setShowClearHandwriting()
      wx.hideLoading();
    } catch (e) {
      errorCatch(e)
    }
  },
  setShowClearHandwriting() {
    if (this.actionQueue.index > 0) {
      // 第一步的为原图片需要隐藏擦除手写体
      this.setData({
        isShowClearHandwriting: true
      })
    } else {
      this.setData({
        isShowClearHandwriting: false
      })
    }
  }, onShareAppMessage() {
    return {
      title: '一键擦除手写体',
      path: '/pages/picProcessing/index',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  },onShareTimeline(){
    return {
      title: '一键擦除手写体',
      path: '/pages/picProcessing/index',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }
});
