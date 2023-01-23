import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Popup from "./Popup";

function TinyEditor({
  currentNoteId,
  noteContent,
  handleEditorRef,
  isDeleting,
}) {
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const tinyEditorRef = useRef(null);
  const { noteId } = useParams();

  useEffect(() => {
    if (!tinyEditorRef.current) return;
    handleEditorRef(tinyEditorRef.current);
  }, [tinyEditorRef.current]);
  return (
    <>
      {isEditorLoading && <h1> Loading Editor....</h1>}
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          tinyEditorRef.current = editor;
          setIsEditorLoading(false);
        }}
        initialValue={noteContent}
        init={{
          height: "100%",
          width: "100%",
          menubar: false,
          resize: false,
          plugins: [
            // "advlist",
            "autolink",
            // "lists",
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
            "blocks |" +
            "bold italic forecolor backcolor underline selectall | alignleft aligncenter " +
            "alignright alignjustify bullist  numlist lineheight | outdent indent " +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
          skin: "borderless",
        }}
      />
    </>
  );
}

export default TinyEditor;
