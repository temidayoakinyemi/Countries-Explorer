import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Country.css";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Country = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
        );
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countries;
    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedRegion) {
      filtered = filtered.filter((c) => c.region === selectedRegion);
    }
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  return (
    <div className="container country">
      <div className="form-filter">
        <form className="searchbox" onSubmit={(e) => e.preventDefault()}>
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="filter">
          <div className="p-img" onClick={toggleDropdown}>
            <p>{selectedRegion || "Filter by region"}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="filter-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {showDropdown && (
            <div className="dropdown-menu">
              {regions.map((region, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedRegion(region);
                    setShowDropdown(false);
                  }}
                >
                  {region}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="countries-grid">
        {filteredCountries.map((country, index) => (
          <div
            className="country-card"
            key={index}
            onClick={() =>
              navigate(`/country/${country.name.common}`, { state: country })
            }
          >
            <img
              src={country.flags?.svg || ""}
              alt={`${country.name?.common || "Unknown"} flag`}
              className="country-flag"
            />
            <div className="country-info">
              <h2>{country.name?.common || "Unknown"}</h2>
              <h3>
                Population:{" "}
                <span>
                  {country.population
                    ? country.population.toLocaleString()
                    : "N/A"}
                </span>
              </h3>
              <h3>
                Region: <span>{country.region || "N/A"}</span>
              </h3>
              <h3>
                Capital: <span>{country.capital?.[0] || "N/A"}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Country;
