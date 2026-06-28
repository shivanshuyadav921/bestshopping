/* PREMA ENGINEERING WORKS — Measured SVG Connector Hooks */
/*
 * Consolidated from three independent implementations that previously
 * lived inline in Industries.tsx (`useNetworkConnectors`), and
 * byte-for-byte duplicated between QualityVerification.tsx and
 * EmergencyBreakdownCenter.tsx (`useStageConnector`).
 *
 * Both hooks share the same measurement technique — useLayoutEffect +
 * ResizeObserver + getBoundingClientRect, no hard-coded coordinates —
 * and the same curved-path math, factored out into `buildCurvedPath`
 * below. They differ only in shape:
 *
 *  - useHubConnectors: one fixed hub node fanning out to N named target
 *    nodes (Industries.tsx's industry → {challenges, products, solutions,
 *    applications} network).
 *
 *  - useStageConnector: one *selectable* source (looked up by id from a
 *    registry, since the active timeline button changes) connecting to a
 *    single target (QualityVerification's and EmergencyBreakdownCenter's
 *    timeline → visualization-panel connector).
 */

import { useLayoutEffect, useState } from 'react';
import type { Point } from '@/types/engineering';

export interface ConnectorPath {
  id: string;
  d: string;
}

interface MeasuredSize {
  w: number;
  h: number;
}

/** Builds a cubic-bezier path between two anchors, curving horizontally
 *  when the anchors sit side-by-side and vertically when stacked. This is
 *  the exact curve formula both connector hooks used independently. */
function buildCurvedPath(source: Point, target: Point, isRow: boolean): string {
  return isRow
    ? `M ${source.x} ${source.y} C ${source.x + (target.x - source.x) * 0.5} ${source.y}, ${source.x + (target.x - source.x) * 0.5} ${target.y}, ${target.x} ${target.y}`
    : `M ${source.x} ${source.y} C ${source.x} ${source.y + (target.y - source.y) * 0.5}, ${target.x} ${source.y + (target.y - source.y) * 0.5}, ${target.x} ${target.y}`;
}

/**
 * Hub-and-spoke connector: one fixed hub node, many named target nodes.
 * Used by Industries.tsx's industry → category network.
 *
 * Row vs. column orientation is read from the wrapping flex container's
 * computed `flex-direction` (Industries lays the hub and its category
 * grid out in a `flex-col lg:flex-row` wrapper), so the same hook works
 * unchanged across the desktop/mobile breakpoint.
 */
export function useHubConnectors(
  containerRef: any,
  flexRef: any,
  hubRef: any,
  nodeRefs: any,
  deps: unknown[]
) {
  const [paths, setPaths] = useState<ConnectorPath[]>([]);
  const [hubAnchor, setHubAnchor] = useState<Point | null>(null);
  const [size, setSize] = useState<MeasuredSize>({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const flexEl = flexRef.current;
    const hub = hubRef.current;
    if (!container || !flexEl || !hub) return;

    const recompute = () => {
      const cRect = container.getBoundingClientRect();
      setSize({ w: cRect.width, h: cRect.height });

      const isRow = window.getComputedStyle(flexEl).flexDirection === 'row';

      const hRect = hub.getBoundingClientRect();
      const hAnchor: Point = isRow
        ? { x: hRect.right - cRect.left, y: hRect.top + hRect.height / 2 - cRect.top }
        : { x: hRect.left + hRect.width / 2 - cRect.left, y: hRect.bottom - cRect.top };
      setHubAnchor(hAnchor);

      const nextPaths: ConnectorPath[] = [];
      const registry = nodeRefs.current || {};
      Object.keys(registry).forEach((id) => {
        const el = registry[id];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nAnchor: Point = isRow
          ? { x: r.left - cRect.left, y: r.top + r.height / 2 - cRect.top }
          : { x: r.left + r.width / 2 - cRect.left, y: r.top - cRect.top };

        nextPaths.push({ id, d: buildCurvedPath(hAnchor, nAnchor, isRow) });
      });
      setPaths(nextPaths);
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    window.addEventListener('resize', recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { paths, hubAnchor, size };
}

/**
 * Single source → single target connector, where the source is resolved
 * by id from a registry on every measurement pass (not a pre-resolved
 * ref) — the active timeline button changes identity as the user clicks
 * through stages, so the lookup has to happen inside the layout effect,
 * after the button refs for the newly-active id are guaranteed to have
 * committed. Resolving it any earlier (e.g. during render) can leave the
 * very first connector path stuck at `null` until the user changes
 * stages once.
 *
 * Used by QualityVerification.tsx (timeline → visualization panel) and
 * EmergencyBreakdownCenter.tsx (identical layout, same need).
 *
 * Orientation (side-by-side vs. stacked) is inferred from the measured
 * geometry itself — whether the target's left edge sits at or past the
 * source's right edge — rather than from a CSS flex-direction read,
 * since this layout's container is a CSS grid, not a flex wrapper.
 */
export function useStageConnector(
  containerRef: any,
  sourceRegistry: any,
  sourceId: string,
  targetRef: any,
  deps: unknown[]
) {
  const [path, setPath] = useState<string | null>(null);
  const [size, setSize] = useState<MeasuredSize>({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recompute = () => {
      const cRect = container.getBoundingClientRect();
      setSize({ w: cRect.width, h: cRect.height });

      const registry = sourceRegistry.current || {};
      const source = registry[sourceId];
      const target = targetRef.current;
      if (!source || !target) {
        setPath(null);
        return;
      }

      const sRect = source.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      const isSideBySide = tRect.left >= sRect.right - 4;

      const sAnchor: Point = isSideBySide
        ? { x: sRect.right - cRect.left, y: sRect.top + sRect.height / 2 - cRect.top }
        : { x: sRect.left + sRect.width / 2 - cRect.left, y: sRect.bottom - cRect.top };
      const tAnchor: Point = isSideBySide
        ? { x: tRect.left - cRect.left, y: tRect.top + tRect.height / 2 - cRect.top }
        : { x: tRect.left + tRect.width / 2 - cRect.left, y: tRect.top - cRect.top };

      setPath(buildCurvedPath(sAnchor, tAnchor, isSideBySide));
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    window.addEventListener('resize', recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { path, size };
}
