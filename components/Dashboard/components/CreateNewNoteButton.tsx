import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

type CreateNewNoteButtonProps = {
  sectionId: string
}

export default function CreateNewNoteButton(props: CreateNewNoteButtonProps) {
  const { sectionId } = props
  const router = useRouter()
  const handleCreateNewNote = () => {
    axios.post('http://localhost:3000/api/note', { title: 'New Note', sectionId }).then(res => {
      console.log('res.data', res.data)
      router.push(`/edit/${res.data._id}`)
    })
  }
  return (
    <Button disabled={!sectionId} onClick={handleCreateNewNote} variant='contained' color='primary' startIcon={<AddIcon />}>
      Create New
    </Button>
  )
}
