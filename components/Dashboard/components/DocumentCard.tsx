import { Card, CardActionArea, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
// import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/router'

type DocumentType = {
  title: string
  id: string
  course: string
  tags?: string[]
  lastUpdated: Date
  isFavorite: boolean
}

type DocumentCardProps = {
  document: DocumentType
}

type FavoriteIconProps = {
  checked: boolean
  onClick: (checked: boolean) => any
}
const FavoriteIcon = (props: FavoriteIconProps) => {
  const { checked, onClick } = props
  return (
    <Rating
      onClick={e => e.stopPropagation()}
      onChange={(e, val) => {
        onClick(!!val)
      }}
      max={1}
      value={checked ? 1 : 0}
    />
  )
}

export default function DocumentCard(props: DocumentCardProps) {
  const { document } = props
  const { title, course, tags, lastUpdated, isFavorite, id } = document
  const router = useRouter()
  return (
    <Card>
      <CardActionArea disableRipple onClick={() => router.push(`/edit/id=${id}`)}>
        <Box sx={{ p: 2 }}>
          <Box display='flex'>
            <Typography flexGrow={1} variant='h5'>
              {title}
            </Typography>
            <FavoriteIcon
              checked={isFavorite}
              // TODO: Actually toggle on click
              onClick={console.log}
            />
          </Box>
          <Typography sx={{ color: 'gray' }}>{course}</Typography>
          <Typography>{title}</Typography>
          <Typography>{lastUpdated.toLocaleDateString()}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
