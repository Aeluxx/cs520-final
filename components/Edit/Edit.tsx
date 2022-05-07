import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Editor } from '@tinymce/tinymce-react'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useDebounce from '../../hooks/useDebounce'
import axios from 'axios'
import useAxios from 'axios-hooks'

export default function Edit() {
  const router = useRouter()
  const noteId = router.query.id
  const editorRef = useRef<any>(null)
  const [content, setContent] = useState('')
  const debouncedContent = useDebounce(content, 1000)
  const [{ data, loading }] = useAxios({ url: 'http://localhost:3000/api/note', method: 'GET', params: { id: noteId } })
  console.log('data', data)
  useEffect(() => {
    if(loading) return
    setContent(data?.content)
  }, [data])

  const updateNote = async () => {
    const x = await axios.patch('http://localhost:3000/api/note', { id: noteId, content: debouncedContent })
    console.log('x', x)
  }

  // useEffect(() => {
  //   updateNote()
  // }, [debouncedContent])

  return (
    <Box
      sx={{
        m: 3,
      }}>
      <p>{debouncedContent}</p>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={val => setContent(val)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </Box>
  )
}
