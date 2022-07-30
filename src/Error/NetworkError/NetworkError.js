import React from "react";
import style from "./NetworkError.module.scss";
import warning from "../../Assets/warning.png";
import { t } from "../../Languages/languages";

const lang2 = {
  1: "You are not conneted to the internet.",
  2: "please check your internet connection and try agian.",
};

const lang1 = {
  1: "انت غير متصل بالشبكه.",
  2: "من فضلك تاكد من الاتصال بالشبكه و حاول مره اخرى.",
};

function NetworkError(props) {
  let lables = lang1;
  if (parseInt(props.lanState) === 2) {
    lables = lang2;
  }
  return (
    <div className={style.container}>
      <img src={warning} alt="warning" />
      <div className={style.info}>
        <h1>{t("network_error")}</h1>
        <p>
          {lables["1"]}
          <br />
          {lables["2"]} <br />
        </p>
        <a
          target="blank"
          href="https://buildingconnected.zendesk.com/hc/en-us/articles/360022590413-What-is-a-Network-Error-and-how-do-I-resolve-it-"
        >
          {t("learn_more")}
        </a>
      </div>
    </div>
  );
}

export default NetworkError;
