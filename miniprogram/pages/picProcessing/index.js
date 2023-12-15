import { _image_MaxSize, _image_Type, _image_base64_head } from "../../utils/index"
import { fetchImageEnhancement, fetchBase64File } from "../../api/index"

import { initQueue } from "../../utils/actionQueue"

let actionQueue = {};
Page({
  //https://cloud.tencent.com/document/product/866/80801
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    ocrImgs: [],
    actionList: [{
      text: "切边",// + 弯曲矫正
      tasktype: [1, 2]
    },
    {
      text: "去噪",
      tasktype: [301, 302, 303]//去除模糊,去摩尔纹301：302：去除阴影  303：去除模糊
    },
    {
      text: "高亮",
      tasktype: [204]
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
    {
      text: "去曝",
      tasktype: [304]
    }
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
    if (actionQueue.index<0) {
      try {
         await actionQueue.init(this.data.imgUrls)
      } catch (e) {
        wx.hideLoading();
      }
    }
    await this.processActions(tasktype)
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
      debugger;
      await this.showActionResult(imageInfo)

    } catch (e) {
      wx.hideLoading();
      wx.showToast({
        title: '啊哦,出了点差错',
      })
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
  }
});
