"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface UseVoicePlaybackReturn {
  status: "idle" | "loading" | "playing" | "paused" | "error";
  play: (text: string, voiceId?: string) => Promise<void>;
  pause: () => void;
  stop: () => void;
  errorMessage: string | null;
  isMock: boolean;
}

export function useVoicePlayback(): UseVoicePlaybackReturn {
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "paused" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
    }
    setStatus("idle");
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setStatus("paused");
    } else if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus("paused");
    }
  }, []);

  const play = useCallback(
    async (text: string, voiceId?: string) => {
      stop();
      setStatus("loading");
      setErrorMessage(null);

      try {
        const res = await fetch("/api/voice/synthesize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voiceId }),
        });

        if (!res.ok) {
          throw new Error(`Voice synthesis failed (${res.status})`);
        }

        const data = await res.json();

        if (data.audioData) {
          // Real ElevenLabs audio returned
          setIsMock(false);
          const audio = new Audio(data.audioData);
          audioRef.current = audio;

          audio.onended = () => setStatus("idle");
          audio.onerror = () => {
            setErrorMessage("Audio playback failed");
            setStatus("error");
          };

          await audio.play();
          setStatus("playing");
        } else {
          // Fallback to Web Speech API
          setIsMock(true);
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(data.fallbackText || text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onend = () => setStatus("idle");
            utterance.onerror = (e) => {
              if (e.error !== "canceled") {
                setErrorMessage("Speech synthesis error");
                setStatus("error");
              } else {
                setStatus("idle");
              }
            };
            utteranceRef.current = utterance;
            window.speechSynthesis.speak(utterance);
            setStatus("playing");
          } else {
            setStatus("idle");
          }
        }
      } catch (err) {
        console.error("[useVoicePlayback] Error:", err);
        setErrorMessage(err instanceof Error ? err.message : "Playback error");
        setStatus("error");
      }
    },
    [stop]
  );

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    status,
    play,
    pause,
    stop,
    errorMessage,
    isMock,
  };
}
