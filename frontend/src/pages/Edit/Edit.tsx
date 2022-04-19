import React from 'react'
import { useParams } from 'react-router-dom'

export default function Edit() {
  const { docId } = useParams()
  return (
    <div>Editing document {docId}...</div>
  )
}
