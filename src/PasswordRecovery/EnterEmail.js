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

const baseUrl = "https://prettylogin-17498.rj.r.appspot.com/";
const resourceUrl = new URL(baseUrl + "passwordRecovery");

function EnterEmail({ onCompletion }) {
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
        inputEmail: "",
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

  const onSubmit = (data) => {
    setWaitingForResponse(true);
    const request = { email: data.inputEmail };
    fetch(resourceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.ok) {
          onCompletion(data.inputEmail);
        } else {
          console.log("Error submitting code.");
        }
      })
      .catch((error) => console.log(error))
      .finally(setWaitingForResponse(false));
  };
  return (
    <Paper elevation={3} className={classes.mainPaper}>
      <Typography color="secondary" variant="h5" className={classes.regTitle}>
        Please enter the email you registered. You'll receive a recovery code.
      </Typography>
      <ControlledTextField
        control={control}
        name="inputEmail"
        label="Registered Email"
        type="email"
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

export default EnterEmail;
