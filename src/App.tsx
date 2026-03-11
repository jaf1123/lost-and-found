import { useState, useEffect } from "react";
import { Search, ArrowUpDown, Menu, X } from "lucide-react";
import IC from "./Itemcard.jsx";
import Itemcardcreator from "./Itemcardcreator.jsx";
import ItemDetailModal from "./ItemDetailModal.jsx";
import StatsBar from "./StatsBar.jsx";
import Sidebar from "./Sidebar.jsx";
import LoginPage from "./LoginPage.jsx";
import { useAuth } from "./AuthContext.jsx";
import seedData from "./seedData.js";
import "./style.css";

interface Card {
  id: string;
  name: string;
  desc: string;
  email: string;
  category: string;
  date: string;
  location: string;
  status: string;
  image: string | null;
}

const STORAGE_KEY = "lost-and-found-items";

function loadItems(): Card[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return seedData as Card[];
}

const statusFilters = ["all", "lost", "found", "claimed"] as const;
const categoryOptions = [
  { id: "all", label: "All Categories" },
  { id: "clothing", label: "Clothing" },
  { id: "phone", label: "Phone" },
  { id: "laptop", label: "Laptop" },
  { id: "keys", label: "Keys" },
  { id: "headphones", label: "Headphones" },
  { id: "other", label: "Other" },
];

export default function App() {
  const { user } = useAuth();
  const [cards, setCards] = useState<Card[]>(loadItems);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedItem, setSelectedItem] = useState<Card | null>(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = (newCard: Card) => {
    setCards([newCard, ...cards]);
    setShowForm(false);
    setActivePage("dashboard");
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all items?")) {
      setCards([]);
    }
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
  };

  const changeStatus = (id: string, newStatus: string) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, status: newStatus });
    }
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    if (page === "report") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  let filtered = cards.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (sortOrder === "oldest") {
    filtered = [...filtered].reverse();
  }

  if (!user) return <LoginPage />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar — desktop */}
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative h-full flex flex-col w-56 bg-white border-r border-gray-200">
            <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
              <h1 className="text-base font-bold text-blue-500 leading-tight">
                Campus<br />Lost &amp; Found
              </h1>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar activePage={activePage} onNavigate={handleNavigate} mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold text-gray-800 capitalize">
              {activePage === "my-reports" ? "My Reports" : activePage === "help" ? "Help & FAQ" : activePage.replace("-", " ")}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">
              {cards.length} item{cards.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => handleNavigate(showForm ? "dashboard" : "report")}
              className="bg-blue-500 text-white font-medium px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              {showForm ? "Cancel" : "+ Report"}
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {/* Report Form */}
          {showForm && (
            <div className="mb-8 max-w-3xl">
              <Itemcardcreator onAddCard={addCard} defaultEmail={user.email} />
            </div>
          )}

          {!showForm && (
            <>
              {/* Stats Bar */}
              {(activePage === "dashboard" || activePage === "analytics") && (
                <StatsBar items={cards} />
              )}

              {/* Filters row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                {/* Status tabs */}
                <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5">
                  {statusFilters.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        statusFilter === s
                          ? "bg-blue-500 text-white"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>

                {/* Sort */}
                <button
                  onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {sortOrder === "newest" ? "Newest" : "Oldest"}
                </button>

                {cards.length > 0 && user.role === "admin" && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-gray-400 hover:text-red-500 px-3 py-2 rounded-lg border border-gray-200 hover:border-red-200 transition-colors whitespace-nowrap"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Items Grid */}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((card) => (
                    <IC
                      key={card.id}
                      item={card}
                      onDelete={() => deleteCard(card.id)}
                      onClick={() => setSelectedItem(card)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h2 className="text-lg font-semibold text-gray-400 mb-1">
                    {cards.length === 0 ? "No items reported yet" : "No items match your filters"}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {cards.length === 0
                      ? 'Click "+ Report" to log a lost item.'
                      : "Try adjusting your search or filters."}
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onStatusChange={changeStatus}
        />
      )}
    </div>
  );
}
