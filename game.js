function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
var now, dt = 0, last = timestamp(), step = 1/60;

function frame() { //Fixed timesetp
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while(dt > step) {
    dt = dt - step;
    update(step);
  }
  redraw(dt);
  last = now;
  requestAnimationFrame(frame);
}