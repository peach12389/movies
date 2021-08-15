import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { No_Restaurant } from "../../assets/images";

const Restaurant404 = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Image src={No_Restaurant} height={250} width={250} alt="404 restaurant" />
      <p className="font-bold my-2 text-3xl">Restaurant not found</p>
      <p className="text-gray-400 text-lg">But we have a wide selection</p>
      <p className="text-gray-400 text-lg">
        Hit <span className="text-brand-green">&#39;Home&#39;</span> to explore
      </p>

      <div
        className="bg-brand-green text-white rounded-3xl w-40 h-10 mt-10 text-center align-middle flex justify-center items-center cursor-pointer"
        onClick={onClick}>
        <span>Home</span>
      </div>
    </main>
  );
};

export default Restaurant404;
