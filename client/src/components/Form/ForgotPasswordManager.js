import React, { useState } from "react";

function ForgotPasswordManager() {
  const [isRequestSuccesful, setIsRequestSuccesful] = useState(false);
  return <div>{isRequestSuccesful}</div>;
}

export default ForgotPasswordManager;
