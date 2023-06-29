import ChooseUsImg from "@/public/assets/images/why-choose-us.jpg";
import Image from "next/image";
import { Icons } from "./Icons";

function ChooseUs() {
  return (
    <section className="pt-28 grid grid-cols-12">
      <div className="col-span-12 lg:col-span-6">
        <Image
          src={ChooseUsImg}
          alt="Why Choose Botanical Plant Store"
          width={570}
          height={590}
        />
      </div>

      <div className="col-span-12 lg:col-span-6">
        <h2 className="text-primary text-4xl font-bold">Why choose us ?</h2>
        <p className="text-base text-gray-600 pt-2 pb-16 lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          iusto veniam explicabo perspiciatis sint voluptatem nam amet minima
          tempora ad temporibus, neque incidunt illum nesciunt ab odio.
        </p>

        <div className="flex flex-col gap-10">
          <div className="flex items-center">
            <div>
              <Icons.leaf className="w-16 h-16" stroke="#406e3f" />
            </div>
            <div className="pl-4">
              <h6 className="text-xl font-semibold text-font">Hand Planted</h6>
              <p className="text-gray-600 pt-1">
                There are many variations of passages of lorem ipsum available,
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <Icons.sprout className="w-16 h-16" stroke="#406e3f" />
            </div>
            <div className="pl-4">
              <h6 className="text-xl font-semibold text-font">
                Natural Sunlight
              </h6>
              <p className="text-gray-600 pt-1">
                It is a long established fact that a reader will be distracted
                by the reable content of a page.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div>
              <Icons.tree className="w-16 h-16" stroke="#406e3f" />
            </div>
            <div className="pl-4">
              <h6 className="text-xl font-semibold text-font">Clean Air</h6>
              <p className="text-gray-600 pt-1">
                There are many variations of passages of lorem ipsum available,
                but the majority have suffered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChooseUs;
