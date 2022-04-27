import React, { useState, useCallback, useMemo, useRef } from "react";

import ConfirmDialog, { ConfirmDialogProps } from "./ConfirmDialog";

type Options = {
  defaultOpen?: boolean;
};

const useConfirmDialog = (options: Options = {}) => {
  const { defaultOpen = false } = options;
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const show = useCallback(() => setOpen(true), [setOpen]);
  const hide = useCallback(() => setOpen(false), [setOpen]);
  const onConfirm = useRef<VoidFunction>(hide);
  const onCancel = useRef<VoidFunction>(hide);

  const confirm = useCallback(
    (onCancelArg: VoidFunction = () => {}) =>
      new Promise<boolean>((resolve) => {
        show();
        onConfirm.current = () => {
          resolve(true);
          hide();
          onConfirm.current = hide;
        };
        onCancel.current = () => {
          resolve(false);
          hide();
          onCancelArg();
          onCancel.current = hide;
        };
      }),
    [show, hide]
  );

  const render = useCallback(
    (props: ConfirmDialogProps = {}) => (
      <ConfirmDialog
        {...props}
        open={open}
        onClose={hide}
        onConfirm={onConfirm.current}
        onCancel={onCancel.current}
      />
    ),
    [open, hide]
  );

  return useMemo(
    () => ({
      render,
      confirm
    }),
    [render, confirm]
  );
};

export default useConfirmDialog;
