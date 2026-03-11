import {
  Shirt,
  Smartphone,
  Laptop,
  KeyRound,
  Headphones,
  MapPin,
  Mail,
  Calendar,
  Trash2,
  ImageIcon,
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
  lost: { label: "Lost", dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
  found: { label: "Found", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  claimed: { label: "Claimed", dot: "bg-green-500", text: "text-green-700", bg: "bg-green-50" },
};

function IC({ item, onDelete, onClick }) {
  const { name, desc, email, category, date, location, status, image } = item;
  const Icon = categoryIcons[category] || Package;
  const label = categoryLabels[category] || "Other";
  const sCfg = statusConfig[status] || statusConfig.lost;

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      {image ? (
        <img src={image} alt={name} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-32 bg-gray-50 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-200" />
        </div>
      )}

      <div className="p-4">
        {/* Top row: status + category + delete */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${sCfg.bg} ${sCfg.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sCfg.dot}`} />
              {sCfg.label}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="text-gray-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
            title="Remove"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Title with category icon */}
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex-shrink-0 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">{name}</h3>
            <span className="text-[11px] text-gray-400">{label}</span>
          </div>
        </div>

        {/* Description */}
        {desc && (
          <p className="text-xs text-gray-500 mb-3 mt-2 line-clamp-2 leading-relaxed">{desc}</p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          )}
          {email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {email}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default IC;
