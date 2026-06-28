export interface GeoIpResult {
  latitude: number | null;
  longitude: number | null;
  country: string;
  state: string;
  city: string;
}

export async function geocodeIp(ip: string): Promise<GeoIpResult> {
  const cleanIp = ip.trim();
  
  // Return default mock data for localhost and private networks
  if (
    cleanIp === "127.0.0.1" || 
    cleanIp === "::1" || 
    cleanIp.startsWith("192.168.") || 
    cleanIp.startsWith("10.")
  ) {
    return {
      latitude: 19.076,
      longitude: 72.8777,
      country: "India",
      state: "Maharashtra",
      city: "Mumbai"
    };
  }

  try {
    // Attempt standard geo-ip lookup using a free public endpoint
    const response = await fetch(`http://ip-api.com/json/${cleanIp}`, { signal: AbortSignal.timeout(3000) });
    const data = await response.json() as any;
    if (data && data.status === "success") {
      return {
        latitude: data.lat || null,
        longitude: data.lon || null,
        country: data.country || "Unknown",
        state: data.regionName || "Unknown",
        city: data.city || "Unknown"
      };
    }
  } catch (error) {
    console.warn("Geocoding IP request failed, using defaults:", error);
  }

  return {
    latitude: 19.076,
    longitude: 72.8777,
    country: "India",
    state: "Maharashtra",
    city: "Mumbai"
  };
}
