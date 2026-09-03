"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [swapped, setSwapped] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-6 py-10 sm:py-16 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">DIRECT STREAMING BRIDGE</span>
        </div>
        
        <h1 className="font-display-lg text-display-lg text-on-surface text-center tracking-tight mb-4">
          Move your music.
        </h1>
        
        <p className="font-body-lg text-body-lg text-secondary text-center max-w-xl mb-14">
          Select your source and destination platforms to effortlessly transfer playlists, liked tracks, and complete libraries.
        </p>

        {/* Interactive Stepper & Matrix Container */}
        <div className="w-full bg-surface-container-low rounded-xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
          {/* Faint Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Step Indicator Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-surface-container-highest">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-on-primary font-label-md text-label-md">1</span>
              <div>
                <span className="block font-title-sm text-title-sm text-on-surface">Select Source Library</span>
                <span className="block font-body-sm text-body-sm text-secondary">Export data from</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
              <span className="material-symbols-outlined text-primary text-base">sync_alt</span>
              <span className="text-secondary font-body-sm text-body-sm">Select one of each</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-container-highest text-secondary font-label-md text-label-md">2</span>
              <div>
                <span className="block font-title-sm text-title-sm text-on-surface">Target Destination</span>
                <span className="block font-body-sm text-body-sm text-secondary">Sync playlists to</span>
              </div>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10" id="platform-grid">
            {/* Platform 1: Spotify (Source Connected) */}
            <div className="group relative flex flex-col items-center text-center p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer ring-1 ring-primary/40 shadow-sm">
              <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                  <path className="text-[#1DB954]" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.627.627 0 0 1-.86.208c-2.355-1.439-5.32-1.765-8.812-.966a.625.625 0 1 1-.277-1.22c3.824-.875 7.108-.506 9.74 1.104.283.174.372.548.209.874zm1.225-2.723a.784.784 0 0 1-1.077.258c-2.695-1.657-6.804-2.136-9.992-1.168a.783.783 0 0 1-.469-1.493c3.64-1.105 8.188-.574 11.28 1.326.353.218.468.677.258 1.077zm.105-2.836C14.686 9.006 9.36 8.83 6.27 9.768a.94.94 0 1 1-.55-1.801c3.551-1.078 9.444-.872 13.25 1.391a.94.94 0 0 1-.94 1.632z" />
                </svg>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface mb-1">Spotify</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wide">Source</span>
            </div>

            {/* Platform 2: Apple Music (Destination Connected) */}
            <div className="group relative flex flex-col items-center text-center p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer ring-1 ring-on-surface/40 shadow-sm">
              <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-on-surface text-surface">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>done</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24">
                  <rect fill="#FC3C44" height="24" rx="12" width="24" />
                  <path d="M16.5 7.5v6.2c0 1.27-.93 2.3-2.15 2.3s-2.15-1.03-2.15-2.3.93-2.3 2.15-2.3c.38 0 .74.1 1.05.28V9.12l-5 1.05v4.53c0 1.27-.93 2.3-2.15 2.3s-2.15-1.03-2.15-2.3.93-2.3 2.15-2.3c.38 0 .74.1 1.05.28V8.95c0-.49.36-.9.84-.98l6.1-.97c.56-.09 1.06.34 1.06.9z" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface mb-1">Apple Music</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wide">Destination</span>
            </div>

            {/* Platform 3: YouTube Music */}
            <div className="group relative flex flex-col items-center text-center p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="#FF0000" r="10" />
                  <circle cx="12" cy="12" r="6" stroke="#FFFFFF" strokeWidth="1.8" />
                  <polygon fill="#FFFFFF" points="10.5,9.5 14.5,12 10.5,14.5" />
                </svg>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface mb-1">YouTube</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm">Connect</span>
            </div>

            {/* Platform 4: Tidal */}
            <div className="group relative flex flex-col items-center text-center p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8" fill="#FFFFFF" viewBox="0 0 24 24">
                  <path d="M4 8l3-3 3 3-3 3zm6 0l3-3 3 3-3 3zm6 0l3-3 3 3-3 3zm-6 6l3-3 3 3-3 3z" />
                </svg>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface mb-1">Tidal</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm">Connect</span>
            </div>

            {/* Platform 5: SoundCloud */}
            <div className="group relative flex flex-col items-center text-center p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-9 h-9" fill="#FF5500" viewBox="0 0 24 24">
                  <path d="M11.56 10.87a.47.47 0 0 0-.47.47v4.71a.47.47 0 0 0 .94 0v-4.71a.47.47 0 0 0-.47-.47zm-1.88 1.41a.47.47 0 0 0-.47.47v3.3a.47.47 0 1 0 .94 0v-3.3a.47.47 0 0 0-.47-.47zm-1.89.95a.47.47 0 0 0-.47.47v2.35a.47.47 0 1 0 .94 0v-2.35a.47.47 0 0 0-.47-.47zm-1.88.94a.47.47 0 0 0-.47.47v1.41a.47.47 0 1 0 .94 0v-1.41a.47.47 0 0 0-.47-.47zm13.19.47c-.24-2.07-2-3.69-4.14-3.69-.6 0-1.16.13-1.68.36-.31-1.82-1.9-3.21-3.81-3.21-.47 0-.91.09-1.32.24a.47.47 0 0 0-.3.44v7.54c0 .26.21.47.47.47h10.36a2.82 2.82 0 0 0 .42-5.65z" />
                </svg>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface mb-1">SoundCloud</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm">Connect</span>
            </div>

            {/* Platform 6: Deezer */}
            <div className="group relative flex flex-col items-center text-center p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-200 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24">
                  <path d="M4 14h2.5v3H4zm0-4h2.5v3H4zm0-4h2.5v3H4zm5 8h2.5v3H9zm0-4h2.5v3H9zm5 4h2.5v3H14zm5 0h2.5v3H19zm0-4h2.5v3H19zm0-4h2.5v3H19zm0-4h2.5v3H19z" fill="#A238FF" />
                </svg>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface mb-1">Deezer</span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm">Connect</span>
            </div>
          </div>
        </div>

        {/* Active Bridge Pipeline Preview */}
        <div className="w-full max-w-2xl bg-surface-container-high rounded-full p-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-md mb-8">
          {/* Source Node */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#121212] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.627.627 0 0 1-.86.208c-2.355-1.439-5.32-1.765-8.812-.966a.625.625 0 1 1-.277-1.22c3.824-.875 7.108-.506 9.74 1.104.283.174.372.548.209.874zm1.225-2.723a.784.784 0 0 1-1.077.258c-2.695-1.657-6.804-2.136-9.992-1.168a.783.783 0 0 1-.469-1.493c3.64-1.105 8.188-.574 11.28 1.326.353.218.468.677.258 1.077zm.105-2.836C14.686 9.006 9.36 8.83 6.27 9.768a.94.94 0 1 1-.55-1.801c3.551-1.078 9.444-.872 13.25 1.391a.94.94 0 0 1-.94 1.632z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-title-sm text-title-sm text-on-surface">Spotify</span>
              <span className="font-body-sm text-body-sm text-primary">48 Playlists • 1,420 tracks</span>
            </div>
          </div>

          {/* Directional Pulse & Swap Button */}
          <div className="flex items-center gap-3 px-2">
            <div className="hidden sm:block w-10 h-0.5 bg-gradient-to-r from-primary to-surface-bright"></div>
            <button 
              aria-label="Swap Platforms" 
              className={`p-2 rounded-full bg-surface-container hover:bg-surface-bright text-on-surface transition-transform duration-300 ${swapped ? 'rotate-180' : ''}`}
              onClick={() => setSwapped(!swapped)}
            >
              <span className="material-symbols-outlined text-base">swap_horiz</span>
            </button>
            <div className="hidden sm:block w-10 h-0.5 bg-gradient-to-r from-surface-bright to-on-surface"></div>
          </div>

          {/* Destination Node */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="font-title-sm text-title-sm text-on-surface">Apple Music</span>
              <span className="font-body-sm text-body-sm text-secondary-fixed">Destination Ready</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#FC3C44] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-on-primary font-headline-md text-headline-md font-bold tracking-tight hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-xl mb-6 cursor-pointer">
          <span>Continue to Playlist Selection</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>

        {/* Trust Badges & Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-secondary font-body-sm text-body-sm">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-primary">verified_user</span>
            Direct API Connection
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-surface-bright"></span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-secondary">lock</span>
            Zero Password Storage
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-surface-bright"></span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-secondary">graphic_eq</span>
            100% Loss-Free Matching
          </span>
        </div>

        {/* Active Recent Batch Mini-Log */}
        <div className="w-full max-w-2xl mt-12 pt-8 border-t border-surface-container-high flex items-center justify-between text-secondary font-body-sm text-body-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
            <span>Last migration completed: 18 minutes ago (Tidal ➔ Spotify)</span>
          </div>
          <a className="text-on-surface hover:text-primary transition-colors flex items-center gap-1" href="#">
            <span>History</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}
