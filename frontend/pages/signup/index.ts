import { SxProps } from "@mui/material";
export type UserProps = {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: string;
};

export type UseStylesProps = {
  card: SxProps;
  error: SxProps;
  title: SxProps;
  textField: SxProps;
  submit: SxProps;
};
