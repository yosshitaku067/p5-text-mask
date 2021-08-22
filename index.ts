import P5 = require('p5');

new P5((p5: P5) => {
  let textOn = false;
  const string = 'Disney' as const;
  let font: P5.Font;
  let density: number;
  let cache: P5.Graphics;
  let txtSize: number;
  let cnv: P5.Graphics;
  let img: P5.Image;

  p5.preload = () => {
    font = p5.loadFont('https://fonts.cdnfonts.com/s/10244/waltograph42.woff');
    img = p5.loadImage(
      'data:image/jpeg;base64,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'
    );
  };

  p5.setup = () => {
    p5.frameRate(30);
    density = p5.displayDensity();
    p5.pixelDensity(density);
    p5.createCanvas(window.innerWidth, window.innerHeight / 2);

    init();
  };

  p5.draw = () => {
    p5.background(255);

    p5.image(img, 0, 0, p5.width, p5.height);

    if (!textOn) {
      console.log('called');
      drawText();
    } else {
      // console.log(cache.pixels.length);
      p5.image(cache, 0, 0);
    }

    return;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
    init();
    textOn = false;
  };

  function init() {
    cnv = p5.createGraphics(window.innerWidth, window.innerHeight);
    cnv.background(0, 0, 0, 100);
    cnv.loadPixels();
  }

  function drawText() {
    cache = p5.createGraphics(p5.width, p5.height);
    txtSize = calSizeOfText(cache);
    cache.clear();
    cache.textFont(font);
    cache.textSize(txtSize);
    cache.fill(255, 255, 255, 255);
    cache.textAlign(p5.CENTER, p5.CENTER);
    cache.text(string, cache.width / 2, cache.height / 2);
    cache.loadPixels();

    let pixelsImage = 4 * cache.width * density * cache.height * density;

    let i = 0;
    while (i < pixelsImage) {
      cache.pixels[i] = 0;
      cache.pixels[i + 1] = 0;
      cache.pixels[i + 2] = 0;
      cache.pixels[i + 3] = 255 - cache.pixels[i + 3];
      i += 4;
    }

    cache.updatePixels();
    textOn = true;
    return;
  }

  function calSizeOfText(cache: P5.Graphics) {
    cache.textFont(font);
    let rightSize = true;
    let size = 100;
    while (rightSize) {
      cache.textSize(size);

      if (cache.width - 100 - cache.textWidth(string) < 0) {
        rightSize = false;
      }

      size += 10;
    }

    return size;
  }
});
