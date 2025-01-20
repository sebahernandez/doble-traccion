import type { Datum } from "../../types/vehicule";
import { formatNameForURL } from "../../helpers/stringHelpers";
import { formatPrice } from "../../helpers/formatHelpers";

//icons
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRoad } from "react-icons/fa6";
import { TbManualGearboxFilled } from "react-icons/tb";

interface VehicleCardProps {
  readonly vehicle: Datum;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const formattedPrice = formatPrice(vehicle.price);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden h-full border border-gray-800">
      <a href={`/vehiculos/${formatNameForURL(vehicle.name)}/${vehicle.id}`}>
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="w-full h-52 object-cover"
        />
      </a>
      <div className="p-2">
        {/* <span className="text-sm text-gray-400">{vehicle.year}</span> */}
        <h3 className="font-bold text-[16px] mb-2 text-white">
          <div className="h-16">
            <a
              href={`/vehiculos/${formatNameForURL(vehicle.name)}/${
                vehicle.id
              }`}
            >
              {vehicle.name}
            </a>
          </div>
        </h3>
        <p className="text-xl font-bold text-yellow-400 mb-4">
          {formattedPrice}
        </p>
        <div className="flex flex-wrap gap-2 my-3">
          <span className="relative px-2 py-1 w-fit text-center bg-white font-bold text-[9px] text-[#1C3328] rounded-full uppercase inline-flex justify-center items-center mt-3.5 gap-2">
            <div className="flex items-center gap-1">
              <FaRoad /> {vehicle.miles} KM
            </div>
          </span>

          <span className="relative px-2 py-1 w-fit text-center bg-white font-bold text-[9px] text-[#1C3328] rounded-full uppercase inline-flex justify-center  items-center mt-3.5">
            <div className="flex items-center gap-1">
              <BsFillFuelPumpFill /> {vehicle.fuelType}
            </div>
          </span>
          <span className="relative px-2 py-1 w-fit text-center bg-white font-bold text-[9px] text-[#1C3328] rounded-full uppercase inline-flex justify-center  items-center mt-3.5">
            <div className="flex items-center gap-1">
              <TbManualGearboxFilled /> {vehicle.transmission}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
