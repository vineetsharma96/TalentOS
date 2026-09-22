export interface VoiceSynthesisRequest {
  text: string;
  voiceId?: string;
  /** Speaking rate 0.5–2.0, default 1.0 */
  speed?: number;
}

export interface VoiceSynthesisResponse {
  /** Base64-encoded audio, or a signed URL if streaming */
  audioData?: string;
  audioUrl?: string;
  durationMs?: number;
  voiceId: string;
}

export interface VoiceTranscriptionRequest {
  /** Audio blob as base64 */
  audioData: string;
  mimeType: string;
}

export interface VoiceTranscriptionResponse {
  text: string;
  confidence: number;
  /** True if transcription confidence is low — show edit UI */
  lowConfidence: boolean;
}

export interface VoicePlaybackState {
  status: "idle" | "loading" | "playing" | "paused" | "error";
  durationMs?: number;
  progressMs?: number;
  errorMessage?: string;
}

export interface VoiceFeatureConfig {
  enabled: boolean;
  availableVoices: VoiceOption[];
  defaultVoiceId: string;
  maxTextLength: number;
}

export interface VoiceOption {
  id: string;
  name: string;
  preview?: string;
}
