import React from "react";
import { Link, Paper, makeStyles, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

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
    height: "350px",
    padding: "10ch",
  },
  withSpacingMargin: {
    margin: "5px",
  },
  mainPaper: {
    textAlign: "center",
    backgroundColor: "white",
    height: "300px",
    padding: "3ch",
  },
  regForm: {
    textAlign: "center",
  },
  regTitle: {
    marginBottom: "2ch",
  },
}));

function ResetPasswordSuccess() {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.mainPaper}>
      <Typography color="secondary" variant="h4" className={classes.regTitle}>
        You have successfully changed yor password!
      </Typography>
      <div style={{ height: "15px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="primary" variant="h5">
            Proceed to
          </Typography>
          <Link
            component={RouterLink}
            to="/login"
            className={classes.withSpacingMargin}
          >
            <Typography color="secondary" variant="h5">
              sign in
            </Typography>
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "5ch",
          justifyContent: "center",
        }}
      />
    </Paper>
  );
}

export default ResetPasswordSuccess;
