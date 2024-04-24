import React, {useState} from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function CustomSelect({comp}) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{comp.name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Option"
        onChange={handleChange}
        sx={{
          width: `${comp.styles.width}%`,
          height: `${comp.styles.height}px`,
          backgroundColor: comp.styles.backgroundColor, 
          color: comp.styles.textColor,
          border: '1px solid white',
          borderColor: comp.styles.borderColor, 
          borderRadius: `${comp.styles.borderRadius}px`, 
          margin: `${comp.styles.margin}px`,
          paddingX:`${comp.styles.paddingX}px`,
          paddingY:`${comp.styles.paddingY}px`,
        }}
      >
        {comp?.options.map((option) => {
          return <MenuItem key={option} value={option}> {option} </MenuItem>
        })}
      </Select>
    </FormControl>
  )
}

export default CustomSelect