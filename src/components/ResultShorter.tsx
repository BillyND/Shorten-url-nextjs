import React from "react";

function ResultShorter(props: { shorterUrl: string }) {
  const { shorterUrl } = props;

  if (!shorterUrl) return;

  return (
    <div>
      Shorter url:{" "}
      <a href={shorterUrl} target="_blank">
        {shorterUrl}
      </a>
    </div>
  );
}

export default ResultShorter;
