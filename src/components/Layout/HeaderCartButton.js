import React, { useContext, useEffect, useState } from "react";

import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnHighlight, setBtnHighlight] = useState(false)

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const noOfCartItems = items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0)


    const btnclasses = `${classes.button} ${btnHighlight ? classes.bump : ""}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) return
        setBtnHighlight(true)

        const timer = setTimeout(() => {
            setBtnHighlight(false)
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnclasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {noOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;