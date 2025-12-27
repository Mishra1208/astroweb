import { horoscopes } from "@/data/horoscopes";

export async function fetchDailyHoroscope(signName) {
    try {
        // Call our own internal API route
        const response = await fetch(`/api/horoscope?sign=${signName}`);

        if (!response.ok) {
            throw new Error("Internal API Failed");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.warn("Using offline fallback:", error);
        // Fallback to dummy data
        const fallback = horoscopes[signName] || horoscopes["Aries"];
        // Add isLive: false flag
        return { ...fallback, isLive: false };
    }
}
