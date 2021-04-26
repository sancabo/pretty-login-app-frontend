import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  input: {
    height: "87.5px",
  },
}));

//control, label(optional), type(optional), name, validate(optional), reset(optional)
function ControlledTextField({ control, label, type, name, validate, reset }) {
  const classes = useStyles();
  const getValidate = (validate) => {
    if (validate != null) return validate;
    else return () => true;
  };
  const getPattern = (type) => {
    if (type === "email") {
      return {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
        message: "Invalid email address",
      };
    } else return null;
  };
  return (
    <div>
      <Controller
        control={control}
        render={({
          field: { onChange, ...rest }, //if I pass value to Child I get an error saying I turned the input into "controlled"
          fieldState: { error },
          formState: { isSubmitted },
        }) => (
          <TextField
            {...rest}
            onChange={(event) => {
              if (isSubmitted) {
                if (reset != null) {
                  reset();
                }
              }
              onChange(event);
            }}
            variant="outlined"
            label={label != null ? label : ""}
            error={error != null}
            helperText={error != null ? error.message : ""}
            className={classes.input}
            type={type != null ? type : "text"}
            fullWidth
          />
        )}
        name={name}
        rules={{
          required: "This field is required",
          pattern: getPattern(type),
          validate: getValidate(validate),
        }}
      />
      <div
        style={{
          height: "20px",
        }}
      />
    </div>
  );
}

export default ControlledTextField;
