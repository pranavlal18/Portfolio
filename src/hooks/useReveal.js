import { useEffect, useRef } from 'react';

/**
 * useReveal — mounts an IntersectionObserver that adds `.in` to every `.reveal`
 * element inside the returned root ref exactly once, then stops watching it.
 *
 * Ported from the reference reveal behavior: elements animate in the first time
 * they cross the viewport threshold and stay revealed. The observer disconnects
 * on cleanup; unsupported browsers get a safe no-op.
 *
 * Late-mounted nodes: sections rendered after this hook's mount (Tasks 2–5
 * appending `.reveal` markup) are picked up by a MutationObserver watching the
 * root for added subtrees, so later tasks only need to add `.reveal` classes.
 *
 * @param {Array<unknown>} [deps] effect re-run triggers. Defaults to run once
 *   per mount (the MutationObserver keeps the scan fresh without re-runs).
 * @returns {{current: Element|null}} ref to attach to the reveal container;
 *   falls back to document scope when the ref is never attached.
 */
export function useReveal(deps = []) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const root = rootRef.current ?? document;

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

    // Observe every `.reveal` inside `node` (and `node` itself when it is an
    // element — added subtrees may carry `.reveal` on their root).
    const watchSubtree = (node) => {
      if (node.nodeType !== 1) return;
      if (node.classList.contains('reveal')) observer.observe(node);
      node.querySelectorAll('.reveal').forEach((n) => observer.observe(n));
    };

    // Initial scan — may find zero nodes when sections mount later.
    root.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

    // Re-scan for .reveal nodes mounted after this effect ran.
    const mo =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver((records) => {
            records.forEach((record) => {
              record.addedNodes.forEach((node) => watchSubtree(node));
            });
          })
        : null;
    mo?.observe(root, { childList: true, subtree: true });

    return () => {
      mo?.disconnect();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

export default useReveal;
