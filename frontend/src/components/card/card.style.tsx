import styled from "styled-components";

interface CardWrapperProps {
  width: string;
}

export const CardWrapper = styled.div<CardWrapperProps>((props) => {
  return {
    background: "#ffffff",
    padding: "0 0 32px",
    width: props.width ? props.width : "auto",
    height: "auto",
    boxShadow:
      "0 2px 4px -2px rgb(24 39 75 / 12%), 0 4px 4px -2px rgb(24 39 75 / 8%)",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    "@media (max-width: 991px)": {
      margin: "0px 15px",
    },
  };
});

export const CardBody = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
