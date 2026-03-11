import { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";

const categories = [
  { id: "clothing", label: "Clothing" },
  { id: "phone", label: "Phone" },
  { id: "laptop", label: "Laptop" },
  { id: "keys", label: "Keys" },
  { id: "headphones", label: "Headphones" },
  { id: "other", label: "Other" },
];

function ItemcardCreator({ onAddCard, defaultEmail = "" }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("other");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter an item name.");
      return;
    }

    onAddCard({
      id: Date.now().toString(),
      name: name.trim(),
      desc: desc.trim(),
      email: email.trim(),
      location: location.trim(),
      category,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "lost",
      image: imagePreview,
    });

    setName("");
    setDesc("");
    setEmail("");
    setLocation("");
    setCategory("other");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-gray-200 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Report a Lost Item
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Blue Backpack"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Found / Lost
          </label>
          <input
            type="text"
            placeholder="e.g. Library 2nd Floor"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          placeholder="Color, blue, distinguishing features..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email
        </label>
        <input
          type="email"
          placeholder="your@email.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Image upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photo (optional)
        </label>
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-28 w-auto rounded-lg border border-gray-200 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-gray-50 transition-colors w-fit">
            <ImagePlus className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Upload an image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Category picker */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                category === id
                  ? "bg-blue-500 border-blue-500 text-white font-medium"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
      >
        Submit Report
      </button>
    </form>
  );
}

export default ItemcardCreator;
