"use client";

import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrScanner() {
  const [data, setData] = useState<string>("조회된 데이터 없음");

  const qrScan = (result: string) => {
    setData(result);
  };

  const qrErr = (err: Error) => {
    console.log(err);
  };

  return (
    <div>
      <QrReader
        onResult={(res, err) => {
          if (res) qrScan(res.getText());
          if (err) qrErr(err);
        }}
        constraints={{ facingMode: "environment" }}
        containerStyle={{ width: "400px", height: "400px" }}
      />
      <div>result : {data}</div>
    </div>
  );
}
