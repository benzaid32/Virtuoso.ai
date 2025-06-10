import React from 'react';
import { AppHeader } from './components/Layout/AppHeader';
import { MainInterface } from './components/Layout/MainInterface';
import { Scene3D } from './components/3D/Scene3D';

export default function App() {
  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* UI Layer */}
      <div className="relative z-10 h-full flex flex-col">
        <AppHeader />
        <div className="flex-1 overflow-y-auto">
          <MainInterface />
        </div>
      </div>
    </div>
  );
}