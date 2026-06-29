# BaseTimeStamp

BaseTimeStamp is a minimal industrial-style dashboard Mini App for recording onchain timestamps on Base.

The project provides a simple frontend for creating timestamp records through a deployed `BaseTimeStamp` smart contract.

## Overview

BaseTimeStamp includes a frontend application and a smart contract integration.

The intended workflow is:

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

Key files used during setup and deployment:

- `contracts/BaseTimeStamp.sol`
- `lib/abi.ts`
- `app/layout.tsx`
- `lib/wagmi.ts`

## Setup

Follow these steps to prepare the application for deployment.

### 1. Deploy the contract

Deploy `contracts/BaseTimeStamp.sol` on Base mainnet.

After deployment, copy the deployed contract address.

This address is required by the frontend so it can call the correct contract.

### 2. Configure the contract address

Open `lib/abi.ts`.

Replace `BASE_TIME_STAMP_ADDRESS` with the deployed `BaseTimeStamp` contract address.

Make sure the value points to the contract deployed on Base mainnet.

### 3. Configure app metadata

Open `app/layout.tsx`.

Update the hard-coded `base:app_id` meta tag with the correct app identifier for your deployment.

This value should match the app configuration used for the deployed frontend.

### 4. Configure builder attribution

After receiving a builder code from base.dev, open `lib/wagmi.ts`.
