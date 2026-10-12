import { useEffect, useRef } from 'react';

/**
 * useReveal — mounts an IntersectionObserver that adds `.in` to every `.reveal`
 * element inside the returned root ref exactly once, then stops watching it.
 *
 * Ported from the reference reveal behavior: elements animate in the first time
 * they cross the viewport threshold and stay revealed. The observer disconnects
 * on cleanup; unsupported browsers get a safe no-op.
 *
 * @param {Array<unknown>} [deps] effect re-run triggers (e.g. when new reveal
 *   nodes mount later). Defaults to run once per mount.
 * @returns {{current: Element|null}} ref to attach to the reveal container;
 *   falls back to document scope when the ref is never attached.
 */
export function useReveal(deps = []) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const root = rootRef.current ?? document;
    const nodes = root.querySelectorAll('.reveal');
    if (nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

export default useReveal;
