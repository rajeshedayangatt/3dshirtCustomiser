import * as THREE from "three";

class TextureManager {
  private loader = new THREE.TextureLoader();
  private cache = new Map<string, THREE.Texture>();
  private inFlight = new Map<string, boolean>();

  load(url: string, onLoad: (tex: THREE.Texture) => void) {
    if (this.cache.has(url)) {
      onLoad(this.cache.get(url)!);
      return;
    }

    if (this.inFlight.get(url)) return;

    this.inFlight.set(url, true);

    this.loader.load(
      url,
      (tex) => {
        tex.flipY = false;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;

        this.cache.set(url, tex);
        this.inFlight.delete(url);
        onLoad(tex);
      },
      undefined,
      () => {
        this.inFlight.delete(url);
      }
    );
  }

  dispose(url: string) {
    const tex = this.cache.get(url);
    if (tex) {
      tex.dispose();
      this.cache.delete(url);
    }
  }

  disposeAll() {
    this.cache.forEach((tex) => tex.dispose());
    this.cache.clear();
    this.inFlight.clear();
  }
}

export const textureManager = new TextureManager();

