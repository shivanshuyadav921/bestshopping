"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { usePwa } from "@/contexts/PwaContext";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  LayoutDashboard,
  Binary,
  Layers,
  ShieldAlert,
  Moon,
  Sun,
  Monitor,
  Database,
  BellRing,
  Cpu,
  Clock,
  Eye
} from "lucide-react";
import { toast } from "sonner";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toggleTheme, theme, resolvedTheme } = useTheme();
  const { triggerMockPush, isOnline, offlineQueueLength } = usePwa();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateTo = (path: string) => {
    setOpen(false);
    toast.info(`Navigating to ${path}...`);
    router.push(path);
  };

  const handleAction = async (actionName: string) => {
    setOpen(false);
    
    if (actionName === "backup") {
      toast.promise(
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/observability/metrics`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "backup" })
        }).then(async (res) => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        }),
        {
          loading: "Executing database backup task...",
          success: (data) => data.message || "Database backup generated successfully!",
          error: "Backup action failed. Verify Admin credentials."
        }
      );
    } else if (actionName === "push") {
      triggerMockPush(
        "PREMA HUD Alert",
        "Command Palette triggered manual push notification check."
      );
      toast.success("Dispatched manual push notification!");
    } else if (actionName === "theme") {
      if (toggleTheme) {
        toggleTheme();
        const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        toast.success(`Switched theme to ${nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)} mode!`);
      } else {
        toast.error("Theme switcher context is disabled.");
      }
    }
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="PREMA Command HUD"
      description="Quick access to tools, database management, and system navigation."
      className="border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl max-w-lg overflow-hidden"
    >
      <CommandInput placeholder="Type a command or search platform..." />
      <CommandList className="max-h-[340px] scroll-py-2 font-sans">
        <CommandEmpty>No matches found in database.</CommandEmpty>
        
        {/* Navigation Group */}
        <CommandGroup heading="System Navigation">
          <CommandItem onSelect={() => navigateTo("/")}>
            <Home className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Landing Home</span>
            <CommandShortcut>G H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/dashboard")}>
            <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Administrative Dashboard</span>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/command-center")}>
            <Binary className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Go to Engineering Command Center</span>
            <CommandShortcut>G C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/products")}>
            <Cpu className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Browse Products Directory</span>
            <CommandShortcut>G P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/timeline")}>
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>View Orders Live Timeline</span>
            <CommandShortcut>G T</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/verify")}>
            <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Verify Compliance Certificates</span>
            <CommandShortcut>G Q</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {/* Quick Operations Group */}
        <CommandGroup heading="System Controls">
          <CommandItem onSelect={() => handleAction("theme")}>
            {resolvedTheme === "light" ? (
              <Moon className="mr-2 h-4 w-4 text-muted-foreground" />
            ) : (
              <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>Toggle Contrast Theme (Current: {theme.charAt(0).toUpperCase() + theme.slice(1)})</span>
            <CommandShortcut>T H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleAction("backup")}>
            <Database className="mr-2 h-4 w-4 text-accent" />
            <span className="font-medium">Execute Database Backup Dump</span>
            <CommandShortcut>Ctrl+B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => handleAction("push")}>
            <BellRing className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Simulate Push Notification Banner</span>
            <CommandShortcut>Ctrl+P</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {/* Network & Offline Status */}
        <CommandGroup heading="Network & Service Worker Status">
          <CommandItem disabled>
            <div className="flex items-center w-full justify-between">
              <span className="flex items-center">
                <span className={`w-2.5 h-2.5 rounded-full mr-2 ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                Network Connection: {isOnline ? "Online" : "Offline"}
              </span>
              {offlineQueueLength > 0 && (
                <span className="text-xs bg-accent/25 text-accent px-1.5 py-0.5 rounded font-mono">
                  {offlineQueueLength} Sync Queue
                </span>
              )}
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
