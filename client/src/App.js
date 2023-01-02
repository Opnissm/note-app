import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Navigate } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";

import { AuthProvider, useAuth } from "./context/auth-context";
import UnauthenticatedApp from "./UnauthenticatedApp";
// const content = {
//   entityMap: {},
//   blocks: [
//     {
//       key: "637gr",
//       text: "Initialized from content state.",
//       type: "unstyled",
//       depth: 0,
//       inlineStyleRanges: [],
//       entityRanges: [],
//       data: {},
//     },
//   ],
// };
// const _contentState = ContentState.createFromText("");
// const raw = convertToRaw(_contentState); // RawDraftContentState JSON
// const [contentState, setContentState] = useState("content"); // accepts raw as state
function App() {
  const { auth } = useAuth();

  return (
    <div className="w-screen h-screen bg-slate-50">
      {auth.isAuthenticated ? (
        <Navigate to="/note" replace={true} />
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
}
export default App;
