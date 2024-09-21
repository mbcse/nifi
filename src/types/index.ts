export type ContractAddress = `0x${string}`;

export interface ABI_TYPE {
  [key: number]: ContractAddress;
}
