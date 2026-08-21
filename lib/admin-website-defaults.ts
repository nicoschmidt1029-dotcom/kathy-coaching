import en from "@/messages/en.json";
import de from "@/messages/de.json";
import sk from "@/messages/sk.json";

export const adminMessages = { en, de, sk };
export const localized = (pick: (message: typeof en) => string) => Object.fromEntries(Object.entries(adminMessages).map(([locale, message]) => [locale, pick(message as typeof en)]));
