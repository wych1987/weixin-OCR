export function drawImage(canvas, imgSrc) {
   const ctx = canvas.getContext('2d')
  return new Promise((reslove, reject) => {
    const img = canvas.createImage()
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      reslove({ success: true, data: {} })
    };
    img.onerror = (error) => {
      console.error("=====error===",error)
      reject({ success: false, error: "imgloadError" })
    }
    img.src = imgSrc;
  })
}

export function drawRectByOCR(ctx, ocrData) {
  ctx.strokeStyle = "#cf157d94";
  ctx.fillStyle = "#ff890756";
  ocrData.forEach(item => {
    drawByPath(ctx, item.Polygon)
  })
}
function drawByPath(ctx, pathArray) {
  ctx.beginPath();
  const { X, Y } = pathArray[0];
  ctx.moveTo(X, Y);
  for (let index = 1; index < pathArray.length; index++) {
    const { X, Y } = pathArray[index];
    ctx.lineTo(X, Y);
  }
  ctx.fill();
  ctx.closePath();
}