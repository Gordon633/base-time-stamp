import { createConfig, http, injected } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const BUILDER_CODE = "bc_nzmgqcqn";
export const DATA_SUFFIX =
  "0x62635f6e7a6d677163716e0b0080218021802180218021802180218021" as `0x${string}`;

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: "Base Time Stamp",
      appChainIds: [base.id],
      preference: "all",
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  dataSuffix: DATA_SUFFIX,
});
