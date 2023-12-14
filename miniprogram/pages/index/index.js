// index.js
// const app = getApp()
 

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '一键擦除手写体',
      tip: '快捷方便去掉作业的手写痕迹',
      showItem: false,
      page: 'ocrClearImg'
    } ,
     {
      title: '文本图像处理',
      tip: '文本图像矫正、阴影去除、摩尔纹去除等,优化文档类的图片质量，提升文字的清晰度',
      showItem: false,
      page:"ocr"
    },
    {
      title: '口算训练',
      tip: '两位数的口算训练',
      showItem: false,
      page:"numberShow"
    }
  ]
  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index`,
    });
  },

   
 
});
