import axios from "axios";
import React from "react";
import { ROOT_URL, Token } from "../../../api/api";
const downloadXLSFile = async (url,data) => {
   // Its important to set the 'Content-Type': 'blob' and responseType:'arraybuffer'.
   const headers = {
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'blob'};
   const config = {method: 'POST', url: `${ROOT_URL}${url}`,data, responseType: 'arraybuffer', headers};
   
   try {
       const response = await axios(config);

       // If you want to download file automatically using link attribute.
       const url = URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', `${Date.now()}.xlsx`);
       document.body.appendChild(link);
       link.click();

       // OR you can save/write file locally.
       //fs.writeFileSync(outputFilename, response.data);
   } catch (error) {
       throw Error(error);
   }
};
export default downloadXLSFile