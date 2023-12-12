import { uploadMediaChoose, base64src } from "../../utils/clouldFile"
import { fetchOcrBaidu } from "../../api/index"
import { imageData } from "../../utils/mock01"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetImgSrc: false,
    imgUrls: [],
    ocrImgs: []
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
      imgUrls: []
    });
  },
  async ocrClearImg() {
    // 把这些图片上传到云端
    wx.showLoading({
      title: '图片正在处理',
    });
    try {
      const {fileList} = await uploadMediaChoose(this.data.imgUrls);
      // 挨个把图片给服务端处理
      const resultImgOcr = []
      fileList.map(async (item) => {
        const res = await fetchOcrBaidu(item.tempFileURL);
        //const tempUrl = await base64src(res.data)
       // resultImgOcr.push({ url: tempUrl });
       resultImgOcr.push({ url: `data:image/png;base64,${res.data}` });
        this.setData({
          ocrImgs: [...resultImgOcr]
        });
      });
      wx.hideLoading()
    } catch (e) {
      wx.showToast({
        title: '稍等，有异常',
      })
      wx.hideLoading()
    }
  }
});
