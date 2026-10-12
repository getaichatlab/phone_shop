export function formatPrice(amount: number): string {
  // Format as 15 499 000 so'm
  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm`
}

export function formatInstallment(amount: number, months: number = 12): string {
  const monthly = Math.round(amount / months)
  return `oyiga ${monthly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'mdan`
}
