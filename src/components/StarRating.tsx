// src/components/StarRating.tsx
import { useEffect, useState } from "react";
import { RateService } from "../services/rate.services";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface StarRatingProps {
  idOffer: number;
  /* value: number;
    onRate?: (rating: number) => void; // Callback al seleccionar una calificación
    interactive?: boolean; */
}

export function StarRating({ idOffer }: StarRatingProps) {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [myRate, setMyRate] = useState<number>(0);

  useEffect(() => {
    //if(!id) return
    RateService.getGlobalRate(idOffer).then((data) => {
      console.log("rate", data);
      setAverageRating(data.averageRating);
      setTotalRatings(data.totalRatings);
    });

    RateService.getMyRate(idOffer).then(setMyRate);
  }, [idOffer]);

  const handleRate =async(rating: number) => {
    await RateService.rate(idOffer, rating);
    setMyRate(rating);
  }

  return (
    <div className="p-4 border rounded-md shadow-md">
    <div className="text-lg font-semibold">Calificación</div>
    <p className="text-sm text-gray-600">
      <strong>Promedio:</strong> {averageRating ?? "N/A"} ⭐ ({totalRatings} votos)
    </p>
    <p className="text-sm text-gray-600">
      <strong>Tu calificación:</strong> {myRate > 0 ? `${myRate} ⭐` : "No calificado"}
    </p>
{myRate}
    <div className="flex space-x-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="cursor-pointer"
          onClick={() => handleRate(star)}
        >
          {star <= myRate ? <IconStarFilled size={20} className="text-yellow-500" /> : <IconStar size={20} className="text-gray-400" />}
        </span>
      ))}
    </div>
  </div>
  );
}
