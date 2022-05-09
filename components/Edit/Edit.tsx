import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useDebounce from "../../hooks/useDebounce";
import axios from "axios";
import moment from "moment";
import { NoteType } from "../../types";


export default function Edit() {
  const debug = false;
  const router = useRouter();
  const { query, isReady } = router;
  const editorRef = useRef<any>(null);

  // Content
  const [content, setContent] = useState<string | null>(null);
  const debouncedContent = useDebounce(content, 1000);

  // Title
  const [title, setTitle] = useState<string | null>(null);
  const debouncedTitle = useDebounce(title, 1000);

  const [note, setNote] = useState<any>(null);
  const fetchNote = async () => {
    if (!isReady) return;
    if (debug) console.log("fetching");
    await axios
      .get<NoteType>("http://localhost:3000/api/note", {
        params: { id: query.id },
      })
      .then(res => {
        if (debug) console.log("res", res);
        setNote(res.data);
        setContent(res.data.content);
        setTitle(res.data.title);
      });
  };

  // Fetch note when page is loaded
  useEffect(() => {
    if (!isReady) return;
    fetchNote();
    const interval = setInterval(fetchNote, 60000);
    return () => clearInterval(interval);
  }, [isReady]);

  const updateNote = async (id: string, data: Partial<NoteType>) => {
    if (!isReady) return;
    if (debug) console.log("patching");
    await axios
      .patch<NoteType>("http://localhost:3000/api/note", {
        id: query.id,
        ...data,
      })
      .then(res => {
        setNote(res.data);
      });
  };

  const updateThisNote = async (data: Partial<NoteType>) => {
    if (!isReady) return;
    updateNote(query.id as string, data);
  };

  // Update note when content is changed
  useEffect(() => {
    if (
      !isReady ||
      debouncedContent === null ||
      debouncedContent === note?.content
    )
      return;
    if (debug) console.log("content", debouncedContent);
    updateThisNote({ content: debouncedContent });
  }, [debouncedContent]);

  // Update note when content is changed
  useEffect(() => {
    if (!isReady || debouncedTitle === null || debouncedTitle === note?.title)
      return;
    if (debug) console.log("title", debouncedTitle);
    updateThisNote({ title: debouncedTitle });
  }, [debouncedTitle]);

  return (
    <Box
      sx={{
        m: 3,
      }}
    >
      {debug && (
        <>
          <button onClick={() => fetchNote()}>refetch</button>
          <p>debouncedContent: {debouncedContent}</p>
          <p>content: {content}</p>
          <p>data: {JSON.stringify(note, null, 2)}</p>
        </>
      )}
      <TextField
        onChange={e => setTitle(e.target.value)}
        value={title}
        size="small"
        sx={{ my: 1, display: "block" }}
      />
      <Typography display='block' variant="caption" sx={{ mb: 2, }}>
        Last updated {moment(note?.updatedAt).fromNow()}
      </Typography>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content || ""}
        onEditorChange={val => setContent(val)}
        init={{
          height: 450,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <>
        <Button
          variant="contained"
          sx={{ mr: 1, mt: 2 }}
          onClick={() => router.push("/")}
        >
          Go To Dashboard
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            const requestOptions = {
              method: "DELETE",
            };
            fetch(`/api/note?id=${query.id}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.deletedCount) {
                  router.push("/");
                }
              })
              .catch(error => console.log("error", error));
          }}
        >
          Delete Note
        </Button>
      </>
    </Box>
  );
}
