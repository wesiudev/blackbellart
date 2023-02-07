interface IFeedItem {
  data: any;
  setActionType: Function;
  label: string;
  name: string;
  headline: string;
}

const RegularItem = (props: IFeedItem) => {
  return (
    <div className="feedItem">
      <div className="feedItem__headline">
        <h3>{props.headline}</h3>
        <button
          name={props.name}
          id={props.label}
          onClick={(e) => props.setActionType(e)}
        >
          {" "}
          (edytuj)
        </button>
      </div>
      <div>
        {!props.data ? (
          "Brak informacji."
        ) : (
          <div>
            {" "}
            {props.data} {props.name === "itemPrice" ? "PLN" : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegularItem;
