import type { Address } from "viem";

export const BASE_TIME_STAMP_ADDRESS =
  "0x0000000000000000000000000000000000000000" as Address;

export const baseTimeStampAbi = [
  {
    type: "function",
    name: "lastStamp",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "stamp",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "stampCount",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalStamps",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "Stamped",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "userStamps", type: "uint256", indexed: false },
      { name: "totalStamps", type: "uint256", indexed: false },
    ],
  },
] as const;
