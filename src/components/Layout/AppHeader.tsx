import React from 'react';
import { motion } from 'framer-motion';
import { Music, Zap, Settings, Menu } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Virtuoso.ai</h1>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">AI Music Generator</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="hidden md:inline">AI Engine Online</span>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};