interface Props {
  errorMessage: string;
}
export const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  return errorMessage ? (
    <div className="bg-danger text-white p-1">{errorMessage}</div>
  ) : null;
};
