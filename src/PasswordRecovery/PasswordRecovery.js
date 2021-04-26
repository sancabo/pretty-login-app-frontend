import React, { useState } from "react";
import {
  Container,
  Paper,
  makeStyles,
  Grid,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import CopyrightFooter from "../CopyrightFooter";
import TopBar from "../TopBar";
import EntertCode from "./EnterCode";
import EnterNewPassword from "./EnterNewPassword";
import EnterEmail from "./EnterEmail";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

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
    height: "500px",
  },
}));

function PasswordRecovery() {
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

  const [stage, setStage] = useState(0);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  const handleCompletion = (email) => {
    const newStage = stage + 1;
    setEmail(email);
    setStage(newStage);
  };

  const handleTokenRetrieval = (oneUseToken) => {
    setToken(oneUseToken);
  };

  const getStageCard = (stage) => {
    switch (stage) {
      case 0:
        return <EnterEmail onCompletion={(email) => handleCompletion(email)} />;
      case 1:
        return (
          <EntertCode
            onCompletion={() => handleCompletion()}
            onTokenRetrieval={(oneUseToken) =>
              handleTokenRetrieval(oneUseToken)
            }
            currentEmail={email}
          />
        );
      case 2:
        return (
          <EnterNewPassword
            onCompletion={() => handleCompletion()}
            oneUseToken={token}
          />
        );
      case 3:
        return <ResetPasswordSuccess />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column">
        <Grid item>
          <TopBar />
        </Grid>
        <Grid item>
          <Paper square elevation={0} className={classes.background}>
            <Container className={classes.mainContainer}>
              {getStageCard(stage)}
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

export default PasswordRecovery;
