import React from 'react';
import { useSelector } from 'react-redux';
import Outfit from './Outfit.jsx';

export default function OutfitList({ relatedList }) {
  const { currentProduct } = useSelector((state) => state.pd);
  const [outfitList, setOutfitList] = React.useState([]);
  const [previousOutfitVisble, setPreviousVisble] = React.useState(false);
  const [nextOutfitVisible, setNextVisible] = React.useState(true);
  const [firstCard, setFirstCard] = React.useState(20);
  const [lastCard, setLastCard] = React.useState(22);

  const onAddToOutfit = () => {
    const correctProduct = relatedList.filter((item) => item.id === currentProduct.id);

    const product = {
      category: correctProduct[0].category,
      name: correctProduct[0].name,
      default_price: correctProduct[0].default_price,
      sale_price: correctProduct[0].salePrice,
      image: correctProduct[0].image,
      id: correctProduct[0].id,
    };

    const isFound = outfitList.some((value) => {
      if (value.id === product.id) {
        return true;
      }
      return false;
    });

    if (!isFound) {
      setOutfitList([...outfitList, product]);
    }

    localStorage.setItem(correctProduct[0].id, JSON.stringify({
      category: correctProduct[0].category,
      name: correctProduct[0].name,
      default_price: correctProduct[0].default_price,
      sale_price: correctProduct[0].salePrice,
      image: correctProduct[0].image,
      id: correctProduct[0].id,
    }));
  };

  const onRemoveFromOutfit = (e, id) => {
    const currentProductName = e.target.id;
    const newList = outfitList.filter((product) => product.name !== currentProductName);
    setOutfitList(newList);
    localStorage.removeItem(id);
  };

  const previousOutfitItem = () => {
    if (firstCard === 20) {
      setPreviousVisble(!previousOutfitVisble);
    }
    if (lastCard < outfitList.length + 20) {
      setNextVisible(true);
    }
    setFirstCard(firstCard - 1);
    setLastCard(lastCard - 1);
    document.getElementById(firstCard).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const nextOutfitItem = () => {
    if (lastCard === outfitList.length + 19) {
      setNextVisible(false);
    }

    if (firstCard === 20) {
      setPreviousVisble(true);
    }
    setFirstCard(firstCard + 1);
    setLastCard(lastCard + 1);
    document.getElementById(lastCard).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  React.useEffect(() => {
    const newArray = Object.values(localStorage).map((storage) => JSON.parse(storage));
    setOutfitList(newArray);
  }, []);

  let num = 20;

  return (
    <div className="outfitContainer">
      <h3 data-testid="outfitCard">Your Outfit</h3>
      <div className="outfitItemContainer">
        <div className="outfitBack">
          {previousOutfitVisble ? (
            <button className="fa-regular fa-circle-left previousOutfit" type="button" onClick={previousOutfitItem}>
              &lt;
            </button>
          ) : null}
        </div>
        <div className="addToOutfit">
          <div className="addToOutfitContainer" onClick={onAddToOutfit} data-testid="addToOutfit">
            <h1>Add to Outfit</h1>
            <i className="fa-regular fa-plus" />
          </div>
        </div>
        <div className="outfitList">
          {outfitList.length > 0 ?
            outfitList.map((item) => (
              <Outfit
                key={item.id}
                item={item}
                onRemoveFromOutfit={onRemoveFromOutfit}
                list={outfitList}
                count={num++}
              />
            )) : null }
        </div>
        <div className="outfitForward" onClick={nextOutfitItem} data-testid="nextItem">
          {nextOutfitVisible ? (
            <button className="fa-regular fa-circle-left Outfit" type="button">
              &gt;
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
