import React, { useCallback, useEffect, useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

import axios from "../axiosConfig/axiosConfig";

function TinyEditor() {
  const [contentString, setContentString] = useState(
    "<h1>llloooooool</h1><p>asdsadsad<strong>asdsa</strong></p>"
  );
  const editorRef = useRef(null);

  // if (editorRef.current) {
  //   console.log(editorRef.current.getContent());

  // }

  useEffect(() => {
    axios.post("/register", {}).then((res) => console.log(res));
    // console.log(editorRef.current?.getContent());
    // console.log("hey", editorRef.current.getContent());
    // setContentString(editorRef.current.getContent());
  }, [editorRef.current, editorRef.current?.getContent()]);
  return (
    <>
      <Editor
        // onSubmit={(e) => console.log(e)}
        // onChange={(e) => console.log(e.target.getContent())}
        // onSaveContent={(e) => console.log(e)}
        // onSetContent={() => console.log("hey")}
        // onCommentChange={() => console.log("asd")}
        // onChange={() => console.log("execute")}
        onEditorChange={(e) => console.log(e)}
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(evt, editor) => {
          console.log(evt);
          editorRef.current = editor;
        }}
        initialValue={contentString}
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
            // "media",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}

export default TinyEditor;
