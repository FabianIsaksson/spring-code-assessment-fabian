import React, { ButtonHTMLAttributes } from "react";
import "./list-button.scss";

export const ListContainer = ({ children }: { children: React.ReactNode }) => (
  <ul className="listbutton-container">{children}</ul>
);

const ListButton = ({
  name,
  image,
  ...buttonProps
}: {
  name: string;
  image: string;
} & ButtonHTMLAttributes<HTMLLIElement>) => {
  return (
    <li role="button" className="listbutton-button" {...buttonProps}>
      {image && <img alt="listbutton-button" src={image}></img>}
      {!image && <div className="listbutton-placeholder"></div>}
      {name && <p className="listbutton-button-title">{name}</p>}
    </li>
  );
};

export default ListButton;
