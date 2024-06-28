export const FormatCurrency = (value : number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'DOP',
    }).format(value);
  };