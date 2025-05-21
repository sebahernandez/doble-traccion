import { type ChangeEvent } from "react";
import { useDebounce } from "use-debounce";

interface SearchFiltersProps {
  readonly brands: string[];
  readonly branches: string[];
  readonly selectedBrand: string;
  readonly selectedBranch: string;
  readonly searchQuery: string;
  readonly sortOrder: "asc" | "desc" | "none";
  readonly onBrandChange: (brand: string) => void;
  readonly onBranchChange: (branch: string) => void;
  readonly onSearchChange: (query: string) => void;
  readonly onSortChange: (order: "asc" | "desc" | "none") => void;
}

export function SearchFilters({
  brands,
  branches,
  selectedBrand,
  selectedBranch,
  searchQuery,
  sortOrder,
  onBrandChange,
  onBranchChange,
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
    onSortChange(e.target.value as "asc" | "desc" | "none");
  };

  const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onBranchChange(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
          <option value="none">Orden original</option>
          <option value="desc">Mayor precio</option>
          <option value="asc">Menor precio</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="branch" className="text-white font-medium">
          Buscar por sucursal:
        </label>
        <select
          id="branch"
          value={selectedBranch}
          onChange={handleBranchChange}
          className="p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
          aria-label="Filtrar por sucursal"
        >
          <option value="">Todas las sucursales</option>
          {[...new Set(branches)].sort().map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
