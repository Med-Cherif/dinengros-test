import React, { cloneElement, Fragment, ReactElement, useState } from "react";
import Modal from "../modal/Modal";

export interface UserLoginDialogProps {
  handle: ReactElement;
  children: ReactElement;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserLoginDialog: React.FC<UserLoginDialogProps> = ({
  handle,
  children,
  open,
  setOpen,
}) => {
  const toggleDialog = () => {
    setOpen((current) => !current);
  };

  return (
    <Fragment>
      {cloneElement(handle, { onClick: toggleDialog })}

      <Modal open={open} onClose={toggleDialog}>
        {children}
      </Modal>
    </Fragment>
  );
};

export default UserLoginDialog;
