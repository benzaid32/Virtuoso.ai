import React from 'react';
import { motion } from 'framer-motion';
import { Music, Users, User } from 'lucide-react';
import { useAppStore, InstrumentType, GenerationMode } from '../../stores/appStore';

const instruments = [
  { id: 'saxophone' as InstrumentType, name: 'Saxophone', icon: '🎷', color: 'from-yellow-500 to-orange-500' },
  { id: 'harmonica' as InstrumentType, name: 'Harmonica', icon: '🪗', color: 'from-red-500 to-pink-500' },
  { id: 'steelpan' as InstrumentType, name: 'Steelpan', icon: '🥁', color: 'from-gray-500 to-slate-600' },
  { id: 'guitar' as InstrumentType, name: 'Guitar', icon: '🎸', color: 'from-amber-600 to-yellow-600' },
  { id: 'orchestra' as InstrumentType, name: 'Orchestra', icon: '🎼', color: 'from-purple-500 to-indigo-600' },
  { id: 'soul' as InstrumentType, name: 'Soul Band', icon: '🎤', color: 'from-pink-500 to-rose-500' },
];

const modes = [
  { id: 'solo' as GenerationMode, name: 'Solo Performance', icon: User, description: 'Single instrument performance' },
  { id: 'group' as GenerationMode, name: 'Group Performance', icon: Users, description: 'Multiple instruments ensemble' },
];

export const InstrumentSelector: React.FC = () => {
  const { 
    selectedInstrument, 
    selectedMode, 
    setSelectedInstrument, 
    setSelectedMode,
    processingState 
  } = useAppStore();

  const isDisabled = processingState !== 'idle' && processingState !== 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-8"
    >
      {/* Mode Selection */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Music className="w-6 h-6 text-primary-400" />
          <h3 className="text-xl font-bold text-white">Performance Mode</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((mode) => (
            <motion.button
              key={mode.id}
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              onClick={() => !isDisabled && setSelectedMode(mode.id)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${selectedMode === mode.id
                  ? 'border-primary-500 bg-primary-500/20 shadow-lg shadow-primary-500/25'
                  : 'border-neutral-600 bg-white/5 hover:border-primary-400 hover:bg-white/10'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`
                  p-2 rounded-lg 
                  ${selectedMode === mode.id ? 'bg-primary-500' : 'bg-neural-700'}
                `}>
                  <mode.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-white">{mode.name}</h4>
              </div>
              <p className="text-sm text-neural-300">{mode.description}</p>
              
              {selectedMode === mode.id && (
                <motion.div
                  layoutId="mode-indicator"
                  className="absolute top-3 right-3 w-3 h-3 bg-primary-400 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Instrument Selection */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6">Select Instrument</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {instruments.map((instrument, index) => (
            <motion.button
              key={instrument.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: isDisabled ? 1 : 1.05, y: isDisabled ? 0 : -5 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              onClick={() => !isDisabled && setSelectedInstrument(instrument.id)}
              disabled={isDisabled}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300 group
                ${selectedInstrument === instrument.id
                  ? 'border-primary-500 shadow-lg shadow-primary-500/25'
                  : 'border-neutral-600 hover:border-primary-400'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className={`
                absolute inset-0 rounded-xl bg-gradient-to-br opacity-20 transition-opacity duration-300
                ${selectedInstrument === instrument.id ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'}
                ${instrument.color}
              `} />
              
              <div className="relative text-center">
                <div className="text-4xl mb-3">{instrument.icon}</div>
                <h4 className="font-semibold text-white text-sm">{instrument.name}</h4>
              </div>
              
              {selectedInstrument === instrument.id && (
                <motion.div
                  layoutId="instrument-indicator"
                  className="absolute top-2 right-2 w-3 h-3 bg-primary-400 rounded-full"
                />
              )}

              {/* Hover Glow Effect */}
              <div className={`
                absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300
                ${instrument.color}
              `} />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};