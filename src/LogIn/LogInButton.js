import React from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const getButtonContent = (isLoading) => {
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  } else {
    return "Sign In";
  }
};

const useStyles = makeStyles((theme) => ({
  logInButtons: {
    width: "40ch",
    height: "5ch",
  },
}));

function LogInButton(props) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.logInButtons}
      onClick={() => props.onClick()}
      disabled={props.isLoading}
    >
      {getButtonContent(props.isLoading)}
    </Button>
  );
}

export default LogInButton;
