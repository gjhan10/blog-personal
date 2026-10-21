export function formatDate(iso: string, month: 'short' | 'long' = 'short'): string {
  return new Intl.DateTimeFormat('es-PE', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}
