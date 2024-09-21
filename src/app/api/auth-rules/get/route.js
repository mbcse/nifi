// app/api/get-auth-rules/route.ts
import { NextResponse } from "next/server";

// Sample in-memory storage for rules
let rules = [
  { id: 0, tokenType: "ERC1155", address: "0xFE7f9e4b7cb3Fe58d2dB372f703eebCC523E148c", tokenId: "0", tokenAmount: "1" },
];

export async function GET() {
  return NextResponse.json({ rules });
}
