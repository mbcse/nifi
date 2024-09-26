import crypto from 'crypto';

import { ethers } from "ethers";
import { NextResponse } from "next/server";
const faskey = 'mysecretkey'; // from your openNDS config

// Your ERC-1155 contract ABI (simplified, you'll need the full ABI)
const contractABI = [
  // Include necessary methods from your contract
  "function balanceOf(address account, uint256 id) view returns (uint256)"
];

// The NFT contract address and token ID
const nftAddress = "0xFE7f9e4b7cb3Fe58d2dB372f703eebCC523E148c";
const tokenId = 0;

async function decodeToJson(base64String) {
  const decodedString = atob(base64String);

// Step 2: Split the decoded string by commas and process it
const keyValuePairs = decodedString.split(", ").reduce((acc, pair) => {
  const [key, value] = pair.split("=");
  acc[key] = value ? decodeURIComponent(value) : null;
  return acc;
}, {});

// Step 3: Convert the key-value pairs into a JSON object
const jsonObject = JSON.stringify(keyValuePairs, null, 2);
return JSON.parse(jsonObject);
}

export async function POST(req) {
  try {
    const { query, signature, userAddress } = await req.json();
    console.log(query)

    const message = "NIFI-Capitative-Portal-Verification";
    const messageHash = ethers.hashMessage(message);
    
    const recoveredAddress = ethers.verifyMessage(message, signature);
  
    if (recoveredAddress.toLowerCase() !== userAddress.toLowerCase()) {
      return NextResponse.json({ message: "Auth failed: Invalid signature" }, { status: 401 });
    }

    const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/FytkuuB7iPq5MJzFo56A1i5qdk9RwxAm"); // Use your RPC URL
    const contract = new ethers.Contract(nftAddress, contractABI, provider);
    console.log(userAddress)
    console.log(tokenId)
    try {
      const balance = await contract.balanceOf(userAddress, tokenId);
      console.log(parseInt(balance))
      if (parseInt(balance) < 1) {
        return NextResponse.json({ message: "Auth failed: You don't have the required NFT" }, { status: 403 });
      }
  
      const { clientip, hid } = await decodeToJson(query);

      const response = await fetch("http://192.168.130.210:5002/api/verified", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientip }),
      });

      if (response.ok) {
          console.log("verification Successful")
      } else {
        throw new Error("Failed to authenticate.");
      }


      // http://[nds_ip]:[nds_port]/[authdir]/?tok=[token]&redir=[landing_page_url]&custom=
      const hash = crypto.createHash('sha256').update(hid + faskey).digest('hex');
      const nds_ip = '192.168.150.1';
      const nds_port = '2050';
      const authdir = '/';
      const tok = hash; // the SHA256 hash generated above
      const redir = 'https://ethglobal.com'; // your originurl

      // Construct the redirection URL back to OpenNDS with necessary data
      const ndsUrl = `http://${nds_ip}:${nds_port}${authdir}?tok=${tok}&redir=${redir}&custom=`;
      ;

      // Respond with the redirect URL
      return NextResponse.json({ redirectUrl: ndsUrl }, { status: 200 });
  
    } catch (error) {
      console.error("Error checking NFT ownership:", error);
      return NextResponse.json({ message: "Server Error, try again" }, { status: 500 });
    }
  

      // Extract query params from OpenNDS
      
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error, try again" }, { status: 500 });
  }
}

export const revalidate = 0;
