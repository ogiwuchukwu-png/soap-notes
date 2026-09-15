// <soap-bar-3d> — branded 3D soap mockups for the page's product slots.
//
// ONE shared WebGLRenderer serves every instance: each element owns a cheap 2D
// canvas, and the shared renderer draws each scene in turn and blits the result
// in. Six live WebGL contexts got evicted by the browser; one never does.
//
// Ported from the Claude Design handoff nearly unchanged (see
// design_handoff_soap_notes_landing/soap-bar-3d.js) — the only addition is the
// prefers-reduced-motion check in _build(), which the handoff README flagged
// as a known gap in the original.
//
// Attributes:
//   mode   "bar" (default) | "trio" (three bars, hero) | "box" (drawer box + bars)
//   tone   soap body color (hex)
//   label  bar name stamped on the wrapper
//   sub    small line under the name on the wrapper
//   band   kraft wrapper color (default #D9CBA3)
//   accent stamp ink (default #6E2A2A)
//   spin   "0" to hold still (default: slow oscillation, unless the OS asks for reduced motion)
import * as THREE from "three";

const KRAFT = "#D9CBA3";
const CREAM = "#EDE4CC";
const OXBLOOD = "#6E2A2A";
const MAX_EDGE = 1400;

const live = new Set();
let shared = null;
let loopRunning = false;
let lastTick = 0;

function sharedRenderer() {
  if (shared) return shared;
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.setClearAlpha(0);
  const canvas = renderer.domElement;
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    shared = null;
  });
  canvas.addEventListener("webglcontextrestored", () => {
    live.forEach((el) => (el._dirty = true));
  });
  shared = renderer;
  return renderer;
}

function loop(t) {
  loopRunning = true;
  requestAnimationFrame(loop);
  if (t - lastTick < 33) return; // ~30fps is plenty for an idle turntable
  lastTick = t;
  const time = t / 1000;
  live.forEach((el) => el._frame(time));
}

function roundedPlateGeometry(w, d, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2,
    y = -d / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + d - r);
  s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
  s.lineTo(x + r, y + d);
  s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const bevel = Math.min(0.004, h * 0.16);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: h - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 12,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeBoundingBox();
  const b = geo.boundingBox;
  geo.translate(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
  return geo;
}

