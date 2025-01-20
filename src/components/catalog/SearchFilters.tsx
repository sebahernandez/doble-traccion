import { type ChangeEvent } from "react";

interface SearchFiltersProps {
  readonly brands: string[];
  readonly selectedBrand: string;
  readonly searchQuery: string;
  readonly sortOrder: "asc" | "desc";
  readonly onBrandChange: (brand: string) => void;
  readonly onSearchChange: (query: string) => void;
  readonly onSortChange: (order: "asc" | "desc") => void;
}

export function SearchFilters({
  brands,
  selectedBrand,
  searchQuery,
  sortOrder,
  onBrandChange,
  onSearchChange,
  onSortChange,
}: SearchFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onBrandChange(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as "asc" | "desc");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar vehículos..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
      />

      <select
        value={selectedBrand}
        onChange={handleBrandChange}
        className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
      >
        <option value="">Todas las marcas</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={handleSortChange}
        className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
      >
        <option value="desc">Mayor precio</option>
        <option value="asc">Menor precio</option>
      </select>
    </div>
  );
}
