import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack>
      Home
      <div>DATABASE_URL : {process.env.DATABASE_URL}</div>
      <div>
        NEXT_PUBLIC_DATABASE_URL : {process.env.NEXT_PUBLIC_DATABASE_URL}
      </div>
    </Stack>
  );
}
