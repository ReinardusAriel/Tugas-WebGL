const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    console.error("WebGL not supported");
}

const vsSource = `
    attribute vec4 aVertexPosition;
    void main(void) {
        gl_Position = aVertexPosition;
    }
`;

const fsSource = `
    precision mediump float;
    uniform vec4 uColor;
    void main(void) {
        gl_FragColor = uColor;
    }
`;


const shaderProgram = initShaderProgram(vsSource, fsSource);
gl.useProgram(shaderProgram);

const position = gl.getAttribLocation(shaderProgram, "aVertexPosition");

const vertexBuffer = gl.createBuffer();

const vertices = new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
    -0.5,  0.5,
]);


gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(position);

let currentColor = [1.0, 1.0, 1.0, 1.0];
const colorLocation = gl.getUniformLocation(shaderProgram, "uColor");

function initShaderProgram(vsSource, fsSource) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    return shaderProgram;
}

function changeColor(color) {
    currentColor = color;
    draw();
}

function resetColor() {
    currentColor = [1.0, 1.0, 1.0, 1.0]; 
    draw();
}

function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform4fv(colorLocation, currentColor);
    gl.drawArrays(gl.TRIANGLES, 0, 4);
}
draw();
