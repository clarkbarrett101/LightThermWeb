const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.willReadFrequently = true;
canvas.hidden = true;

const button = document.createElement("button");
button.innerText = "Start";
button.addEventListener("click", () => {
  StartSququence();
});
document.body.appendChild(button);
document.addEventListener("keydown", (e) => {
  if (e.key === "Space") {
    StartSququence();
  }
});

let uvReadings = [];

const vidCanvas = document.createElement("canvas");
vidCanvas.willReadFrequently = true;
vidCanvas.hidden = true;
const vidCtx = vidCanvas.getContext("2d");
document.body.appendChild(vidCanvas);
const video = document.createElement("video");
video.autoplay = true;
video.hidden = true;
document.body.appendChild(video);

video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });

let color = "#000000";
let kelvin = 1000;

function FlashCanvas(hexColor) {
  canvas.hidden = false;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function UVVideo() {
  vidCanvas.width = video.videoWidth;
  vidCanvas.height = video.videoHeight;
  vidCtx.drawImage(video, 0, 0, vidCanvas.width, vidCanvas.height);
  vidCanvas.hidden = false;
  vidCanvas.width = 100;
  vidCanvas.height = 100;
  vidCtx.drawImage(video, 0, 0, 100, 100);
  const imageData = vidCtx.getImageData(
    0,
    0,
    vidCanvas.width,
    vidCanvas.height
  );
  for (let i = 0; i < imageData.data.length; i += 4) {
    const rgb = [
      imageData.data[i],
      imageData.data[i + 1],
      imageData.data[i + 2],
    ];
    const luv = RGB2LUV(rgb);
    luv[0] = 150;
    const hex = LUV2HEX(luv);
    vidCtx.fillStyle = hex;
    vidCtx.fillRect((i / 4) % vidCanvas.width, i / 4 / vidCanvas.width, 1, 1);
  }
  vidCtx.rect(0, 0, vidCanvas.width, vidCanvas.height);
  vidCtx.strokeStyle = black ? RGB2HEX(kelvin_table[kelvin]) : "#000000";
  vidCtx.strokeWidth = 10;
  vidCtx.stroke();
  uvReadings.push(vidCtx.getImageData(0, 0, vidCanvas.width, vidCanvas.height));
}

const kelvin_table = {
  1000: [255, 56, 0],
  1100: [255, 71, 0],
  1200: [255, 83, 0],
  1300: [255, 93, 0],
  1400: [255, 101, 0],
  1500: [255, 109, 0],
  1600: [255, 115, 0],
  1700: [255, 121, 0],
  1800: [255, 126, 0],
  1900: [255, 131, 0],
  2000: [255, 138, 18],
  2100: [255, 142, 33],
  2200: [255, 147, 44],
  2300: [255, 152, 54],
  2400: [255, 157, 63],
  2500: [255, 161, 72],
  2600: [255, 165, 79],
  2700: [255, 169, 87],
  2800: [255, 173, 94],
  2900: [255, 177, 101],
  3000: [255, 180, 107],
  3100: [255, 184, 114],
  3200: [255, 187, 120],
  3300: [255, 190, 126],
  3400: [255, 193, 132],
  3500: [255, 196, 137],
  3600: [255, 199, 143],
  3700: [255, 201, 148],
  3800: [255, 204, 153],
  3900: [255, 206, 159],
  4000: [255, 209, 163],
  4100: [255, 211, 168],
  4200: [255, 213, 173],
  4300: [255, 215, 177],
  4400: [255, 217, 182],
  4500: [255, 219, 186],
  4600: [255, 221, 190],
  4700: [255, 223, 194],
  4800: [255, 225, 198],
  4900: [255, 227, 202],
  5000: [255, 228, 206],
  5100: [255, 230, 210],
  5200: [255, 232, 213],
  5300: [255, 233, 217],
  5400: [255, 235, 220],
  5500: [255, 236, 224],
  5600: [255, 238, 227],
  5700: [255, 239, 230],
  5800: [255, 240, 233],
  5900: [255, 242, 236],
  6000: [255, 243, 239],
  6100: [255, 244, 242],
  6200: [255, 245, 245],
  6300: [255, 246, 247],
  6400: [255, 248, 251],
  6500: [255, 249, 253],
  6600: [254, 249, 255],
  6700: [252, 247, 255],
  6800: [249, 246, 255],
  6900: [247, 245, 255],
  7000: [245, 243, 255],
  7100: [243, 242, 255],
  7200: [240, 241, 255],
  7300: [239, 240, 255],
  7400: [237, 239, 255],
  7500: [235, 238, 255],
  7600: [233, 237, 255],
  7700: [231, 236, 255],
  7800: [230, 235, 255],
  7900: [228, 234, 255],
  8000: [227, 233, 255],
  8100: [225, 232, 255],
  8200: [224, 231, 255],
  8300: [222, 230, 255],
  8400: [221, 230, 255],
  8500: [220, 229, 255],
  8600: [218, 229, 255],
  8700: [217, 227, 255],
  8800: [216, 227, 255],
  8900: [215, 226, 255],
  9000: [214, 225, 255],
  9100: [212, 225, 255],
  9200: [211, 224, 255],
  9300: [210, 223, 255],
  9400: [209, 223, 255],
  9500: [208, 222, 255],
  9600: [207, 221, 255],
  9700: [207, 221, 255],
  9800: [206, 220, 255],
  9900: [205, 220, 255],
  10000: [207, 218, 255],
  10100: [207, 218, 255],
  10200: [206, 217, 255],
  10300: [205, 217, 255],
  10400: [204, 216, 255],
  10500: [204, 216, 255],
  10600: [203, 215, 255],
  10700: [202, 215, 255],
  10800: [202, 214, 255],
  10900: [201, 214, 255],
  11000: [200, 213, 255],
  11100: [200, 213, 255],
  11200: [199, 212, 255],
  11300: [198, 212, 255],
  11400: [198, 212, 255],
  11500: [197, 211, 255],
  11600: [197, 211, 255],
  11700: [197, 210, 255],
  11800: [196, 210, 255],
  11900: [195, 210, 255],
  12000: [195, 209, 255],
};

function RGB2HEX(rgb) {
  let r = rgb[0];
  r = Math.round(r);
  let g = rgb[1];
  g = Math.round(g);
  let b = rgb[2];
  b = Math.round(b);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function RGB2LUV(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  const u = -0.147 * r - 0.289 * g + 0.436 * b;
  const v = 0.615 * r - 0.515 * g - 0.1 * b;
  return [l, u, v];
}
function LUV2RGB(l, u, v) {
  const r = l + 1.14 * v;
  const g = l - 0.395 * u - 0.581 * v;
  const b = l + 2.033 * u;
  return [r, g, b];
}

function LUV2HEX(luv) {
  const l = luv[0];
  const u = luv[1];
  const v = luv[2];
  const r = l + 1.14 * v;
  const g = l - 0.395 * u - 0.581 * v;
  const b = l + 2.033 * u;
  return RGB2HEX([r, g, b]);
}

function measureCanvas() {
  let readings = [];
  vidCanvas.width = window.innerWidth;
  vidCanvas.height = window.innerHeight;
  vidCtx.drawImage(video, 0, 0, vidCanvas.width, vidCanvas.height);
  const imageData = vidCtx.getImageData(
    0,
    0,
    vidCanvas.width,
    vidCanvas.height
  );
  for (let i = 0; i < imageData.data.length; i += 4) {
    const rgb = [
      imageData.data[i],
      imageData.data[i + 1],
      imageData.data[i + 2],
    ];
    const luv = RGB2LUV(rgb);
    readings.push(luv);
  }
  let average = [0, 0, 0];
  for (let i = 0; i < readings.length; i++) {
    average[0] += readings[i][0];
    average[1] += readings[i][1];
    average[2] += readings[i][2];
  }
  average[0] = 127;
  average[1] /= readings.length;
  average[2] /= readings.length;
  return average;
}
let black = false;
let measurements = [];
function StartSququence() {
  setInterval(() => {
    if (kelvin > 8000) {
      return;
    }
    measurements.push(measureCanvas());
    UVVideo();
    //DrawUVMatrix();
    if (black) {
      FlashCanvas("#000000");
      black = false;
    } else {
      FlashCanvas(RGB2HEX(kelvin_table[kelvin]));
      kelvin += 500;
      black = true;
    }
    if (kelvin > 8000) {
      let index = CalculateTemp(measurements);
      const temp = 1000 + index * 400;
      console.log(temp);
      // DrawUVReadings();
    }
  }, 400);
}
function DrawUVReadings() {
  for (let i = 0; i < uvReadings.length; i++) {
    ctx.putImageData(uvReadings[i], (i % 11) * 100, Math.floor(i / 11) * 100);
  }
}
function CalculateTemp(data) {
  let diff = 100;
  let diffIndex = 0;
  let diffArray = [];
  for (let i = 0; i < data.length - 1; i += 2) {
    let uDiff = Math.abs(data[i][1] - data[i + 1][1]);
    let vDiff = Math.abs(data[i][2] - data[i + 1][2]);
    let uvDiff = Math.sqrt(uDiff ** 2 + vDiff ** 2);
    diffArray.push(uvDiff);
  }
  let diffArrayNormal = [];
  diffArrayNormal.push(diffArray[0]);
  for (let i = 1; i < diffArray.length - 1; i++) {
    diffArrayNormal.push((diffArray[i] + diffArray[i + 1]) / 2);
  }
  diffArrayNormal.push(diffArray[diffArray.length - 1]);
  console.log(diffArrayNormal);
  for (let i = diffArrayNormal.length; i > 0; i--) {
    if (diffArrayNormal[i] < diff) {
      diff = diffArrayNormal[i];
      diffIndex = i;
    }
  }
  return diffIndex;
}
