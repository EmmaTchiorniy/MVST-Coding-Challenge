import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  Checkbox,
  ListItemText,
  Button,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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

interface FilterControlsProps {
  nameFilter: string;
  onNameFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateSelectedLanguages: (values: string[]) => void;
  selectedLanguages: string[];
  onClearFilters: () => void;
  languages: string[];
}

function FilterControls({
  nameFilter,
  selectedLanguages,
  onNameFilterChange,
  updateSelectedLanguages,
  onClearFilters,
  languages,
}: FilterControlsProps) {
  function handleChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value },
    } = event;
    updateSelectedLanguages(
      typeof value === "string" ? value.split(",") : (value as string[])
    );
  }

  return (
    <div className="controls-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={onNameFilterChange}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Language</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedLanguages}
          onChange={handleChange}
          input={<OutlinedInput label="Language" />}
          renderValue={(selected: string[]) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {languages.map((aa) => (
            <MenuItem key={aa} value={aa}>
              <Checkbox checked={selectedLanguages.indexOf(aa) > -1} />
              <ListItemText primary={aa} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        onClick={() => {
          onClearFilters();
          updateSelectedLanguages([]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
}

export default FilterControls;
