import React from "react";

export default function ErrorValidation(props) {
  if (!props.valid) {
    return <div className="error">{props.message}</div>;
  }

  return <></>;
}
