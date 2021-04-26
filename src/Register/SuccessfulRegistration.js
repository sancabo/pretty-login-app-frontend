import React from "react";
import {
  Link,
  Container,
  Paper,
  makeStyles,
  Typography,
  Grid,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import CopyrightFooter from "../CopyrightFooter";
import TopBar from "../TopBar";

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
  },
  withSpacingMargin: {
    margin: "5px",
  },
  mainPaper: { padding: "10ch" },
}));

// | register -> send mail link
function SuccessfulRegistration() {
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
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column">
        <Grid item>
          <TopBar />
        </Grid>
        <Grid item>
          <Paper elevation={3} className={classes.background}>
            <Container disableGutters className={classes.mainContainer}>
              <Paper elevation={3} className={classes.mainPaper}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    color="primary"
                    variant="h4"
                    className={classes.withSpacingMargin}
                  >
                    Registration Successful! Proceed to
                  </Typography>
                  <Link
                    component={RouterLink}
                    to="/login"
                    className={classes.withSpacingMargin}
                  >
                    <Typography color="secondary" variant="h4">
                      sign in
                    </Typography>
                  </Link>
                </div>
              </Paper>
            </Container>
          </Paper>
        </Grid>
        <Grid item>
          <CopyrightFooter />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SuccessfulRegistration;
