'use client'
import React, { useEffect, useRef, useState } from 'react';

function YouTubePlayer({ url, onWatchTime }) {
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);

    // Function to extract video ID from the given URL
    function extractVideoID(url) {
        let id = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            id = url[2].split(/[^0-9a-z_-]/i);
            id = id[0];
        } else {
            id = url;
        }
        return id;
    }

    // Effect to handle the loading and initialization of the YouTube Iframe API
    useEffect(() => {
      const ensureYouTubeIframeAPI = (callback) => {
          if (window.YT && window.YT.Player) {
              callback();
          } else {
              const tag = document.createElement('script');
              tag.src = "https://www.youtube.com/iframe_api";
              const firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

              window.onYouTubeIframeAPIReady = () => {
                  callback();
              };
          }
      };

      let localPlayer = null; // Local reference to the player

      ensureYouTubeIframeAPI(() => {
          if (playerContainerRef.current) {
              localPlayer = new window.YT.Player(playerContainerRef.current, {
                  height: '390',
                  width: '640',
                  videoId: extractVideoID(url),
                  events: {
                      onStateChange: onPlayerStateChange
                  }
              });
              playerRef.current = localPlayer; // Assign to ref for access outside this scope
          }
      });

      return () => {
          if (localPlayer) {
              localPlayer.destroy(); // Use local reference for cleanup
          }
      };
  }, [url]); // Dependency on URL


    // Event handler for YouTube player state changes
    function onPlayerStateChange(event) {
        if (event.data === window.YT.PlayerState.PLAYING) {
            const watchInterval = setInterval(() => {
                const time = playerRef.current.getCurrentTime(); // This is the elapsed time in seconds
                onWatchTime(time);
            }, 1000);

            event.target.addEventListener('onStateChange', () => {
                if (event.data === window.YT.PlayerState.PAUSED ||
                    event.data === window.YT.PlayerState.ENDED) {
                    clearInterval(watchInterval);
                }
            });
        }
    }

    return <div ref={playerContainerRef} id={`youtube-player-${Math.random().toString(36).substr(2, 9)}`}></div>;
}





export default YouTubePlayer;
