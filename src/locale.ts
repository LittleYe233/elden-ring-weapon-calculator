/**
 * The single source of truth for supported display languages (D7 in
 * .opencode/context/development_solution.md). Adding a language means adding one entry to
 * each manifest below (and rebuilding the regulation data); no other code should reference a
 * specific language.
 */

export const locales = ["en", "zh-CN"] as const;
export type Locale = typeof locales[number];

export const defaultLocale = "en" as const;

/** Locales other than the default, e.g. for localized weapon name maps */
export type NonDefaultLocale = Exclude<Locale, typeof defaultLocale>;

/** Game data message directory (msg/<dir>) for each locale, used by buildData.ts */
export const localeDirs: { locale: Locale; dir: string }[] = [
  { locale: "en", dir: "engus" },
  { locale: "zh-CN", dir: "zhocn" },
];

/** Human-readable label for each locale, used by the locale picker */
export const localeLabels: Record<Locale, string> = { en: "English", "zh-CN": "简体中文" };

/** Localized display names of a weapon for one non-default locale */
export interface LocalizedWeaponNames {
  /** Full unique name including the affinity prefix, e.g. "重型 夜与猎犬长矛" */
  name: string;

  /** Base weapon name without an affinity specified */
  weaponName: string;
}

/** Localized display names keyed by locale; missing locales fall back to English */
export type LocalizedNames = Partial<Record<NonDefaultLocale, LocalizedWeaponNames>>;
