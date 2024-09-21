import { NextResponse } from "next/server";

async function decodeToJson(base64String) {
  const decodedString = atob(base64String);
  console.log(decodedString);

// Step 2: Split the decoded string by commas and process it
const keyValuePairs = decodedString.split(", ").reduce((acc, pair) => {
  const [key, value] = pair.split("=");
  acc[key] = value ? decodeURIComponent(value) : null;
  return acc;
}, {});

console.log(keyValuePairs)

// Step 3: Convert the key-value pairs into a JSON object
const jsonObject = JSON.stringify(keyValuePairs, null, 2);
console.log(jsonObject);
return JSON.parse(jsonObject);
}

export async function POST(req) {
  try {
    const { query } = await req.json();
    console.log(query)

      // Extract query params from OpenNDS
      const { clientip } = await decodeToJson(query);
      console.log(clientip)
      try {
        const response = await fetch("http://192.168.130.210:5002/api/preauth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientip }), // Replace with actual value as needed
        });
  
        if (response.ok) {
            return NextResponse.json(response);
        } else {
          throw new Error("Failed to authenticate.");
        }
      } catch (error) {
        console.error("Error during API call:", error);
        return NextResponse.json({ message: "Auth Failed" }, { status: 401 });

      }
 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error, try again" }, { status: 500 });
  }
}

export const revalidate = 0;
