 //https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createInnerAudioContext.html
const successAudio = "https://noway-img.oss-rg-china-mainland.aliyuncs.com/success.wav";
const errorAudio = "https://noway-img.oss-rg-china-mainland.aliyuncs.com/error.wav";
export const playSuccess = () => {
  const innerAudioContext = wx.createInnerAudioContext({
    useWebAudioImplement: true 
  });
  innerAudioContext.src = successAudio;
  innerAudioContext.play()
}
export const playError = () => {
  const innerAudioContext = wx.createInnerAudioContext({
    useWebAudioImplement: true 
  });
  innerAudioContext.src = errorAudio;
  innerAudioContext.play()
}

