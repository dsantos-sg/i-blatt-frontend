import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref, useContext } from 'react';
import { PrivateLayoutContext } from '../../PrivateLayout.tsx';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NewWordDialog = () => {
  const { newWordDialogOpen, handleNewWordDialogOpen } =
    useContext(PrivateLayoutContext);

  const handleClose = () => {
    handleNewWordDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        open={newWordDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <Typography variant="h1">NEW WORD...</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
