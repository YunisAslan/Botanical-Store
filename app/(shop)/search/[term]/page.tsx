import { redirect } from "next/navigation";

type Props = {
  searchParams: string;
  params: {
    term: string;
  };
};

function SearchResult({ searchParams, params: { term } }: Props) {
  // if (!term) {
  //   redirect("/");
  // }

  return (
    <div className="h-screen flex justify-center items-centerc bg-black text-white p-10 text-6xl">
      Axtarış nəticələri səhifəsinə xoş gəldiniz
    </div>
  );
}

export default SearchResult;
