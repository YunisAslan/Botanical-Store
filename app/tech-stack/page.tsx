import { Metadata } from "next";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Botanical Tech Stack",
  description: "These are the technologies used for botanical plant shop",
};

function TechStack() {
  return (
    <div className="bg-white dark:bg-secondary py-8 relative">
      <div className="text-center flex flex-col items-center justify-center px-3">
        <h1 className="text-4xl capitalize font-bold text-primary dark:text-white">
          Tech stack
        </h1>
        <p className="text-base text-gray-600 max-w-md lg:max-w-lg dark:text-gray-400 pt-2">
          An Open source application with game-changing technologies to meet
          modern demands.
        </p>
      </div>

      <div className="py-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-5 gap-4 w-full lg:w-3/4">
          {/* TypeScript */}
          <div className="border border-input dark:border-secondary rounded p-6 space-y-2 shadow-sm">
            <Icons.typescript />
            <div className="space-y-2">
              <h3 className="font-bold dark:text-white">TypeScript</h3>
              <p className="text-sm dark:text-white">
                Type-safe development, enhanced code readability, and better
                tooling support.
              </p>
            </div>
          </div>

          {/* Next.js */}
          <div className="border border-input dark:border-secondary rounded p-6 space-y-2 shadow-sm">
            <div className="space-y-2">
              <Icons.nextjs />
              <h3 className="font-bold">Next.js 13</h3>
              <p className="text-sm text-muted-foreground">
                App directory, Routing, Server Actions, Layouts, Loading UI and
                API routes.
              </p>
            </div>
          </div>

          {/* React.js */}
          <div className="border border-input dark:border-secondary rounded p-6 space-y-2 shadow-sm">
            <div className="space-y-2">
              <Icons.reactjs />
              <h3 className="font-bold">React 18</h3>
              <p className="text-sm">
                Server and Client Components. Using built-in and custom Hooks.
              </p>
            </div>
          </div>

          {/* Firebase */}
          <div className="border border-input dark:border-secondary rounded p-6 space-y-2 shadow-sm">
            <Icons.firebase />
            <div className="space-y-2">
              <h3 className="font-bold dark:text-white">Firebae</h3>
              <p className="text-sm dark:text-white">
                Powering CRUD operations and efficient file storage.
              </p>
            </div>
          </div>

          {/* Tailwind */}
          <div className="border border-input dark:border-secondary rounded p-6 space-y-2 shadow-sm">
            <Icons.tailwind />
            <div className="space-y-2">
              <h3 className="font-bold dark:text-white">Tailwind</h3>
              <p className="text-sm dark:text-white">
                Components styled with Tailwind CSS.
              </p>
            </div>
          </div>

          {/* Zod */}
          <div className="border border-input dark:border-secondary rounded p-6 space-y-2 shadow-sm">
            <Icons.zod />
            <div className="space-y-2">
              <h3 className="font-bold dark:text-white">Zod</h3>
              <p className="text-sm dark:text-white">
                TypeScript-first schema validation library for robust data
                validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStack;
