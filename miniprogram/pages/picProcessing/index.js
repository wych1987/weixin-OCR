import { drawImage, _image_MaxSize, _image_Type, replaceImageBase64Head } from "../../utils/index"
import { fetchImageEnhancement } from "../../api/index"
import{uploadMediaChoose} from "../../utils/clouldFile"
let imageInfo = {
  url:"",
  type:"image"
}
let base64Image = "";
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
    imageInfo={
      url:"",
      type:"image"
    }
  },
  onReady() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec(async (res) => {
        //  const dpr = wx.getSystemInfoSync().pixelRatio
        canvas = res[0].node
        // drawImage(canvas, img) 
      })
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
      const { fileList } = await uploadMediaChoose(chooseResult.tempFiles);
      imageUrl = fileList[0].tempFileURL
      // 
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
  actionClick(e) {
    const tasktype = e.currentTarget.dataset.tasktype;
    console.log("===TaskType===", tasktype);
    tasktype.map(async (action) => {
      // 同步处理图片
      const res = await fetchImageEnhancement(imageInfo, action);
      console.log("===res===", res);
    })
  }
});
