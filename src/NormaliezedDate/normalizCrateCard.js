const normalizCrateCard = (inputsValue) => {
  return {
    title: inputsValue.title,
    subtitle: inputsValue.subtitle,
    phone: inputsValue.phone,
    email: inputsValue.email,
    web: inputsValue.web,
    description: inputsValue.description,
    image: {
      url: inputsValue.url,
      alt: inputsValue.alt,
    },
    address: {
      state: inputsValue.state,
      country: inputsValue.country,
      city: inputsValue.city,
      street: inputsValue.street,
      houseNumber: +inputsValue.housenumber,
      zip: +inputsValue.housenumber,
    },
  };
};
export { normalizCrateCard };
