"use client"; // required for useEffect

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGET_ID;

    if (!widgetId) {
      console.warn(
        "Tawk.to Widget ID is missing! Set NEXT_PUBLIC_TAWKTO_WIDGET_ID in your .env.local or Vercel environment variables."
      );
      return;
    }

    // Prevent adding the script multiple times
    if (document.getElementById("tawk-widget-script")) return;

    const s1 = document.createElement("script");
    s1.id = "tawk-widget-script";
    s1.async = true;
    s1.src = `https://embed.tawk.to/${widgetId}`; // full URL with WIDGET_ID/PROPERTY_ID
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    s0.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
