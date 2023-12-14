
const config = {
  "env": "prod-9gyv2l6ve6158cda"
}
const SERVICE = "golang-smwx"
async function requestGet(path) {
  return await wx.cloud.callContainer({
    "config": config,
    "path": path,
    "header": {
      "X-WX-SERVICE": SERVICE,
      "content-type": "application/json"
    },
    "method": "GET"
  })
}
async function requestPost(path, data) {
  return await wx.cloud.callContainer({
    "config": config,
    "path": path,
    "header": {
      "X-WX-SERVICE": SERVICE,
      "content-type": "application/json"
    },
    "method": "POST",
    "data": data
  })
}

export async function fetchOcrBaidu(imgUrl) {
  const res = await requestGet(`/api/baidu_ocr?imgSrc=${encodeURIComponent(imgUrl)}`)
  return res.data;
}
export async function fetchOcrTx(imgUrl) {
  const res = await requestGet(`/api/tx_ocr?imgSrc=${encodeURIComponent(imgUrl)}`)
  return res.data;
}
export async function getOcrChannel(imgUrl) {
  const res = await requestGet("/api/ocrChannel")
  return res.data;
}
export async function fetchImageEnhancement(imageInfo, TaskType) {
  const res = await requestPost("/api/imageEnhancement", { url: imageInfo.url, urlType: imageInfo.type, TaskType })
  return res.data;
}