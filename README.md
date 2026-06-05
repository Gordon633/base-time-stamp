# Base Time Stamp

Industrial minimal dashboard Mini App for recording unlimited onchain timestamps on Base.

## Setup

1. Deploy `contracts/BaseTimeStamp.sol` on Base mainnet.
2. Replace `BASE_TIME_STAMP_ADDRESS` in `lib/abi.ts`.
3. Replace the hard-coded `base:app_id` meta tag in `app/layout.tsx`.
4. After base.dev returns a builder code, set `BUILDER_CODE = "bc_..."` in `lib/wagmi.ts`; the app generates the ERC-8021 `dataSuffix` automatically.
5. Redeploy to Vercel and verify offchain and onchain attribution in base.dev.
