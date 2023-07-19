import ActionsMenu from "./ActionsMenu";
import moment from "moment";
import { Product } from "@/types";

const head = ["Name", "Category", "Price", "Created At", ""];

async function Table({ products }: { products: Product[] }) {
  return (
    <>
      <div className="w-full border rounded max-w-fit">
        <table className="w-full block max-w-fit overflow-x-auto table-fixed whitespace-nowrap">
          <thead>
            <tr>
              {head.map((h, key) => (
                <th
                  className="text-left text-sm font-semibold p-2 bg-inputBg border-b min-w-[200px]"
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
                <td className="p-3 text-sm group-hover:bg-inputBg/50 border-b capitalize">
                  {item.plant_name}
                </td>
                <td className="p-3 text-sm group-hover:bg-inputBg/50 border-b rounded">
                  <span className="border border-input rounded-3xl px-2 font-semibold">
                    {item.plant_category ? item.plant_category : "none"}
                  </span>
                </td>
                <td className="p-3 text-sm group-hover:bg-inputBg/50 border-b">
                  &#36;{item.plant_price.toFixed(2)}
                </td>
                <td className="p-3 text-sm group-hover:bg-inputBg/50 border-b">
                  {moment(item.created_at).format(
                    "MMMM D, YYYY [at] h:mm:ss A"
                  )}
                </td>
                <td className="p-3 text-sm group-hover:bg-inputBg/50 border-b">
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
