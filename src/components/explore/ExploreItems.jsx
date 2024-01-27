import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadMore from "../UI/LoadMore";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [item, setItem] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [showLoadMore, setShowLoadMore] = useState(true);

  async function fetchItems() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setItem(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLoadMore = () => {
    if (itemsToShow + 4 >= item.length) {
      setShowLoadMore(false);
    }
    setItemsToShow(itemsToShow + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {item.slice(0, itemsToShow).map((items, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={items.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {items.expiryDate && <Countdown expiryDate={items.expiryDate} />}
            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img
                  src={items.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{items.title}</h4>
              </Link>
              <div className="nft__item_price">{items.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{items.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <LoadMore onLoadMore={handleLoadMore} showLoadMore={showLoadMore} />
    </>
  );
};

export default ExploreItems;
