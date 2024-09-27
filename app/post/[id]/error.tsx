"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div>
      <div>Error</div>
      <div>{error.message}</div>
      <a href="/">Go Home</a>
    </div>
  );
}
