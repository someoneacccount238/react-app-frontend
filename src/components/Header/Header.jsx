import "./Header.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Header({ name }) {
  const [t, i18n] = useTranslation("global");
  return [
    <div className="cointainer2">
      <p className="label2">{t("calendar.subtitle")}</p>
      <h1>{name} </h1>
      <div className="header-images">
        <figure className="image-div">
          {/* TODO flex картинки */}
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
