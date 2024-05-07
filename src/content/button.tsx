"use client";
import React, { useState } from "react";

import { getRandomYouTubeLink } from "@/lib/videomanagment";
import YouTubePlayer from "./YoutubePlayer";

export const ButtonGen = () => {
  const [links, setLinks] = useState<any>([]); // Stores YouTube links
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current video index
  const [userInput, setUserInput] = useState(""); // To hold the user's input link
  const [showInput, setShowInput] = useState(false); // To toggle input display
  const [fetchDisabled, setFetchDisabled] = useState(false); // Disable fetch button after fetching
  const [watchTimes, setWatchTimes] = useState<any>([]);
  const [isDone,setIsDone]=useState(false?? localStorage.getItem('isDone'));

  // Store watch times for each video
const [isLoading, setIsLoading] = useState(false);
  const fetchLink = async () => {
    setIsLoading(true);  // Start loading
    try {
      const randomLink = await getRandomYouTubeLink();
      if (randomLink && randomLink.length > 0) {
        setLinks((prevLinks: any) => [...prevLinks, ...randomLink.map(link => link.url)]);
        setFetchDisabled(true);  // Disable fetch button after fetching links
        setWatchTimes([]);  // Reset watch times
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setIsLoading(false);  // End loading regardless of success or failure
    }
  };

  const handleNextVideo = () => {
    if (currentIndex + 1 < links.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // All videos have been shown, display the input for user to add their own link
      setShowInput(true);
      setLinks([]); // Clear the existing links
      setCurrentIndex(0); // Reset index
      setFetchDisabled(false); // Re-enable fetch button for next usage
    }
  };

  const handleInputChange = (event:any) => {
    setUserInput(event.target.value);
  };

  const handleSaveLink = async () => {
    if (userInput.trim()) {
      await saveLinkToCollection(userInput); // Assuming this function exists to save the link
      setUserInput("");
      setShowInput(false); // Optionally hide the input after saving
    }
  };

  const handleWatchTime = (time: any) => {
    setWatchTimes((prevTimes: any) => [...prevTimes, time]);
  };

  const minimumWatchTime = watchTimes.length > 0 ? Math.min(...watchTimes) : 0;


  const handleDone=()=>{
    setIsDone(
      !isDone
    );
    localStorage.setItem('isDone',isDone.toString());
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <button
          className="btn btn-primary py-20"
          onClick={fetchLink}
          disabled={fetchDisabled}
        >
          {isLoading?  <p>Loading...</p>:"Generate Video"}
        </button>
        {links.length > 0 && currentIndex < links.length - 1 && (
          <button className="btn btn-secondary py-20" onClick={handleNextVideo}>
            Next Video
          </button>
        )}
         { currentIndex ==4 && (
          <button className="btn btn-secondary py-20" onClick={handleDone}>
            Done
          </button>
        )}
      </div>
      <div className="flex  justify-center mt-20">
        {links.length > 0 && currentIndex < links.length && !isDone && (
          <div className="">
            <div className="my-16">
              <YouTubePlayer
                url={links[currentIndex]}
                onWatchTime={(time:any) => console.log(time)}
              />
            </div>

            <div>{currentIndex + 1} / {links.length} videos watched</div>

          {/* <div>Minimum watch time: {minimumWatchTime.toFixed(2)} seconds</div> */}
          </div>
        )}

        {isDone && (
          <div>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter your YouTube link"
            />
            <button onClick={handleSaveLink}>Save Link</button>
          </div>
        )}
      </div>
    </div>
  );
};
function saveLinkToCollection(userInput: string) {
  throw new Error("Function not implemented.");
}

