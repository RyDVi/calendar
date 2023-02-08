import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Button, Paper, Typography } from "@mui/material";

const Header = ({ className, onBack, header }) => {
  return (
    <Paper className={`p-1 ${className} d-flex`}>
      {onBack && (
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={onBack}>
          Back
        </Button>
      )}
      <Typography variant="h5" component="h1" className="ml-1">
        {header}
      </Typography>
    </Paper>
  );
};

export const Page = ({ children, onBack, header }) => (
  <div>
    <Header className="mb-1" onBack={onBack} header={header} />
    {children}
  </div>
);
