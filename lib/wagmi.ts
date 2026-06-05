import { createConfig, http, injected } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const BUILDER_CODE = "";
export const DATA_SUFFIX = "0x" as `0x${string}`;

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
