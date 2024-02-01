let windowCanvas;
let portraitCanvas;

function lichenPortrait()
{
  var drawPos;
  var seedResolution = 50;
  var clearShade = 0;


  var cx = width / 2;
  var cy = height / 2;
  var clearStyle = "rgba(" + clearShade + ", " + clearShade + ", " + clearShade + ", 1)";

  function radius (x,y)
  {
    return Math.sqrt((x - cx) * (x - cy) + (y - cx) * (y-cy));
  }

  function test(x, y)
  {
    if (x < 0 || y < 0 || x >= width || y >= height)
      return false;

    var data = get(x, y);
    return data[0] != clearShade || data[1] != clearShade || data[2] != clearShade;
  }

  var shade = 120;

  function setc(x, y, c)
  { 
    shade = (shade + 0.02) % 360;

    if (c)
    {
      fill(color("hsl(" + shade + ", 100%, 50%)"));
    } 
    else
    {
      fill(color(clearStyle));
    }
    
    noStroke();
    rect(x, y, 1, 1);
  }

  function set(x, y)
  {
    setc(x, y, true);
  }

  function clear(x, y)
  {
    setc(x, y, false);
  }

  fill(color(clearStyle));
  rect(0, 0, width, height);

  var x;
  var y;

  var closeRadius = 1;

  set(cx, cy);

  function newpos()
  {
    x = Math.floor(random(width / seedResolution)) * seedResolution;
    y = Math.floor(random(height / seedResolution)) * seedResolution;
  }

  newpos();

  var growthAnim;
  growthAnim = setInterval(function() {
    if (drawPos) clear(x, y);
    for (var i = 0; i < 5000; i++)
    {
      var ox = x;
      var oy = y;

      switch (Math.floor(random(8)))
      {
        case 0:
          x++;
          break;
        case 1:
          x--;
          break;
        case 2:
          y++;
          break;
        case 3:
          y--;
          break;
        case 4:
          x++;
          y++;
          break;
        case 5:
          x--;
          y--;
          break;
        case 6:
          x++;
          y--;
          break;
        case 7:
          x--;
          y++;
          break;  
      }

      if (x < 0 || y < 0 || x >= width || y >= height || radius(x, y) > closeRadius + seedResolution + 2)
      {
        var progress = 1000;
        do
        {
          progress--;
          newpos();
        }
        while ((test(x - 1, y - 1) || test(x, y - 1) || test(x + 1, y - 1) || test(x - 1, y) || test(x, y) || test(x + 1, y) || test(x - 1, y + 1) || test(x, y + 1) || test(x + 1, y + 1)) && progress > 0);

        if (progress <= 0)
        {
          clearInterval(growthAnim);
          return;
        }
      }
      
      if (test(x, y))
      {
        set(ox, oy);
        closeRadius = Math.max(closeRadius, radius(ox, oy));
        newpos();
      }
    }

    if (drawPos) set(x, y);
  }, 1);
}

function setup() 
{
  windowCanvas = createCanvas(windowWidth, windowHeight);
  background(0);
  windowCanvas.style('z-index', '-1');

  portraitCanvas = createCanvas(250, 250);
  lichenPortrait();
}

function draw() 
{
  
}
