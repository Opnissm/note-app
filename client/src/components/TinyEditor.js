import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import axios from "../axiosConfig/axiosConfig";

// delayed saving

function TinyEditor({ currentNoteId, noteContent, handleEditorRef }) {
  const [content, setContent] = useState(noteContent);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const { setNotes } = useOutletContext();
  const tinyEditorRef = useRef(null);

  useEffect(() => {
    if (!tinyEditorRef.current) return;
    handleEditorRef(tinyEditorRef.current);
  }, [tinyEditorRef.current]);
  return (
    <>
      {isEditorLoading && <h1> Loading Editor....</h1>}
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onEditorChange={(value) => {
          setContent(value);
        }}
        onInit={(evt, editor) => {
          tinyEditorRef.current = editor;
          setIsEditorLoading(false);
        }}
        initialValue={noteContent}
        init={{
          content_css: "",
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
            "blocks |" +
            "bold italic forecolor backcolor underline selectall | alignleft aligncenter " +
            "alignright alignjustify bullist  numlist lineheight | outdent indent " +
            "removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
          skin: "borderless",
          // content_css: "writer",
        }}
      />
    </>
  );
}

export default TinyEditor;
