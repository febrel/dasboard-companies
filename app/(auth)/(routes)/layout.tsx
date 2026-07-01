import Logo from "@/components/Logo/Logo";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <Logo />
      <h1 className="text-3xl my-2">Welcome to my Dasboard</h1>
      {children}
      <h2 className="text-2xl mb-3">TarreDasboard</h2>
    </div>
  );
}
