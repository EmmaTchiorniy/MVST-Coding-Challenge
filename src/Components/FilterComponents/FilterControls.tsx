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
  TextField,
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
      typeof value === "string" ? value.split(",") : value
    );
  }

  return (
    <div className="controls-container">
      <TextField
        label="Filter by name..."
        variant="outlined"
        value={nameFilter}
        onChange={onNameFilterChange}
        sx={{ mb: 2, width: "100%", maxWidth: 400 }}
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
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              <Checkbox checked={selectedLanguages.indexOf(language) > -1} />
              <ListItemText primary={language} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        sx={{
          borderColor: "#0366d6",
          color: "#0366d6",
          ":hover": {
            borderColor: "#0356a1",
            backgroundColor: "#f0f6fc", // Light background for hover
          },
        }}
        onClick={() => {
          onClearFilters();
          updateSelectedLanguage([]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
}

export default FilterControls;
