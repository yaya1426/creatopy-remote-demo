import { CardHeader } from "./card-header";
import { CardBody, CardContent, CardWrapper } from "./card.style";

interface Props {
  title?: string;
  titleCentered?: boolean;
  width?: string;
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({
  title,
  titleCentered,
  width,
  children,
}) => {
  return (
    <>
      <CardWrapper width={width}>
        {title && <CardHeader title={title} isCentered={titleCentered} />}
        <CardBody>
          <CardContent>{children}</CardContent>
        </CardBody>
      </CardWrapper>
    </>
  );
};
