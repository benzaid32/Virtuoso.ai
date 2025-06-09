import React from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Settings } from 'lucide-react';

export const AppHeader: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Virtuoso.ai</h1>
              <p className="text-sm text-neutral-400">Enterprise Music Generator</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-medium text-white">AI Powered</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};