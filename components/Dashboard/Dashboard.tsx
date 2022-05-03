import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import useAppBarHeight from '../../hooks/useAppBarHeight'
import ClassDrawer from './components/ClassDrawer'
import DocumentCard from './components/DocumentCard'
import SearchBar from './components/SearchBar'
import axios from 'axios'
import useAxios from 'axios-hooks'
import useAuth from '../../hooks/useAuth'
import { DocumentType } from '../../types'
import CreateNewNoteButton from './components/CreateNewNoteButton'

export default function Dashboard() {
  const { user } = useAuth()
  const [selectedSectionId, setSelectedSectionId] = useState<string>('')
  const [{data: documents}] = useAxios<DocumentType[]>({url: 'http://localhost:3000/api/', method: 'GET', data: {sectionId: selectedSectionId}})

  const appBarHeight = useAppBarHeight()
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box sx={{ backgroundColor: 'action.selected', height: `calc(100vh - ${appBarHeight}px)` }}>
      <ClassDrawer selectedSectionId={selectedSectionId} setSelectedSectionId={setSelectedSectionId} width={270} />
      {/* Requires margin to account for width of drawer */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '270px' }}>
        <Box
          sx={{
            display: 'flex',
            m: 5,
            gap: 2,
          }}>
          <SearchBar style={{ flexGrow: 1 }} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <CreateNewNoteButton sectionId={selectedSectionId}/>
        </Box>
        {/* For some reason adding a margin to the grid messes things up... using a box instead */}
        <Box mx={5}>
          <Grid spacing={2} container>
            {documents?.map((document, i) => {
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
