import { Address } from "../types";

export const R = 6371; // Radius of the Earth in kilometers;

export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

type DistanceResult = {
  value: number;
  unit: 'km'
}

export function calculateDistance(fromAddress: Address, toAddress: Address): DistanceResult {
  const dLat = deg2rad(toAddress.latitude - fromAddress.latitude);
  const dLon = deg2rad(toAddress.longitude - fromAddress.longitude);

  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(fromAddress.latitude)) * Math.cos(deg2rad(toAddress.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  
  return {
    unit: 'km',
    value: Number.parseFloat(distance.toFixed(2))
  }
}

