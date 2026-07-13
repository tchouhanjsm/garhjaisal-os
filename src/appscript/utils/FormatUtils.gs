function formatCurrency(amount) {
  amount = Number(amount || 0);

  const parts = amount.toFixed(2).split(".");
  const integer = parts[0];
  const decimal = parts[1];

  const formatted = Number(integer).toLocaleString("en-IN");

  return "₹ " + formatted + "." + decimal;
}
