import { language_locals } from "@/pages/Settings/contexts/Language_context";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Localstorage from "@/lib/localstorage";
const resources = {
    en: {
        "home": {
            "search_text": "Type a snippet name to search...",
            "snippet_not_find": "No snippet found."
        },
        "share": {
            "import": "Import",
            "window_title": "Share",
            "export_message": "The exported data has been copied to the clipboard!!"
        },
        "setting": {
            "font_family": "Systerm font_family",
            "language": "Language",
            "theme": "Theme",
            "short_cut": "ShortClasut",
            "auto_start": "Auto start",
            "position": "Position"
        },
        "themes_name": {
            "conan": "Conan",
            "yuanshen": "Genshin",
            "qiyuanzui": "Seven deadly sins",
            "lol": "League of Legends",
            "pure": "Pure color"
        }
    },
    zh: {
        "home": {
            "search_text": "输入片段名称进行搜索...",
            "snippet_not_find": "未找到片段。"
        },
        "share": {
            "import": "导入",
            "window_title": "分享",
            "export_message": "导出的数据已复制到剪贴板！"
        },
        "setting": {
            "font_family": "系统字体",
            "language": "语言",
            "theme": "主题",
            "short_cut": "快捷键",
            "auto_start": "开机自启",
            "position": "位置"
        },
        "themes_name": {
            "conan": "柯南",
            "yuanshen": "原神",
            "qiyuanzui": "七原罪",
            "lol": "英雄联盟",
            "pure": "纯色"
        }
    }
}

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
                }
            },
            // lng: locals.find(i => i.name === Localstorage.getItem("language") || "en")?.value, // if you're using a language detector, do not define the lng option
            lng: language_locals.find(i => i.name === (Localstorage.getItem("language") || "en"))?.value,
            fallbackLng: "en",


            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        });
}