import styled from "styled-components";

interface CardWrapperProps {
  width: string;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  background: #ffffff;
  padding: 0 0 32px;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: auto;
  box-shadow: 0 2px 4px -2px rgb(24 39 75 / 12%),
    0 4px 4px -2px rgb(24 39 75 / 8%);
  border: 1px solid #e5e7eb;
  border-radius: "8px";
  @media (max-width: 991px) {
    margin: 0px 15px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardContent = styled.div`
  height: auto;
  width: 90%;
  form {
    width: "100%";
  }
`;
