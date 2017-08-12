import React from "react";

export default function TableCellSubText(props) {
  const style = { fontSize: 10, marginTop: 5, color: "#9e9e9e" };
  return (
    <div style={style}>
      {props.text}
    </div>
  );
}
