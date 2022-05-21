import styled from "styled-components";

interface PageWrapperProps {
  isCentered?: boolean;
}

export const PageWrapper = styled.div<PageWrapperProps>`
  display: ${(props) => (props.isCentered ? "flex" : "inherit")};
  justify-content: ${(props) => (props.isCentered ? "center" : "inherit")};
  align-items: ${(props) => (props.isCentered ? "center" : "inherit")};
  width: 100%;
  height: auto;
  min-height: calc(100vh - 140px);
  background-color: #ffffff;
  padding: 40px 150px 40px;
  color: #454545;
`;
