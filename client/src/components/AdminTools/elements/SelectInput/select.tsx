import { useState, useEffect } from "react";

type ListItem = { itemId: string; itemName: string }; 
export interface SelectInputProps {
  options: any[];
  onSelect: (arg: any) => void;
}
const Select = ({
  options = [],
  onSelect,
}: SelectInputProps): JSX.Element => {

  const [selectedItem, setSelectedItem] = useState<ListItem>(); 
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleSelectClick = (itemId: string, itemName: string) => {
    setSelectedItem({ itemId, itemName });
    setMenuOpen(false);
    onSelect(itemName);
  };

  const toggleMenuOpen = (): void => {
    setMenuOpen(!menuOpen); 
  }
  return (
    <div className="select">
      <div className="select__chosen" onClick={toggleMenuOpen}>
        {selectedItem ? selectedItem.itemName : "Wybierz kategorię"}
        <div className="select__arrow">&gt;</div>
      </div>
      <div className={menuOpen ? "select__menu--opened" : "select__menu"}>
        {options.map((item, index) => (
          <div
            className="select__item"
            key={index}
            onClick={() => handleSelectClick(item.itemId, item.itemName)}
          >
            {item.itemName}
            {selectedItem?.itemId === item.itemId && (
              <div className="select__item--checked" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;
