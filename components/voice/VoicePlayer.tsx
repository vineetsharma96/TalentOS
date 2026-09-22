"use client";

import React from "react";
import { useVoicePlayback } from "@/hooks/use-voice-playback";
import { Volume2, VolumeX, Loader2, Sparkles } from "lucide-react";

interface VoicePlayerProps {
  text: string;
  label?: string;
  voiceId?: string;
  compact?: boolean;
}

export function VoicePlayer({ text, label = "Listen to Voice AI", voiceId, compact = false }: VoicePlayerProps) {
  const { status, play, stop, isMock } = useVoicePlayback();

  const isPlaying = status === "playing";
  const isLoading = status === "loading";

  const handleToggle = () => {
    if (isPlaying) {
      stop();
    } else {
      play(text, voiceId);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        title={isPlaying ? "Stop voice narration" : "Play voice narration"}
        className="inline-flex items-center justify-center p-2 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-white/40"
        style={{
          background: isPlaying ? "rgba(0, 240, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
          border: `1px solid ${isPlaying ? "#00F0FF" : "rgba(255,255,255,0.1)"}`,
          color: isPlaying ? "#00F0FF" : "#808080",
        }}
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin text-[#00F0FF]" />
        ) : isPlaying ? (
          <VolumeX size={14} className="text-[#00F0FF] animate-pulse" />
        ) : (
          <Volume2 size={14} className="hover:text-white" />
        )}
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all group focus:outline-none focus:ring-1 focus:ring-white/40"
        style={{
          background: isPlaying ? "rgba(0, 240, 255, 0.12)" : "rgba(255, 255, 255, 0.04)",
          border: `1px solid ${isPlaying ? "#00F0FF" : "rgba(255, 255, 255, 0.12)"}`,
          color: isPlaying ? "#00F0FF" : "#c6c6c6",
          fontFamily: "var(--font-nbarchitekt, sans-serif)",
        }}
      >
        {isLoading ? (
          <Loader2 size={13} className="animate-spin text-[#00F0FF]" />
        ) : isPlaying ? (
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-[#00F0FF] animate-pulse rounded-full" />
            <span className="w-1 h-4 bg-[#00F0FF] animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-2 bg-[#00F0FF] animate-pulse delay-150 rounded-full" />
          </div>
        ) : (
          <Volume2 size={13} className="text-[#808080] group-hover:text-white" />
        )}

        <span>{isPlaying ? "Stop Audio" : label}</span>

        {!isMock && (
          <span className="flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-[#808080]">
            <Sparkles size={10} className="text-amber-400" /> ElevenLabs
          </span>
        )}
      </button>
    </div>
  );
}
