const listOfCountries = (
  state = [
    "Austria",
    "Belgia",
    "Bułgaria",
    "Chorwacja",
    "Czechy",
    "Dania",
    "Estonia",
    "Finlandia",
    "Francja",
    "Grecja",
    "Hiszpania",
    "Holandia",
    "Irlandia",
    "Litwa",
    "Łotwa",
    "Luksemburg",
    "Malta",
    "Niemcy",
    "Norwegia",
    "Polska",
    "Portugalia",
    "Rumunia",
    "Słowacja",
    "Słowenia",
    "Szwajcaria",
    "Szwecja",
    "Ukraina",
    "Węgry",
    "Wielka Brytania",
    "Włochy",
  ].map((country, idx) => ({ id: idx, itemName: country }))
) => {
  return state;
};

export default listOfCountries;
