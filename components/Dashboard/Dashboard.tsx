import { useEffect, useMemo, useState } from 'react'
import { Box, Grid } from '@mui/material'
import useAppBarHeight from '../../hooks/useAppBarHeight'
import ClassDrawer from './components/ClassDrawer'
import DocumentCard from './components/DocumentCard'
import SearchBar from './components/SearchBar'
import CreateNewNoteButton from './components/CreateNewNoteButton'
import { NoteType } from '../../types'
import { Helmet } from 'react-helmet';

export default function Dashboard() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('')
  const [notes, setNotes] = useState<NoteType[]>([])
  const appBarHeight = useAppBarHeight()
  const [searchValue, setSearchValue] = useState('')
  const filteredNotes = searchValue
    ? notes.filter(note => {
      // Case normalize and check if the seach is a substring of the title or content
        return note.title.toLowerCase().includes(searchValue.toLowerCase()) || note?.content?.toLowerCase().includes(searchValue.toLowerCase())
      })
    : notes

  useEffect(() => {
    fetch(`/api/notesFromSection?sectionId=${selectedSectionId}`)
      .then(response => response.json())
      .then(response => setNotes(response))
      .catch(error => console.log('error', error))
  }, [selectedSectionId])

  return (
    <Box
      sx={{
        backgroundColor: 'action.selected',
        height: `calc(100vh - ${appBarHeight}px)`,
      }}>
      <Helmet>
        <title>Class Dashboard</title>
        <html lang="en" />
      </Helmet>
      <ClassDrawer selectedSectionId={selectedSectionId} setSelectedSectionId={setSelectedSectionId} width={270} />
      {/* Requires margin to account for width of drawer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '270px',
        }}>
        <Box
          sx={{
            display: 'flex',
            m: 5,
            gap: 2,
          }}>
          <SearchBar style={{ flexGrow: 1 }} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
          <CreateNewNoteButton sectionId={selectedSectionId} />
        </Box>
        {/* For some reason adding a margin to the grid messes things up... using a box instead */}
        <Box mx={5}>
          <Grid spacing={2} container>
            {filteredNotes?.map((note: any, i: any) => {
              return (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <DocumentCard note={note} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </div>
    </Box>
  )
}
