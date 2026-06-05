"use client";

import { useEffect, useMemo, useState } from "react";
import type { Address } from "viem";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { base } from "wagmi/chains";
import {
  BASE_TIME_STAMP_ADDRESS,
  baseTimeStampAbi,
} from "@/lib/abi";
import { DATA_SUFFIX } from "@/lib/wagmi";

const CONTRACT_READY =
  BASE_TIME_STAMP_ADDRESS !== "0x0000000000000000000000000000000000000000";

function shortAddress(address?: Address) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatStamp(value?: bigint) {
  if (!value) return "No stamp yet";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(Number(value) * 1000));
}

function formatCount(value?: bigint) {
  return (value ?? 0n).toLocaleString("en-US");
}

function formatError(error: unknown) {
  if (error && typeof error === "object") {
    const record = error as { message?: string; shortMessage?: string };
    return record.shortMessage || record.message || "Transaction failed.";
  }

  return "Transaction failed.";
}

function StatusLight({ active }: { active: boolean }) {
  return (
    <span
      className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
        active
          ? "border-[#38f6a2] bg-[#38f6a2] shadow-[0_0_16px_rgba(56,246,162,0.75)]"
          : "border-zinc-600 bg-zinc-800"
      }`}
    />
  );
}

function MetricPanel({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <section
      className={`rounded-[6px] border border-zinc-700/80 bg-zinc-950/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-3 border-b border-zinc-800 pb-2">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {label}
        </p>
        <span className="h-px flex-1 bg-[#0052ff]/50" />
      </div>
      <p className="font-mono text-[1.05rem] font-semibold leading-tight text-zinc-100 break-words">
        {value}
      </p>
    </section>
  );
}

