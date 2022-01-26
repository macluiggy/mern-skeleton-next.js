import { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  CardContent,
  CardActions,
  Button,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Link from "next/link";
import { SxProps } from "@mui/material";

type UseStylesProps = {
  card: SxProps;
  error: SxProps;
  title: SxProps;
  textField: SxProps;
  submit: SxProps;
};

const useStyles = (): UseStylesProps => ({
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    paddingBottom: "1rem",
  },
  error: {},
  title: {},
  textField: {},
  submit: {},
});
