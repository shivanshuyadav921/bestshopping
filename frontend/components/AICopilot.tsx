"use client";

import { useState, useRef, useCallback } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
    suggestions?: string[];
    category?: string;
    confidence?: number;
    timestamp: Date;
}

interface CopilotResponse {
    answer: string;
    category: string;
    confidence: number;
    suggestions: string[];
    ragTrace: { query: string; sourcesFound: number; topSource: string | null; searchStrategy: string };
    voiceReady: boolean;
    mcpReady: boolean;
}

const QUICK_PROMPTS = [
    { label: "EN24 Properties", prompt: "What are the properties of EN24?" },
    { label: "M12 Thread", prompt: "M12 thread pitch and torque" },
    { label: "H7/g6 Fit", prompt: "Explain H7/g6 fit" },
    { label: "Bearing 25mm", prompt: "Recommend bearing for 25mm shaft" },
    { label: "Tolerance IT7", prompt: "Suggest tolerance for 30mm bore" },
    { label: "DFM Rules", prompt: "DFM rules for pocket depth" },
    { label: "Surface Finish", prompt: "Surface finish reference" },
    { label: "Gear Calculator", prompt: "Gear module 2.5 with 40 teeth" },
];

function formatMarkdown(text: string): string {
    return text
        .replace(/### (.*)/g, '<h3 class="text-base font-bold text-white mb-2">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<span class="font-semibold text-white">$1</span>')
        .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-white/10 text-accent text-xs font-mono">$1</code>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>')
        .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(Boolean).map((c) => c.trim());
            return `<div class="flex gap-2 text-xs text-white/60">${cells.map((c) => `<span class="flex-1">${c}</span>`).join('')}</div>`;
        });
}

export default function AICopilot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "### PREMA Engineering Copilot\n\nWelcome! I'm your AI-powered engineering assistant. Ask me about materials, tolerances, bearings, threads, fits, surface finishes, gears, DFM guidelines, or order status.\n\n🎤 **Voice input** is available — click the microphone to speak.",
            suggestions: ["EN24 properties", "M12 thread", "H7/g6 fit", "Gear calculator"],
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || loading) return;

        const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/ai/copilot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            if (!res.ok) throw new Error("Failed to get response");

            const data: CopilotResponse = await res.json();

            const assistantMsg: Message = {
                role: "assistant",
                content: data.answer,
                suggestions: data.suggestions,
                category: data.category,
                confidence: data.confidence,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMsg]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I encountered an error. Please try again.", timestamp: new Date() },
            ]);
        } finally {
            setLoading(false);
            setTimeout(scrollToBottom, 100);
        }
    }, [loading]);

    /* ─── Voice Recognition (Web Speech API) ─── */
    const toggleVoice = useCallback(() => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition is not supported in this browser. Try Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            sendMessage(transcript);
            setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
    }, [isListening, sendMessage]);

    /* ─── Text-to-Speech for responses ─── */
    const speakResponse = useCallback((text: string) => {
        if (!("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const clean = text.replace(/[#*`|]/g, "").replace(/\n+/g, ". ");
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <section className="w-full">
            {/* Hero */}
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    AI Engineering Copilot
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/50 max-w-2xl">
                    Natural language engineering assistant with RAG-powered knowledge retrieval, voice input, and RBAC-scoped data access.
                </p>
            </div>

            {/* Chat Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                {/* Quick Prompts Sidebar */}
                <div className="lg:col-span-3 space-y-2">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Quick Prompts</p>
                    {QUICK_PROMPTS.map((qp) => (
                        <button
                            key={qp.label}
                            onClick={() => sendMessage(qp.prompt)}
                            className="w-full text-left px-3 py-2 text-xs text-white/60 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:text-white transition-colors"
                        >
                            {qp.label}
                        </button>
                    ))}
                    <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">Capabilities</p>
                        <ul className="space-y-1 text-[10px] text-white/40">
                            <li>🧪 Material properties & recommendations</li>
                            <li>⚙️ Bearing & thread selection</li>
                            <li>📐 Tolerance & fit calculations</li>
                            <li>📏 Surface finish & gear geometry</li>
                            <li>📋 DFM & GD&T guidelines</li>
                            <li>📦 Order tracking (RBAC-scoped)</li>
                            <li>🎤 Voice input support</li>
                        </ul>
                    </div>
                </div>

                {/* Chat Panel */}
                <div className="lg:col-span-9 flex flex-col border border-white/10 bg-white/[0.01]" style={{ height: "70vh" }}>
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[85%] p-3 text-sm ${msg.role === "user"
                                            ? "bg-accent/10 border border-accent/20 text-white"
                                            : "border border-white/10 bg-white/[0.03] text-white/80"
                                        }`}
                                >
                                    {msg.role === "assistant" ? (
                                        <div dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                                    ) : (
                                        <p>{msg.content}</p>
                                    )}

                                    {/* Suggestions */}
                                    {msg.suggestions && msg.suggestions.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-1.5">
                                            {msg.suggestions.map((s, j) => (
                                                <button
                                                    key={j}
                                                    onClick={() => sendMessage(s)}
                                                    className="px-2 py-1 text-[10px] font-mono text-accent/80 border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Meta */}
                                    {msg.role === "assistant" && (
                                        <div className="mt-2 flex items-center gap-3 text-[9px] text-white/30">
                                            <span>{msg.timestamp.toLocaleTimeString()}</span>
                                            {msg.category && <span className="uppercase">{msg.category}</span>}
                                            {msg.confidence !== undefined && <span>{Math.round(msg.confidence * 100)}% confidence</span>}
                                            <button onClick={() => speakResponse(msg.content)} className="hover:text-white/50">🔊</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/40">
                                    <span className="animate-pulse">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-white/10 p-3">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            {/* Voice Button */}
                            <button
                                type="button"
                                onClick={toggleVoice}
                                className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-all ${isListening
                                        ? "border-accent bg-accent/20 text-accent animate-pulse"
                                        : "border-white/10 text-white/40 hover:text-white/60"
                                    }`}
                                title={isListening ? "Stop listening" : "Voice input"}
                            >
                                {isListening ? (
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                        <rect x="9" y="2" width="6" height="12" rx="3" />
                                        <path d="M5 10v1a7 7 0 0014 0v-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="2" width="6" height="12" rx="3" />
                                        <path d="M5 10v1a7 7 0 0014 0v-1" />
                                        <line x1="12" y1="18" x2="12" y2="22" strokeLinecap="round" />
                                    </svg>
                                )}
                            </button>

                            {/* Input */}
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isListening ? "Listening..." : "Ask about materials, tolerances, bearings..."}
                                className="flex-1 bg-white/[0.02] border border-white/10 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30 transition-colors"
                                disabled={loading}
                            />

                            {/* Send */}
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="shrink-0 px-4 py-2.5 text-xs font-mono uppercase tracking-wider bg-accent text-white hover:bg-accent/90 disabled:opacity-30 transition-colors"
                            >
                                Send
                            </button>
                        </form>
                        <div className="mt-2 flex items-center justify-between text-[9px] text-white/30">
                            <span>RAG-powered with 12 knowledge sources</span>
                            <span>Voice: {typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) ? "✅ Available" : "❌ Not supported"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}