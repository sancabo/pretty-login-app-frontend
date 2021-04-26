import {
  Container,
  LinearProgress,
  Typography,
  createMuiTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useParams } from "react-router";
import PageFrame from "../PageFrame";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4F4F4F",
    },
    secondary: {
      main: "#2F80ED",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: "15%",
    height: "500px",
  },
  centered: {
    textAlign: "center",
    padding: "30px",
  },
}));

function getOkBody(classes) {
  return (
    <PageFrame theme={theme}>
      <Container className={classes.centered}>
        <Typography variant="h4">
          Congrats! You have verified your email.
        </Typography>
      </Container>
    </PageFrame>
  );
}

function getErrorBody(classes) {
  return (
    <PageFrame theme={theme}>
      <Container className={classes.centered}>
        <Typography variant="h4">
          Something went wrong. Please re-send your verification email.
        </Typography>
      </Container>
    </PageFrame>
  );
}

function getInvalidLinkBody(classes) {
  return (
    <PageFrame theme={theme}>
      <Container className={classes.centered}>
        <Typography variant="h4">Invalid or Expired Link</Typography>
      </Container>
    </PageFrame>
  );
}

function getResolving(classes) {
  return (
    <PageFrame theme={theme}>
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h3">Working</Typography>
        <LinearProgress color="secondary" />
      </Container>
    </PageFrame>
  );
}

function ConfirmEmail() {
  const classes = useStyles();
  let { id } = useParams();
  let [body, setBody] = useState(null);
  let [isDone, setIsDone] = useState(false);
  console.log(id);
  if (!isDone) {
    const prodUrl = "https://prettylogin-17498.rj.r.appspot.com/confirm/" + id;
    var url = new URL(prodUrl);
    console.log(url);
    fetch(url)
      .then((response) => {
        setIsDone(true);
        if (response.ok) {
          setBody(getOkBody(classes));
        } else {
          console.log(response);
          setBody(getInvalidLinkBody(classes));
        }
      })
      .catch((error) => {
        console.log(error);
        setBody(getErrorBody(classes));
      });
    return getResolving(classes);
  } else {
    return body;
  }
}

export default ConfirmEmail;
