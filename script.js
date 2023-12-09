

const mousePosition = {
    x: 0,
    y: 0
};


/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} mouseX 
 * @param {number} mouseY 
 * @returns {number}
 */
const calculateSquareSize = (x, y, mouseX, mouseY) => {
    const distanceX = Math.abs(x - mouseX);
    const distanceY = Math.abs(y - mouseY);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance > 100) {
        return 1;
    }
    if (distance > 50) {
        return 2;
    }
    if (distance > 25) {
        return 3;
    }
    return 4;
}

const displaySquares = () => {
    /** @type {HTMLCanvasElement | null} */
    const canvas = document.getElementById("bg");

    if(canvas){
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw a small square every 50 pixels
        for (let x = 0; x < canvas.width; x += 25) {
            for (let y = 0; y < canvas.height; y += 25) {
                const squareSize = calculateSquareSize(x, y, mousePosition.x, mousePosition.y);
                const half = squareSize / 2;
                ctx.fillStyle = "#9003fc";
                ctx.fillRect(x - half,  y- half, squareSize, squareSize);
            }
        }
        
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(mousePosition.x, mousePosition.y, 15, 15, 0, 0, 2 * Math.PI);    
        ctx.stroke()
    
    }
}


const setupCanvas = () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById("bg");
    if(canvas){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

window.addEventListener("resize", setupCanvas);

setupCanvas();
displaySquares();

document.onmousemove = (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
}

setInterval(displaySquares, 1000 / 60);
