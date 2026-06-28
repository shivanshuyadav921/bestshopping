"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { usePwa } from "@/contexts/PwaContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { toast } from "sonner";

export default function ShortcutCheatSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const { toggleTheme, theme } = useTheme();
  const { triggerMockPush } = usePwa();

  const [lastKey, setLastKey] = useState<string | null>(null);
  const [lastTime, setLastTime] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form inputs/textarea/editable divs
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      const now = Date.now();
      const key = e.key.toLowerCase();

      // Check sequence triggers: G followed by H, D, C, P, T, Q
      if (lastKey === "g" && now - lastTime < 1000) {
        setLastKey(null);
        if (key === "h") {
          e.preventDefault();
          toast.info("Navigating Home...");
          router.push("/");
          return;
        } else if (key === "d") {
          e.preventDefault();
          toast.info("Navigating to Dashboard...");
          router.push("/dashboard");
          return;
        } else if (key === "c") {
          e.preventDefault();
          toast.info("Navigating to Command Center...");
          router.push("/command-center");
          return;
        } else if (key === "p") {
          e.preventDefault();
          toast.info("Navigating to Products...");
          router.push("/products");
          return;
        } else if (key === "t") {
          e.preventDefault();
          toast.info("Navigating to Timeline...");
          router.push("/timeline");
          return;
        } else if (key === "q") {
          e.preventDefault();
          toast.info("Navigating to Quality Verification...");
          router.push("/verify");
          return;
        }
      }

      // Check sequence triggers: T followed by H (Theme)
      if (lastKey === "t" && now - lastTime < 1000) {
        setLastKey(null);
        if (key === "h") {
          e.preventDefault();
          if (toggleTheme) {
            toggleTheme();
            const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
            toast.success(`Switched theme to ${nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)} mode!`);
          }
          return;
        }
      }

      // Check standard hotkeys: Ctrl+B (Database Backup)
      if ((e.ctrlKey || e.metaKey) && key === "b") {
        e.preventDefault();
        toast.promise(
          fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/observability/metrics`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "backup" })
          }).then(async (res) => {
            if (!res.ok) throw new Error();
            return res.json();
          }),
          {
            loading: "Running DB Backup...",
            success: (data) => data.message || "Database Backup Complete!",
            error: "Backup failed. Verify credentials."
          }
        );
        return;
      }

      // Check standard hotkeys: Ctrl+P (Push notification alert)
      if ((e.ctrlKey || e.metaKey) && key === "p") {
        e.preventDefault();
        triggerMockPush("PREMA Hotkey Event", "Ctrl+P triggered mock push banner.");
        toast.success("Triggered mock push notification alert.");
        return;
      }

      // Record key and time for sequences
      if (key === "g" || key === "t") {
        setLastKey(key);
        setLastTime(now);
      } else {
        setLastKey(null);
      }

      // Open Cheat Sheet Help modal on "?"
      if (e.key === "?") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastKey, lastTime, router, toggleTheme, triggerMockPush]);

  const shortcutGroups = [
    {
      title: "Global HUD Shortcuts",
      items: [
        { keys: ["Ctrl", "K"], description: "Toggle Command Palette HUD" },
        { keys: ["?"], description: "Open Keyboard Shortcuts Help Overlay" },
        { keys: ["Esc"], description: "Dismiss open dialogs / modal menus" }
      ]
    },
    {
      title: "Page Navigation Actions",
      items: [
        { keys: ["G", "H"], description: "Navigate to Landing Home Page" },
        { keys: ["G", "D"], description: "Navigate to Administrative Dashboard" },
        { keys: ["G", "C"], description: "Navigate to Engineering Command Center" },
        { keys: ["G", "P"], description: "Navigate to Products Directory" },
        { keys: ["G", "T"], description: "Navigate to Orders Live Timeline" },
        { keys: ["G", "Q"], description: "Navigate to Quality Verification" }
      ]
    },
    {
      title: "System Controls & Features",
      items: [
        { keys: ["T", "H"], description: "Toggle Contrast Theme (Light / Dark / System)" },
        { keys: ["Ctrl", "B"], description: "Execute Immediate Database Backup" },
        { keys: ["Ctrl", "P"], description: "Trigger Mock Push Notification" }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border/80 bg-card p-6 shadow-2xl z-10 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Keyboard className="h-5 w-5 text-accent animate-pulse" />
                <h2 className="text-lg font-bold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]">
                  Keyboard Shortcuts Helper
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close shortcuts dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Groups */}
            <div className="space-y-6">
              {shortcutGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-3">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent font-mono">
                    {group.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                    {group.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="flex items-center justify-between text-sm py-0.5 border-b border-border/20"
                      >
                        <span className="text-white/70 text-xs">{item.description}</span>
                        <div className="flex items-center gap-1">
                          {item.keys.map((key, kIdx) => (
                            <React.Fragment key={kIdx}>
                              {kIdx > 0 && <span className="text-[10px] text-muted-foreground font-mono">+</span>}
                              <Kbd className="bg-muted border-border/80 text-white font-mono text-[10px] shadow-sm">
                                {key}
                              </Kbd>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-border pt-4 text-center">
              <p className="text-[10px] text-muted-foreground font-mono">
                Press <Kbd className="bg-muted text-white text-[9px]">Esc</Kbd> or click outside to dismiss this panel.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
