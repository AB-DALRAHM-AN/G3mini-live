"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_VOICES } from "../services/geminiWebSocket";

const MODELS = {
  NATIVE_AUDIO_DIALOG: "models/gemini-2.5-flash-preview-native-audio-dialog",
  NATIVE_AUDIO_THINKING:
    "models/gemini-2.5-flash-exp-native-audio-thinking-dialog",
  FLASH_LIVE: "models/gemini-2.0-flash-live-001",
};

const MODEL_DESCRIPTIONS = {
  [MODELS.NATIVE_AUDIO_DIALOG]:
    "Gemini 2.5 Flash - Native Audio Dialog (Most natural speech)",
  [MODELS.NATIVE_AUDIO_THINKING]:
    "Gemini 2.5 Flash - Native Audio Thinking (With reasoning)",
  [MODELS.FLASH_LIVE]: "Gemini 2.0 Flash Live (Half-cascade audio)",
};

const VOICE_DESCRIPTIONS = {
  Zephyr: "Bright, Higher pitch",
  Puck: "Upbeat, Middle pitch",
  Charon: "Informative, Lower pitch",
  Kore: "Firm, Middle pitch",
  Fenrir: "Excitable, Lower middle pitch",
  Leda: "Youthful, Higher pitch",
  Orus: "Firm, Lower middle pitch",
  Aoede: "Breezy, Middle pitch",
  Callirrhoe: "Easy-going, Middle pitch",
  Autonoe: "Bright, Middle pitch",
  Enceladus: "Breathy, Lower pitch",
  Iapetus: "Clear, Lower middle pitch",
};

interface VoiceConfig {
  voiceName: string;
  model: string;
}

interface VoiceSelectionPanelProps {
  currentVoice: string;
  currentModel: string;
  onVoiceConfigChange: (config: VoiceConfig) => void;
  isConnected: boolean;
}

export default function VoiceSelectionPanel({
  currentVoice,
  currentModel,
  onVoiceConfigChange,
  isConnected,
}: VoiceSelectionPanelProps) {
  const [selectedVoice, setSelectedVoice] = useState(currentVoice);
  const [selectedModel, setSelectedModel] = useState(currentModel);

  const handleApplyChanges = () => {
    onVoiceConfigChange({
      voiceName: selectedVoice,
      model: selectedModel,
    });
  };

  const hasChanges =
    selectedVoice !== currentVoice || selectedModel !== currentModel;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          🎵 Voice & Model Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Model</label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {Object.entries(MODEL_DESCRIPTIONS).map(
                ([modelKey, description]) => (
                  <SelectItem
                    key={modelKey}
                    value={modelKey}
                    className="text-white hover:bg-gray-600"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {modelKey.split("/").pop()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {description}
                      </span>
                    </div>
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Voice Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Voice</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600 max-h-60">
              {AVAILABLE_VOICES.map((voice) => (
                <SelectItem
                  key={voice}
                  value={voice}
                  className="text-white hover:bg-gray-600"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{voice}</span>
                    <span className="text-xs text-gray-400">
                      {VOICE_DESCRIPTIONS[
                        voice as keyof typeof VOICE_DESCRIPTIONS
                      ] || "Voice description"}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Status */}
        <div className="bg-gray-700 p-3 rounded-lg space-y-1">
          <div className="text-xs text-gray-400">Current Configuration:</div>
          <div className="text-sm text-white">
            <div>🤖 {currentModel.split("/").pop()}</div>
            <div>🎤 {currentVoice}</div>
            <div
              className={`inline-flex items-center gap-1 ${
                isConnected ? "text-green-400" : "text-red-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-400" : "bg-red-400"
                }`}
              ></div>
              {isConnected ? "Connected" : "Disconnected"}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        {hasChanges && (
          <Button
            onClick={handleApplyChanges}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isConnected}
          >
            {isConnected ? "Disconnect to Change Settings" : "Apply Changes"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
