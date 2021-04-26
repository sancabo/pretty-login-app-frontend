import {
  Container,
  Grid,
  makeStyles,
  createMuiTheme,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  ThemeProvider,
  Checkbox,
  Icon,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import gLogo from "../resources/gLogo.svg";
import LogInButton from "./LogInButton";
import { Link as RouterLink } from "react-router-dom";
import CopyrightFooter from "../CopyrightFooter";
import TopBar from "../TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1200px",
    backgroundImage: "url(https://i.ibb.co/99XbNKG/pexels-lukas-574071.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logInPaper: {
    flex: 1,
    width: "50ch",
    height: "600px",
    paddingTop: "30px",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logInButtons: {
    width: "40ch",
    height: "5ch",
  },

  logInButtonGoogle: {
    width: "40ch",
    height: "5ch",
    backgroundColor: "white",
  },
  bottomToolbar: {
    justifyContent: "center",
  },
  input: {
    height: "87.5px",
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
  whiteText: {
    color: "white",
  },
}));

//The first component I made for this page! It's kind of a mess.
function LogIn(props) {
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
  let [stateUser, setStateUser] = useState({
    userError: false,
    userInput: "",
    helperText: "",
  });
  let [statePassword, setStatePassword] = useState({
    passwordError: false,
    passwordInput: "",
    helperText: "",
  });
  let [token, setToken] = useState(props.token);
  let [buttonState, setButtonState] = useState({ isLoading: false });
  let [rememberMe, setRememberMe] = useState(false);

  const handleLogInClick = () => {
    if (statePassword.passwordInput === "") {
      setStatePassword({
        passwordError: true,
        passwordInput: statePassword.passwordInput,
        helperText: "This field is required",
      });
    }
    if (stateUser.userInput === "") {
      setStateUser({
        userError: true,
        userInput: stateUser.passwordInput,
        helperText: "This field is required",
      });
    }
    if (statePassword.passwordInput !== "" && stateUser.userInput !== "") {
      setStatePassword({
        passwordError: false,
        passwordInput: statePassword.passwordInput,
        helperText: "",
      });
      setStateUser({
        userError: false,
        userInput: stateUser.passwordInput,
        helperText: "",
      });
      // const testUrl = "http://localhost:8080/authenticate";
      const prodUrl = "https://prettylogin-17498.rj.r.appspot.com/authenticate";
      var url = new URL(prodUrl),
        params = {
          username: stateUser.userInput,
          password: statePassword.passwordInput,
        };
      setButtonState({ isLoading: true });
      fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            setStatePassword({
              passwordError: true,
              passwordInput: statePassword.passwordInput,
              helperText: "Wrong user/password",
            });
            setStateUser({
              userError: true,
              userInput: stateUser.passwordInput,
              helperText: "Wrong user/password",
            });
            return { token: null };
          } else {
            return response.json();
          }
        })
        .then((data) => {
          props.onTokenRetrieval(data.token, stateUser.userInput);
          setToken(data.token);
          if (rememberMe) localStorage.setItem("token", data.token);
          setButtonState({ isLoading: false });
        })
        .catch(function () {
          console.log("Internal Application Error");
          setButtonState({ isLoading: false });
        });
    }
  };
  if (token != null)
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: {
            token: token,
            onLogout: props.handleLogOut,
            loggedUser: props.loggedUser,
          },
        }}
      />
    );

  return (
    <Container disableGutters={true} maxWidth={false}>
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item>
            <TopBar>
              <div style={{ width: "30px" }} />
              <Typography variant="h6">
                <Link className={classes.whiteText}>About</Link>
              </Typography>
            </TopBar>
          </Grid>
          <Grid item>
            <Paper square={true} className={classes.root}>
              <Grid item>
                <Paper
                  square={true}
                  elevation={3}
                  className={classes.logInPaper}
                >
                  <form className={classes.form} noValidate autoComplete="off">
                    <Container className={classes.container}>
                      <Typography color="secondary" variant="h5">
                        {"Sign in "}
                      </Typography>
                      <TextField
                        id="log-in-user"
                        variant="outlined"
                        label="Username"
                        onChange={(e) => {
                          setStateUser({
                            userError: false,
                            userInput: e.target.value,
                            helperText: "",
                          });
                        }}
                        error={stateUser.userError}
                        helperText={stateUser.helperText}
                        className={classes.input}
                        fullWidth
                      />
                      <TextField
                        id="log-in-password"
                        variant="outlined"
                        label="Password"
                        type="password"
                        onChange={(e) =>
                          setStatePassword({
                            passwordError: false,
                            passwordInput: e.target.value,
                            helperText: "",
                          })
                        }
                        error={statePassword.passwordError}
                        helperText={statePassword.helperText}
                        className={classes.input}
                        fullWidth
                      />
                      <div style={{ height: "2px" }} />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          alignSelf: "flex-start",
                          marginLeft: "20px",
                        }}
                      >
                        <Checkbox
                          onChange={(e) => setRememberMe(e.target.checked)}
                        >
                          Remember me
                        </Checkbox>
                        <Typography>Remember me</Typography>
                      </div>
                      <div style={{ height: "10px" }} />
                      <LogInButton
                        isLoading={buttonState.isLoading}
                        onClick={handleLogInClick}
                      />
                      <Typography>or</Typography>

                      <Button
                        variant="contained"
                        startIcon={
                          <Icon classes={{ root: classes.iconRoot }}>
                            <img
                              className={classes.imageIcon}
                              src={gLogo}
                              alt=""
                            />
                          </Icon>
                        }
                        className={classes.logInButtonGoogle}
                      >
                        Sign In with Google
                      </Button>
                      <div style={{ height: "15px" }} />
                      <div style={{ display: "flex" }}>
                        <Typography>Not Registered?</Typography>
                        <div style={{ width: "10px" }} />
                        <Typography color="secondary">
                          <Link
                            color="secondary"
                            component={RouterLink}
                            to="/register"
                          >
                            Sign up!
                          </Link>
                        </Typography>
                      </div>
                      <div style={{ height: "15px" }} />
                      <Typography color="secondary">
                        <Link
                          color="secondary"
                          component={RouterLink}
                          to="/passwordRecovery"
                        >
                          Forgot Password?
                        </Link>
                      </Typography>
                    </Container>
                  </form>
                </Paper>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <CopyrightFooter />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default LogIn;
