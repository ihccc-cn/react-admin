import React from "react";
import "./extra-blocks.css";

function InfoLink({ prefix, text, href }) {
  return (
    <span className="form-node-extra-info-link">
      {prefix}
      <a href={href} target="_blank">
        {text}
      </a>
    </span>
  );
}

const extraBlocks = {
  "info-link": InfoLink,
};

export default extraBlocks;
