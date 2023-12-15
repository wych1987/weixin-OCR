import { decode } from "./base64"
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
    random: randomFileName()
  }
}
export function randomFileName(){
    const now = new Date();
    const num = (Math.random() * 100000000).toFixed(0);
    return `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}-${num}`
}
export function randomFileNameTxt(){
  return randomFileName()+".txt"
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
    const fileIdList = []
    cloudPath.map(item => {
      if (item.status === "fulfilled") {
        fileIdList.push(item.value.fileID);
      }
    });
    // 用云文件 ID 换取真实链接
    return await getFileURL(fileIdList)
  } catch (e) {
    console.error("===uploadMediaChoose===", e)
    wx.hideLoading()
  }
}


// const FILE_BASE_NAME = 'textImg'; //自定义文件名

/**
 * 对于base64形式图片进行存储处理，在回调中返回写入内存的文件路径
 * @param {String} base64data base64格式数据
 * @param {String} FILE_BASE_NAME 图片名，不带后缀
 * @param {Function} cb 回调函数，函数得到的参数为文件路径，可直接赋值给src
 */
export function base64src(base64data) {
  return new Promise((resolve, reject) => {
    const fsm = wx.getFileSystemManager()
    const FILE_BASE_NAME = (Math.random()*10000000).toFixed();
    const filePath = `${wx.env.USER_DATA_PATH}/temp_${FILE_BASE_NAME}.jpeg`;
    const buffer = decode(base64data);
    fsm.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        resolve(filePath + "?flg=" + new Date().getTime());
      },
      fail() {
        reject(new Error('ERROR_BASE64SRC_WRITE'));
      },
    });
  })

};