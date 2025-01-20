import { useState, useMemo, useEffect } from "react";
import { fetchAllVehicles } from "../../lib/fetchVehicles";
import { VehicleCard } from "./VehiculeCard";
import { SearchFilters } from "./SearchFilters";
import { Pagination } from "./Pagination";
import type { Datum } from "../../types/vehicule";
import { SpinnerCircular } from "spinners-react/lib/esm/SpinnerCircular";

const ITEMS_PER_PAGE = 12;

export function VehicleCatalog() {
  const [vehicles, setVehicles] = useState<Datum[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const autos = await fetchAllVehicles();
      setVehicles(autos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Extract brands from vehicles
  const brands = useMemo(() => {
    const brandSet = new Set<string>(vehicles.map((v: any) => v.brand));
    return [...brandSet].sort((a, b) => a.localeCompare(b));
  }, [vehicles]);

  // Filtered and sorted vehicles
  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query)
      );
    }

    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter((v) => v.brand === selectedBrand);
    }

    // Apply sort
    filtered.sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      return sortOrder === "desc" ? priceB - priceA : priceA - priceB;
    });

    return filtered;
  }, [vehicles, searchQuery, selectedBrand, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <SearchFilters
        brands={brands}
        selectedBrand={selectedBrand}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        onBrandChange={setSelectedBrand}
        onSearchChange={setSearchQuery}
        onSortChange={setSortOrder}
      />

      {loading ? (
        <div className="flex justify-center mt-4">
          <SpinnerCircular
            size={69}
            thickness={136}
            speed={114}
            color="rgba(172, 134, 57, 1)"
            secondaryColor="rgba(172, 127, 57, 0.44)"
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          {filteredVehicles.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