function stampTexture(label, sub, band, accent) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const g = c.getContext("2d");
  g.fillStyle = band;
  g.fillRect(0, 0, c.width, c.height);
  g.globalAlpha = 0.05;
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = i % 2 ? "#000" : "#fff";
    g.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
  }
  g.globalAlpha = 1;
  g.strokeStyle = accent;
  g.globalAlpha = 0.5;
  g.lineWidth = 3;
  g.strokeRect(54, 54, c.width - 108, c.height - 108);
  g.globalAlpha = 1;
  g.textAlign = "center";
  g.fillStyle = accent;
  g.font = "500 44px Karla, Helvetica, sans-serif";
  g.fillText("S O A P   N O T E S", c.width / 2, 170);
  g.font = "500 132px Lora, Georgia, serif";
  g.fillText(label || "Soap Notes", c.width / 2, 312);
  if (sub) {
    g.font = "400 40px Karla, Helvetica, sans-serif";
    g.globalAlpha = 0.85;
    g.fillText(sub.toUpperCase(), c.width / 2, 386);
    g.globalAlpha = 1;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function wrappedBar(opts) {
  const {
    tone,
    label,
    sub,
    band,
    accent,
    length = 0.088,
    depth = 0.062,
    height = 0.03,
  } = opts;
  const group = new THREE.Group();
  const soapMat = new THREE.MeshStandardMaterial({
    color: tone,
    roughness: 0.62,
    metalness: 0,
  });
  soapMat.name = "soap";
  const soap = new THREE.Mesh(
    roundedPlateGeometry(length, depth, height, 0.009),
    soapMat
  );
  soap.name = "bar";
  soap.castShadow = true;
  soap.receiveShadow = true;
  group.add(soap);

  const kraftMat = new THREE.MeshStandardMaterial({
    color: band,
    roughness: 0.92,
    metalness: 0,
  });
  kraftMat.name = "kraft";
  const stampMat = new THREE.MeshStandardMaterial({
    map: stampTexture(label, sub, band, accent),
    roughness: 0.9,
  });
  stampMat.name = "kraft-stamped";
  const bw = length * 0.58;
  const bandGeo = new THREE.BoxGeometry(bw, height + 0.0016, depth + 0.0016);
  // face order: +x, -x, +y, -y, +z, -z — the stamp reads on the top face
  const bandMesh = new THREE.Mesh(bandGeo, [
    kraftMat,
    kraftMat,
    stampMat,
    kraftMat,
    kraftMat,
    kraftMat,
  ]);
  bandMesh.name = "wrapper";
  bandMesh.position.y = (height + 0.0016) / 2;
  bandMesh.castShadow = true;
  group.add(bandMesh);
  return group;
}

function drawerBox(opts) {
  const { band, accent } = opts;
  const g = new THREE.Group();
  const kraft = new THREE.MeshStandardMaterial({ color: band, roughness: 0.93 });
  kraft.name = "kraftboard";
  const lining = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.88 });
  lining.name = "lining";

  const W = 0.2,
    D = 0.11,
    H = 0.05,
    T = 0.004;
  const sleeve = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(W, T, D), kraft);
  top.name = "sleeve-top";
  top.position.y = H - T / 2;
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(W, T, D), kraft);
  bottom.name = "sleeve-bottom";
  bottom.position.y = T / 2;
  const left = new THREE.Mesh(new THREE.BoxGeometry(T, H, D), kraft);
  left.name = "sleeve-left";
  left.position.set(-W / 2 + T / 2, H / 2, 0);
  const right = left.clone();
  right.name = "sleeve-right";
  right.position.x = W / 2 - T / 2;
  const back = new THREE.Mesh(new THREE.BoxGeometry(W, H, T), kraft);
  back.name = "sleeve-back";
  back.position.set(0, H / 2, -D / 2 + T / 2);
  [top, bottom, left, right, back].forEach((m) => {
    m.castShadow = true;
    m.receiveShadow = true;
    sleeve.add(m);
  });
  const markMat = new THREE.MeshStandardMaterial({
    map: stampTexture("Soap Notes", "the complete trio", band, accent),
    roughness: 0.9,
  });
  markMat.name = "sleeve-stamp";
  const mark = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.62, D * 0.62), markMat);
  mark.name = "brand-mark";
  mark.rotation.x = -Math.PI / 2;
  mark.position.set(0, H + 0.0005, 0);
  sleeve.add(mark);
  g.add(sleeve);

  const tray = new THREE.Group();
  tray.name = "tray";
  const tW = W - T * 2.6,
    tD = D - T * 2,
    tH = 0.026;
  const floor = new THREE.Mesh(new THREE.BoxGeometry(tW, T, tD), lining);
  floor.name = "tray-floor";
  floor.position.y = T * 1.2;
  const wallF = new THREE.Mesh(new THREE.BoxGeometry(tW, tH, T), kraft);
  wallF.name = "tray-front";
  wallF.position.set(0, tH / 2 + T, tD / 2 - T / 2);
  const wallB = wallF.clone();
  wallB.name = "tray-back";
  wallB.position.z = -tD / 2 + T / 2;
  const wallL = new THREE.Mesh(new THREE.BoxGeometry(T, tH, tD), kraft);
  wallL.name = "tray-left";
  wallL.position.set(-tW / 2 + T / 2, tH / 2 + T, 0);
  const wallR = wallL.clone();
  wallR.name = "tray-right";
  wallR.position.x = tW / 2 - T / 2;
  [floor, wallF, wallB, wallL, wallR].forEach((m) => {
    m.castShadow = true;
    m.receiveShadow = true;
    tray.add(m);
  });

  const tones = ["#EFE6D2", "#E9D2CC", "#EFE2C6"];
  const names = [
    ["Eros", "no. 01"],
    ["Kairos", "no. 02"],
    ["Logos", "no. 03"],
  ];
  tones.forEach((tone, i) => {
    const bar = wrappedBar({
      tone,
      label: names[i][0],
      sub: names[i][1],
      band,
      accent,
      length: 0.056,
      depth: 0.052,
      height: 0.022,
    });
    bar.name = "bar-" + names[i][0];
    bar.position.set(-0.055 + i * 0.055, T * 2, 0);
    bar.rotation.y = (i - 1) * 0.06;
    tray.add(bar);
  });
  tray.position.z = D * 0.42;
  g.add(tray);
  return g;
}

