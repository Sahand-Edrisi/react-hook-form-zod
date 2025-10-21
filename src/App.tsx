import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().min(3, { message: "یوزرنیم باید حداقل ۳ کراکتر باشد" }),
  email: z.string().email({ message: "ایمیل وارد شده صحیح نیست" }),
  password: z
    .string()
    .min(6, { message: "پسورد باید حداقل ۶ کاراکتر داشته باشد" }),
});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async  (data: FormData) => {
    console.log("اطلاعات فرم", data);

    await new Promise((resolve)=> setTimeout(resolve,1500))

    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          ثبت نام کابر
        </h2>

        {isSubmitted && (
          <div className="bg-green-100 text-green-700 p-3 rounded text-center">
            ثبت نام با موفقیت انجام شد
          </div>
        )}

        {/* username */}
        <div>
          <label className="block text-sm font-medium mb-1">نام کاربری</label>
          <input
            {...register("username")}
            placeholder="نام کاربری خود را وارد کنید"
            className="w-full border p-2 rounded focus:outline-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">ایمیل </label>
          <input
            {...register("email")}
            placeholder="example@email.com"
            className="w-full border p-2 rounded focus:outline-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">رمز عبور</label>
          <input
            {...register("password")}
            placeholder="رمز عبور خود را وارد کنید"
            className="w-full border p-2 rounded focus:outline-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-all duration-200"
        >
          {isSubmitting ? "...در حال ارسال" : "ثبت نام"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
