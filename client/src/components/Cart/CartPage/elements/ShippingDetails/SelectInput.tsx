import classnames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import shuffle from "lodash.shuffle";
import { useSelector } from "react-redux";

interface CountryListProps {
  itemName: string;
  id: number;
}

interface ComponentProps {
  handleSelectChange: (...args: any[]) => void;
  value: string;
}

export const SelectInput: React.FC<ComponentProps> = ({
  handleSelectChange,
  value,
}) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [itemsList, setItemsList] = useState<CountryListProps[]>([]);
  const shuffleList = () =>
    setTimeout(() => {
      setItemsList(shuffle(itemsList));
    }, 50);
  const [isSelectOpened, setSelectOpened] = useState<boolean>(false);
  const listOfCountries = useSelector((state: any) => state.listOfCountries);
  const selectInput = classnames({
    select: true,
    radius5pxBottom: isSelectOpened,
  });
  const selectInputLabel = classnames({
    "select-label": true,
    labelFloat: isSelectOpened,
    radius5px: isSelectOpened,
  });

  const countries = classnames({
    countries: true,
    countriesOpened: isSelectOpened,
    radius5pxBottom: isSelectOpened,
  });

  const openList = () => {
    setSelectOpened(true);
    shuffleList();
  };
  const closeList = () => {
    setSelectOpened(false);
  };
  const chooseCountry = (userInput: string) => {
    handleSelectChange(userInput);
    textInputRef.current?.blur();
    shuffleList();
    setSelectOpened(!isSelectOpened);
  };
  //text input handler that filters the list
  const [searchFilter, setSearchFilter] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
    setItemsList(
      listOfCountries.filter((item: any) =>
        item.itemName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  useEffect(() => {
    listOfCountries && setItemsList(listOfCountries);
  }, []);
  return (
    <div className={selectInput}>
      <div className="inputsRow">
        <input
          ref={textInputRef}
          onBlur={closeList}
          onChange={onChange}
          onFocus={openList}
          className={selectInputLabel}
          type="text"
          value={isSelectOpened ? searchFilter : value}
        />
      </div>
      <div
        style={
          isSelectOpened ? { visibility: "inherit" } : { visibility: "hidden" }
        }
      >
        <Flipper
          spring="veryGentle"
          className={countries}
          flipKey={itemsList.map((item) => item.id)}
        >
          {itemsList.map((country: CountryListProps, idx) => (
            <Flipped key={idx} flipId={country.id}>
              <button
                name="country"
                onMouseDown={() => chooseCountry(country.itemName)}
                style={
                  value === country.itemName
                    ? {
                        color: "white",
                        border: "2px solid white",
                        boxShadow: "0px 0px 8px black",
                      }
                    : {}
                }
                className="countries-country"
              >
                {country.itemName}
              </button>
            </Flipped>
          ))}
        </Flipper>
      </div>
    </div>
  );
};
