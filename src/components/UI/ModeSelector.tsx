import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Users } from 'lucide-react';
import { GenerationMode } from '../../types/audio';

interface ModeSelectorProps {
  selectedMode: GenerationMode;
  onModeChange: (mode: GenerationMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Generation Mode</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <motion.button
          onClick={() => onModeChange('solo')}
          className={`
            p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left
            ${selectedMode === 'solo' 
              ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300' 
              : 'border-gray-600 hover:border-gray-500 text-gray-300'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3 mb-2 sm:mb-3">
            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-sm sm:text-base">Solo</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Generate a solo performance with a single instrument
          </p>
        </motion.button>

        <motion.button
          onClick={() => onModeChange('group')}
          className={`
            p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left
            ${selectedMode === 'group' 
              ? 'border-purple-400 bg-purple-500/20 text-purple-300' 
              : 'border-gray-600 hover:border-gray-500 text-gray-300'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3 mb-2 sm:mb-3">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-semibold text-sm sm:text-base">Group</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Generate a full ensemble arrangement
          </p>
        </motion.button>
      </div>
    </div>
  );
};