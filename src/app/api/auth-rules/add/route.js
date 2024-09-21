// app/api/add-auth-rule/route.ts
import { NextResponse } from "next/server";

// Sample in-memory storage for rules
let rules = [];

export async function POST(req) {
  try {
    const body = await req.json();
    const { tokenType, address, tokenId, tokenAmount } = body;
    
    const newRule = {
      id: rules.length + 1,
      tokenType,
      address,
      tokenId,
      tokenAmount,
    };
    rules.push(newRule);

    return NextResponse.json({ message: "Rule added", rule: newRule });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add rule" }, { status: 400 });
  }
}
