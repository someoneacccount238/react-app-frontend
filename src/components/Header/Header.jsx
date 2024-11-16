import "./Header.css";
import React, { useState } from "react"; 


export default function Header({name}) {
  return [
    <div className="cointainer2">
      <p className="label2">DIET & WEIGHT MANAGEMENT</p>
      <h1>{name} </h1>
      <div className="header-images">
        <figure className="image-div">
          <img
            class="fc-images"
            src="https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/responsive/Mushroom.svg?resize=750px:*&amp;output-quality=50"
          />
        </figure>
        <figure className="image-div">
          <img
            class="fc-images"
            src="https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/responsive/Orange.svg?resize=750px:*&amp;output-quality=50"
          />
        </figure>
        <figure className="image-div">
          <img
            class="fc-images"
            src="https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/responsive/Hamburger.svg?resize=750px:*&amp;output-quality=50"
          />
        </figure>
        <figure className="image-div">
          <img
            class="fc-images"
            src="https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/responsive/Cake.svg?resize=750px:*&amp;output-quality=50"
          />{" "}
        </figure>
      </div>{" "}
      
    </div>,
  ];
}
