import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

export default function SearchBar(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      sx={{ m: 5, background: 'white' }}
      placeholder='Search...'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}></TextField>
  )
}
