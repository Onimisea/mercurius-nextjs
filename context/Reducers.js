export const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (action.payload.qty > 1) {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: action.payload.qty }],
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      let newCart = state.cart.filter((c) => c.id !== action.payload.id);

      if (state.cart.length === 1) {
        newCart = state.cart.pop();
      }

      window.localStorage.setItem("cart", JSON.stringify(state.cart));

      return {
        ...state,
        cart: newCart,
      };

    case "INCREASE_QTY":
      let tempCartInc = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            qty: cartItem.qty + 1,
          };
        } else {
          return {
            ...cartItem,
          };
        }
      });

      return { ...state, cart: tempCartInc };

    case "DECREASE_QTY":
      let tempCartDec = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          if (cartItem.qty > 1) {
            return {
              ...cartItem,
              qty: cartItem.qty - 1,
            };
          } else {
            return {
              ...cartItem,
              qty: cartItem.qty,
            };
          }
        } else {
          return {
            ...cartItem,
          };
        }
      });

      return { ...state, cart: tempCartDec };

    case "CLEAR_CART":
      window.localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...state,
        cart: [],
      };

    case "CLEAR_WISHLIST":
      window.localStorage.setItem("wishlist", JSON.stringify([]));
      return {
        ...state,
        wishlist: [],
      };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, { ...action.payload }] };

    case "REMOVE_FROM_WISHLIST":
      let newWishlist = state.wishlist.filter(
        (w) => w.id !== action.payload.id
      );

      if (state.wishlist.length === 1) {
        newWishlist = state.wishlist.pop();
      }

      window.localStorage.setItem("wishlist", JSON.stringify(state.wishlist));

      return {
        ...state,
        wishlist: newWishlist,
      };

    case "SELECT_SIZE":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, size: action.payload.size }],
      };

    default:
      return state;
  }
};

export const productFilterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "FILTER_BY_CATEGORY":
      return { ...state, byCategory: action.payload };
    case "FILTER_BY_SUBCATEGORY":
      return { ...state, bySubcategory: action.payload };
    case "FILTER_BY_BRAND":
      return { ...state, byBrand: action.payload };
    case "FILTER_BY_PRICE":
      return { ...state, byPrice: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_FLASHSALE":
      return { ...state, byFlashsale: !state.byFlashsale };
    case "FILTER_BY_GENDER":
      return { ...state, byGender: action.payload };
    case "FILTER_BY_SIZE":
      return { ...state, bySize: action.payload };
    case "FILTER_BY_COLOR":
      return { ...state, byColor: action.payload };
    case "CLEAR_FILTERS":
      return {
        searchQuery: "",
        byCategory: "all",
        bySubcategory: "",
        byBrand: "",
        byPrice: 0,
        byStock: false,
        byFlashsale: false,
        byGender: "",
        bySize: "",
        byColor: "",
      };

    default:
      return state;
  }
};
