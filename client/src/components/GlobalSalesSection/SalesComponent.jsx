import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import salesData from "./salesData";
import "./globalSales.css";

import usaFlag from "../../images/flag-icons/united-states.png";
import germanyFlag from "../../images/flag-icons/germany.png";
import australiaFlag from "../../images/flag-icons/australia.png";
import ukFlag from "../../images/flag-icons/united-kingdom.png";
import romaniaFlag from "../../images/flag-icons/romania.png";
import brazilFlag from "../../images/flag-icons/brazil.png";

const flagImages = {
  "united-states": usaFlag,
  germany: germanyFlag,
  australia: australiaFlag,
  "united-kingdom": ukFlag,
  romania: romaniaFlag,
  brazil: brazilFlag,
};

export default function SalesComponent() {
  return (
    <div className="globalSales-main">
      <div className="global-sales">
        <div className="global-sales-header">
          <h4 className="global-sales-heading">
            Global Sales By Top Locations
          </h4>
          <h6 className="global-sales-headingDetail">
            All Products That Were Shipped
          </h6>
        </div>
        <div className="global-sales-stats">
          {salesData.map((data, index) => {
            return (
              <div key={index} className="sales-item">
                <div className="flagIcon-countryName">
                  <img
                    src={flagImages[data.flagURL]}
                    alt={data.country}
                    className="flag-icon"
                  ></img>
                  <h5>{data.country}</h5>
                </div>

                <div className="saleItem-details">
                  <p>{data.productQuantity}</p>
                  <p>{data.salesPercentage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="map-container">
        <MapContainer center={[20, 0]} zoom={1} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
          />
          {salesData.map((data, index) =>
            data.lat && data.lng ? (
              <Marker key={index} position={[data.lat, data.lng]} />
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
