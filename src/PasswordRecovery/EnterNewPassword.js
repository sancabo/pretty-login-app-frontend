import React, { useState } from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import ControlledTextField from "../Register/ControlledTextField";
import ButtonWithLoading from "../ButtonWithLoading";

const useStyles = makeStyles((theme) => ({
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
  withSpacingMargin: {
    margin: "5px",
  },
}));

function EnterNewPassword({ onCompletion, oneUseToken }) {
  /*
  POST http://localhost:8080/changePasswordAfterReset
    {
    "newPassword" : "adminnew"
    }
  */
  const methods = useForm({
    defaultValues: {
      inputEmail: "",
    },
  });

  const { handleSubmit, control, reset } = methods;
  const classes = useStyles();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  function resetAndClear() {
    reset(
      {
        newPassword: "",
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

  const baseUrl = "https://prettylogin-17498.rj.r.appspot.com/";
  const resourceUrl = new URL(baseUrl + "changePasswordAfterReset");

  const onSubmit = (data) => {
    setWaitingForResponse(true);
    console.log(data.newPassword);
    const request = { newPassword: data.newPassword };
    console.log(oneUseToken);
    fetch(resourceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + oneUseToken,
      },
      body: JSON.stringify(request),
    })
      .then((response) => response)
      .then((json) => {
        if (json.ok) {
          onCompletion();
        } else {
          console.log("Invalid token.");
        }
      })
      .catch((error) => console.log(error))
      .finally(setWaitingForResponse(false));
  };
  return (
    <Paper elevation={3} className={classes.mainPaper}>
      <Typography color="secondary" variant="h5" className={classes.regTitle}>
        Almost set! Enter your new password.
      </Typography>
      <ControlledTextField
        control={control}
        name="newPassword"
        label="New Password"
        type="password"
        reset={resetAndClear}
      />
      <ButtonWithLoading
        label={"Submit"}
        onClick={handleSubmit(onSubmit)}
        waiting={waitingForResponse}
      ></ButtonWithLoading>
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

export default EnterNewPassword;
