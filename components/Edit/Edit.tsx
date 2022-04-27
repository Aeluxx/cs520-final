import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import { useRouter } from 'next/router'

export default function Edit() {
  const router = useRouter()
  const docId = router.query.id
  const editorRef = useRef<any>(null)
  return (
    <Box sx={{
      m: 3
    }}>
      <Typography variant='h3'>Editing document {docId}...</Typography>
      <Editor
        apiKey={process.env.REACT_APP_TINY_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue='<p>This is the initial content of the editor.</p>'
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
