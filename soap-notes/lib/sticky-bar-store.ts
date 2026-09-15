// Tiny pub-sub so the hero sentinel (which decides visibility) and the sticky
// buy bar (fixed at the page bottom, far away in the tree) can stay in sync
// without threading state through the whole page.
type Listener = (visible: boolean) => void;

let visible = false;
const listeners = new Set<Listener>();

export function setStickyBarVisible(next: boolean) {
  if (next === visible) return;
  visible = next;
  listeners.forEach((listener) => listener(visible));
}

export function subscribeStickyBar(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getStickyBarVisible() {
  return visible;
}

export function getStickyBarVisibleServerSnapshot() {
  return false;
}
