import { getProducts } from "@/lib/products";
import MoreMenu from "./MoreMenu";
import moment from "moment";

const head = ["Name", "Category", "Price", "Created At", ""];

async function Table() {
  const products = await getProducts();

  return (
    <>
      <div className="w-full border rounded">
        <table className="w-full">
          <thead>
            <tr>
              {head.map((h, key) => (
                <th
                  className="text-left text-sm font-semibold p-2 bg-inputBg  border-b"
                  key={key}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products?.map((item) => (
              <tr key={item.id} className="group relative">
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
                  <MoreMenu item={item} />
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
