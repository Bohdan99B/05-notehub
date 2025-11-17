interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>{message}</p>;
}
