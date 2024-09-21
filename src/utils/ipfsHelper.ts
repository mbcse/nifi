import lighthouse from "@lighthouse-web3/sdk";
import { v4 as uuidv4 } from 'uuid';

const api_key = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
const progressCallback = (progressData: any) => {
  const percentageDone =
    100 - parseFloat((progressData?.total / progressData?.uploaded)?.toFixed(2));
  console.log(percentageDone);
};

export async function urlToFile(url: any, filename: any, mimeType: any) {
  const response = await fetch(url);
  const blob = await response.blob();
  console.log(blob);
  return [new File([blob], filename, { type: mimeType })];
}

export const uploadFile = async (file: any) => {
  console.log(file);

  // if(type === 'URL'){
  //   const fileObj = await urlToFile(file, "nft-img-"+uuidv4(), "png");
  //   console.log(fileObj);
  //   file = [fileObj];
  // }

  const output = await lighthouse.upload(file, api_key, false, null, progressCallback);
  return "ipfs://" + output.data.Hash;
};

export const uploadJson = async (json: any) => {
  const output = await lighthouse.uploadText(JSON.stringify(json), api_key);
  return "ipfs://" + output.data.Hash;
};
