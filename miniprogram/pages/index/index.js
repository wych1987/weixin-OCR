Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '一键擦除手写体',
      tip: '快捷方便去掉手写痕迹',
      showItem: false,
      page: 'picProcessing'
    },
    {
      title: '口算练习',
      tip: '加减乘除口算练习',
      showItem: false,
      page: "numberTopic"
    },
    {
      title: '填空练习',
      tip: '口算填空练习',
      showItem: false,
      page: "emptyNumberTopic"
    }
    ]
  },
  jumpPage(e) {
    const page = e.currentTarget.dataset.page;
    if (!page) {
      wx.showToast({
        title: '敬请期待',
      })
      return false;
    }
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index`,
    });
  },


  onShareAppMessage() {
    return {
      title: '一键擦除手写体',
      path: '/pages/index/index',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }, onShareTimeline() {
    return {
      title: '番茄小能手，一键擦除手写体',
      //path: '/pages/picProcessing/index"',
      imgUrl: "https://img-1320809449.cos.ap-shanghai.myqcloud.com/icon.png"
    }
  }
});
