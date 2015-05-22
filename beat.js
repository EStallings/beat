canvas = null;
gfx = null;
width = 0;
height = 0;

// This is a safe way of isolating an entry point for your program
window.onload = function(){
	canvas = document.getElementById('canvas');
	gfx = canvas.getContext('2d');
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	requestAnimationFrame(frame);
};


/*


*/

function update(dt) {
	
}

function redraw(dt) {
	gfx.clearRect(0,0,width,height);


}
