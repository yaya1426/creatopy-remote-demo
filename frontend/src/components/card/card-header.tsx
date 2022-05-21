import { Title, TitleWrapper, Wrapper } from "./card-header.style";

interface Props {
  title: string;
  isCentered?: boolean;
}

export const CardHeader: React.FC<Props> = ({ title, isCentered }) => {
  return (
    <Wrapper>
      <TitleWrapper isCentered={isCentered}>
        <Title>{title}</Title>
      </TitleWrapper>
    </Wrapper>
  );
};
