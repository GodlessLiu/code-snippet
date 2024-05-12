import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Localstorage } from "@/lib/localstorage";
import { resources } from "@/locals/resources";
import { constants } from "@/constant";
export function init_i18n() {
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            // the translations
            // (tip move them in a JSON file and import them,
            // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
            resources: {
                "en": {
                    translation: resources.en
                },
                "zh-CN": {
                    translation: resources.zh
                },
                "jp": {
                    translation: resources.jp
                }
            },
            // lng: locals.find(i => i.name === Localstorage.getItem("language") || "en")?.value, // if you're using a language detector, do not define the lng option
            lng: Localstorage.getItemWithDefault("language", constants.default_lang),
            fallbackLng: "en",


            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        });
}