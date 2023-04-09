import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";

function TinyEditor({ noteContent, handleEditorRef }) {
  const [isEditorLoading, setIsEditorLoading] = useState(true);
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
            "bold italic forecolor backcolor underline | alignleft aligncenter " +
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
