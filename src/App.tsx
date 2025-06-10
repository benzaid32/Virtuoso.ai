import React from 'react';
import { AppHeader } from './components/Layout/AppHeader';
import { MainInterface } from './components/Layout/MainInterface';
import { Scene3D } from './components/3D/Scene3D';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* UI Layer */}
      <div className="relative z-10">
        <AppHeader />
        <MainInterface />
      </div>
    </div>
  );
}