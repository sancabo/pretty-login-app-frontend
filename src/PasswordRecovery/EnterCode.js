import React, { useState } from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import ControlledTextField from "../Register/ControlledTextField";
import ButtonWithLoading from "../ButtonWithLoading";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    textAlign: "center",
    backgroundColor: "white",
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

function EntertCode({ onCompletion, onTokenRetrieval, currentEmail }) {
  const methods = useForm({
    defaultValues: {
      recoveryCode: "",
    },
  });

  const { handleSubmit, control, reset, setError } = methods;
  const classes = useStyles();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  function resetAndClear() {
    reset(
      {
        recoveryCode: "",
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

  const onSubmitResend = (data) => {
    setWaitingForResponse(true);
    const request = { email: currentEmail };
    const resourceUrl = new URL(baseUrl + "passwordRecovery");
    fetch(resourceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error submitting code.");
        }
      })
      .catch((error) => console.log(error))
      .finally(setWaitingForResponse(false));
  };

  const onSubmit = (data) => {
    setWaitingForResponse(true);
    const resourceUrl = new URL(
      baseUrl + "confirmRecoveryCode?code=" + data.recoveryCode
    );
    fetch(resourceUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.oneUseToken != null) {
          onTokenRetrieval(json.oneUseToken);
          onCompletion();
        } else {
          setError("recoveryCode", {
            type: "manual",
            message: "Expired or Incorrect Code",
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setWaitingForResponse(false);
        //resetAndClear();
      });
  };
  return (
    <Paper elevation={3} className={classes.mainPaper}>
      <Typography color="secondary" variant="h5" className={classes.regTitle}>
        Please enter the recovery code
      </Typography>
      <ControlledTextField
        control={control}
        name="recoveryCode"
        label="Recover Code"
        reset={resetAndClear}
      />
      <ButtonWithLoading
        label={"Submit"}
        onClick={handleSubmit(onSubmit)}
        waiting={waitingForResponse}
      />
      <div
        style={{
          height: "40px",
        }}
      />
      <ButtonWithLoading
        label={"Resend Code"}
        onClick={handleSubmit(onSubmitResend)}
        waiting={waitingForResponse}
      />
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

export default EntertCode;
