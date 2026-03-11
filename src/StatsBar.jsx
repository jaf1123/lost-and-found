function StatsBar({ items }) {
  const counts = {
    total: items.length,
    lost: items.filter((i) => i.status === "lost").length,
    found: items.filter((i) => i.status === "found").length,
    claimed: items.filter((i) => i.status === "claimed").length,
  };

  const stats = [
    { label: "Total Items", value: counts.total },
    { label: "Lost", value: counts.lost, dot: "bg-red-500" },
    { label: "Found", value: counts.found, dot: "bg-amber-500" },
    { label: "Claimed", value: counts.claimed, dot: "bg-green-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {stats.map(({ label, value, dot }) => (
        <div
          key={label}
          className="bg-white rounded-lg border border-gray-200 px-4 py-3"
        >
          <p className="text-2xl font-bold text-gray-900 leading-none mb-1">
            {value}
          </p>
          <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
