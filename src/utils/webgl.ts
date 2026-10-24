import * as THREE from 'three';

/**
 * Detect software WebGL to dynamically adjust render budgets
 * (SwiftShader, llvmpipe, WARP, headless browser)
 */
export const isSoftwareGl = (() => {
  if (typeof document === 'undefined') return true;
  try {
    const gl = document.createElement('canvas').getContext('webgl2') || 
               document.createElement('canvas').getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as WebGLRenderingContext).RENDERER;
    const gpu = String((gl as WebGLRenderingContext).getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
})();

/**
 * Paced afterDraw helper for software WebGL to prevent starvation
 */
export function scheduleNextFrame(renderer: THREE.WebGLRenderer, callback: () => void): number {
  if (!isSoftwareGl) {
    return requestAnimationFrame(callback);
  }

  const gl = renderer.getContext() as WebGL2RenderingContext;
  if (!gl || typeof gl.fenceSync !== 'function') {
    return window.setTimeout(callback, 50);
  }

  try {
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    let timerId = 0;
    const poll = () => {
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        timerId = window.setTimeout(poll, 10);
      } else {
        if (sync) gl.deleteSync(sync);
        timerId = window.setTimeout(callback, 60);
      }
    };
    timerId = window.setTimeout(poll, 10);
    return timerId;
  } catch {
    return window.setTimeout(callback, 50);
  }
}

// Module-level pre-allocated vectors to prevent GC
export const _vec3A = new THREE.Vector3();
export const _vec3B = new THREE.Vector3();
export const _colorA = new THREE.Color();
export const _matrixA = new THREE.Matrix4();
