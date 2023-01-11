import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import axios from "../axiosConfig/axiosConfig";

// delayed saving

function TinyEditor({ noteContent, handleContentTypingStatus }) {
  const [content, setContent] = useState(noteContent);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const { setNotes } = useOutletContext();
  const noteIdRef = useRef(null);
  const { noteId } = useParams();

  useEffect(() => {
    if (noteIdRef.current !== noteId) {
      handleContentTypingStatus("idle");
      noteIdRef.current = noteId;
      return;
    }

    // user typing loading when stop for 2 seconds execute post request
    const timeoutId = setTimeout(() => {
      axios
        .post("/notes", {
          noteId,
          content,
        })
        .then(({ data }) => setNotes({ data: data.notes, status: "resolved" }))
        .catch((err) => console.log(err));
      handleContentTypingStatus("resolved");
    }, [2000]);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <>
      {isEditorLoading && <h1> Loading Editor....</h1>}

      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onDirty={() => handleContentTypingStatus("loading")}
        onEditorChange={(value) => {
          setContent(value);
        }}
        onInit={(evt, editor) => {
          setIsEditorLoading(false);
        }}
        initialValue={noteContent}
        init={{
          height: "100%",
          width: "100%",
          menubar: false,
          resize: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "nonbreaking",
          ],
          toolbar:
            "undo redo  blocks  " +
            "bold italic forecolor  alignleft aligncenter " +
            "alignright alignjustify  bullist numlist outdent indent  " +
            "removeformat  help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; } ",
          skin: "borderless",
        }}
      />
    </>
  );
}

export default TinyEditor;
