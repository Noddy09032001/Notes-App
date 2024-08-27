import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import useLanguage from "@/locale/useLanguage";

export const sortColumn = (column: any, val: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const translate = useLanguage();
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {translate(val)}
      <CaretSortIcon className="ml-2 h-4 w-4" />
    </Button>
  );
};
