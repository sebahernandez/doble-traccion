import { type ChangeEvent } from "react";
import { useDebounce } from "use-debounce";

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
  const [debouncedCallback] = useDebounce(
    (value: string) => {
      onSearchChange(value);
    },
    500 // delay de 500ms
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedCallback(value);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onBrandChange(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as "asc" | "desc");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="search" className="text-white font-medium">
          Busca tu próximo auto:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Buscar vehículos..."
          defaultValue={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          aria-label="Buscar vehículos por nombre"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="brand" className="text-white font-medium">
          Selecciona una marca:
        </label>
        <select
          id="brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          aria-label="Filtrar por marca"
        >
          <option value="">Todas las marcas</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="sort" className="text-white font-medium">
          Ordenar por precio:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={handleSortChange}
          className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          aria-label="Ordenar por precio"
        >
          <option value="desc">Mayor precio</option>
          <option value="asc">Menor precio</option>
        </select>
      </div>
    </div>
  );
}
