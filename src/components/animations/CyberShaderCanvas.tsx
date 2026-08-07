import React, { useEffect, useRef } from 'react';

interface CyberShaderCanvasProps {
  className?: string;
  variant?: 'cyber' | 'scanner' | 'auth';
}

export const CyberShaderCanvas: React.FC<CyberShaderCanvasProps> = ({
  className = "fixed inset-0 w-full h-full pointer-events-none -z-10",
  variant = 'cyber',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext);
    if (!gl) return;

    const syncSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();

    let animationFrameId: number;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fsCyber = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

float grid(vec2 uv, float res) {
    vec2 grid = fract(uv * res);
    return 1.0 - smoothstep(0.0, 0.04, min(grid.x, grid.y));
}

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float particles(vec2 uv, float t) {
    vec2 id = floor(uv * 12.0);
    vec2 gv = fract(uv * 12.0) - 0.5;
    float n = hash(id);
    float pSize = sin(t * 2.0 + n * 6.28) * 0.5 + 0.5;
    float dist = length(gv - vec2(sin(t + n * 10.0) * 0.3, cos(t * 0.7 + n * 5.0) * 0.3));
    return smoothstep(0.15 * pSize, 0.0, dist) * step(0.65, n);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    vec2 puv = uv * 2.0 - 1.0;
    puv.y /= (1.1 - puv.y * 0.3);
    
    vec3 color = vec3(0.02, 0.03, 0.08);
    float g1 = grid(puv + vec2(0.0, u_time * 0.05), 18.0) * 0.12;
    float g2 = grid(puv + vec2(u_time * 0.02, u_time * 0.03), 36.0) * 0.07;
    
    vec3 cyan = vec3(0.0, 0.9, 1.0);
    vec3 purple = vec3(0.48, 0.23, 0.93);
    
    float pulse = smoothstep(0.9, 0.0, distance(uv, vec2(0.5) + 0.2 * vec2(sin(u_time * 0.4), cos(u_time * 0.3))));
    color += g1 * cyan;
    color += g2 * purple;
    color += pulse * purple * 0.18;
    
    // Floating cyber particles
    float p = particles(uv, u_time * 0.8);
    color += p * cyan * 0.35;
    
    float mDist = distance(uv, mouse);
    color += smoothstep(0.45, 0.0, mDist) * cyan * 0.12;
    color *= 1.0 - smoothstep(0.5, 1.6, length(uv * 2.0 - 1.0));
    gl_FragColor = vec4(color, 1.0);
}`;

    const fsScanner = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

float grid(vec2 uv, float res) {
    vec2 grid = fract(uv * res);
    return 1.0 - smoothstep(0.0, 0.03, min(grid.x, grid.y));
}

float pulse(vec2 uv, vec2 center, float radius, float width) {
    float d = distance(uv, center);
    return smoothstep(radius + width, radius, d) * smoothstep(radius - width, radius, d);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    vec2 puv = uv * 2.0 - 1.0;
    puv.y /= (1.2 - puv.y * 0.4);
    
    vec3 color = vec3(0.02, 0.03, 0.08);
    float g1 = grid(puv + vec2(0.0, u_time * 0.05), 20.0) * 0.15;
    float beamPos = fract(u_time * 0.2);
    float beam = smoothstep(0.02, 0.0, abs(uv.y - beamPos)) * 0.2;
    float r1 = pulse(uv, vec2(0.5), 0.3 + 0.1 * sin(u_time), 0.01) * 0.1;
    
    vec3 cyan = vec3(0.0, 0.9, 1.0);
    vec3 purple = vec3(0.48, 0.23, 0.93);
    
    color += g1 * cyan;
    color += beam * cyan;
    color += r1 * purple;
    
    float mDist = distance(uv, mouse);
    color += smoothstep(0.4, 0.0, mDist) * cyan * 0.1;
    color *= 1.0 - smoothstep(0.5, 1.5, length(uv * 2.0 - 1.0));
    gl_FragColor = vec4(color, 1.0);
}`;

    const fsSource = variant === 'scanner' ? fsScanner : fsCyber;

    function createShader(type: number, src: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    }

    const vertShader = createShader(gl.VERTEX_SHADER, vs);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', syncSize);

    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', syncSize);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={className} />;
};
