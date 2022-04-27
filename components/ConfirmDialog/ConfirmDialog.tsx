import React, { ReactNode } from 'react'
import { Dialog, Box, Typography, Button, Grid } from '@mui/material'

export type ConfirmDialogProps = {
  title?: ReactNode
  content?: ReactNode
  cancelText?: ReactNode
  confirmText?: ReactNode
  open?: boolean
  onClose?: VoidFunction
  onConfirm?: VoidFunction
  onCancel?: VoidFunction
  stackButtons?: boolean
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = 'Confirmation Needed',
  content = (
    <>
      <strong>Are you sure?</strong>
    </>
  ),
  cancelText = <>Cancel</>,
  confirmText = <>Confirm</>,
  open = false,
  stackButtons = false,
  onClose = () => {},
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs'>
      <Box p={3}>
        <Box>
          {typeof title === 'string' ? (
            <Typography color='primary'>
              <strong>{title}</strong>
            </Typography>
          ) : (
            title
          )}
        </Box>
        <Box mt={2} mb={3}>
          {typeof content === 'string' ? <Typography>{content}</Typography> : content}
        </Box>
        <Box>
          <Grid container spacing={2} alignItems='stretch'>
            {stackButtons ? null : (
              <Grid item xs={5}>
                <Button fullWidth onClick={onCancel}>
                  {cancelText}
                </Button>
              </Grid>
            )}
            <Grid item xs={stackButtons ? 12 : 7}>
              <Button fullWidth color='primary' variant='contained' onClick={onConfirm}>
                {confirmText}
              </Button>
            </Grid>
            {stackButtons && (
              <Grid item xs={12}>
                <Button fullWidth onClick={onCancel}>
                  {cancelText}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ConfirmDialog
