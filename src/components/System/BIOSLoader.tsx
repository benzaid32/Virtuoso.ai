import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGalleryStore } from '../../stores/galleryStore';

export const BIOSLoader: React.FC = () => {
  const { setLoadingProgress, setSystemReady, setShowWelcome } = useGalleryStore();
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const biosLines = [
    'VIRTUAL GALLERY ART EXPERIENCE',
    'VGA S25 2025-2025 Special Gallery131S',
    '',
    'Released: 01/13/2025',
    'VBIOS (C)2025 Gallery Systems Inc.,',
    '',
    'Checking Art Assets : 14000 OK',
    'LOADING GALLERY ASSETS (6/23)',
    '',
    'Loaded computerSetupModel    ... 45%',
    'Loaded environmentTexture    ... 67%',
    'Loaded artworkDatabase       ... 89%',
    'Loaded audioSystems          ... 95%',
    'Loaded galleryInterface      ... 100%',
    '',
    'GALLERY SYSTEMS READY',
    'Press any key to continue...'
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev < biosLines.length - 1) {
          const progress = ((prev + 1) / biosLines.length) * 100;
          setLoadingProgress(progress, biosLines[prev + 1] || 'Loading...');
          return prev + 1;
        } else {
          clearInterval(lineInterval);
          setTimeout(() => {
            setSystemReady(true);
            setShowWelcome(true);
          }, 2000);
          return prev;
        }
      });
    }, 300);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(lineInterval);
    };
  }, [setLoadingProgress, setSystemReady, setShowWelcome]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono text-sm overflow-hidden">
      <div className="p-8 max-w-4xl">
        <div className="border border-green-400 p-4">
          {biosLines.slice(0, currentLine + 1).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="leading-relaxed"
            >
              {line}
              {index === currentLine && showCursor && (
                <span className="bg-green-400 text-black ml-1">█</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};