export default function Home() {
  const { address, chainId, isConnected, status } = useAccount();
  const { connectors, connect, isPending: isConnectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();
  const [lastError, setLastError] = useState("");
  const [showConnectors, setShowConnectors] = useState(false);

  const accountArg = useMemo(() => {
    return address ? [address] as const : undefined;
  }, [address]);

  const {
    data: lastStamp,
    refetch: refetchLastStamp,
    isLoading: isLastStampLoading,
  } = useReadContract({
    address: BASE_TIME_STAMP_ADDRESS,
    abi: baseTimeStampAbi,
    functionName: "lastStamp",
    args: accountArg,
    query: {
      enabled: CONTRACT_READY && Boolean(address),
    },
  });

  const {
    data: stampCount,
    refetch: refetchStampCount,
    isLoading: isStampCountLoading,
  } = useReadContract({
    address: BASE_TIME_STAMP_ADDRESS,
    abi: baseTimeStampAbi,
    functionName: "stampCount",
    args: accountArg,
    query: {
      enabled: CONTRACT_READY && Boolean(address),
    },
  });

  const {
    data: totalStamps,
    refetch: refetchTotalStamps,
    isLoading: isTotalLoading,
  } = useReadContract({
    address: BASE_TIME_STAMP_ADDRESS,
    abi: baseTimeStampAbi,
    functionName: "totalStamps",
    query: {
      enabled: CONTRACT_READY,
    },
  });

  const {
    data: transactionHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    if (!isConfirmed) return;
    void refetchLastStamp();
    void refetchStampCount();
    void refetchTotalStamps();
  }, [isConfirmed, refetchLastStamp, refetchStampCount, refetchTotalStamps]);

  const walletStatus = isConnected
    ? chainId === base.id
      ? "Connected to Base"
      : "Wrong network"
    : "Disconnected";

  const transactionStatus = transactionHash
    ? isConfirmed
      ? "Success"
      : isConfirming
        ? "Pending"
        : "Submitted"
    : writeError || receiptError || lastError
      ? "Failed"
      : "Idle";

  function refreshAll() {
    void refetchLastStamp();
    void refetchStampCount();
    void refetchTotalStamps();
  }

  async function handleStamp() {
    setLastError("");
    reset();

    if (!isConnected) {
      setLastError("Connect a wallet first.");
      return;
    }

    if (!CONTRACT_READY) {
      setLastError("Contract address is not configured.");
      return;
    }

    if (chainId !== base.id) {
      switchChain({ chainId: base.id });
      return;
    }

    writeContract(
      {
        address: BASE_TIME_STAMP_ADDRESS,
        abi: baseTimeStampAbi,
        functionName: "stamp",
        dataSuffix: DATA_SUFFIX,
      },
      {
        onSuccess: () => refreshAll(),
        onError: (error) => setLastError(formatError(error)),
      },
    );
  }

  const connectorList = connectors.filter((connector, index, list) => {
    return list.findIndex((item) => item.id === connector.id) === index;
  });

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-5xl flex-col justify-center">
        <div className="rounded-[8px] border border-zinc-700/90 bg-[#090b0e]/88 shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <header className="flex flex-col gap-4 border-b border-zinc-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#38f6a2]">
                Onchain Time Stamp
              </p>
              <h1 className="mt-2 text-2xl font-black uppercase tracking-normal text-white sm:text-3xl">
                Base Time Stamp
              </h1>
            </div>
            <div className="flex items-center gap-2 rounded-[6px] border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-xs text-zinc-300">
              <StatusLight active={isConnected && chainId === base.id} />
              {shortAddress(address)}
            </div>
          </header>

          <section className="grid gap-4 p-4 sm:grid-cols-[1fr_1.15fr] sm:p-6">
            <div className="rounded-[6px] border border-zinc-700 bg-zinc-950/70 p-4">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Wallet Control
                </p>
                <span className="font-mono text-[0.68rem] uppercase text-[#0052ff]">
                  Base Mainnet
                </span>
              </div>

              <div className="grid gap-2">
                {!isConnected ? (
                  <>
                    <button
                      type="button"
                      disabled={isConnectPending}
                      onClick={() => {
                        setLastError("");
                        setShowConnectors((value) => !value);
                      }}
                      className="h-11 rounded-[6px] border border-[#0052ff] bg-[#0052ff] px-3 text-sm font-black text-white transition hover:bg-[#1f66ff] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Connect Wallet
                    </button>
                    {showConnectors ? (
                      <div className="grid gap-2 rounded-[6px] border border-zinc-800 bg-black/30 p-2">
                        {connectorList.map((connector) => (
                          <button
                            key={connector.uid}
                            type="button"
                            disabled={isConnectPending}
                            onClick={() => {
                              setLastError("");
                              connect({ connector, chainId: base.id });
                              setShowConnectors(false);
                            }}
                            className="h-11 rounded-[6px] border border-zinc-700 bg-zinc-900 px-3 text-left text-sm font-bold text-zinc-100 transition hover:border-[#0052ff] hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-55"
                          >
                            {connector.name}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => disconnect()}
                    className="h-11 rounded-[6px] border border-zinc-700 bg-zinc-900 px-3 text-sm font-bold text-zinc-100 transition hover:border-[#0052ff] hover:bg-zinc-800"
                  >
                    Disconnect Wallet
                  </button>
                )}
              </div>

              {isConnected && chainId !== base.id ? (
                <button
                  type="button"
                  disabled={isSwitchPending}
                  onClick={() => switchChain({ chainId: base.id })}
                  className="mt-3 h-11 w-full rounded-[6px] border border-[#0052ff] bg-[#0052ff] px-3 text-sm font-black text-white transition hover:bg-[#1f66ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Switch to Base
                </button>
              ) : null}

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-zinc-800 pt-4 text-xs">
                <div className="rounded-[6px] bg-black/35 p-3">
                  <p className="uppercase tracking-[0.14em] text-zinc-600">
                    Connector
                  </p>
                  <p className="mt-1 font-mono text-zinc-200">{status}</p>
                </div>
                <div className="rounded-[6px] bg-black/35 p-3">
                  <p className="uppercase tracking-[0.14em] text-zinc-600">
                    Chain
                  </p>
                  <p className="mt-1 font-mono text-zinc-200">
                    {chainId ?? "--"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[6px] border border-zinc-700 bg-zinc-950/70 p-4">
              <button
                type="button"
                disabled={
                  isWritePending ||
                  isConfirming ||
                  isSwitchPending ||
                  !isConnected ||
                  !CONTRACT_READY
                }
                onClick={handleStamp}
                className="relative h-24 w-full overflow-hidden rounded-[6px] border border-[#38f6a2] bg-[#38f6a2] px-5 font-mono text-xl font-black uppercase text-[#04100a] shadow-[0_0_30px_rgba(56,246,162,0.2)] transition hover:bg-[#72ffc0] disabled:cursor-not-allowed disabled:border-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500 sm:h-full sm:min-h-52"
              >
                <span className="relative z-10">
                  {isWritePending
                    ? "Opening Wallet"
                    : isConfirming
                      ? "Stamp Pending"
                      : "Stamp Now"}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-[#0052ff]" />
              </button>
            </div>
          </section>

          <section className="grid gap-3 border-t border-zinc-800 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
            <MetricPanel
              label="Last Stamp"
              value={isLastStampLoading ? "Loading" : formatStamp(lastStamp)}
              wide
            />
            <MetricPanel
              label="My Stamps"
              value={isStampCountLoading ? "Loading" : formatCount(stampCount)}
            />
            <MetricPanel
              label="Total Stamps"
              value={isTotalLoading ? "Loading" : formatCount(totalStamps)}
            />
            <MetricPanel label="Wallet Status" value={walletStatus} />
            <MetricPanel
              label="Last Transaction"
              value={
                transactionHash
                  ? `${transactionStatus} ${transactionHash.slice(0, 10)}...${transactionHash.slice(-6)}`
                  : transactionStatus
              }
              wide
            />
          </section>

          {writeError || receiptError || lastError || !CONTRACT_READY ? (
            <footer className="border-t border-zinc-800 px-4 py-3 sm:px-6">
              <p className="font-mono text-xs text-[#38f6a2]">
                {lastError
                  ? lastError
                  : writeError || receiptError
                    ? formatError(writeError || receiptError)
                    : "Contract address is pending deployment."}
              </p>
            </footer>
          ) : null}
        </div>
      </div>
    </main>
  );
}
