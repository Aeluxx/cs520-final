import { Drawer, ListItemButton, List, Typography, ListItemIcon, Divider, TextField, ListItem, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/system'
import { MouseEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useConfirmDialog } from '../../ConfirmDialog'

interface ClassDrawerProps {
  width?: number
}

export default function ClassDrawer(props: ClassDrawerProps) {
  const width = props?.width || 270

  type ClassTabProps = {
    name: string
    semester: string
    selected: boolean
  }
  const ClassTab = (props: ClassTabProps) => {
    const { name, semester, selected } = props
    const [hover, setHover] = useState(false)
    const { render, confirm } = useConfirmDialog()
    const handleDelete = (e: any) => {
      e.stopPropagation()
      confirm().then(confirmed => {
        if (confirmed) deleteCourse()
      })
    }
    const deleteCourse = () => {
      // TODO
    }
    return (
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {render({ content: `Are you sure you want to delete ${name}?` })}
        <ListItemButton
          disableRipple
          sx={{
            display: 'flex',
          }}
          selected={selected}>
          <div style={{ flexGrow: 1 }}>
            <Typography display='block'>{name}</Typography>
            <Typography variant='subtitle2' color='GrayText'>
              {semester}
            </Typography>
          </div>
          {hover && (
            <IconButton onClick={handleDelete} size='small'>
              <CloseIcon />
            </IconButton>
          )}
        </ListItemButton>
      </div>
    )
  }

  const classes = [
    {
      name: 'CS520',
      semester: 'Fall 2022',
    },
    {
      name: 'CS101',
      semester: 'Fall 2022',
    },
  ]

  const [createNewClassOpen, setCreateNewClassOpen] = useState(false)
  const handleNewClass = () => {
    setCreateNewClassOpen(true)
  }
  const NewClassInput = () => {
    const handleCreate = () => {
      setCreateNewClassOpen(false)
    }
    const [value, setValue] = useState('')
    return (
      <ListItem>
        <TextField
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='New class...'
          size='small'
          variant='standard'
          autoFocus
          onBlur={handleCreate}
          onKeyDown={e => {
            if (e.key === 'Enter') handleCreate()
          }}
        />
      </ListItem>
    )
  }
  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          pt: 12,
        },
      }}
      anchor='left'
      variant='permanent'>
      <List>
        <ListItemButton onClick={handleNewClass}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          Add Class
        </ListItemButton>
        <Divider />
        {createNewClassOpen && <NewClassInput />}
        {classes.map(({ name, semester }, i) => (
          <ClassTab
            // TODO: Actually show when it is selected, not just the first class
            selected={i === 0}
            key={`class-${i}`}
            name={name}
            semester={semester}
          />
        ))}
      </List>
    </Drawer>
  )
}
