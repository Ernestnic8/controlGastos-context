export function formatCurrency(amount: number) {
  return Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
  }).format(amount);
}

export function formatDateI(date: Date) {
  return Intl.DateTimeFormat("es-NI", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
}

export function formatDate(dateStr: string) : string {
  const dateOBj = new Date(dateStr);
  const options : Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Intl.DateTimeFormat("es-NI", options).format(dateOBj);
}