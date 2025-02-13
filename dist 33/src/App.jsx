import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
    let { t, i18n } = useTranslation();
    let [lng, setLng] = useState("en");
    useEffect(() => {
        setLng(localStorage.getItem("i18nextLng"));
    }, []);

    let changeLng = (e) => {
        i18n.changeLanguage(e.target.value);
        setLng(e.target.value);
    };
    return (
        <div>
            <h1>{t("title")}</h1>
            <select onChange={changeLng} value={lng}>
                <option value="en">English</option>
                <option value="uk">Українська</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
}

export default App;
