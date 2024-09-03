import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { OutlinedInput } from "@mui/material";

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

interface MultipleSelect {
  languageOptions: string[];
}

export default function MultipleSelect(languageOptions: string[]) {
  const [language, setLanguage] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof language>) => {
    const { value } = event.target;
    setLanguage((prev) => {
      return prev.filter((lang) => lang !== value);
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Languages</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={language}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {languageOptions.map((lang) => (
            <MenuItem key={lang} value={lang}>
              <Checkbox checked={language.indexOf(lang) > -1} />
              <ListItemText primary={lang} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