class SoapBar3D extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    this.style.display = "block";
    this.style.position = "relative";
    if (!this.style.width) this.style.width = "100%";

    this.view = document.createElement("canvas");
    Object.assign(this.view.style, { display: "block", width: "100%", height: "100%" });
    this.ctx = this.view.getContext("2d");
    this.appendChild(this.view);

    this._build();

    this._io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          live.add(this);
          this._dirty = true;
          if (!loopRunning) requestAnimationFrame(loop);
        } else {
          live.delete(this);
        }
      },
      { threshold: 0.02 }
    );
    this._io.observe(this);

    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this);
  }

  disconnectedCallback() {
    live.delete(this);
    if (this._io) this._io.disconnect();
    if (this._ro) this._ro.disconnect();
  }

  static get observedAttributes() {
    return ["accent", "band", "tone", "label", "sub"];
  }

  attributeChangedCallback() {
    if (!this._init) return;
    while (this.rig && this.rig.children.length) this.rig.remove(this.rig.children[0]);
    this._populate();
    this._dirty = true;
    this._frame(performance.now() / 1000);
  }

  _build() {
    const scene = new THREE.Scene();
    this.scene = scene;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9c9384, 0.85));
    const key = new THREE.DirectionalLight(0xfff6e8, 2.1);
    key.position.set(0.22, 0.34, 0.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.05;
    key.shadow.camera.far = 1.2;
    key.shadow.camera.left = -0.25;
    key.shadow.camera.right = 0.25;
    key.shadow.camera.top = 0.25;
    key.shadow.camera.bottom = -0.25;
    key.shadow.radius = 3;
    key.shadow.bias = -0.0004;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.45);
    fill.position.set(-0.3, 0.16, 0.12);
    scene.add(fill);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    this.rig = new THREE.Group();
    scene.add(this.rig);

    this.cam = new THREE.PerspectiveCamera(28, 1, 0.02, 4);
    const reducedMotion =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    this._spin = this.getAttribute("spin") !== "0" && !reducedMotion;
    this._phase = Math.random() * Math.PI * 2;
    this._populate();
    this._resize();
  }

  _populate() {
    const mode = this.getAttribute("mode") || "bar";
    const band = this.getAttribute("band") || KRAFT;
    const accent = this.getAttribute("accent") || OXBLOOD;
    const tone = this.getAttribute("tone") || "#EFE6D2";

    if (mode === "trio") {
      const tones = ["#EFE6D2", "#E9D2CC", "#EFE2C6"];
      const labels = [
        ["Agora", "the origin bar"],
        ["Eros", "no. 01"],
        ["Kairos", "no. 02"],
      ];
      tones.forEach((t, i) => {
        const bar = wrappedBar({ tone: t, label: labels[i][0], sub: labels[i][1], band, accent });
        bar.position.set((i - 1) * 0.074, 0, (i - 1) * 0.026);
        bar.rotation.y = (i - 1) * 0.1;
        this.rig.add(bar);
      });
      this._radius = 0.36;
      this._lift = 0.014;
    } else if (mode === "box") {
      this.rig.add(drawerBox({ band, accent }));
      this._radius = 0.42;
      this._lift = 0.035;
    } else {
      this.rig.add(
        wrappedBar({
          tone,
          label: this.getAttribute("label") || "Soap Notes",
          sub: this.getAttribute("sub") || "",
          band,
          accent,
        })
      );
      this._radius = 0.2;
      this._lift = 0.014;
    }
  }

  _resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = Math.max(1, Math.round((this.clientWidth || 320) * dpr));
    let h = Math.max(1, Math.round((this.clientHeight || 220) * dpr));
    const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
    w = Math.max(1, Math.round(w * scale));
    h = Math.max(1, Math.round(h * scale));
    if (this.view.width !== w || this.view.height !== h) {
      this.view.width = w;
      this.view.height = h;
    }
    this.cam.aspect = w / h;
    this.cam.updateProjectionMatrix();
    this._dirty = true;
    this._frame(performance.now() / 1000);
  }

  _frame(t) {
    const w = this.view.width,
      h = this.view.height;
    if (!w || !h) return;
    if (!this._spin && !this._dirty) return;

    const renderer = sharedRenderer();
    const gl = renderer.getContext();
    if (gl && gl.isContextLost && gl.isContextLost()) {
      shared = null;
      return;
    }

    const a = -0.52 + (this._spin ? Math.sin(t * 0.28 + this._phase) * 0.36 : 0);
    const r = this._radius;
    this.cam.position.set(Math.sin(a) * r, r * 0.62, Math.cos(a) * r);
    this.cam.lookAt(0, this._lift, 0);

    renderer.setSize(w, h, false);
    renderer.render(this.scene, this.cam);

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.drawImage(renderer.domElement, 0, 0, w, h);
    this._dirty = false;
  }
}

if (!customElements.get("soap-bar-3d")) customElements.define("soap-bar-3d", SoapBar3D);
