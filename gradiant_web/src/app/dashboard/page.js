"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Chart } from "@/app/components/Chart";
import PriceCard from "../components/PriceCard";
import { useFile } from "../context/csvContex";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "react-responsive-carousel/lib/styles/carousel.min.css";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const ELECTRICITY_PRICES = [
  0.11604, 0.09151, 0.09402, 0.09571, 0.09494, 0.09517, 0.09438, 0.09343,
  0.09265, 0.08963, 0.08415, 0.07765, 0.07165, 0.0693, 0.06982, 0.06897,
  0.06762, 0.07298, 0.08434, 0.10751, 0.12783, 0.11863, 0.11465, 0.1134,
];

const PRICE_SERIES = ELECTRICITY_PRICES.map((value, hour) => ({
  time: Date.parse(`2023-02-15 ${String(hour).padStart(2, "0")}:00`) / 1000,
  value,
}));

const COLORS_PRICE = {
  backgroundColor: "black",
  lineColor: "#651fff",
  textColor: "white",
  areaTopColor: "#300f79",
  areaBottomColor: "#160738",
};

const COLORS_COST = {
  backgroundColor: "black",
  lineColor: "rgba(38, 198, 218, 1)",
  textColor: "#d1d4dc",
  areaTopColor: "rgba(20, 170, 190, 0.56)",
  areaBottomColor: "rgba(38, 198, 218, 0.04)",
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export default function Dashboard() {
  const router = useRouter();
  const { file, isReady } = useFile();

  const [parsedConsumption, setParsedConsumption] = useState([]);
  const [parsedCost, setParsedCost] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedChart, setSelectedChart] = useState(null);

  const [consumptionPercent, setConsumptionPercent] = useState(null);
  const [co2Kg, setCo2Kg] = useState(null);

  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);
  const [cheapestPrice1, setCheapestPrice1] = useState(null);
  const [cheapestPrice2, setCheapestPrice2] = useState(null);

  /* ------------------------------------------------------------------------ */
  /*                                   EFFECTS                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isReady || !file) return;

    processCSV(file);
    parseConsumptionSeries(file);
    parseCostSeries(file);

    fetch("/api/prices/min")
      .then((r) => r.json())
      .then(setLowestPrice);
    fetch("/api/prices/max")
      .then((r) => r.json())
      .then(setHighestPrice);
    fetch("/api/prices/cheapests1")
      .then((r) => r.json())
      .then(setCheapestPrice1);
    fetch("/api/prices/cheapests2")
      .then((r) => r.json())
      .then(setCheapestPrice2);
  }, [file, isReady]);

  if (!isReady) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
          Loading data
        </p>
      </main>
    );
  }

  if (!file) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
        <h2 className="mb-3 text-2xl font-semibold">Upload a CSV to continue</h2>
        <p className="mb-6 max-w-lg text-sm text-white/70">
          We could not find your uploaded file. Please go back and select your CSV
          again.
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Back to upload
        </button>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                CSV LOGIC                                 */
  /* ------------------------------------------------------------------------ */

  const processCSV = (csvFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const lines = e.target.result.split("\n");
      let total = 0;

      lines.slice(1).forEach((line) => {
        const value = parseFloat(line.split(";")[3]?.replace(",", "."));
        if (!isNaN(value)) total += value;
      });

      const dailyAverage = (total / 9) * 100;
      const co2 = (dailyAverage * 14) / 100;

      setConsumptionPercent(dailyAverage.toFixed(2));
      setCo2Kg(co2.toFixed(2));
    };

    reader.readAsText(csvFile);
  };

  const parseConsumptionSeries = (csvFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = [];

      e.target.result
        .split("\n")
        .slice(1)
        .forEach((line) => {
          const cells = line.split(";");
          const date = cells[1];
          const hour = parseInt(cells[2], 10);
          const value = parseFloat(cells[3]?.replace(",", "."));

          if (isNaN(value) || isNaN(hour)) return;

          const time =
            Date.parse(
              `${date.split("/").reverse().join("-")} ${String(hour).padStart(
                2,
                "0"
              )}:00`
            ) / 1000;

          data.push({ time, value });
        });

      setParsedConsumption(data);
    };

    reader.readAsText(csvFile);
  };

  const parseCostSeries = (csvFile) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = [];

      e.target.result
        .split("\n")
        .slice(1)
        .forEach((line, index) => {
          const cells = line.split(";");
          const date = cells[1];
          const hour = parseInt(cells[2], 10);
          const consumption = parseFloat(cells[3]?.replace(",", "."));

          if (isNaN(consumption) || isNaN(hour)) return;

          const time =
            Date.parse(
              `${date.split("/").reverse().join("-")} ${String(hour).padStart(
                2,
                "0"
              )}:00`
            ) / 1000;

          data.push({
            time,
            value: consumption * ELECTRICITY_PRICES[index],
          });
        });

      setParsedCost(data);
    };

    reader.readAsText(csvFile);
  };

  /* ------------------------------------------------------------------------ */
  /*                               EXPORT LOGIC                               */
  /* ------------------------------------------------------------------------ */

  const downloadExcel = () => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const buffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "electricity-data.xlsx"
      );
    };

    reader.readAsBinaryString(file);
  };

  /* ------------------------------------------------------------------------ */
  /*                                   GUARD                                  */
  /* ------------------------------------------------------------------------ */

  if (!file) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Button onClick={() => router.push("/")}>Back to upload</Button>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                   TEXT                                   */
  /* ------------------------------------------------------------------------ */

  const safeKg = Number(co2Kg ?? 0);
  const safePercent = Number(consumptionPercent ?? 0);

  const impactTexts = [
    `${((safeKg * 100) / 4.17).toFixed(
      0
    )}% of the daily emissions of an average car`,
    `Your electricity use is equivalent to melting ${(
      34.72 *
      (safePercent / 100)
    ).toFixed(0)} liters of ice per day`,
    `It would take ${(safeKg / 0.027).toFixed(
      0
    )} trees to offset your daily footprint`,
    `It would take ${(22780 / safeKg).toFixed(
      0
    )} people with your footprint to match a quiet day on a private jet`,
  ];

  /* ------------------------------------------------------------------------ */
  /*                                   RENDER                                 */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl space-y-12 px-6 py-10">
        {/* HERO IMPACT CARD */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Electricity impact snapshot</CardTitle>
            <CardDescription>
              How your electricity usage translates into real-world impact.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay
                infiniteLoop
                interval={4200}
                onChange={setCurrentSlide}
              >
                <img
                  src="/Carr.gif"
                  className="h-[420px] w-full object-cover"
                />
                <img src="/ice.gif" className="h-[420px] w-full object-cover" />
                <img
                  src="/tree.gif"
                  className="h-[420px] w-full object-cover"
                />
                <img
                  src="/plane.gif"
                  className="h-[420px] w-full object-cover"
                />
              </Carousel>
            </div>

            <p className="mx-auto max-w-3xl text-center text-xl text-white/80">
              {impactTexts[currentSlide]}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-black/40 p-6">
                <p className="text-xs uppercase text-white/60">Daily usage</p>
                <p className="mt-2 text-5xl font-semibold">
                  {consumptionPercent ?? "--"}%
                </p>
              </div>
              <div className="rounded-2xl bg-black/40 p-6">
                <p className="text-xs uppercase text-white/60">CO₂ footprint</p>
                <p className="mt-2 text-3xl font-semibold">
                  {co2Kg ?? "--"} kg CO₂
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CHARTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Electricity charts</h2>
            <Badge>Interactive</Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                id: "consumption",
                title: "Electricity consumption",
                data: parsedConsumption,
                subtitle: "Hour | kWh",
              },
              {
                id: "price",
                title: "Electricity price",
                data: PRICE_SERIES,
                subtitle: "Hour | €/kWh",
                colors: COLORS_PRICE,
              },
              {
                id: "cost",
                title: "Your electricity cost",
                data: parsedCost,
                subtitle: "Hour | €",
                colors: COLORS_COST,
              },
            ].map((chart) => (
              <motion.div
                key={chart.id}
                layoutId={chart.id}
                onClick={() => setSelectedChart(chart)}
              >
                <Card className="cursor-pointer">
                  <CardContent>
                    <Chart {...chart} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MODAL */}
        <AnimatePresence>
          {selectedChart && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
              onClick={() => setSelectedChart(null)}
            >
              <motion.div
                className="w-full max-w-5xl rounded-3xl bg-slate-950 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <Chart {...selectedChart} />
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => setSelectedChart(null)}>Close</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRICES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Featured electricity prices
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <PriceCard price={lowestPrice} title="Lowest price" />
            <PriceCard price={highestPrice} title="Highest price" />
            <PriceCard price={cheapestPrice1} title="Cheapest period" />
            <PriceCard price={cheapestPrice2} title="Second cheapest period" />
          </div>
        </section>

        {/* EXPORT */}
        <Button variant="outline" onClick={downloadExcel}>
          <Download className="h-4 w-4" />
          Download as Excel
        </Button>

        <footer className="border-t border-white/10 pt-6 text-xs text-white/50">
          WattCheck — HackUDC 2024
        </footer>
      </div>
    </main>
  );
}
