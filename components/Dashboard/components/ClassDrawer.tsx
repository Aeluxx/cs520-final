import { Drawer, ListItemButton, List, Typography, ListItemIcon, Divider, TextField, ListItem, IconButton, ListItemButtonProps } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useConfirmDialog } from '../../ConfirmDialog'
import useAuth from '../../../hooks/useAuth'
import axios from 'axios'
import useAxios from 'axios-hooks'

interface ClassDrawerProps {
  width?: number
  selectedSectionId: string
  setSelectedSectionId: (id: string) => any
}

export default function ClassDrawer(props: ClassDrawerProps) {
  const { user } = useAuth()
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'http://localhost:3000/api/sectionsFromUser',
    method: 'GET',
    params: { userId: user?.id },
  })

  const { width: passedWidth, selectedSectionId, setSelectedSectionId } = props
  const width = passedWidth || 270

  type ClassTabProps = {
    name: string
    id: string
    semester?: string
    selected: boolean
  }
  const ClassTab = (props: ClassTabProps & ListItemButtonProps) => {
    const { name, semester, selected, id, ...listItemButtonProps } = props
    const [hover, setHover] = useState(false)
    const { render, confirm } = useConfirmDialog()
    const handleDelete = (e: any) => {
      e.stopPropagation()
      confirm().then(confirmed => {
        if (confirmed) deleteCourse()
      })
    }
    const deleteCourse = async () => {
      await axios.delete('http://localhost:3000/api/section', { data: { id } }).then(() => refetch())
    }
    return (
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {render({ content: `Are you sure you want to delete ${name}?` })}
        <ListItemButton
          {...listItemButtonProps}
          disableRipple
          sx={{
            display: 'flex',
          }}
          selected={selected}>
          <div style={{ flexGrow: 1 }}>
            <Typography m={1} display='block'>
              {name}
            </Typography>
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

  const [createNewClassOpen, setCreateNewClassOpen] = useState(false)
  const handleNewClass = () => {
    setCreateNewClassOpen(true)
  }
  const NewClassInput = () => {
    const { user } = useAuth()
    const [value, setValue] = useState('')
    const handleCreate = () => {
      setCreateNewClassOpen(false)
      if (!value) return
      axios.post('http://localhost:3000/api/section', { name: value, userIds: [user?.id] }).then(() => {
        refetch()
      })
      setValue('')
    }
    return (
      <ListItem>
        <TextField
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder='New class...'
          size='small'
          variant='standard'
          autoFocus
          onKeyPress={e => {
            if (e.key === 'Enter') {
              setCreateNewClassOpen(false)
            }
          }}
          onBlur={handleCreate}
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
        {data?.map(({ name, _id }: any, i: number) => (
          <ClassTab
            id={_id}
            selected={_id === selectedSectionId}
            onClick={() => setSelectedSectionId(_id)}
            key={`class-${i}`}
            name={name}
            // semester={semester}
          />
        ))}
      </List>
    </Drawer>
  )
}
