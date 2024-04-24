import React from 'react'
import { Button } from '@mui/material'

function CustomButton({ comp }) {
  return (
    <Button
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
        "&:hover": {
          backgroundColor: comp.styles.backgroundColor
        }
      }}
    >
      {comp.name}
    </Button>
  )
}

export default CustomButton