"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import MedicineDetail from "@/components/detailpage/MedicineDetail";
import { getInfoCartridge, DosingSchedule } from "@/service/cartridge";
import CurrentIndicator from "@/components/detailpage/CurrentIndicator";

interface Props {
  params: {
    slug: string;
  };
}

export default function MediblockDetailPage({ params }: Props) {
  const [medicineData, setMedicineData] = useState<DosingSchedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const data = await getInfoCartridge(params.slug);
        setMedicineData(data);
      } catch (error) {
        console.error("Failed to fetch medicine data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineData();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!medicineData) {
    return <div>Medicine not found</div>;
  }

  return (
    <PageContainer>
      <CurrentIndicator
        recentTime={medicineData.recentTime}
        expectedTime={medicineData.expectedTime}
        dosingStatus={medicineData.dosingStatus}
        expectedDayOfWeek={medicineData.expectedDayOfWeek}
      />
      <MedicineDetail {...medicineData} />
    </PageContainer>
  );
}
