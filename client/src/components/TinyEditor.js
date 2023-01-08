import React, { useCallback, useEffect, useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

import axios from "../axiosConfig/axiosConfig";

function TinyEditor() {
  const initialContent = useState(
    "<h1>llloooooool</h1><p>asdsadsad<strong>asdsa</strong></p>"
  )[0];

  const [contentChange, setContentChange] = useState(initialContent);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setIsSaving(true);
    // user typing loading when stop for 2 secods execute post request

    const timeoutId = setTimeout(() => {
      console.log(contentChange);
      setIsSaving(false);
    }, [2000]);

    return () => clearTimeout(timeoutId);
  }, [contentChange]);

  // useEffect(() => {
  //   // console.log(editorRef.current?.getContent());
  //   // console.log("hey", editorRef.current.getContent());
  //   // setContentString(editorRef.current.getContent());
  // }, [editorRef.current, editorRef.current?.getContent()]);

  return (
    <>
      {isEditorLoading && <h1> Loading...</h1>}
      <Editor
        onEditorChange={(value) => setContentChange(value)}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          setIsEditorLoading(false);
          console.log("asd");
          editorRef.current = editor;
        }}
        initialValue={initialContent}
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
          ],
          toolbar:
            "undo redo  blocks  " +
            "bold italic forecolor  alignleft aligncenter " +
            "alignright alignjustify  bullist numlist outdent indent  " +
            "removeformat  help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; } ",
          // content_css: "./TinyMCE.css",
          skin: "borderless",
        }}
      />
    </>
  );
}

export default TinyEditor;
