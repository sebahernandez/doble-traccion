import { useMemo } from "react";
import type { Datum } from "../../types/vehicule";

interface FiltersProps {
  vehicles: Datum[];
  searchQuery: string;
  selectedBrand: string;
  sortOrder: "asc" | "desc";
  onSearchChange: (query: string) => void;
  onBrandChange: (brand: string) => void;
  onSortChange: (order: "asc" | "desc") => void;
}

export function Filters({
  vehicles,
  searchQuery,
  selectedBrand,
  sortOrder,
  onSearchChange,
  onBrandChange,
  onSortChange,
}: FiltersProps) {
  const brands = useMemo(() => {
    const brandSet = new Set<string>(
      vehicles
        .filter((v) => v?.brand && typeof v.brand === "string")
        .map((v) => v.brand)
        .filter(Boolean)
    );
    return [...brandSet].sort((a, b) => a.localeCompare(b));
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    let filtered = vehicles.filter(Boolean); // Eliminar valores null/undefined

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((v) => {
        const name = v?.name?.toLowerCase() || "";
        const brand = v?.brand?.toLowerCase() || "";
        return name.includes(query) || brand.includes(query);
      });
    }

    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter((v) => v?.brand === selectedBrand);
    }

    // Apply sort with proper price handling
    filtered.sort((a, b) => {
      const priceA = a?.price ? parseFloat(a.price.replace(/[,.]/g, "")) : 0;
      const priceB = b?.price ? parseFloat(b.price.replace(/[,.]/g, "")) : 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    return filtered;
  }, [vehicles, searchQuery, selectedBrand, sortOrder]);

  return { brands, filteredVehicles };
}
