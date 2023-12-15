Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '一键擦除手写体',
      tip: '快捷方便去掉手写痕迹',
      showItem: false,
      page: 'picProcessing'
    } ,
    {
      title: '口算训练',
      tip: '两位数的口算训练',
      showItem: false,
      page:"numberTopic"
    },
    {
      title: '手动擦除手写体',
      tip: '---还未开发---',
      showItem: false,
    }
  ]
  },
  jumpPage(e) {
    const page = e.currentTarget.dataset.page;
    if(!page) return false;
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index`,
    });
  },

   
 
});
