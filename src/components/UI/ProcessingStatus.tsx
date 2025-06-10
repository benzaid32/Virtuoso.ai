import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { ProcessingStatus as ProcessingStatusType } from '../../types/generation';
import { formatDuration } from '../../utils/audioUtils';

interface ProcessingStatusProps {
  status: ProcessingStatusType;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status }) => {
  const getStatusIcon = () => {
    switch (status.stage) {
      case 'complete':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-8 h-8 text-red-400" />;
      default:
        return <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status.stage) {
      case 'complete':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-indigo-400';
    }
  };

  const getProgressColor = () => {
    switch (status.stage) {
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect p-8 rounded-xl max-w-2xl mx-auto"
    >
      <div className="text-center space-y-6">
        {/* Status Icon */}
        <motion.div
          animate={{ rotate: status.stage === 'error' ? 0 : 360 }}
          transition={{ duration: 2, repeat: status.stage !== 'complete' && status.stage !== 'error' ? Infinity : 0 }}
        >
          {getStatusIcon()}
        </motion.div>

        {/* Status Message */}
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${getStatusColor()}`}>
            {status.message}
          </h3>
          
          {status.stage !== 'complete' && status.stage !== 'error' && (
            <p className="text-gray-400 text-sm">
              Estimated time remaining: {formatDuration(status.estimatedTimeRemaining / 1000)}
            </p>
          )}
          
          {status.error && (
            <p className="text-red-300 text-sm mt-2">{status.error}</p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span className="capitalize">{status.stage.replace('-', ' ')}</span>
            <span>{Math.round(status.progress)}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              className={`h-3 rounded-full ${getProgressColor()}`}
              initial={{ width: 0 }}
              animate={{ width: `${status.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* AI Processing Visualization */}
        {status.stage !== 'complete' && status.stage !== 'error' && (
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-8 bg-indigo-500 rounded-full"
                animate={{
                  scaleY: [1, 2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}

        {/* AI Engine Status */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>AI Engine Processing</span>
        </div>
      </div>
    </motion.div>
  );
};