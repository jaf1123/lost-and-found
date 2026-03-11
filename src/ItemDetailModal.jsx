import {
  X,
  MapPin,
  Mail,
  Calendar,
  ImageIcon,
  Shirt,
  Smartphone,
  Laptop,
  KeyRound,
  Headphones,
  Package,
} from "lucide-react";

const categoryIcons = {
  clothing: Shirt,
  phone: Smartphone,
  laptop: Laptop,
  keys: KeyRound,
  headphones: Headphones,
  other: Package,
};

const categoryLabels = {
  clothing: "Clothing",
  phone: "Phone",
  laptop: "Laptop",
  keys: "Keys",
  headphones: "Headphones",
  other: "Other",
};

const statusConfig = {
  lost: { label: "Lost", dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50", ring: "ring-red-200" },
  found: { label: "Found", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-200" },
  claimed: { label: "Claimed", dot: "bg-green-500", text: "text-green-700", bg: "bg-green-50", ring: "ring-green-200" },
};

function ItemDetailModal({ item, onClose, onStatusChange }) {
  if (!item) return null;

  const Icon = categoryIcons[item.category] || Package;
  const label = categoryLabels[item.category] || "Other";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
        ) : (
          <div className="w-full h-44 bg-gray-50 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-200" />
          </div>
        )}

        <div className="p-6">
          {/* Category + Status */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-medium">
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold ${statusConfig[item.status]?.bg} ${statusConfig[item.status]?.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[item.status]?.dot}`} />
              {statusConfig[item.status]?.label}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h2>

          {item.desc && (
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">{item.desc}</p>
          )}

          <div className="space-y-2 mb-6 text-sm text-gray-500">
            {item.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {item.location}
              </div>
            )}
            {item.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {item.email}
              </div>
            )}
            {item.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {item.date}
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Update Status</p>
            <div className="flex gap-2">
              {["lost", "found", "claimed"].map((s) => {
                const cfg = statusConfig[s];
                const isActive = item.status === s;
                return (
                  <button
                    key={s}
                    onClick={() => onStatusChange(item.id, s)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? `${cfg.bg} ${cfg.text} ring-1 ${cfg.ring}`
                        : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailModal;
