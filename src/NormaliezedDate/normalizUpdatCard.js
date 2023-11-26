const normalizUpdatCard = (inputsValue,oldValues) => {
    return {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        phone: inputsValue.phone,
        email: oldValues.email,
        description: inputsValue.description,
        image: {
          url: inputsValue.url,
        },
        address: {
          country: inputsValue.country,
          city: oldValues.city,
          street: oldValues.street,
          houseNumber: oldValues.houseNumber,
        },
      };
    }
  export { normalizUpdatCard };
  