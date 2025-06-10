import React from 'react';
import { motion } from 'framer-motion';
import { InstrumentType, EnsembleType, GenerationMode } from '../../types/audio';
import { INSTRUMENTS, ENSEMBLES } from '../../utils/constants';

interface InstrumentGridProps {
  mode: GenerationMode;
  selectedInstrument?: InstrumentType;
  selectedEnsemble?: EnsembleType;
  onInstrumentChange?: (instrument: InstrumentType) => void;
  onEnsembleChange?: (ensemble: EnsembleType) => void;
}

export const InstrumentGrid: React.FC<InstrumentGridProps> = ({
  mode,
  selectedInstrument,
  selectedEnsemble,
  onInstrumentChange,
  onEnsembleChange
}) => {
  if (mode === 'solo') {
    return (
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-white">Select Instrument</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {INSTRUMENTS.map((instrument) => (
            <motion.button
              key={instrument.id}
              onClick={() => onInstrumentChange?.(instrument.id)}
              className={`
                p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left
                ${selectedInstrument === instrument.id 
                  ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300' 
                  : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                <span className="text-lg sm:text-2xl">{instrument.icon}</span>
                <span className="font-semibold text-sm sm:text-base">{instrument.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mb-2">{instrument.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-indigo-400">{instrument.style}</span>
                <span className="text-gray-500">
                  {instrument.difficulty === 'easy' ? '●○○' : 
                   instrument.difficulty === 'medium' ? '●●○' : '●●●'}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-white">Select Ensemble</h3>
      
      <div className="space-y-3 sm:space-y-4">
        {ENSEMBLES.map((ensemble) => (
          <motion.button
            key={ensemble.id}
            onClick={() => onEnsembleChange?.(ensemble.id)}
            className={`
              w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left
              ${selectedEnsemble === ensemble.id 
                ? 'border-purple-400 bg-purple-500/20 text-purple-300' 
                : 'border-gray-600 hover:border-gray-500 text-gray-300'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl sm:text-3xl">{ensemble.icon}</span>
              <div>
                <span className="font-semibold text-base sm:text-lg">{ensemble.name}</span>
                <p className="text-xs sm:text-sm text-gray-400">{ensemble.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
              {ensemble.instruments.map((instrument) => (
                <span
                  key={instrument}
                  className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                >
                  {instrument}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between text-xs space-y-1 sm:space-y-0">
              <span className="text-purple-400">Complexity: {ensemble.complexity}</span>
              <span className="text-gray-500">
                ~{Math.round(ensemble.processingTime / 1000)}s processing
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};