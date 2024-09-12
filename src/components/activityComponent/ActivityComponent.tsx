import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ActivityComponent.scss";
import data from "./example.json";
import { useLocale } from "../../i18n/hooks";

const ActivityComponent = () => {
  const locale = useLocale();
  const { t } = useTranslation();
  //const { t: _} = useTranslation();
 
// update the hint state
  const [showHint, setShowHint] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [hint, setHint] = useState<string>("");

  useEffect(() => {
  // Update title, content, and hint based on the current locale
    setTitle(data.title[locale] || "");
    setContent(data.content[locale] || "");
    setHint(data.hint[locale] || "");
  }, [locale]);
  
// handle functionality to toggle showHint 

  const handleToggleHint = useCallback(() => {
    setShowHint((prevShowHint) => !prevShowHint);
  }, []);

  return (
    <div id="activity" className="card my-3">
      <div className="card-header">
        <h1 className="card-title">{title}</h1>
      </div>
      <div className="card-body">
        <p>{content}</p>
        <div className="text-end">
          <button onClick={handleToggleHint} className="btn btn-hint">
            {showHint ? t("hideHint") : t("showHint")}
          </button>
        </div>
      </div>
      {showHint && (
        <div className="card-footer">
          <p>{hint}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityComponent;
