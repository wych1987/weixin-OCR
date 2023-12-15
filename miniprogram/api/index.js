
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
export async function fetchImageEnhancement(imageInfo, taskType) {
  const data = {
    url: imageInfo.url,
    urlType: imageInfo.urlType,
    taskType: String(taskType),
    fileName: imageInfo.fileName
  }
  const res = await requestPost("/api/imageEnhancement", data)
  return res.data;
}
export async function fetchBase64File(url) {
  return new Promise((resovle, reject) => {
    wx.request({
      url:`${url}?${Math.random()}`,
      data: {},
      header: {
        'content-type': 'text/plain' 
      },
      success(res) {
        resovle(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })

}