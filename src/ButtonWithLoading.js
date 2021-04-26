import React from "react";
import { CircularProgress, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  regButton: {
    width: "100%",
    height: "5ch",
  },
}));

const getButtonContent = (waiting, label) => {
  if (waiting) {
    return <CircularProgress color="secondary" />;
  } else {
    return label;
  }
};

function ButtonWithLoading({ label, onClick, waiting }) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.regButton}
      onClick={onClick}
      disabled={waiting}
    >
      {getButtonContent(waiting, label)}
    </Button>
  );
}

export default ButtonWithLoading;
