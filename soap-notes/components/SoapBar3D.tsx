"use client";

import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import styles from "./SoapBar3D.module.css";

type SoapBarMode = "bar" | "trio" | "box";

type SoapBar3DProps = {
  mode?: SoapBarMode;
  tone?: string;
  label?: string;
  sub?: string;
  band?: string;
  accent?: string;
  className?: string;
  style?: CSSProperties;
};

// Registers the <soap-bar-3d> custom element exactly once, client-side only —
// the module touches `document`/`customElements` at load time, which don't
// exist during the server render pass.
let registration: Promise<unknown> | null = null;
function registerSoapBar3D() {
  if (!registration) registration = import("@/lib/soap-bar-3d");
  return registration;
}

// WebGL support never changes mid-session, so this is a snapshot with no
// subscription — useSyncExternalStore lets us read it during render (instead
// of setState-in-an-effect) while still rendering the SSR-safe "assume
// supported" branch on the server and on the client's first paint.
let cachedWebglSupport: boolean | null = null;
function getWebglSupportSnapshot() {
  if (cachedWebglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      cachedWebglSupport = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
      );
    } catch {
      cachedWebglSupport = false;
    }
  }
  return cachedWebglSupport;
}
function getWebglSupportServerSnapshot() {
  return true;
}
function subscribeWebglSupport() {
  return () => {};
}

function setOrRemoveAttribute(el: HTMLElement, name: string, value?: string) {
  if (value === undefined || value === null || value === "") el.removeAttribute(name);
  else el.setAttribute(name, value);
}

export default function SoapBar3D({
  mode = "bar",
  tone,
  label,
  sub,
  band,
  accent,
  className,
  style,
}: SoapBar3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLElement | null>(null);
  const webglOk = useSyncExternalStore(
    subscribeWebglSupport,
    getWebglSupportSnapshot,
    getWebglSupportServerSnapshot
  );

  useEffect(() => {
    if (!webglOk || !hostRef.current) return;
    let cancelled = false;
    registerSoapBar3D().then(() => {
      if (cancelled || !hostRef.current) return;
      const el = document.createElement("soap-bar-3d");
      el.style.width = "100%";
      el.style.height = "100%";
      el.setAttribute("mode", mode);
      hostRef.current.appendChild(el);
      elRef.current = el;
    });
    return () => {
      cancelled = true;
      elRef.current?.remove();
      elRef.current = null;
    };
    // mode is fixed per mount site in this design — no runtime mode switching.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webglOk]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    setOrRemoveAttribute(el, "tone", tone);
    setOrRemoveAttribute(el, "label", label);
    setOrRemoveAttribute(el, "sub", sub);
    setOrRemoveAttribute(el, "band", band);
    setOrRemoveAttribute(el, "accent", accent);
  });

  if (!webglOk) {
    return (
      <div
        className={[styles.fallback, className].filter(Boolean).join(" ")}
        style={style}
        role="img"
        aria-label={label ? `${label} soap bar` : "Soap Notes product"}
      >
        <span className={styles.fallbackMark} aria-hidden="true">
          {(label ?? "Soap Notes").charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
