export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export const toPage = (v?: string | string[]) => Math.max(1, Number(first(v)) || 1);

export function paginate<T>(items: T[], page: number, size: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(page, totalPages);
  return {
    rows: items.slice((current - 1) * size, current * size),
    current,
    totalPages,
  };
}