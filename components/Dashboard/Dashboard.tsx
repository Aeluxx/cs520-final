import { useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import useAppBarHeight from '../../hooks/useAppBarHeight'
import ClassDrawer from './components/ClassDrawer'
import DocumentCard from './components/DocumentCard'
import SearchBar from './components/SearchBar'
import AddIcon from '@mui/icons-material/Add'

export default function Dashboard() {
  const documents = [
    {
      title: 'Notes',
      id: '1',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      isFavorite: true,
    },
    {
      title: 'Notes',
      id: '2',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      isFavorite: true,
    },
    {
      title: 'Notes',
      id: '3',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      isFavorite: true,
    },
    {
      title: 'Notes',
      id: '4',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      isFavorite: false,
    },
    {
      title: 'Notes',
      id: '5',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      isFavorite: false,
    },
    {
      title: 'Notes',
      id: '6',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      isFavorite: true,
    },
  ]
  const appBarHeight = useAppBarHeight()
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box sx={{ backgroundColor: 'action.selected', height: `calc(100vh - ${appBarHeight}px)` }}>
      <ClassDrawer width={270} />
      {/* Requires margin to account for width of drawer */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '270px' }}>
        <Box
          sx={{
            display: 'flex',
            m: 5,
            gap: 2,
          }}>
          <SearchBar style={{ flexGrow: 1 }} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <Button variant='contained' color='primary' startIcon={<AddIcon />}>
            Create New
          </Button>
        </Box>
        {/* For some reason adding a margin to the grid messes things up... using a box instead */}
        <Box mx={5}>
          <Grid spacing={2} container>
            {documents.map((document, i) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <DocumentCard document={document} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </div>
    </Box>
  )
}
