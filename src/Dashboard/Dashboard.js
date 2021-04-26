import React, { useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  createMuiTheme,
  Paper,
  Typography,
  Button,
  ThemeProvider,
} from "@material-ui/core";
import { Redirect } from "react-router";
import TechnologyDesc from "./TechnologyDesc";
import technologies from "../resources/technologies.json";
import CopyrightFooter from "../CopyrightFooter";
import TopBar from "../TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1300px",
    backgroundImage: "url(https://i.ibb.co/99XbNKG/pexels-lukas-574071.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logInPaper: {
    flex: 1,
    height: "1200px",
    padding: "50px",
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
  siteHome: {
    backgroundColor: "white",
    width: "300px",
    height: "64px",
    borderRadius: "0 32px 32px 0",
    display: "flex",
    alignItems: "center",
    paddingLeft: "30px",
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
  mainPaperContainer: {
    height: "100%",
  },
  doneIncon: {
    color: "white",
    borderColor: "white",
  },
  congrats: {
    borderBottom: "1px solid black",
    paddingBottom: "20px",
  },
  withMargin: {
    marginLeft: "10px",
  },
}));

function Dashboard(props) {
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
  let realProps = props;
  if (props.location != null) {
    if (props.location.state != null) {
      realProps = props.location.state;
    }
  }

  let [loggedOut, setLoggedOut] = useState(realProps.token == null);
  if (loggedOut) {
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <Container disableGutters={true} maxWidth={false}>
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item>
            <TopBar>
              <div style={{ width: "30px" }} />
              <Typography variant="h6" className={classes.doneIncon}>
                Welcome,
              </Typography>
              <div style={{ width: "10px" }} />
              <Typography variant="h6" color="secondary">
                {realProps.loggedUser}
              </Typography>
              <div style={{ width: "30px" }} />
              <Button
                variant="outlined"
                className={classes.doneIncon}
                onClick={() => {
                  localStorage.clear("token");
                  realProps.onLogout();
                  setLoggedOut(true);
                }}
              >
                Log out
              </Button>
            </TopBar>
          </Grid>
          <Grid item>
            <Paper square={true} className={classes.root}>
              <Container className={classes.mainPaperContainer}>
                <Paper
                  square={true}
                  elevation={3}
                  className={classes.logInPaper}
                >
                  <Container>
                    <Typography variant="h1" className={classes.congrats}>
                      Congrats! You are logged in!
                    </Typography>

                    <div style={{ height: "30px" }} />
                    <Typography variant="h5" color="secondary">
                      It's incredible what it takes to make a semi-competent
                      login page.
                    </Typography>
                    <Typography variant="h5" color="secondary">
                      Here, let's take a look:
                    </Typography>
                    <div style={{ height: "30px" }} />
                    {technologies.map((t) => (
                      <TechnologyDesc key={t.id} name={t.name} desc={t.desc} />
                    ))}
                    <div style={{ height: "30px" }} />
                    <Typography variant="h5" color="secondary">
                      And we haven't even dealt with protection against DDoS
                      attacks, Captchas, High availability on the backend, Split
                      loading of the page
                    </Typography>
                  </Container>
                </Paper>
              </Container>
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

export default Dashboard;
