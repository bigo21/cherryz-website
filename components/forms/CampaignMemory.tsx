"use client";

import { useEffect } from "react";
import { rememberCampaign } from "@/lib/forms/campaign";

/** Remembers the campaign (utm_*) of the page the visitor landed on. Renders nothing. */
export default function CampaignMemory() {
  useEffect(() => {
    rememberCampaign();
  }, []);
  return null;
}
