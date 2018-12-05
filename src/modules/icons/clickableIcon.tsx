import * as React from 'react'
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome';

interface IProps {
  iconProps: Props,
  onClick: (e) => void
}

const ClickableIcon = (props: IProps) => {
  return (
    <span onClick={props.onClick} className="gfdt-icon-container">
      <FontAwesomeIcon className="gfdt-icon" {...props.iconProps} />
    </span>
  )
}

export default ClickableIcon