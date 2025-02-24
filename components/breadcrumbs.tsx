"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { useGetTravelShipmentById } from "@/app/actions/travel-shipments";
import { Slash } from "lucide-react";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import { formatDate } from "@/lib/utils";

interface BreadcrumbsProps {
  overridePath?: Array<{
    title: string;
    link: string;
  }>;
}

export function Breadcrumbs({ overridePath }: BreadcrumbsProps) {
  const defaultItems = useBreadcrumbs();
  const params = useParams();
  const id = params?.id as string | undefined;
  const { data: travelShipment } = useGetTravelShipmentById(id || "");

  const items = overridePath || defaultItems;

  const displayItems = items.map((item, index) => {
    if (
      id &&
      index === items.length - 1 &&
      items[index - 1]?.title === "Travels" &&
      travelShipment?.driverName
    ) {
      const date = new Date(travelShipment.date);
      const formattedDate = formatDate(date);

      const parts = [
        formattedDate,
        travelShipment.driverName,
        travelShipment.assistantName,
        travelShipment.vehicleLicensePlate,
        travelShipment.semiTrailerLicensePlate,
      ].filter(Boolean);

      return {
        ...item,
        title: parts.join(" - "),
      };
    }
    return item;
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {displayItems.map((item, index) => (
          <Fragment key={item.title}>
            {index !== displayItems.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < displayItems.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block">
                <Slash />
              </BreadcrumbSeparator>
            )}
            {index === displayItems.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
