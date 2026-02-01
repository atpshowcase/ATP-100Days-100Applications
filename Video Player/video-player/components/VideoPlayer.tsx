"use client";

import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Upload } from "lucide-react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", onEnded);
    };
  }, [videoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {!videoSrc ? (
        <label className="flex flex-col items-center justify-center min-h-[500px] border-2 border-dashed border-gray-600 rounded-3xl bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-800/50 group cursor-pointer animate-fade-in-up">
            <div className="p-8 rounded-full bg-purple-600/10 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Upload className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-3">
              Upload Video
            </h3>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Select a video file to start watching with our premium player experience.
            </p>
            <div className="relative group/btn">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover/btn:opacity-100 transition duration-1000 group-hover/btn:duration-200"></div>
              <span className="relative px-8 py-4 bg-gray-900 rounded-full leading-none flex items-center divide-x divide-gray-600">
                <span className="flex items-center space-x-2 text-purple-100 font-medium">
                   <span>Choose File</span>
                </span>
              </span>
            </div>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
        </label>
      ) : (
        <div 
          className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 ring-1 ring-white/10 bg-black aspect-video animate-scale-in"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-contain"
            onClick={togglePlay}
          />
          
          {/* Controls Overlay */}
          <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-300 ${isHovering || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            {/* Progress Bar */}
            <div className="group/progress relative h-1.5 hover:h-2.5 bg-gray-600/50 rounded-full mb-4 cursor-pointer transition-all duration-300">
              <div 
                className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
              </div>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={togglePlay}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-300 tracking-wide">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-gray-500">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3 group/volume">
                  <button className="text-gray-300 hover:text-white transition-colors" onClick={() => setVolume(v => v === 0 ? 1 : 0)}>
                    {volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300 ease-out">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1.5 bg-gray-600 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={toggleFullscreen}
                  className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
                >
                  <Maximize className="w-6 h-6" />
                </button>
                
                <label className="cursor-pointer text-gray-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg transform active:scale-95">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
          
          {/* Centered Play Button when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-pulse-slow">
                <Play className="w-12 h-12 text-white fill-current ml-2" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
