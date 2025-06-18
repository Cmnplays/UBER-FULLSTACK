import React from "react";

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen }) => {
  const locations = [
    "bhamarpura chowk, janakinagar, janakpur-7, Madhesh Pradesh, Nepal",
    "bishwakarma chowk, janakinagar, janakpur-7, Madhesh Pradesh, Nepal",
    "sita chowk, janakinagar, janakpur-7, Madhesh Pradesh, Nepal",
    "tapsi chowk, janakinagar, janakpur-7, Madhesh Pradesh, Nepal",
  ];
  return (
    <div>
      {locations.map((elem) => (
        <div
          onClick={() => {
            setVehiclePanelOpen(true);
            setPanelOpen(false);
          }}
          key={elem}
          className="flex p-3  border-2 border-gray-50 rounded-xl active:border-black items-center justify-start gap-4 my-2"
        >
          <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
