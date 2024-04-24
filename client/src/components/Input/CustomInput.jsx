import React from 'react'
import TextField from '@mui/material/TextField';

function CustomInput({comp}) {
  return (
    <TextField 
      id={comp._id} 
      label={comp.name}
      variant="outlined" 
      sx={{
        width: `${comp.styles.width}%`,
      }}
      InputProps={{
        sx: {
          height: `${comp.styles.height}px`,
          backgroundColor: comp.styles.backgroundColor, 
          color: comp.styles.textColor,
          border: '1px solid white',
          borderColor: comp.styles.borderColor, 
          borderRadius: `${comp.styles.borderRadius}px`, 
          margin: `${comp.styles.margin}px`,
          paddingX:`${comp.styles.paddingX}px`,
          paddingY:`${comp.styles.paddingY}px`,
        }
      }}
    />
  )
}

export default CustomInput