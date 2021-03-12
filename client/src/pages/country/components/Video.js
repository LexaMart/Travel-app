import React from 'react';

export const Video = ({video}) => {
  return(
  <div className="country-content-card video">
        <iframe style={{ borderRadius: "35px" }} title="country sights" width="560" height="315" src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen" />
      </div>
  )
}