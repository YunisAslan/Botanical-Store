import ActionsMenu from "./ActionsMenu";
import moment from "moment";
import { Product } from "@/types";

const head = ["Name", "Category", "Price", "Created At", ""];

async function Table({ products }: { products: Product[] }) {
  return (
    <>
      <div className="w-full border border-input dark:border-secondary rounded-md max-w-fit">
        <table className="w-full block max-w-fit overflow-x-auto table-fixed whitespace-nowrap rounded-md">
          <thead>
            <tr>
              {head.map((h, key) => (
                <th
                  className="text-left text-sm text-primary dark:text-gray-400 font-semibold p-2 bg-inputBg dark:bg-slight/30 border-b border-input dark:border-secondary min-w-[200px]"
                  key={key}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="group">
                <td className="p-3 text-sm text-primary dark:text-white group-hover:bg-inputBg/50 dark:group-hover:bg-slight/50 border-b capitalize dark:border-secondary">
                  {item.plant_name}
                </td>
                <td className="p-3 text-sm text-primary dark:text-white group-hover:bg-inputBg/50 dark:group-hover:bg-slight/50 border-b dark:border-secondary">
                  <span className="border border-input dark:border-secondary rounded-3xl px-2 font-semibold">
                    {item.plant_category ? item.plant_category : "none"}
                  </span>
                </td>
                <td className="p-3 text-sm text-primary dark:text-white group-hover:bg-inputBg/50 dark:group-hover:bg-slight/50 border-b dark:border-secondary">
                  &#36;{item.plant_price.toFixed(2)}
                </td>
                <td className="p-3 text-sm text-primary dark:text-white group-hover:bg-inputBg/50 dark:group-hover:bg-slight/50 border-b dark:border-secondary">
                  {moment(item.created_at).format(
                    "MMMM D, YYYY [at] h:mm:ss A"
                  )}
                </td>
                <td className="p-3 text-sm group-hover:bg-inputBg/50 dark:group-hover:bg-slight/50 border-b dark:border-secondary">
                  <ActionsMenu itemId={item.id as string} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
