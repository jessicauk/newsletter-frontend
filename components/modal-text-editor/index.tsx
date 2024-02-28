import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextEditor from "../text-editor";

interface DialogResponsiveProps {
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogResponsive({
  name,
  open,
  setOpen,
  setHtml,
}: DialogResponsiveProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className=""
      fullScreen={fullScreen}
      maxWidth="md"
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      keepMounted
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: "text-4xl" }}
    >
      <DialogTitle id="responsive-dialog-title" className="capitalize">
        {name}
      </DialogTitle>
      <DialogContent className="w-full flex flex-col justify-center items-center">
        <TextEditor setHtml={setHtml} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          variant="contained"
          className="bg-indigo-500 hover:bg-indigo-700"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
