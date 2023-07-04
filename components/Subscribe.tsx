import { Button } from "./ui/Button";
import { Icons } from "./Icons";

function Subscribe() {
  return (
    <div className="shadow-sm py-20 mb-20 border-input border rounded flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-primary text-center pb-5 px-6 sm:text-2xl lg:text-3xl">
        Join our newsletter to get the latest news and updates
      </h2>

      <form action="" className="flex items-center gap-5 relative">
        <input
          type="text"
          placeholder="botanical.store@gmail.com"
          className="outline-none rounded w-60 sm:w-80 px-2 pr-16 py-2 shadow-sm border-input border"
        />

        <Button variant="primary" size="mm" className="absolute right-2">
          <Icons.send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}

export default Subscribe;
