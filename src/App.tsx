import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "یوزر نیم حداقل باید ۳ کاراکتر باشد" }),
  email: z.string().email({ message: "این ایمیل معتبر نیست" }),
  password: z.string().min(6, { message: "پسورد حداقل باید ۶ کاراکتر باشد" }),
});

type FormData = z.infer<typeof schema>;

const RejecterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("اطلاعات فرم", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>نام کاربری</label>
        <input
          {...register("username")}
          placeholder="نام کاربری"
          className="border p-2 rounded"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label>ایمیل </label>
        <input
          {...register("email")}
          placeholder="ایمبل"
          className="border p-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label>پسورد</label>
        <input
          {...register("password")}
          placeholder="پسورد"
          className="border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        ثبت نام
      </button>
    </form>
  );
};

export default RejecterForm;
