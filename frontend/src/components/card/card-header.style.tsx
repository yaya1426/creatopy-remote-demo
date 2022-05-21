import styled from "styled-components";

export const Wrapper = styled.div({
  position: "relative",
});

interface TitleWrapperProps {
  isCentered?: boolean;
}
export const TitleWrapper = styled.div<TitleWrapperProps>`
  display: flex;
  align-items: ${(props) => (props.isCentered ? "center" : "start")};
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
  margin-top: 45px;
  margin-left: ${(props) => (props.isCentered ? "0px" : "25px")};
`;

export const Separator = styled.div`
  margin-top: 15px;
  width: 8%;
  border-radius: 12px;
  height: 3px;
  background-color: #454545;
`;

export const Title = styled.h2`
  font-weight: 500;
  color: #142029;
  font-size: 34px;
  text-align: center;
  @media (max-width: 991px) {
    font-size: "";
  }
`;
