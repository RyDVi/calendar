import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";

const SaveEditFormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const SaveEditForm = ({ onSubmit, onCancel, children }) => {
  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  return (
    <SaveEditFormContainer onSubmit={handleSubmit}>
      {children}
      <div>
        {onSubmit && (
          <Button type="submit" variant="contained">
            Save
          </Button>
        )}
      </div>
    </SaveEditFormContainer>
  );
};
