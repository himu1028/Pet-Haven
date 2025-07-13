import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

Modal.setAppElement("#root");

const MyPets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [totalPets, setTotalPets] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Load paginated pets
  useEffect(() => {
    if (user?.email) {
      axios
        .get("http://localhost:3000/mypets", {
          params: {
            email: user.email,
            page: pagination.pageIndex,
            limit: pagination.pageSize,
          },
        })
        .then((res) => {
          const petData = res.data?.pets || [];
          const totalCount = res.data?.total || 0;
          setPets(petData);
          setTotalPets(totalCount);
        })
        .catch((err) => {
          console.error("Error loading pets", err);
          setPets([]);
          setTotalPets(0);
        });
    }
  }, [user, pagination]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/mypets/${deleteId}`);
      setPets((prev) => prev.filter((pet) => pet._id !== deleteId));
      setModalIsOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleAdopted = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/mypets/${id}`, {
        adopted: true,
      });
      setPets((prev) =>
        prev.map((pet) => (pet._id === id ? { ...pet, adopted: true } : pet))
      );
    } catch (err) {
      console.error("Adopted failed", err);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((_, index) => index + 1, {
        id: "sl",
        header: "#",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("petName", {
        header: "Pet Name",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor((row) => row.petCategory?.label || "N/A", {
        id: "category",
        header: "Category",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("petImage", {
        header: "Image",
        cell: (info) => (
          <img src={info.getValue()} className="w-12 h-12 rounded" alt="" />
        ),
      }),
      columnHelper.accessor("adopted", {
        header: "Adoption Status",
        cell: (info) =>
          info.getValue() ? (
            <span className="text-green-600 font-semibold">Adopted</span>
          ) : (
            <span className="text-red-500">Available</span>
          ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="space-x-2">
            <Link
              to={`/mypets/${row.original._id}`}
              className="bg-blue-500 text-white px-2 py-1 rounded inline-block"
            >
              Update
            </Link>
            <button
              onClick={() => {
                setDeleteId(row.original._id);
                setModalIsOpen(true);
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            {!row.original.adopted && (
              <button
                onClick={() => handleAdopted(row.original._id)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Adopted
              </button>
            )}
          </div>
        ),
      }),
    ],
    [pets]
  );

  const table = useReactTable({
    data: Array.isArray(pets) ? pets : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: Math.ceil(totalPets / pagination.pageSize),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">My Added Pets</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 border cursor-pointer text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : " 🔽"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPets > 10 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pagination.pageIndex + 1} of{" "}
            {Math.ceil(totalPets / pagination.pageSize)}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Delete"
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Are you sure you want to delete this pet?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyPets;
