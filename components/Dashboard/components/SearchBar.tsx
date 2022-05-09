import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

export default function SearchBar(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      placeholder='Search...'
      label="Search For..."
      InputProps={{
        sx: {backgroundColor: 'background.paper'},
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}></TextField>
  )
}
