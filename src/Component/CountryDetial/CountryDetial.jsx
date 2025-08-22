import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CountryDetial.css";

const CountryDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { name } = useParams();
  const [country, setCountry] = useState(state);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCountry(data[0]);
        }
      } catch (err) {
        console.error("Error fetching country:", err);
      }
    };
    fetchCountry();
  }, [name]);

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
            {country.borders && country.borders.length > 0 ? (
              country.borders.map((b, i) => (
                <span key={i} className="border-box">
                  {b}
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
