'use client';
import {getData} from "@/app/server";
import { useEffect, useState } from "react";



export async function getRandomYouTubeLink() {
  console.log("=>", "start");
  try {

    const doc = await getData("youtubeLinks");


    if (Array.isArray(doc) && doc.length) {

      for (let i = doc.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [doc[i], doc[j]] = [doc[j], doc[i]];
      }

      // Slice the first 5 elements at most
      const selectedLinks = doc.slice(0, 5);
      console.log("selectedLinks=>", selectedLinks);

      // Add 'ismy' property conditionally (Here assuming you always want it true as per your requirement)
      const linksWithIsmy = selectedLinks.map(link => ({
        ...link

      }));



      return linksWithIsmy;
    } else {
      // If no links or not an array, return an empty array or handle as needed
      return [];
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return [];  // Return empty array on error
  }
}



// export function YouTubeLinkDisplay() {
//   const [link, setLink] = useState('');

//   useEffect(() => {
//     async function fetchLink() {
//       const randomLink = await getRandomYouTubeLink();
//       setLink(randomLink.url); // Assuming the URL is stored under the 'url' field
//     }

//     fetchLink();
//   }, []);

//   console.log(link);

//   return (
//     <div>
//       {link ? (
//         <iframe width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }


