import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().email({ message: "ایمیل معتبر نیست" }),
  password: z.string().min(6, { message: "رمز عبور حداقل ۶ کاراکتر باشد" }),
});

type FormData = z.infer<typeof schema>;

async function registerUser(data: FormData) {
  const res = await fetch("/api/register", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await res.text();
  const result = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(result.error || "ثبت نام ناموفق");
  }
  return result;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert(data.message);
      reset();
    },
    onError: (error: any) => {
      alert(error.message || "خطای نامشخص");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-center">ثبت‌ نام کاربر</h2>

      <div>
        <label>ایمیل</label>
        <input {...register("email")} className="w-full border p-2 rounded" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>رمز عبور</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className={`w-full p-2 rounded text-white ${
          mutation.isPending ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {mutation.isPending ? " در حال ارسال..." : "ثبت‌ نام "}
      </button>

      {mutation.isError && (
        <p className="text-red-600">{mutation.error?.message}</p>
      )}
      {mutation.isSuccess && (
        <p className="text-green-600">{mutation.data?.message}</p>
      )}
    </form>
  );
};
export default RegisterForm;
