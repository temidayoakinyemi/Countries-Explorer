import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CountryDetial.css";

const CountryDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { name } = useParams();
  const [country, setCountry] = useState(state);
  const [borderCountries, setBorderCountries] = useState([]); 

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(
            name
          )}?fullText=true`
        );
        const data = await res.json();
        if (Array.isArray(data)) setCountry(data[0]);
      } catch (err) {
        console.error("Error fetching country:", err);
      }
    };
    fetchCountry();
  }, [name]);

  useEffect(() => {
    const fetchBorders = async () => {
      if (!country?.borders || country.borders.length === 0) {
        setBorderCountries([]);
        return;
      }
      try {
        const codes = country.borders.join(",");
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`
        );
        const data = await res.json();
        const mapped = Array.isArray(data)
          ? data.map((c) => ({ code: c.cca3, name: c.name?.common }))
          : [];
        setBorderCountries(mapped);
      } catch (e) {
        console.error("Error fetching border countries:", e);
        setBorderCountries([]);
      }
    };
    fetchBorders();
  }, [country?.borders]);

  if (!country) {
    return (
      <div className="container country-detail">
        <button onClick={() => navigate(-1)} className="back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="back-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
        <p>Loading details for {name}...</p>
      </div>
    );
  }

  const nativeName = country.name?.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : "—";
  const capital = country.capital?.join(", ") || "—";
  const tld = country.tld?.join(", ") || "—";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "—";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "—";

  const goToBorder = (border) => {
    if (!border?.name) return;
    navigate(`/country/${encodeURIComponent(border.name)}`, { state: border });
  };

  return (
    <div className="container country-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="back-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <div className="detail-wrapper">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name.common} flag`}
          className="detail-flag"
        />

        <div className="detail-info">
          <h1>{country.name.common}</h1>

          <div className="detail-grid">
            <div>
              <p>
                <strong>Native Name:</strong> {nativeName}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population?.toLocaleString() || "—"}
              </p>
              <p>
                <strong>Region:</strong> {country.region || "—"}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion || "—"}
              </p>
              <p>
                <strong>Capital:</strong> {capital}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong> {tld}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies}
              </p>
              <p>
                <strong>Languages:</strong> {languages}
              </p>
            </div>
          </div>

          <div className="border-countries">
            <strong>Border Countries:</strong>{" "}
            {borderCountries.length > 0 ? (
              borderCountries.map((b) => (
                <span
                  key={b.code}
                  className="border-box"
                  onClick={() => goToBorder(b)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") goToBorder(b);
                  }}
                >
                  {b.code} 
                </span>
              ))
            ) : (
              <span>None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
