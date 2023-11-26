const normalizUpdatUser = (newValus, oldValus, business) => {
  return {
    name: {
      first: newValus.firstName,
      middle: oldValus.name.middle,
      last: newValus.lastName,
    },
    phone: newValus.phone,
    email: newValus.email,
    password: newValus.password,
    image: {
      url: oldValus.image.url,
      alt: oldValus.image.alt,
    },
    address: {
      state: oldValus.address.state,
      country: newValus.country,
      city: newValus.city,
      street: newValus.street,
      houseNumber: newValus.houseNumber,
      zip: +oldValus.address.zip,
    },
    isBusiness: business,
  };
};
export { normalizUpdatUser };
