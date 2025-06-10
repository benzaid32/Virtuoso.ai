import React from 'react';
import { motion } from 'framer-motion';
import { Music, Zap, Settings } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Virtuoso.ai</h1>
              <p className="text-sm text-gray-400">AI Music Generator</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Zap className="w-4 h-4 text-green-400" />
              <span>AI Engine Online</span>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};