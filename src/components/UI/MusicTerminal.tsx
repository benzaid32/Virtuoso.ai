import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack, 
  Download,
  Volume2,
  VolumeX,
  Music,
  Mic,
  Users
} from 'lucide-react';
import { useMusicStore } from '../../stores/musicStore';

export const MusicTerminal: React.FC = () => {
  const {
    uploadedFile,
    generatedTrack,
    generationMode,
    selectedInstrument,
    selectedGroup,
    processingStage,
    processingProgress,
    isPlaying,
    currentTrack,
    audioEnabled,
    currentTime,
    setGenerationMode,
    setSelectedInstrument,
    setSelectedGroup,
    setUploadedFile,
    playTrack,
    pauseTrack,
    stopTrack,
    skipForward,
    skipBackward,
    startGeneration,
    resetSession,
    toggleAudio
  } = useMusicStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock file processing
      const mockFile = {
        id: `file_${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        duration: 180, // Mock duration
        waveformData: Array.from({ length: 100 }, () => Math.random() * 100),
        uploadedAt: new Date()
      };
      setUploadedFile(mockFile);
    }
  };

  const instrumentOptions = [
    { id: 'saxophone', name: 'Saxophone', icon: '🎷' },
    { id: 'harmonica', name: 'Harmonica', icon: '🎵' },
    { id: 'steelpan', name: 'Steel Pan', icon: '🥁' },
    { id: 'electric-guitar', name: 'Electric Guitar', icon: '🎸' }
  ];

  const groupOptions = [
    { id: 'orchestra', name: 'Orchestra', icon: '🎼' },
    { id: '60s-soul-band', name: "60's Soul Band", icon: '🎤' }
  ];

  const renderWaveform = (data: number[], isActive: boolean = false) => (
    <div className="flex items-end gap-1 h-16 bg-black border border-green-400 p-2">
      {data.map((value, index) => (
        <div
          key={index}
          className={`w-1 transition-all duration-300 ${
            isActive ? 'bg-yellow-400' : 'bg-green-400'
          }`}
          style={{ height: `${(value / 100) * 100}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm text-green-400 font-mono text-sm overflow-hidden pointer-events-none">
      {/* Terminal Header */}
      <div className="border-b border-green-400 p-4 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-yellow-400 font-bold text-lg" style={{ fontFamily: 'Orbitron, monospace' }}>
              🎵 VIRTUOSO.AI MUSIC GENERATOR 🎵
            </span>
            <span className="text-gray-400">|</span>
            <span>AI Music Engine v2.5.1</span>
            <span className="text-gray-400">|</span>
            <span>{currentTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="p-2 border border-green-400 hover:bg-green-400 hover:text-black transition-all"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            
            <button
              onClick={resetSession}
              className="px-3 py-1 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all text-xs"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex h-[calc(100vh-80px)] pointer-events-auto">
        {/* Left Panel - Import & Settings */}
        <div className="w-1/2 p-6 border-r border-green-400">
          <div className="h-full flex flex-col">
            {/* Import Section */}
            <div className="border border-green-400 p-4 mb-4">
              <div className="text-yellow-400 font-bold mb-3 border-b border-green-400 pb-2">
                📁 IMPORT AUDIO FILE
              </div>
              
              {!uploadedFile ? (
                <div className="text-center py-8">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 mx-auto px-6 py-3 border border-green-400 hover:bg-green-400 hover:text-black transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    SELECT AUDIO FILE
                  </button>
                  <div className="text-xs text-gray-400 mt-2">
                    Supports: WAV, MP3, FLAC
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-green-400">
                    ✓ {uploadedFile.name}
                  </div>
                  {renderWaveform(uploadedFile.waveformData)}
                  <div className="text-xs text-gray-400">
                    Duration: {Math.floor(uploadedFile.duration / 60)}:{(uploadedFile.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              )}
            </div>

            {/* Mode Selection */}
            <div className="border border-green-400 p-4 mb-4">
              <div className="text-yellow-400 font-bold mb-3 border-b border-green-400 pb-2">
                🎯 GENERATION MODE
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setGenerationMode('solo')}
                  className={`flex items-center gap-2 p-3 border transition-all ${
                    generationMode === 'solo' 
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' 
                      : 'border-green-400 hover:border-yellow-400'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  SOLO
                </button>
                
                <button
                  onClick={() => setGenerationMode('group')}
                  className={`flex items-center gap-2 p-3 border transition-all ${
                    generationMode === 'group' 
                      ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' 
                      : 'border-green-400 hover:border-yellow-400'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  GROUP
                </button>
              </div>

              {/* Instrument/Group Selection */}
              {generationMode === 'solo' && (
                <div>
                  <div className="text-xs text-gray-400 mb-2">Select Instrument:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {instrumentOptions.map((instrument) => (
                      <button
                        key={instrument.id}
                        onClick={() => setSelectedInstrument(instrument.id as any)}
                        className={`p-2 border text-xs transition-all ${
                          selectedInstrument === instrument.id
                            ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                            : 'border-green-400 hover:border-yellow-400'
                        }`}
                      >
                        {instrument.icon} {instrument.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {generationMode === 'group' && (
                <div>
                  <div className="text-xs text-gray-400 mb-2">Select Group:</div>
                  <div className="space-y-1">
                    {groupOptions.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id as any)}
                        className={`w-full p-2 border text-xs transition-all ${
                          selectedGroup === group.id
                            ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                            : 'border-green-400 hover:border-yellow-400'
                        }`}
                      >
                        {group.icon} {group.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="mt-auto">
              <button
                onClick={startGeneration}
                disabled={!uploadedFile || processingStage !== 'idle'}
                className="w-full flex items-center justify-center gap-2 p-4 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                <Music className="w-5 h-5" />
                {processingStage === 'idle' ? 'GENERATE AI MUSIC' : 'PROCESSING...'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Output & Controls */}
        <div className="w-1/2 p-6 flex flex-col">
          {/* Processing Status */}
          {processingStage !== 'idle' && (
            <div className="border border-yellow-400 p-4 mb-4">
              <div className="text-yellow-400 font-bold mb-2">
                🤖 AI PROCESSING STATUS
              </div>
              <div className="space-y-2">
                <div className="text-xs text-gray-400 capitalize">
                  {processingStage.replace('-', ' ')}...
                </div>
                <div className="w-full bg-black border border-green-400 h-4">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
                <div className="text-xs text-green-400">
                  {processingProgress}% Complete
                </div>
              </div>
            </div>
          )}

          {/* Generated Output */}
          <div className="border border-green-400 p-4 mb-4 flex-1">
            <div className="text-yellow-400 font-bold mb-3 border-b border-green-400 pb-2">
              📤 GENERATED OUTPUT
            </div>
            
            {!generatedTrack ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <div>No generated track yet</div>
                  <div className="text-xs mt-1">Upload a file and click generate</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-green-400">
                  ✓ Generated {generatedTrack.mode} track
                  {generatedTrack.instrument && ` (${generatedTrack.instrument})`}
                  {generatedTrack.group && ` (${generatedTrack.group})`}
                </div>
                
                {renderWaveform(generatedTrack.waveformData, currentTrack === 'generated')}
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    Generated: {generatedTrack.generatedAt.toLocaleTimeString()}
                  </div>
                  
                  <button className="flex items-center gap-2 px-3 py-1 border border-green-400 hover:bg-green-400 hover:text-black transition-all text-xs">
                    <Download className="w-3 h-3" />
                    DOWNLOAD
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Playback Controls */}
          <div className="border border-green-400 p-4">
            <div className="text-yellow-400 font-bold mb-3 border-b border-green-400 pb-2">
              🎮 PLAYBACK CONTROLS
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={skipBackward}
                disabled={!currentTrack}
                className="p-2 border border-green-400 hover:bg-green-400 hover:text-black transition-all disabled:opacity-50"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              
              <button
                onClick={isPlaying ? pauseTrack : () => playTrack(uploadedFile ? 'original' : 'generated')}
                disabled={!uploadedFile && !generatedTrack}
                className="p-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={stopTrack}
                disabled={!currentTrack}
                className="p-2 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all disabled:opacity-50"
              >
                <Square className="w-4 h-4" />
              </button>
              
              <button
                onClick={skipForward}
                disabled={!currentTrack}
                className="p-2 border border-green-400 hover:bg-green-400 hover:text-black transition-all disabled:opacity-50"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Track Selection */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => playTrack('original')}
                disabled={!uploadedFile}
                className={`p-2 border text-xs transition-all ${
                  currentTrack === 'original'
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                    : 'border-green-400 hover:border-yellow-400'
                } disabled:opacity-50`}
              >
                ORIGINAL
              </button>
              
              <button
                onClick={() => playTrack('generated')}
                disabled={!generatedTrack}
                className={`p-2 border text-xs transition-all ${
                  currentTrack === 'generated'
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                    : 'border-green-400 hover:border-yellow-400'
                } disabled:opacity-50`}
              >
                GENERATED
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Cursor */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-green-400">
          virtuoso@ai:~${' '}
          {showCursor && <span className="bg-green-400 text-black">█</span>}
        </span>
      </div>
    </div>
  );
};