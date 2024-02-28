import { ethers } from "ethers";

// Shorten Ethereum address using prefix and suffix
export function shortenAddress(
  address: any,
  prefixLength = 6,
  suffixLength = 4
) {
  if (!address) return "";
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
}

// Shorten Ethereum address using checksum
export function shortenAddressWithChecksum(address: number) {
  if (!address) return "";
  // Convert address to checksum format
  const checksumAddress = ethers.utils.getAddress(address);
  // Use prefix/suffix method with the checksum address
  return shortenAddress(checksumAddress);
}

// Usage examples
// const ethereumAddress = "0x1234567890123456789012345678901234567890";
// console.log(shortenAddress(ethereumAddress)); // Output: 0x12345...67890
// console.log(shortenAddressWithChecksum(ethereumAddress)); // Output: 0x12345...67890
