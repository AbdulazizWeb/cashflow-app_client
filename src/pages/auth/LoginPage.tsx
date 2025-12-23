import { Login } from "@/features/auth";

export function LoginPage() {
  return (
    <div className="w-full relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-[url(/src/shared/assets/login-bg.png)] ">
      <div className="absolute inset-0 bg-linear-to-r bg-[#ffffffea]"></div>
      <div className="w-full max-w-sm md:max-w-4xl relative z-10 ">
        <Login />
      </div>
    </div>
  );
}
