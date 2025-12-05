import { useEffect, useState } from "react";
import { fetchEnquiries, deleteEnquiry } from "../api";

export default function EnquiryList({ refreshTrigger }) {
  const [enquiries, setEnquiries] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadData(pageToLoad = 1, query = q) {
    try {
      setLoading(true);
      setError("");
      const data = await fetchEnquiries(pageToLoad, query);
      setEnquiries(data.results || []);
      setCount(data.count || 0);
      setNext(data.next);
      setPrevious(data.previous);
      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
      setError("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(1);
  }, [refreshTrigger]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    loadData(1, q);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      await deleteEnquiry(id);
      loadData(page, q);
    } catch (err) {
      console.error(err);
      alert("Failed to delete enquiry.");
    }
  }

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(count / PAGE_SIZE) || 1;

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSearchSubmit}
        className="flex gap-2 items-center"
      >
        <input
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          placeholder="Search by name or email…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          Search
        </button>
      </form>

      {loading && (
        <p className="text-xs text-slate-500">Loading enquiries…</p>
      )}
      {error && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      {!loading && enquiries.length === 0 && !error && (
        <p className="text-xs text-slate-500">No enquiries found.</p>
      )}

      {enquiries.length > 0 && (
        <>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200">
                    Email
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200">
                    Phone
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200">
                    Message
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200">
                    Created
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-600 border-b border-slate-200 w-[70px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry, idx) => (
                  <tr
                    key={enquiry.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                  >
                    <td className="px-3 py-2 border-b border-slate-100">
                      {enquiry.name}
                    </td>
                    <td className="px-3 py-2 border-b border-slate-100">
                      {enquiry.email}
                    </td>
                    <td className="px-3 py-2 border-b border-slate-100">
                      {enquiry.phone}
                    </td>
                    <td className="px-3 py-2 border-b border-slate-100">
                      {enquiry.message}
                    </td>
                    <td className="px-3 py-2 border-b border-slate-100">
                      {new Date(enquiry.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 border-b border-slate-100">
                      <button
                        className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-[11px] font-medium text-white hover:bg-red-600"
                        onClick={() => handleDelete(enquiry.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
            <span>
              Page {page} of {totalPages} · {count} enquiries
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => loadData(page - 1, q)}
                disabled={!previous}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => loadData(page + 1, q)}
                disabled={!next}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
