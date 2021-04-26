import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Container,
  Paper,
  makeStyles,
  Typography,
  Grid,
  createMuiTheme,
  ThemeProvider,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import ControlledTextField from "./ControlledTextField";
import CopyrightFooter from "../CopyrightFooter";
import TopBar from "../TopBar";
import SuccessfulRegistration from "./SuccessfulRegistration";

const useStyles = makeStyles((theme) => ({
  background: {
    height: "1200px",
    backgroundImage: "url(https://i.ibb.co/99XbNKG/pexels-lukas-574071.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    backgroundColor: "white",
    height: "100%",
    paddingTop: "10ch",
  },
  regForm: {
    textAlign: "center",
  },
  regTitle: {
    marginBottom: "2ch",
  },
  regButton: {
    width: "100%",
    height: "5ch",
  },
  withSpacingMargin: {
    margin: "5px",
  },
}));

function Register(props) {
  const classes = useStyles();
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

  const [sucess, setSucess] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const getSignInLink = (waiting) => {
    if (waiting) {
      return (
        <Typography color="secondary" className={classes.withSpacingMargin}>
          Sign in
        </Typography>
      );
    } else {
      return (
        <Link
          component={RouterLink}
          to="/login"
          className={classes.withSpacingMargin}
        >
          <Typography color="secondary">Sign in</Typography>
        </Link>
      );
    }
  };

  const getButtonContent = (isLoading) => {
    if (isLoading) {
      return <CircularProgress color="secondary" />;
    } else {
      return "Submit";
    }
  };

  const methods = useForm({
    defaultValues: {
      usernameControllerField: "",
      passwordControllerField: "",
      passwordRepeatControllerField: "",
      emailControllerField: "",
    },
  });
  const { handleSubmit, watch, control, reset } = methods;
  const onSubmit = (data) => {
    console.log("Proceeding to submit: " + data);
    setWaitingForResponse(true);
    const prodUrl = "https://prettylogin-17498.rj.r.appspot.com/register";
    var url = new URL(prodUrl);
    const authRequest = {
      username: data.usernameControllerField,
      password: data.passwordControllerField,
      email: data.emailControllerField,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authRequest),
    })
      .then((response) => {
        if (response.ok) {
          setSucess(true);
        }
      })
      .catch(function () {
        console.log("Internal Application Error");
      })
      .finally(() => setWaitingForResponse(false));
  };

  const passwordsAreTheSame = (value) => {
    return (
      watch("passwordControllerField") ===
        watch("passwordRepeatControllerField") ||
      "Passwords don't match. Enter another value"
    );
  };

  function resetAndClear() {
    reset(
      {
        usernameControllerField: "",
        passwordControllerField: "",
        passwordRepeatControllerField: "",
        emailControllerField: "",
      },
      {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      }
    );
  }
  if (!sucess) {
    return (
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item>
            <TopBar />
          </Grid>
          <Grid item>
            <Paper square elevation={0} className={classes.background}>
              <Container className={classes.mainContainer}>
                <Container className={classes.regForm}>
                  <Typography
                    color="secondary"
                    variant="h5"
                    className={classes.regTitle}
                  >
                    Sign Up
                  </Typography>
                  <ControlledTextField
                    control={control}
                    name="usernameControllerField"
                    label="New username"
                    reset={resetAndClear}
                  />
                  <ControlledTextField
                    control={control}
                    name="passwordControllerField"
                    label="New password"
                    reset={resetAndClear}
                    validate={passwordsAreTheSame}
                    type="password"
                  />
                  <ControlledTextField
                    control={control}
                    name="passwordRepeatControllerField"
                    label="Repeat password"
                    reset={resetAndClear}
                    validate={passwordsAreTheSame}
                    type="password"
                  />
                  <ControlledTextField
                    control={control}
                    name="emailControllerField"
                    label="Email"
                    reset={resetAndClear}
                    type="email"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.regButton}
                    onClick={handleSubmit(onSubmit)}
                    disabled={waitingForResponse}
                  >
                    {getButtonContent(waitingForResponse)}
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "5ch",
                      justifyContent: "center",
                    }}
                  >
                    {getSignInLink(waitingForResponse)}
                    <Typography className={classes.withSpacingMargin}>
                      instead
                    </Typography>
                  </div>
                </Container>
              </Container>
            </Paper>
          </Grid>
          <Grid item>
            <CopyrightFooter />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  } else {
    return <SuccessfulRegistration />;
  }
}

export default Register;
