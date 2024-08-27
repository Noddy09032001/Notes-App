/*import { DataTable } from "@/components/datatable";
import { APISERVICE } from "@/lib/RestClients";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotesColumn } from "./columns";

const DEFAULT_PAGE = 0;
const DEFAULT_TOTAL_ITEMS = 10;

export default function NotesList() {
  const [notes, setNotes] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalItems, setTotalItems] = useState(DEFAULT_TOTAL_ITEMS);
  const [count, setCount] = useState(DEFAULT_PAGE);

  const onChange = (c: number): void => {
    setPage(c);
    getNotesList(c, totalItems);
  };

  const getNotesList = useCallback(
    async (pageNo: number, size: number, signal?: AbortSignal) => {
      let response = null;
      try {
        response = await APISERVICE.GET(
          `${process.env.REACT_APP_BASE_APP_URL}/v1/notes?page=${pageNo}&size=${size}`,
          signal
        );

        if (response.status === 200) {
          setNotes(response.data?.data?.content);
          setCount(response.data?.data?.totalPages);
        }
      } catch (error: any) {
        if (error?.response?.status === 404) setNotes([]);
        else {
          console.error("Login failed:", error);
          throw error;
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getNotesList(page, totalItems, signal);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="absolute top-20 w-[calc(100vw-20%)] p-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold mb-4">Notes List</h2>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td>
                  {note.tags?.map((tag: any) => (
                    <span key={tag.id} className="tag">
                      {tag.name}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        <div className="pagination">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              className={`pagination-button ${page === i ? "active" : ""}`}
              onClick={() => onChange(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}*/

import { APISERVICE } from "@/lib/RestClients";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../navbars/navbar";

const DEFAULT_PAGE = 0;
const DEFAULT_TOTAL_ITEMS = 10;

export default function NotesList() {
  const [notes, setNotes] = useState<any[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalItems, setTotalItems] = useState(DEFAULT_TOTAL_ITEMS);
  const [count, setCount] = useState(DEFAULT_PAGE);

  const onChange = (c: number): void => {
    setPage(c);
    getNotesList(c, totalItems);
  };

  const getNotesList = async (pageNo: number, size: number, signal?: AbortSignal) => {
    try {
      const response = await APISERVICE.GET(
        `http://localhost:7071/api/v1/notes?page=${pageNo}&size=${size}`,
        signal
      );

      if (response.status === 200) {
        console.log(response)
        setNotes(response.data?.content || []);
        setCount(response.data?.totalPages || 0);
      } else {
        setNotes([]);
      }
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setNotes([]);
      } else {
        console.error("Error fetching notes:", error);
        throw error;
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getNotesList(page, totalItems, signal);
    return () => {
      controller.abort();
    };
  }, [page, totalItems]);

  return (
    <div>
      <Navbar />
      <div className="m-10 flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Notes List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-white">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tags</th>
            </tr>
          </thead>
          <tbody>
            {notes.length > 0 ? (
              notes.map((note) => (
                <tr key={note.id} className="odd:bg-secondary even:bg-secondary">
                  <td className="border border-gray-300 px-4 py-2">{note.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{note.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{note.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {note.tags?.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2 mb-1"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No notes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 mx-1 rounded-md border ${
                page === i
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-500 border-blue-300"
              }`}
              onClick={() => onChange(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

