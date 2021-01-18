import React from "react";
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";
import "./Login.css";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => (alert(error.message)))
  };

  return (
    <div className="login">
      <img alt="" src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/1200px-Discord_logo.svg.png" />
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
}

export default Login;
