import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid justify-center w-full h-full m-auto h-max-[]: mt-[60px] "
      action=""
    >
      <div className="flex pt-[10px]">
        <input
          {...register("firstName", { required: true })}
          type="text"
          className="w-[600px] h-[50px] border-3 border-solid rounded-2xl pr-3 text-right "
          placeholder="نام"
        />
      </div>
      <div className="flex pt-[20px]">
        <input
          {...register("lastName", { required: true })}
          type="text"
          className="w-[600px] h-[50px] border-3 border-solid rounded-2xl pr-3 text-right"
          placeholder="نام خانوادگی"
        />
      </div>
      <div className="flex pt-[20px]">
        <input
          {...register("password", { required: true })}
          type="password"
          className="w-[600px] h-[50px] border-3 border-solid rounded-2xl pr-3 text-right"
          placeholder="پسورد"
        />
      </div>
      <div className="flex pt-[20px]">
        <input
          type="submit"
          className="w-[600px] h-[50px] border-3 border-solid rounded-2xl pl-3 bg-gray-700 text-fuchsia-50"
          onChange={(e) => e.preventDefault()}
        />
      </div>
    </form>
  );
}

export default App;
