import { useState } from "react";
import "./RoomFilter.css";

const RoomFilter = ({ handleFilter }) => {
  const [checkin, setCheckin] = useState(today());
  const [checkout, setCheckout] = useState(today());
  const [type, setType] = useState("all");

  function today() {
    const date = new Date();
    return date.toLocaleDateString("en-CA");
  }

  return (
    <div className="filter-container">
      <div className="filters">
        <div className="filter-item">
          <label htmlFor="checkin">Check-In:</label>
          <div className="date-selector">
            <input
              className="checkinDate"
              type="text"
              name="checkinDate"
              id="checkinDate"
              value={checkin}
              disabled
            />
            <input
              className="checkin"
              type="date"
              name="checkin"
              id="checkin"
              min={new Date().toLocaleDateString("en-CA")}
              value={checkin}
              onInput={(e) => setCheckin(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-item">
          <label htmlFor="checkout">Check-out:</label>
          <div className="date-selector">
            <input
              className="checkoutDate"
              type="text"
              name="checkoutDate"
              id="checkoutDate"
              value={checkout}
              disabled
            />
            <input
              className="checkout"
              type="date"
              name="checkout"
              id="checkout"
              min={new Date().toLocaleDateString("en-CA")}
              value={checkout}
              onInput={(e) => {
                setCheckout(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="filter-item">
          <label htmlFor="roomType">Type</label>
          <select
            name="roomType"
            value={type}
            onInput={(e) => setType(e.target.value)}
          >
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="filter-item">
          <button
            className="btn-filter"
            onClick={() => {
              handleFilter(checkin, checkout, type);
            }}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomFilter;
