import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4 w-1/2 m-10">
      <h1 className="text-2xl font-bold mb-4">Registration Form</h1>
      <RegistrationForm />
    </main>
  );
}
