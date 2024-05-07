'use client'
import React, { useEffect, useRef, useState } from 'react';

function YouTubePlayer({ url, onWatchTime }) {
  const playerRef = useRef(null);
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

  useEffect(() => {
    // Ensure the YouTube Iframe API script is loaded
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create player after API code downloads
    window.onYouTubeIframeAPIReady = function() {
      const videoId = extractVideoID(url);
      playerRef.current = new window.YT.Player('player', {
        height: '390',
        width: '640',

        videoId: videoId,
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    };

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

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [url, onWatchTime]);

  return <div id="player"></div>;
}


export default YouTubePlayer;
