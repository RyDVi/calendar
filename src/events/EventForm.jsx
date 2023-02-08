import React from "react";
import { TextField, Typography, MenuItem } from "@mui/material";

const REMIND_FOR = [
  {
    value: 5,
    text: "5 minutes",
  },
  {
    value: 15,
    text: "15 minutes",
  },
  {
    value: 30,
    text: "30 minutes",
  },
  {
    value: 60,
    text: "1 hour",
  },
  {
    value: 1440,
    text: "1 day",
  },
];

export const EventForm = ({ data, errors = {}, onChange, disabled }) => {
  const handleChange = React.useCallback(
    (event) => {
      if (!onChange) {
        return;
      }
      onChange({ ...data, [event.target.name]: event.target.value });
    },
    [data, onChange]
  );
  return (
    <>
      <TextField
        name="name"
        label="Event name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
        helperText={errors.name}
        autoFocus
        disabled={disabled}
      />
      <div>
        <Typography component="div" className="mb-1">
          Event time
        </Typography>
        <div className="d-flex">
          <TextField
            name="from"
            type="time"
            label="From"
            value={data.from}
            onChange={handleChange}
            error={errors.from}
            helperText={errors.from}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
          />
          <TextField
            name="to"
            type="time"
            label="To"
            className="ml-1"
            value={data.to}
            onChange={handleChange}
            error={errors.to}
            helperText={errors.to}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
          />
        </div>
      </div>
      <TextField
        name="remindFor"
        label="Remind for"
        value={data.remindFor || "none"}
        onChange={handleChange}
        error={errors.remindFor}
        helperText={errors.remindFor}
        select
        disabled={disabled}
      >
        <MenuItem value="none">--Select Time--</MenuItem>
        {REMIND_FOR.map(({ value, text }) => (
          <MenuItem key={value} value={value}>
            {text}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
