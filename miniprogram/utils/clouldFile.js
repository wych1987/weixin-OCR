
export function uploadFile(filePaths) {
  const arr = []
  filePaths.forEach(filePath => {
    if (filePath.size > 8000000) {
      wx.showToast({
        title: '图片大于8M，已忽略',
      });
      return false;
    } //8M
    const pathInfo = getFileInfoByPath(filePath.tempFilePath)
    arr.push(
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: `${pathInfo.random}_${pathInfo.fileName}`,
        // 指定要上传的文件的小程序临时文件路径
        filePath: filePath.tempFilePath,
      })
    )
  });
  return Promise.allSettled(arr)
}

function getFileInfoByPath(path) {
  const pathArray = path.split("/")
  return {
    fileName: pathArray[pathArray.length - 1],
    random: (Math.random() * 100000).toFixed(0)
  }
}
export async function getFileURL(clouldFilePath) {
  const res = await wx.cloud.getTempFileURL({
    fileList: clouldFilePath // 对象存储文件ID列表，最多50个，从上传文件接口或者控制台获取
  })
  return res;
}

export async function uploadMediaChoose(tempFilePaths) {
  // 将图片上传至云存储空间
  try {
    const cloudPath = await uploadFile(tempFilePaths);
    debugger;
    const fileIdList = []
    cloudPath.map(item => {
      console.log(item.fileID)
      if (item.status === "fulfilled") {
        fileIdList.push(item.value.fileID);
      }
    });
    // 用云文件 ID 换取真实链接
    const urls = await getFileURL(fileIdList)
    return urls
  } catch (e) {
    console.error("===uploadMediaChoose===", e)
    wx.hideLoading()
  }
}