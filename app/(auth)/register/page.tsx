"use client"
import { registerUserAction } from "@/app/actions/userAction";
import { FormEvent, useState } from "react";
export function Register() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("");

    const res = await registerUserAction(formData); // ✅ directly call server action

    if (res.success) {
      setStatus("success");
      setMessage(res.message);
      form.reset();
    } else {
      setStatus("error");
      setMessage(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md max-w-md ">
      <label className="block font-medium">Name</label>
      <input type="text" name="name" required className="w-full border px-2 py-1 rounded" />

      <label className="block font-medium">Email</label>
      <input type="email" name="email" required className="w-full border px-2 py-1 rounded" />

      <label className="block font-medium">Password</label>
      <input type="password" name="password" required className="w-full border px-2 py-1 rounded" />

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
      >
        {status === "loading" && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
        )}
        Submit
      </button>

      {status !== "idle" && <p className={status === "success" ? "text-green-600" : "text-red-500"}>{message}</p>}
    </form>
</div>
  );
}

export default Register;