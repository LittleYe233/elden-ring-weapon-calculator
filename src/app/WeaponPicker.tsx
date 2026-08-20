import { Autocomplete, Box, TextField } from "@mui/material";
import { memo, useCallback } from "react";
import { getWeaponBaseName } from "../calculator/weapon.ts";
import type { Weapon } from "../calculator/weapon.ts";
import type { Locale } from "../locale.ts";
import { weaponTypeLabels } from "./uiUtils.ts";

export type WeaponOption = {
  label: string; // display name in the current locale
  value: string; // weaponName (always English, used as the stable selection key)
  type: string; // weaponType
};

interface Props {
  selectedWeapons: WeaponOption[];
  onSelectedWeaponsChanged(weapons: WeaponOption[]): void;
  weaponOptions: WeaponOption[];
}

const sortByTypeThenName = (a: Weapon, b: Weapon): number => {
  if (a.weaponType < b.weaponType) return -1;
  if (a.weaponType > b.weaponType) return 1;
  // weapon types are the same, so compare the name
  if (a.weaponName < b.weaponName) return -1;
  if (a.weaponName > b.weaponName) return 1;
  // both primary and secondary values are equal
  return 0;
};
const makeOption =
  (locale: Locale) =>
  (weapon: Weapon): WeaponOption => ({
    label: getWeaponBaseName(weapon, locale),
    value: weapon.weaponName,
    type: weaponTypeLabels.get(weapon.weaponType) || "",
  });

export const makeWeaponOptionsFromWeapon = (weapons: Weapon[], locale: Locale): WeaponOption[] =>
  weapons.sort(sortByTypeThenName).map(makeOption(locale));

/**
 * An Autocomplete to allow for manually specifying weapons
 */
function WeaponPicker({ onSelectedWeaponsChanged, weaponOptions, selectedWeapons }: Props) {
  const handleOnChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newSelection: WeaponOption[]) => {
      onSelectedWeaponsChanged(newSelection);
    },
    [onSelectedWeaponsChanged],
  );

  return (
    <Box>
      <Autocomplete
        multiple
        options={weaponOptions}
        value={selectedWeapons}
        onChange={handleOnChange}
        renderInput={(params) => <TextField {...params} label="Weapons" />}
        groupBy={(weapon) => weapon.type}
        size="small"
      />
    </Box>
  );
}

export default memo(WeaponPicker);
