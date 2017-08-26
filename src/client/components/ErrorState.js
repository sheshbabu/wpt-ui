import React from "react";
import Warning from "material-ui/svg-icons/alert/warning";

export default function ErrorState(props) {
  return (
    <div
      style={{
        marginTop: 20,
        textAlign: "center",
        color: "#666"
      }}
    >
      <Warning
        style={{
          height: 100,
          width: 100
        }}
      />
      <div>
        {props.errorMessage}
      </div>
    </div>
  );
}
