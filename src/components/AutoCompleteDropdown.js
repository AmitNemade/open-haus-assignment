import { useEffect, useState } from "react";

const AutoCompleteDropDown = ({
  onSelect,
  selectedOption,
  filterOnSearch,
  options = [],
  label,
  idKey,
  displayKey,
}) => {
  const [search, setSearch] = useState();
  const [dropdownList, setDropdownList] = useState([]);

  useEffect(() => {
    setDropdownList(options);
  }, [options]);

  const fetchOptions = async () => {
    const newOptions = await filterOnSearch(search);
    setDropdownList(newOptions);
  };

  useEffect(() => {
    if (filterOnSearch) {
      fetchOptions();
    }
  }, [search]);

  return (
    <div className="flex-column d-flex">
      <label
        htmlFor="exampleDataList"
        className="text-white opacity-75 form-label"
      >
        {label}
      </label>
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedOption?.[displayKey] ?? "Select"}
        </button>
        <ul
          className="overflow-scroll dropdown-menu "
          style={{ maxHeight: "220px" }}
        >
          <li className="dropdown-item">
            <input
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
            />
          </li>
          {dropdownList.map((option) => (
            <li
              key={option[idKey]}
              onClick={() => onSelect(option)}
              className="dropdown-item"
            >
              {option[displayKey]}
            </li>
          ))}
          {filterOnSearch && (
            <button disabled className="px-3 border-0">
              Search to find...
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AutoCompleteDropDown;
