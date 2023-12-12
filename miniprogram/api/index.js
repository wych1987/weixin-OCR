async function requestGet(path){
  return await wx.cloud.callContainer({
    "config": {
      "env": "prod-9gyv2l6ve6158cda"
    },
    "path": path,
    "header": {
      "X-WX-SERVICE": "golang-smwx",
      "content-type": "application/json"
    },
    "method": "GET",
  })
}

export async function fetchOcrBaidu(imgUrl){
  return  await requestGet(`/api/baidu_ocr?imgSrc=${encodeURIComponent(imgUrl)}`)
} 