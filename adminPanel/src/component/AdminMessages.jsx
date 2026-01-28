import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Trash2, Mail } from "lucide-react";
import { toast } from "react-toastify";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  // FETCH ALL MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/contact");
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    }
  };

  // MARK AS REPLIED
  const markReplied = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/contact/reply/${id}`);
      toast.success("Marked as replied");
      fetchMessages();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  // DELETE MESSAGE
  const deleteMessage = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-medium text-gray-800 text-sm">
            Delete this message?
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:8080/api/contact/${id}`
                  );
                  toast.success("Message deleted");
                  fetchMessages();
                } catch (err) {
                  console.error(err);
                  toast.error("Delete failed");
                }
                closeToast();
              }}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded-md"
            >
              Delete
            </button>

            <button
              onClick={closeToast}
              className="px-3 py-1 text-xs bg-gray-200 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 ">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-gray-900">
          Customer Messages
        </h1>
        <p className="text-sm text-gray-600">
          Messages sent via contact form
        </p>
      </div>

      {/* Empty */}
      {messages.length === 0 && (
        <div className="backdrop-blur-md bg-white/40 border border-white/30 rounded-xl p-6 text-center text-sm text-gray-600">
          No messages yet
        </div>
      )}

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className="
              backdrop-blur-lg bg-white/35
              border border-white/30
              rounded-xl
              px-4 py-3
              shadow-sm
            "
          >
            {/* Top row */}
            <div className="flex justify-between items-start gap-3">
              <div>
                <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Mail size={14} className="text-indigo-600" />
                  {m.name}
                </p>
                <p className="text-xs text-gray-600">
                  {m.email}
                </p>
              </div>

              <span
                className={`text-[11px] px-2 py-[2px] rounded-full font-medium ${
                  m.replied
                    ? "bg-green-100/80 text-green-700"
                    : "bg-yellow-100/80 text-yellow-700"
                }`}
              >
                {m.replied ? "Replied" : "Pending"}
              </span>
            </div>

            {/* Message */}
            <div className="mt-2">
              <p className="text-sm text-gray-800 leading-relaxed break-words">
                {m.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-3 text-xs">
              {!m.replied && (
                <button
                  onClick={() => markReplied(m.id)}
                  className="flex items-center gap-1 text-green-700 hover:underline"
                >
                  <CheckCircle size={14} />
                  Mark replied
                </button>
              )}

              <button
                onClick={() => deleteMessage(m.id)}
                className="flex items-center gap-1 text-red-700 hover:underline"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
