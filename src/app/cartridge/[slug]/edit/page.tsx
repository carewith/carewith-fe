"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import MedicineEditDetail from "@/components/editpage/MedicineEditContainer";
import { getInfoCartridge, DosingSchedule } from "@/service/cartridge";

export default function MediblockEditPage() {
  const [medicineData, setMedicineData] = useState<DosingSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const cartridgeId = params.slug || "";
        const data = await getInfoCartridge(params.slug as string);
        console.log(data);
        setMedicineData(data);
      } catch (error) {
        console.error("Failed to fetch medicine data:", error);
        setError("Failed to load medicine data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicineData();
  }, [params]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!medicineData) {
    return <div>Medicine not found or failed to load</div>;
  }

  return (
    <PageContainer>
      <MedicineEditDetail {...medicineData} />
    </PageContainer>
  );
}
