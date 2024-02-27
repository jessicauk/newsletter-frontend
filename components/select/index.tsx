import React, { useEffect } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Data {
  name: string;
}

interface SelectProps<T> {
  name: string;
  required?: boolean;
  data: T extends Data ? T[] : never;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  selected: string[];
}

export default function MultipleSelectPlaceholder<T>({
  name,
  required,
  data,
  setSelected,
  selected,
}: SelectProps<T>) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>(selected);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setSelected(value as string[]);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    if (selected.length === 0) {
      setPersonName([]);
    }
  }, [selected]);

  return (
    <>
      <Select
        multiple
        displayEmpty
        name={name}
        required={required}
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Placeholder</em>;
          }

          return selected.join(", ");
        }}
        MenuProps={MenuProps}
        inputProps={{
          "aria-label": "Without label",
          name,
          id: "multiple-select",
        }}
      >
        <MenuItem disabled value="">
          <em>Select recipient</em>
        </MenuItem>
        {data?.map(({ name }) => (
          <MenuItem
            key={name}
            value={name}
            className="hover:bg-indigo-400 hover:text-white"
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
