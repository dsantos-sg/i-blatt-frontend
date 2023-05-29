import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

i18n
	.use(initReactI18next)
	.use(detector)
	.use(backend)
	.init({
		backend: {
			loadPath: "/assets/i18n/{{lng}}/translation.json",
		},
		debug: true,
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		react: {
			// wait: true, // lazyload - typescript issue: not working
		},
	});

export default i18n;
