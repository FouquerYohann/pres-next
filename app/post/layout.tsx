export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div style={{ backgroundColor: "pink", height: "50px" }}>
        Another header here
      </div>
      <div style={{ maxWidth: "fit-content" }}>{children}</div>
    </div>
  );
}
