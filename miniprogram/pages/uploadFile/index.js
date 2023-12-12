import { uploadMediaChoose} from "../../utils/clouldFile"
import {fetchOcrBaidu} from "../../api/index"
import{imageData} from "../../utils/mock01"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetImgSrc: false,
    imgUrls: [],
    ocrImgs:[imageData,imageData,imageData]
  },

  onLoad(options) {

  },

  uploadImg() {
      // 让用户选择图片
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['original'],
      camera: 'back',
    }).then(chooseResult => {
      //
      console.log(chooseResult)
      this.setData({
        imgUrls: chooseResult.tempFiles
      })
    }
    ).catch(e => {
      console.error("chooseMedia===", e)
    })
  },

  clearImgSrc() {
    this.setData({
      imgUrls:[]
    });
  },
  async ocrClearImg() {
    // 把这些图片上传到云端
    wx.showLoading({
      title: '图片正在处理',
    });
    const {fileList} = await uploadMediaChoose(this.data.imgUrls);
    console.log("===img",res.fileList[0].tempFileURL)
    // 挨个把图片给服务端处理
    const resultImgOcr = []
    fileList.map(async (item)=>{
      const res = await fetchOcrBaidu(item.tempFileURL);
      resultImgOcr.push(res);
    });
    this.setData({
      ocrImgs:resultImgOcr
    });
    wx.hideLoading()
  }
});
