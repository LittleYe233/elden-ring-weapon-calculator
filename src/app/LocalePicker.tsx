import { memo, useId } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { locales, localeLabels, type Locale } from "../locale.ts";

interface Props {
  locale: Locale;
  onLocaleChanged(locale: Locale): void;
}

/**
 * Dropdown used to select the display language of weapon names. The selected language
 * controls weapon name display and the names used for search.
 */
function LocalePicker({ locale, onLocaleChanged }: Props) {
  const id = useId();
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>Language</InputLabel>
      <Select
        labelId={id}
        label="Language"
        size="small"
        value={locale}
        onChange={(evt) => {
          onLocaleChanged(evt.target.value as Locale);
        }}
      >
        {locales.map((localeOption) => (
          <MenuItem key={localeOption} value={localeOption}>
            {localeLabels[localeOption]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default memo(LocalePicker);
