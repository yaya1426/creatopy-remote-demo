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

export const Separator = styled.div({
  marginTop: "15px",
  width: "8%",
  borderRadius: "12px",
  height: "3px",
  backgroundColor: "#B0000D",
});

export const Title = styled.h2`
  font-family: Almarai, sans-serif;
  font-weight: 500;
  line-height: 42px;
  color: #142029;
  font-size: 34px;
  text-align: center;
  @media (max-width: 991px) {
    font-size: "";
  }
`;
export const SubTitle = styled.h4({
  fontSize: "ms",
  fontWeight: 400,
  textAlign: "center",
  "@media (max-width: 991px)": {
    fontSize: "base",
  },
});
