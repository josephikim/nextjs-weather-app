import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import classes from 'styles/sass/AlertDismissible.module.scss'

interface AlertDismissibleProps {
  variant: string
}

const AlertDismissible = ({
  variant,
  children,
}: React.PropsWithChildren<AlertDismissibleProps>) => {
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <Alert
        variant={variant}
        className={classes.alert}
        onClose={() => setShow(false)}
        dismissible
      >
        {children}
      </Alert>
    )
  }
  return null
}

export default AlertDismissible
