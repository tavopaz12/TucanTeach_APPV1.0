import React from "react";

function BtnSendForm({ errors, titleBtn }) {

  return (
    <>
      <button
        type="submit"
        className="button__login"
        style={{
          pointerEvents: errors.password.err
            ? "none"
            : errors.email.err
            ? "none"
            : "visible",

          backgroundColor: errors.password.err
            ? "#7a9f6c"
            : errors.email.err
            ? "#7a9f6c"
            : "",
        }}
      >
        {titleBtn}
      </button>
    </>
  );
}

export default BtnSendForm;
