const normalizeDataRegister = (inputsValue,isBusiness) => {
  return {
    name: {
      first: inputsValue.firstName,
      middle: inputsValue.middle,
      last: inputsValue.lastName,
    },
    phone: inputsValue.phone,
    email: inputsValue.email,
    password: inputsValue.password,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
    address: {
      state: inputsValue.state,
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: inputsValue.houseNumber,
      zip: +inputsValue.zip,
    },
    isBusiness: isBusiness,
  };
};
export { normalizeDataRegister };
