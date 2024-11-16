import "./JumpingBanner.css";
import React, { useEffect, useState } from "react";


export default function JumpingBanner() {
    const [bannerSeen, hideBanner] =useState(true)
    const onClick = () => hideBanner(false)
  
  return (bannerSeen && [
    <h1>
      <div class="row"></div>
      <div class="cell">
        <div class="square hithere">
          {" "}
          <div class="dailyCaloriesBanner">
          <div className="crossSign" onClick={onClick}><span>&#10006;</span></div>
            <h6>Your daily average</h6>
            <h6> 1430 calories</h6>
            <h6>
              <p className="greyText">
                87% close to your goal daily calories (800)
              </p>
            </h6>
          </div>{" "}
        </div>
      </div>
    </h1>,
  ])
}
