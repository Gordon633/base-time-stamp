# BaseTimeStamp

BaseTimeStamp is an industrial, minimal dashboard Mini App for recording onchain timestamps on Base.

The project is designed to provide a simple interface for creating timestamp records through a deployed `BaseTimeStamp` contract.

## Overview

BaseTimeStamp includes a frontend application and a smart contract integration.

The main workflow is:

1. Deploy the timestamp contract on Base mainnet.
2. Configure the frontend with the deployed contract address.
3. Configure the app metadata.
4. Configure attribution settings.
5. Redeploy the frontend.
6. Verify attribution and contract interaction behavior.

## Features

- Minimal dashboard interface.
- Built for Base.
- Supports recording onchain timestamps.
- Uses `contracts/BaseTimeStamp.sol` as the core contract.
- Includes ABI configuration in `lib/abi.ts`.
- Includes app metadata configuration in `app/layout.tsx`.
- Includes Base attribution configuration in `lib/wagmi.ts`.
- Generates the ERC-8021 `dataSuffix` from the configured builder code.

## Repository

Repository URL:

https://github.com/Gordon633/base-time-stamp.git

## Project Structure

Key files referenced by the setup process:

- `contracts/BaseTimeStamp.sol`
- `lib/abi.ts`
- `app/layout.tsx`
- `lib/wagmi.ts`

## Setup

### 1. Deploy the contract
