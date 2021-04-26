import React from "react";
import {
  Container,
  Paper,
  makeStyles,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import CopyrightFooter from "./CopyrightFooter";
import TopBar from "./TopBar";

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
function PageFrame({ children, theme, ...rest }) {
  const classes = useStyles();
  return (
    <Container disableGutters={true} maxWidth={false}>
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <Grid item>
            <TopBar></TopBar>
          </Grid>
          <Grid item>
            <Paper square={true} className={classes.background}>
              <Container className={classes.mainPaperContainer}>
                <Paper elevation={3} className={classes.logInPaper}>
                  <Container>{children}</Container>
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

export default PageFrame;
