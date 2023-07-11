// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {  KeyboardEvent, useRef } from 'react'

interface Props {
  isExport: boolean
  alignContent: string
  value: string
  clearSearch: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const QuickSearchToolbarSS = (props: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.onKeyPress(e)
    }
  }

  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
    props.clearSearch();
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: props.alignContent,
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <GridToolbarContainer>{props.isExport && <GridToolbarExport />}</GridToolbarContainer>

      <TextField
        size='small'
        inputRef={searchInputRef}
        onKeyDown={handleKeyDown}
        placeholder='Search…'
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 2, display: 'flex' }}>
              <Icon icon='mdi:magnify' fontSize={20} />
            </Box>
          ),
          endAdornment: (
            <IconButton size='small' title='Clear' aria-label='Clear' onClick={handleClearSearch}>
              <Icon icon='mdi:close' fontSize={20} />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          '& .MuiInputBase-root > svg': {
            mr: 2
          }
        }}
      />
    </Box>
  )
}

export default QuickSearchToolbarSS
