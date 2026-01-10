import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PriceCard({ price, title }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base uppercase tracking-wide text-white/70">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Price
          </p>
          <p className="text-2xl font-semibold text-white">
            {price?.price ?? "--"} <span className="text-sm">€/kWh</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Date
          </p>
          <p className="text-lg font-semibold text-white">
            {price?.date ?? "--"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Hour
          </p>
          <p className="text-lg font-semibold text-white">
            {price?.hour ?? "--"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PriceCard;
