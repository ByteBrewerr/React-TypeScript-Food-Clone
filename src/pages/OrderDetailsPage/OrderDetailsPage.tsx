import { useEffect } from "react";
import { useParams } from "react-router-dom";
import orderStore from "../../stores/ordersStore";
import { observer } from "mobx-react-lite";
import "./orderDetailsPage.scss";
import Contacts from "../../components/profile/SingleOrderDetails/Contacts/Contacts";
import Details from "../../components/profile/SingleOrderDetails/Details/Details";
import Address from "../../components/profile/SingleOrderDetails/Address/Address";
import Cart from "../../components/profile/SingleOrderDetails/Cart/Cart";
import { usePopUp } from "../../hooks/usePopUp";
import FeedbackPopup from "../../components/profile/FeedbackPopup/FeedbackPopup";
import Overlay from "../../shared/modals/Overlay/Overlay";
import { Portal } from "@mui/material";

const OrderDetailsPage = () => {
  const { orderNumber } = useParams();
  const { orders, fetchOrders } = orderStore;
  const { isPopUpVisible, handlePopUp } = usePopUp();
  const order = orders.find((order) => order.number.toString() == orderNumber);
  const storedUid = localStorage.getItem("uid");
  const portalContainer = document.getElementById("portal-container");

  useEffect(() => {
    if (!orders.length && storedUid) {
      fetchOrders(storedUid);
    }
  }, []);

  if (!portalContainer || !order || !storedUid) {
    return null;
  }

  return (
    <>
      <div className="orderDetailsContent">
        <Details payment={order.payment} number={order.number} date={order.date} />
        <Contacts name={order.contacts.name} phone={order.contacts.number} />
        <Address house={order.address.house} street={order.address.street} />
        <Cart products={order.products} />
        <button onClick={() => handlePopUp()}>Оставить отзыв</button>
      </div>
      {isPopUpVisible && (
        <Portal>
          <Overlay handlePopup={handlePopUp}>
            <FeedbackPopup
              orderNumber={parseInt(orderNumber!)}
              uid={storedUid}
              handlePopup={handlePopUp}
              name={order.contacts.name}
              date={order.date}
            />
          </Overlay>
        </Portal>
      )}
    </>
  );
};

export default observer(OrderDetailsPage);
