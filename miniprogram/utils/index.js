export function drawImage(canvas, imgSrc) {
  return new Promise((reslove, reject) => {
    const img = canvas.createImage()

    img.onload = () => {
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      reslove({success:true,data:{}})
    };
    img.onerror = () => {
      reject({ success: false, error: "imgloadError" })
    }
    img.src = imgSrc;
  })
}

export function drawRectByOCR (ctx,ocrData){
    ctx.strokeStyle = "#cf157d94";
    ctx.fillStyle = "#ff890756";
    ocrData.forEach(item=>{
      drawByPath(ctx,item.Polygon)
    })
}
function drawByPath(ctx,pathArray){

  ctx.beginPath();
  const {X,Y} = pathArray[0];
  ctx.moveTo(X, Y);
  for(let index = 1;index<pathArray.length;index++){
    const {X,Y} = pathArray[index];
    ctx.lineTo(X, Y);
  }
  ctx.fill();
  ctx.closePath();
}