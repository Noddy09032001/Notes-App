import { ColumnDef } from "@tanstack/react-table";
import { NotesData } from "./data";
import { sortColumn } from "./sortColumn";

export const NotesColumn: ColumnDef<NotesData[]>[] = [
    {
        id: "index",
        header: "#",
        meta: {
          type: "number",
        },
        size: 10,
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => sortColumn(column, "title"),
        meta: {
          type: "string",
        },
      },
      {
        id: "description",
        accessorKey: "description",
        header: ({ column }) => sortColumn(column, "description"),
        meta: {
          type: "string",
        },
      },
]