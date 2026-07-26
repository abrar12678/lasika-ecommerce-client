import Image from "next/image";
import React from "react";

const Pak = () => {
  return (
    <div className="bg-red">
      <div>
        <Image
          src="/watches/hero-main.png"
          alt="Hero Image"
          className="object-cover"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default Pak;
