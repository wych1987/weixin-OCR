import { uploadMediaChoose, base64src } from "../../utils/clouldFile"
import { fetchOcrBaidu,fetchOcrTx } from "../../api/index"
 
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
      imgUrls: [],
      ocrImgs:[]
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
      for(let index = 0; index<fileList.length;index++){
        const item = fileList[index];
        const res = await fetchOcrTx(item.tempFileURL);
        resultImgOcr.push({ url: `data:image/jpg;base64,${res.data}` });
         this.setData({
           ocrImgs: [...resultImgOcr]
         });
      }
      wx.hideLoading()
    } catch (e) {
      wx.showToast({
        title: '稍等，有异常',
      })
      wx.hideLoading()
    }
  }
});
