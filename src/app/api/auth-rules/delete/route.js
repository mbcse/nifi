// app/api/delete-auth-rule/[id]/route.ts
import { NextResponse } from "next/server";

// Sample in-memory storage for rules
let rules = [];

export async function DELETE(req ) {
  try {
    const { id } = await req.json();
    rules = rules.filter((rule) => rule.id !== parseInt(id));

    return NextResponse.json({ message: "Rule deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete rule" }, { status: 400 });
  }
}
