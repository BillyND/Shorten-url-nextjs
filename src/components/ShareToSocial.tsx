"use client";

import React from "react";

const ShareToSocial: React.FC = (props) => {
  return (
    <button
      aria-label="Share on Facebook"
      className="react-share__ShareButton"
      //   style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;"
    >
      <svg viewBox="0 0 64 64" width="3.2rem" height="3.2rem">
        <circle cx="32" cy="32" r="32" fill="#0965FE"></circle>
        <path
          d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
          fill="white"
        ></path>
      </svg>
    </button>
  );
};

export default ShareToSocial;