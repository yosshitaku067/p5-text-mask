import P5 = require('p5');

new P5((p5: P5) => {
  let textOn = false;
  const string = 'DISNEY' as const;
  let font: P5.Font;
  let density: number;
  let cache: P5.Graphics;
  let txtSize: number;
  let cnv: P5.Graphics;
  let photo: P5.Image;

  p5.preload = () => {
    font = p5.loadFont(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/709927/PFDinTextCondPro-Bold.ttf'
    );
    photo = p5.loadImage(
      '007.png',
      () => {},
      err => {
        console.error(err);
      }
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
