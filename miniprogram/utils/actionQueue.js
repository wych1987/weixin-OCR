import { uploadMediaChoose, randomFileNameTxt } from "./clouldFile"
const queue = [];
const actionInfo = {
  tempFiles: [],
  queue: []
}
export  function initQueue() {
  const actionInfo = {
    index: -1,
    queue: [],
    add: function (actionInfo) {
      this.queue.push(actionInfo);
      this.index++;
    },
    back: function () {
      if (this.index) {
        this.index--;
      }
      return this.queue[this.index]
    },
    get: function () {
      return this.queue[this.index]
    },
    init: async function (tempFiles) {
      const { fileList } = await uploadMediaChoose(tempFiles);
      const step = {
        url: fileList[0].tempFileURL,
        urlType: "image",
        action: "init",
        fileName: randomFileNameTxt()
      }
      this.add(step)
      return this
    },
    destory:function(){
      this.queue=[]
      this.index=-1;
    }
  }
  return actionInfo
}