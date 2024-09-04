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
  Box,
} from "@mui/material";

// Styling for multiple-select dropdown
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

// Defining interface
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
  // Function for handling user selections and updating filter in parent component
  function handleChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value },
    } = event;
    updateSelectedLanguages(
      typeof value === "string" ? value.split(",") : value
    );
  }

  // html with styling
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
      }}
    >
      <TextField
        label="Filter by name..."
        variant="outlined"
        value={nameFilter}
        onChange={onNameFilterChange}
        sx={{ flex: 1, maxWidth: 300 }} // Ensure it expands as needed
      />
      <FormControl sx={{ minWidth: 200 }}>
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
          borderColor: "#d9534f",
          color: "#d9534f",
          ":hover": {
            borderColor: "#c9302c",
            backgroundColor: "#f2dede",
            color: "#c9302c",
          },
          minWidth: 200,
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          onClearFilters();
          updateSelectedLanguages([]);
        }}
      >
        Clear All Filters
      </Button>
    </Box>
  );
}

export default FilterControls;
