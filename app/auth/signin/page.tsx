import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 lg:p-0">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <Card className="w-full md:w-1/2 rounded-none border-none p-8 lg:p-12 flex flex-col justify-center dark:bg-dark">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Welcome back! Please enter your details
            </CardDescription>
          </CardHeader>
          <Form />
        </Card>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/Jota.png"
            width={675}
            height={900}
            alt="Login image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
