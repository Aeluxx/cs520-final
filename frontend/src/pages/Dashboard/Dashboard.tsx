import { Box, Grid, Typography } from '@mui/material'
import useAppBarHeight from '../../hooks/useAppBarHeight'
import ClassDrawer from './components/ClassDrawer'
import DocumentCard from './components/DocumentCard'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const documents = [
    {
      title: 'Notes',
      id: '1',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      favorited: true
    },
    {
      title: 'Notes',
      id: '2',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      favorited: true
    },
    {
      title: 'Notes',
      id: '3',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      favorited: true
    },
    {
      title: 'Notes',
      id: '4',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      favorited: false
    },
    {
      title: 'Notes',
      id: '5',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      favorited: false
    },
    {
      title: 'Notes',
      id: '6',
      course: 'CS520',
      tags: ['Quiz 2', 'Linear Algebra'],
      lastUpdated: new Date(Date.now()),
      favorited: true
    },
  ]
  const appBarHeight = useAppBarHeight()
  return (
    <Box style={{ backgroundColor: '#f3f3f3', height: `calc(100vh - ${appBarHeight}px)` }}>
      <ClassDrawer width={270} />
      {/* Requires margin to account for width of drawer */}
      <div style={{ display: 'flex', marginLeft: '270px' }}>
        <Grid m={3} spacing={2} container>
          {documents.map((document) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <DocumentCard document={document}/>
              </Grid>
            )
          })}
        </Grid>
        {/* <Typography sx={{ backgroundColor: 'pink' }}>asdf</Typography> */}
      </div>
    </Box>
  )
}
