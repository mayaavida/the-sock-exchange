import React from "react";

const Footer = (props) => {
  return (
    <footer
      className={
        import.meta.env.VITE_ENVIRONMENT === "development"
          ? "bg-yellow font-weight-bold text-uppercase"
          : "bg-green font-weight-bold text-uppercase"
      }
    >
      <div>
        <strong>{props.environment}</strong>
      </div>
    </footer>
  );
};

export default Footer;
