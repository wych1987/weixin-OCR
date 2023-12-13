const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
});
const successAudio = "https://noway-img.oss-rg-china-mainland.aliyuncs.com/success.wav";
const errorAudio = "https://noway-img.oss-rg-china-mainland.aliyuncs.com/error.wav";
export const playSuccess = () => {
  innerAudioContext.src = successAudio;
  innerAudioContext.play()
}
export const playError = () => {
  innerAudioContext.src = errorAudio;
  innerAudioContext.play()
}

